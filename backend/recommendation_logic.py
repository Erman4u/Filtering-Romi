import pandas as pd
import numpy as np
import os
import pickle

class RecommendationEngine:
    def __init__(self, movies_df_path, cosine_sim_path, svd_model_path):
        self.movies_df = pd.read_pickle(movies_df_path)
        self.cosine_sim = np.load(cosine_sim_path, allow_pickle=True) if cosine_sim_path.endswith('.npy') else pd.read_pickle(cosine_sim_path)
        
        # Load SVD model with fallback
        try:
            from surprise import dump
            import pickle
            with open(svd_model_path, 'rb') as f:
                self.svd_model = pickle.load(f)
            self.has_svd = True
        except ImportError:
            print("Warning: scikit-surprise not found. Collaborative filtering will be mocked.")
            self.has_svd = False
        except Exception as e:
            print(f"Warning: Could not load SVD model: {e}")
            self.has_svd = False

        # Pre-process for Demographic Filtering
        self._prepare_demographic()

    def _prepare_demographic(self):
        C = self.movies_df['vote_average'].mean()
        m = self.movies_df['vote_count'].quantile(0.9)
        
        def weighted_rating(x, m=m, C=C):
            v = x['vote_count']
            R = x['vote_average']
            return (v/(v+m) * R) + (m/(m+v) * C)

        q_movies = self.movies_df.copy().loc[self.movies_df['vote_count'] >= m]
        q_movies['score'] = q_movies.apply(weighted_rating, axis=1)
        self.demographic_results = q_movies.sort_values('score', ascending=False)

    def get_demographic_recommendations(self, count=10, genres=None, min_rating=0, year_range=None, profile=None):
        df = self.demographic_results.copy()
        
        # Merge genres if profile is provided
        active_genres = list(genres) if genres else []
        if profile:
            age = profile.get('age')
            if age == '<18': active_genres.extend(['Animation', 'Adventure', 'Family', 'Fantasy'])
            elif age == '18-35': active_genres.extend(['Action', 'Sci-Fi', 'Thriller', 'Horror'])
            elif age == '35-50': active_genres.extend(['Drama', 'Crime', 'Mystery'])
            elif age == '>50': active_genres.extend(['History', 'War', 'Western', 'Documentary'])

        # Filter Rating
        df = df[df['vote_average'] >= min_rating]

        # Filter Year
        if year_range:
            df['year'] = pd.to_datetime(df['release_date'], errors='coerce').dt.year
            df = df[(df['year'] >= year_range[0]) & (df['year'] <= year_range[1])]

        # Filter/Prioritize Genre
        if active_genres:
            df = df[df['genres'].apply(lambda x: any(g.lower() in [i.lower() for i in x] for g in active_genres))]
            
        return df[['title', 'vote_average', 'vote_count', 'score', 'id', 'release_date']].head(count).to_dict(orient='records')

    def get_content_recommendations(self, title, count=10, genres=None, min_rating=0, year_range=None):
        try:
            indices = pd.Series(self.movies_df.index, index=self.movies_df['title']).drop_duplicates()
            idx = indices[title]
            if isinstance(idx, pd.Series): idx = idx.iloc[0]

            sim_scores = list(enumerate(self.cosine_sim[idx]))
            sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
            
            movie_indices = [i[0] for i in sim_scores if i[0] != idx]
            results_df = self.movies_df.iloc[movie_indices].copy()

            # Technical Filters
            results_df = results_df[results_df['vote_average'] >= min_rating]
            if year_range:
                results_df['year'] = pd.to_datetime(results_df['release_date'], errors='coerce').dt.year
                results_df = results_df[(results_df['year'] >= year_range[0]) & (results_df['year'] <= year_range[1])]

            if genres and len(genres) > 0:
                results_df = results_df[results_df['genres'].apply(lambda x: any(g.lower() in [i.lower() for i in x] for g in genres))]

            return results_df[['title', 'vote_average', 'id', 'release_date']].head(count).to_dict(orient='records')
        except Exception as e:
            print(f"Error in content-based: {e}")
            return []

    def get_collaborative_recommendations(self, user_id, count=10, genres=None, min_rating=0, year_range=None):
        pool_df = self.movies_df.copy()
        
        # Technical Filters
        pool_df = pool_df[pool_df['vote_average'] >= min_rating]
        if year_range:
            pool_df['year'] = pd.to_datetime(pool_df['release_date'], errors='coerce').dt.year
            pool_df = pool_df[(pool_df['year'] >= year_range[0]) & (pool_df['year'] <= year_range[1])]

        if genres and len(genres) > 0:
             pool_df = pool_df[pool_df['genres'].apply(lambda x: any(g.lower() in [i.lower() for i in x] for g in genres))]

        if not self.has_svd:
            # Menggunakan user_id sebagai random_state agar rekomendasinya konsisten saat di-refresh
            random_seed = int(user_id) if str(user_id).isdigit() else 42
            return pool_df.sample(min(count, len(pool_df)), random_state=random_seed)[['title', 'vote_average', 'id', 'release_date']].to_dict(orient='records')
        
        movie_ids = pool_df['id'].unique()[:500] 
        predictions = []
        for m_id in movie_ids:
            predictions.append((m_id, self.svd_model.predict(user_id, m_id).est))
        
        predictions.sort(key=lambda x: x[1], reverse=True)
        top_movie_ids = [p[0] for p in predictions[:count]]
        return self.movies_df[self.movies_df['id'].isin(top_movie_ids)][['title', 'vote_average', 'id', 'release_date']].to_dict(orient='records')

    def get_all_movies(self):
        return self.movies_df[['title', 'id']].to_dict(orient='records')
