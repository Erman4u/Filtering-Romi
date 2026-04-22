"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, Smartphone } from "lucide-react";

type Method = "demographic" | "content" | "collaborative";

interface MethodSelectorProps {
  current: Method;
  onChange: (method: Method) => void;
}

const methods = [
  { id: "demographic", label: "Demographic", icon: Users, desc: "Berdasarkan popularitas global" },
  { id: "content", label: "Content-Based", icon: BookOpen, desc: "Berdasarkan atribut film" },
  { id: "collaborative", label: "Collaborative", icon: Smartphone, desc: "Berdasarkan selera komunitas" },
];

export default function MethodSelector({ current, onChange }: MethodSelectorProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center py-8">
      {methods.map((method) => {
        const Icon = method.icon;
        const isActive = current === method.id;

        return (
          <button
            key={method.id}
            onClick={() => onChange(method.id as Method)}
            className="relative p-[1px] rounded-2xl overflow-hidden group transition-all"
          >
            {/* Animated border for active */}
            {isActive && (
              <motion.div
                layoutId="active-border"
                className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            <div className={`relative px-6 py-4 rounded-2xl flex items-center gap-4 ${
              isActive ? "bg-white" : "bg-black/5 hover:bg-black/10"
            } transition-colors shadow-sm`}>
              <div className={`p-2 rounded-lg ${isActive ? "bg-blue-100 text-blue-600" : "text-black/30"}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className={`text-sm font-bold ${isActive ? "text-black" : "text-black/40"}`}>{method.label}</p>
                <p className="text-[10px] text-black/40 leading-tight">{method.desc}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
