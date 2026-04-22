"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface CinematicBackgroundProps {
  movieTitle?: string;
  posterUrl?: string;
}

export default function CinematicBackground({ movieTitle, posterUrl }: CinematicBackgroundProps) {
  const [currentPoster, setCurrentPoster] = useState(
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2000"
  );

  useEffect(() => {
    if (posterUrl) {
      setCurrentPoster(posterUrl);
    }
  }, [posterUrl]);

  return (
    <div className="fixed inset-0 -z-10 bg-[#fdfdfd]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPoster}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.2, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center grayscale-20"
            style={{ backgroundImage: `url(${currentPoster})` }}
          />
          {/* Light Overlay Vignet & Blur */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#fdfdfd] via-[#fdfdfd]/20 to-transparent" />
          <div className="absolute inset-0 backdrop-blur-[80px]" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
