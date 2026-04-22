"use client";

import { motion } from "framer-motion";

interface StatsCardProps {
  label: string;
  value: string;
  description: string;
  accent: string;
}

export default function StatsCard({ label, value, description, accent }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-3xl p-8 space-y-4 border-none shadow-xl shadow-black/5"
    >
      <div className={`text-4xl font-black ${accent}`}>{value}</div>
      <div>
        <h4 className="text-sm font-bold text-black uppercase tracking-wider">{label}</h4>
        <p className="text-xs text-black/40 mt-1 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
