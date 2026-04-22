"use client";

import { motion } from "framer-motion";
import { Info, HelpCircle } from "lucide-react";

export default function ResearchInfo() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-3xl p-8 md:p-12 space-y-8"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-blue-100 text-blue-600">
            <Info className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-black to-black/40 bg-clip-text text-transparent">
            Latar Belakang Riset
          </h2>
        </div>

        <div className="space-y-6 text-black/60 leading-relaxed">
          <p>
            Di era transformasi digital, kelimpahan pilihan memunculkan paradoks psikologis yang dikenal sebagai 
            <span className="text-blue-600 font-semibold"> information overload</span>. Pengguna sering menghabiskan waktu 
            lebih lama untuk memilih daripada menonton, yang menurunkan tingkat kepuasan layanan.
          </p>

          <div className="grid md:grid-cols-3 gap-6 pt-6">
            <div className="space-y-3 p-4 rounded-2xl bg-black/5">
              <h4 className="text-black font-bold flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Demographic
              </h4>
              <p className="text-xs">
                Mengatasi masalah pengguna baru (cold-start) dengan memberikan rekomendasi berdasarkan popularitas global 
                yang teruji kualitasnya.
              </p>
            </div>
            <div className="space-y-3 p-4 rounded-2xl bg-black/5">
              <h4 className="text-black font-bold flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Content-Based
              </h4>
              <p className="text-xs">
                Menganalisis atribut intrinsik (genre, aktor, sinopsis) menggunakan NLP untuk menemukan film 
                dengan tema spesifik yang relevan.
              </p>
            </div>
            <div className="space-y-3 p-4 rounded-2xl bg-black/5">
              <h4 className="text-black font-bold flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                Collaborative
              </h4>
              <p className="text-xs">
                Memanfaatkan "wisdom of the crowd" dengan memprediksi preferensi berdasarkan kemiripan pola 
                rating antar komunitas pengguna.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-black/5">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-black/5 italic text-sm text-black/40">
            <HelpCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              Penelitian ini membandingkan kinerja ketiga algoritma secara mendalam untuk memahami trade-off 
              antara akurasi dan karakteristik rekomendasi dari tiap metode.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
