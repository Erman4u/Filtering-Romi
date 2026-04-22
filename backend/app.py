from flask import Flask, request, jsonify
from flask_cors import CORS
from recommendation_logic import RecommendationEngine
import os

app = Flask(__name__)
CORS(app)

# Initialize engine
MODEL_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'Model')
engine = RecommendationEngine(
    movies_df_path=os.path.join(MODEL_DIR, 'movies_data.pkl'),
    cosine_sim_path=os.path.join(MODEL_DIR, 'cosine_sim.pkl'),
    svd_model_path=os.path.join(MODEL_DIR, 'svd_model.pkl')
)

USER_PERSONAS = {
    10: {
        "name": "Aris (Action Enthusiast)",
        "desc": "Pengguna ini memiliki riwayat menonton film aksi blockbuster dan petualangan tinggi. Sangat menyukai karya Christopher Nolan dan Tom Cruise.",
        "top_genres": ["Action", "Adventure", "Sci-Fi"]
    },
    50: {
        "name": "Budi (Drama Scout)",
        "desc": "Pengguna ini menyukai drama emosional dan film indie dengan narasi yang kuat. Memiliki selera pada film pemenang Oscar dan cerita yang realistis.",
        "top_genres": ["Drama", "Crime", "Mystery"]
    },
    100: {
        "name": "Citra (Family & Animation)",
        "desc": "Pengguna ini adalah penggemar berat film animasi Pixar dan Studio Ghibli. Sering menonton bersama keluarga dan menyukai cerita yang menyentuh hati.",
        "top_genres": ["Animation", "Family", "Fantasy"]
    },
    200: {
        "name": "Deni (Thriller Addict)",
        "desc": "Pengguna ini mencari ketegangan dalam setiap film. Menyukai plot twist yang rumit, misteri pembunuhan, dan thriller psikologis.",
        "top_genres": ["Thriller", "Horror", "Mystery"]
    }
}

@app.route('/api/user-profile/<int:user_id>', methods=['GET'])
def get_user_profile(user_id):
    profile = USER_PERSONAS.get(user_id, {
        "name": f"User ID {user_id}",
        "desc": "Pengguna baru dengan pola interaksi yang bervariasi. Sistem collaborative sedang memetakan pola selera uniknya.",
        "top_genres": ["General"]
    })
    return jsonify(profile)

@app.route('/api/movies', methods=['GET'])
def get_movies():
    return jsonify(engine.get_all_movies())

@app.route('/api/recommend', methods=['POST'])
def recommend():
    data = request.json
    method = data.get('method', 'demographic')
    count = data.get('count', 10)
    genres = data.get('genres', [])
    min_rating = data.get('min_rating', 0)
    year_range = data.get('year_range')
    profile = data.get('profile') # { age, gender }
    
    if method == 'demographic':
        results = engine.get_demographic_recommendations(count, genres, min_rating, year_range, profile)
    elif method == 'content':
        title = data.get('title')
        if not title:
            return jsonify({"error": "Title required for content-based"}), 400
        results = engine.get_content_recommendations(title, count, genres, min_rating, year_range)
    elif method == 'collaborative':
        user_id = data.get('user_id', 1)
        results = engine.get_collaborative_recommendations(user_id, count, genres, min_rating, year_range)
    else:
        return jsonify({"error": "Invalid method"}), 400
        
    return jsonify({
        "method": method,
        "results": results
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
