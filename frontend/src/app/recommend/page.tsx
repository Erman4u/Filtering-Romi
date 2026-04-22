"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, RefreshCw, ArrowLeft, User, Film } from "lucide-react";
import Link from "next/link";
import CinematicBackground from "@/components/CinematicBackground";
import MethodSelector from "@/components/MethodSelector";
import MovieCard from "@/components/MovieCard";
import PreferenceForm from "@/components/PreferenceForm";

const API_BASE = "https://erman4u-filtering-romi.hf.space/api";

type Method = "demographic" | "content" | "collaborative";

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  score?: number;
}

export default function RecommenderPage() {
  const [method, setMethod] = useState<Method>("demographic");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [allMovies, setAllMovies] = useState<{ title: string, id: number }[]>([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [profile, setProfile] = useState({ age: "all", gender: "all" });
  const [minRating, setMinRating] = useState(0);
  const [yearRange, setYearRange] = useState<[number, number]>([1900, 2024]);
  const [userId, setUserId] = useState("10");
  const [userPersona, setUserPersona] = useState<{ name: string, desc: string, top_genres: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMovies();
    fetchRecommendations();
    if (method === "collaborative") {
      fetchUserPersona();
    }
  }, [method, selectedGenres, profile, minRating, yearRange, userId]);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${API_BASE}/movies`);
      setAllMovies(res.data);
    } catch (err) {
      console.error("Failed to fetch movie list", err);
    }
  };

  const fetchUserPersona = async () => {
    if (!userId) {
      setUserPersona(null);
      return;
    }
    try {
      const res = await axios.get(`${API_BASE}/user-profile/${userId}`);
      setUserPersona(res.data);
    } catch (err) {
      console.error("Failed to fetch user persona", err);
      setUserPersona(null);
    }
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const updateProfile = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const updateYear = (type: 'start' | 'end', val: number) => {
    setYearRange(prev => type === 'start' ? [val, prev[1]] : [prev[0], val]);
  };

  const fetchRecommendations = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API_BASE}/recommend`, {
        method,
        title: selectedTitle || undefined,
        user_id: parseInt(userId) || 10,
        genres: selectedGenres,
        min_rating: minRating,
        year_range: yearRange,
        profile: profile,
        count: 12
      });
      setMovies(res.data.results);
    } catch (err: any) {
      setError(err.response?.data?.error || "Gagal mengambil rekomendasi");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative p-6 md:p-12">
      <CinematicBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/" className="flex items-center gap-2 text-black/40 hover:text-black transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold">Kembali ke Beranda</span>
          </Link>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-black">Recommendation Hub</h2>
            <p className="text-black/40 text-xs mt-1">Interactive Experiment Engine</p>
          </div>
        </div>

        {/* Method Selector */}
        <MethodSelector current={method} onChange={setMethod} />

        {/* Preference Form */}
        <PreferenceForm
          selectedGenres={selectedGenres}
          onToggleGenre={toggleGenre}
          profile={profile}
          onProfileChange={updateProfile}
          minRating={minRating}
          onRatingChange={setMinRating}
          yearRange={yearRange}
          onYearChange={updateYear}
        />

        {/* Dynamic Controls based on Method */}
        <div className="flex flex-col items-center gap-4 mb-16">
          {method === "content" && (
            <div className="flex w-full max-w-xl glass rounded-2xl p-2 gap-2">
              <div className="flex-1 flex items-center px-4 gap-3">
                <Film className="w-5 h-5 text-black/20" />
                <input
                  list="movie-list"
                  placeholder="Ketik judul film favoritmu..."
                  className="bg-transparent border-none outline-none text-black text-sm w-full h-10"
                  value={selectedTitle}
                  onChange={(e) => setSelectedTitle(e.target.value)}
                />
                <datalist id="movie-list">
                  {allMovies.slice(0, 100).map((m, i) => <option key={`${m.id}-${i}`} value={m.title} />)}
                </datalist>
              </div>
              <button
                onClick={fetchRecommendations}
                className="p-3 bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          )}

          {method === "collaborative" && (
            <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
              <div className="flex items-center gap-4 glass px-6 py-3 rounded-2xl text-black">
                <User className="w-5 h-5 text-black/20" />
                <span className="text-sm text-black/60">Simulasi untuk User ID:</span>
                <input
                  type="number"
                  className="bg-black/5 border border-black/10 rounded-lg px-3 py-1 text-sm w-20 outline-none focus:border-blue-500 transition-colors font-bold"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
                <button onClick={fetchRecommendations} className="hover:text-blue-400 transition-colors">
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {userPersona && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full glass rounded-3xl p-6 border-blue-100 shadow-xl shadow-blue-500/5"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20">
                      <User className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="text-lg font-black text-black">{userPersona.name}</h4>
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                          Verified Taste
                        </span>
                      </div>
                      <p className="text-sm text-black/60 leading-relaxed italic">
                        "{userPersona.desc}"
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {userPersona.top_genres.map(genre => (
                          <span key={genre} className="text-[9px] font-bold text-black/40 bg-black/5 px-2 py-1 rounded-md">
                            #{genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {method === "demographic" && (
            <p className="text-sm text-black/40 italic">Menampilkan film dengan skor rating tertinggi secara global.</p>
          )}
        </div>

        {/* Results Grid */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-40 gap-4"
              >
                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                <p className="text-white/40 font-medium animate-pulse">Menghitung probabilitas...</p>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-40"
              >
                <div className="text-red-400/20 text-6xl font-bold mb-4">ERROR</div>
                <p className="text-red-400 font-medium">{error}</p>
                <button onClick={fetchRecommendations} className="mt-4 text-xs text-white/40 hover:text-white underline">Coba lagi</button>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
              >
                {movies.map((movie, idx) => (
                  <MovieCard
                    key={`${movie.id}-${idx}`}
                    movie={movie}
                    index={idx}
                    onClick={() => {
                      if (method === "content") return;
                      setSelectedTitle(movie.title);
                      setMethod("content");
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
