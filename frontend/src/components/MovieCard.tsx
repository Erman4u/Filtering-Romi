"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  score?: number;
}

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
  index: number;
}

export default function MovieCard({ movie, onClick, index }: MovieCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl glass p-4 transition-all hover:bg-black/5"
    >
      <div className="aspect-[2/3] w-full rounded-xl bg-black/5 flex items-center justify-center relative overflow-hidden mb-4">
         <span className="text-black/10 font-bold text-center px-4 text-xs">{movie.title}</span>
         {/* Highlight Gradient hover */}
         <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <h3 className="text-sm font-bold text-black/80 truncate">{movie.title}</h3>
      <div className="flex items-center gap-2 mt-1">
        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
        <span className="text-xs text-black/40 font-medium">{movie.vote_average.toFixed(1)}</span>
        {movie.score && (
            <span className="text-[9px] text-blue-600 font-mono ml-auto bg-blue-50 px-1.5 py-0.5 rounded">Score: {movie.score.toFixed(2)}</span>
        )}
      </div>
    </motion.div>
  );
}
