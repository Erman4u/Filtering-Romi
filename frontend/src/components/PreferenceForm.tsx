"use client";

import { motion } from "framer-motion";
import { Filter, X, User as UserIcon, Calendar, Star as StarIcon } from "lucide-react";

interface PreferenceFormProps {
  selectedGenres: string[];
  onToggleGenre: (genre: string) => void;
  profile: { age: string; gender: string };
  onProfileChange: (field: string, value: string) => void;
  minRating: number;
  onRatingChange: (val: number) => void;
  yearRange: [number, number];
  onYearChange: (type: 'start' | 'end', val: number) => void;
}

const GENRES = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", 
  "Drama", "Family", "Fantasy", "Horror", "Science Fiction", "Thriller"
];

export default function PreferenceForm({ 
  selectedGenres, onToggleGenre, 
  profile, onProfileChange,
  minRating, onRatingChange,
  yearRange, onYearChange
}: PreferenceFormProps) {
  return (
    <div className="max-w-4xl mx-auto mb-12 space-y-6">
      {/* Main Profile & Technical Filters */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
              <UserIcon className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-black">Profil Demografis</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-black/30">Kelompok Umur</label>
              <select 
                value={profile.age}
                onChange={(e) => onProfileChange('age', e.target.value)}
                className="w-full bg-black/5 border-none rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 ring-purple-500/20"
              >
                <option value="all">Semua Umur</option>
                <option value="<18">Anak-anak / Remaja (&lt;18)</option>
                <option value="18-35">Dewasa Muda (18-35)</option>
                <option value="35-50">Dewasa (35-50)</option>
                <option value=">50">Senior (&gt;50)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-black/30">Jenis Kelamin</label>
              <select 
                value={profile.gender}
                onChange={(e) => onProfileChange('gender', e.target.value)}
                className="w-full bg-black/5 border-none rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 ring-purple-500/20"
              >
                <option value="all">Semua</option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
            </div>
          </div>
        </div>

        {/* Technical Filters Card */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-black">Filter Teknis</h3>
          </div>

          <div className="space-y-4">
             <div className="flex justify-between items-end">
                <label className="text-[10px] uppercase font-bold text-black/30">Rentang Tahun</label>
                <span className="text-[10px] font-mono text-orange-600">{yearRange[0]} - {yearRange[1]}</span>
             </div>
             <div className="flex gap-2">
                <input 
                  type="number" 
                  value={yearRange[0]}
                  onChange={(e) => onYearChange('start', parseInt(e.target.value))}
                  className="w-full bg-black/5 border-none rounded-lg px-2 py-1.5 text-[10px] outline-none"
                />
                <input 
                  type="number" 
                  value={yearRange[1]}
                  onChange={(e) => onYearChange('end', parseInt(e.target.value))}
                  className="w-full bg-black/5 border-none rounded-lg px-2 py-1.5 text-[10px] outline-none"
                />
             </div>

             <div className="space-y-2">
                <div className="flex justify-between">
                   <label className="text-[10px] uppercase font-bold text-black/30">Rating Minimum</label>
                   <span className="text-[10px] font-mono text-orange-600">{minRating}</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="10" step="0.5"
                  value={minRating}
                  onChange={(e) => onRatingChange(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-black/5 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
             </div>
          </div>
        </div>
      </div>

      {/* Genres Chip Selector */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
            <Filter className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-black">Genre Favorit</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {GENRES.map((genre) => {
            const isSelected = selectedGenres.includes(genre);
            return (
              <button
                key={genre}
                onClick={() => onToggleGenre(genre)}
                className={`px-4 py-2 rounded-full text-[10px] font-bold transition-all flex items-center gap-2 ${
                  isSelected 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                  : "bg-black/5 text-black/60 hover:bg-black/10"
                }`}
              >
                {genre}
                {isSelected && <X className="w-3 h-3" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
