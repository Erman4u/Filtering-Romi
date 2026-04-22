import CinematicBackground from "@/components/CinematicBackground";
import SectionNavbar from "@/components/SectionNavbar";
import StatsCard from "@/components/StatsCard";
import { MoveRight, Play, Book, Search, Users, Database } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen relative bg-[#fdfdfd]">
      <CinematicBackground />
      <SectionNavbar />
      
      {/* BERANDA - Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-600 text-[10px] font-bold tracking-widest uppercase mb-4 animate-fade-in shadow-sm">
            Research & Simulation
          </div>
          <h2 className="text-xl font-bold text-black/60 mb-2">Sistem Rekomendasi Film Berdasarkan</h2>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
             RIWAYAT RATING PENGGUNA
          </h1>
          <p className="text-lg md:text-xl text-black/40 max-w-2xl mx-auto leading-relaxed mt-6">
            Mengeksplorasi perbandingan empiris kinerja pendekatan Demographic Filtering, Content-Based Filtering, 
            dan Collaborative Filtering.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 pt-10">
            <Link 
              href="/recommend"
              className="px-10 py-4 rounded-full bg-blue-600 text-white font-bold flex items-center gap-3 hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 group shadow-lg shadow-blue-500/20"
            >
              <Play className="w-4 h-4 fill-white" />
              Mulai Simulasi
            </Link>
            <a 
              href="#latar-belakang"
              className="px-10 py-4 rounded-full glass text-black/60 font-bold flex items-center gap-3 hover:bg-black/5 transition-all active:scale-95 group"
            >
              Pelajari Latar Belakang
              <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* LATAR BELAKANG - Urgency & Information Overload */}
      <section id="latar-belakang" className="py-32 px-6">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-4">
             <h2 className="text-4xl font-black tracking-tighter text-black">LATAR BELAKANG</h2>
             <p className="text-black/40 max-w-xl mx-auto text-sm">Mengapa sistem rekomendasi menjadi krusial di era transformasi digital.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-100 text-orange-600 text-[10px] font-bold uppercase">
                   Fenomena "Information Overload"
                </div>
                <h3 className="text-3xl font-black tracking-tight text-black leading-tight">Paradoks Pilihan di Layanan Streaming</h3>
                <div className="space-y-4">
                   <blockquote className="border-l-4 border-orange-500 pl-6 py-2 italic text-black/60 text-sm">
                      "Fenomena information overload terjadi ketika volume informasi yang tersedia melampaui kapasitas pemrosesan kognitif pengguna, 
                      menyebabkan kebingungan dan kesulitan dalam mengambil keputusan."
                      <p className="mt-2 font-bold text-black">— Fayyaz, et al.</p>
                   </blockquote>
                   <div className="p-6 bg-black/5 rounded-3xl text-sm text-black/60 leading-relaxed">
                      Di era digital ini, pengguna sering menghabiskan waktu yang tidak proporsional hanya untuk memilih tontonan. 
                      Akibatnya, tingkat kepuasan menurun. Munthe & Siregar menekankan bahwa penyedia layanan memiliki <b>urgensi bisnis 
                      untuk membantu pengguna menemukan konten secara otomatis guna meningkatkan retensi pengguna.</b>
                   </div>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                 <StatsCard label="Jumlah Konteks Rating" value="2,2 Juta" description="Riwayat data rating pengguna dari TMDB" accent="text-blue-600" />
                 <StatsCard label="Katalog Film" value="45.000+" description="Semakin banyak pilihan memicu information overload" accent="text-orange-500" />
              </div>
          </div>
        </div>
      </section>

      {/* ALGORITMA UTAMA - Taxanomy Section */}
      <section id="algoritma" className="py-32 bg-black/[0.02]">
        <div className="max-w-6xl mx-auto px-6">
           <div className="text-center space-y-4 mb-20">
              <h2 className="text-4xl font-black tracking-tighter text-black">TAKSONOMI ALGORITMA</h2>
              <p className="text-black/40 max-w-2xl mx-auto text-sm">Tiga metode paling fundamental yang memiliki filosofi berbeda dalam mendefinisikan "relevansi" rekomendasi (Li et al).</p>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
              {/* Demographic */}
              <div className="glass p-8 rounded-3xl space-y-6 hover:shadow-2xl hover:shadow-blue-500/10 transition-all border-t-4 border-blue-500">
                 <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                    <Database className="w-6 h-6" />
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-xl font-bold text-black">Demographic Filtering</h4>
                    <p className="text-sm font-semibold text-blue-600 bg-blue-50 w-max px-2 py-1 rounded">Model Baseline</p>
                 </div>
                 <p className="text-xs text-black/60 leading-relaxed">
                    Bekerja dengan mengelompokkan pengguna berdasarkan atribut umum atau merekomendasikan item yang populer secara global. Menggunakan formula <b>Weighted Rating</b> (seperti IMDb).
                 </p>
                 <div className="pt-4 border-t border-black/5 text-xs text-black/40 space-y-2">
                    <p><b>Keunggulan:</b> Mengatasi masalah cold-start dengan konten teruji.</p>
                    <p className="text-red-500/70"><b>Kelemahan:</b> Bersifat statis, tidak dipersonalisasi.</p>
                 </div>
              </div>

              {/* Content-Based */}
              <div className="glass p-8 rounded-3xl space-y-6 hover:shadow-2xl hover:shadow-purple-500/10 transition-all border-t-4 border-purple-500">
                 <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                    <Search className="w-6 h-6" />
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-xl font-bold text-black">Content-Based Filtering</h4>
                    <p className="text-sm font-semibold text-purple-600 bg-purple-50 w-max px-2 py-1 rounded">NLP & TF-IDF</p>
                 </div>
                 <p className="text-xs text-black/60 leading-relaxed">
                    Menganalisis atribut intrinsik (sinopsis, genre, aktor) menggunakan NLP. Jika pengguna menyukai film A, sistem mencari film B yang memiliki kemiripan teks.
                 </p>
                 <div className="pt-4 border-t border-black/5 text-xs text-black/40 space-y-2">
                    <p><b>Keunggulan:</b> Menemukan film spesifik sesuai riwayat tontonan individu.</p>
                    <p className="text-red-500/70"><b>Kelemahan:</b> Rentan "filter bubble" / overspecialization.</p>
                 </div>
              </div>

              {/* Collaborative */}
              <div className="glass p-8 rounded-3xl space-y-6 hover:shadow-2xl hover:shadow-green-500/10 transition-all border-t-4 border-green-500">
                 <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                    <Users className="w-6 h-6" />
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-xl font-bold text-black">Collaborative Filtering</h4>
                    <p className="text-sm font-semibold text-green-600 bg-green-50 w-max px-2 py-1 rounded">SVD Matrix Factorization</p>
                 </div>
                 <p className="text-xs text-black/60 leading-relaxed">
                    Memanfaatkan "wisdom of the crowd". Memprediksi preferensi berdasarkan pola interaksi komunitas menggunakan SVD (Singular Value Decomposition).
                 </p>
                 <div className="pt-4 border-t border-black/5 text-xs text-black/40 space-y-2">
                    <p><b>Keunggulan:</b> Rekomendasi lintas-genre yang tidak terduga.</p>
                    <p className="text-red-500/70"><b>Tantangan:</b> Membutuhkan penanganan skalabilitas (sparsity).</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* EVALUASI & GAP - Research Gap Focus */}
      <section id="evaluasi" className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 space-y-12">
           <div className="text-center space-y-4">
              <h2 className="text-4xl font-black tracking-tighter text-black">RESEARCH GAP & EVALUASI</h2>
              <p className="text-black/40 text-sm max-w-xl mx-auto">Memahami trade-off dari setiap metode sangat penting sebelum merancang sistem kompleks.</p>
           </div>

           <div className="glass p-12 rounded-[40px] space-y-8 bg-gradient-to-br from-white/60 to-blue-50/40">
              <div className="flex items-start gap-4">
                <Book className="w-8 h-8 text-blue-600 shrink-0 mt-1" />
                <div className="space-y-4">
                  <h4 className="text-2xl font-black text-black">Kesenjangan Penelitian Saat Ini</h4>
                  <p className="text-sm text-black/60 leading-relaxed">
                    Sebagian besar penelitian terkini (seperti Sharma et al.) cenderung langsung berfokus pada pengembangan sistem Hybrid yang kompleks tanpa terlebih dahulu melakukan komparasi mendalam secara terpisah pada dataset yang sama.
                  </p>
                  <p className="text-sm text-black/60 leading-relaxed font-bold border-l-2 border-blue-500 pl-4 mt-4">
                    Penelitian ini bertujuan untuk merancang dan membandingkan secara komparatif kinerja dari Demographic Filtering, Content-Based Filtering, dan Collaborative Filtering.
                  </p>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-black/5 bg-[#fdfdfd] relative z-10 text-center text-black/40 text-[10px] font-mono uppercase tracking-widest">
          <p>© 2026 Riset Sistem Rekomendasi - Dirancang untuk komparasi performa algoritma</p>
      </footer>
    </main>
  );
}
