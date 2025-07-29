'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SparklesCore } from '../components/ui/sparkles';
import CrystalRain from "@/components/CrystalRain";
import Link from 'next/link';

export default function HomePage() {
  const stats = [
    { value: "5+", label: "Languages Supported" },
    { value: "1000+", label: "Questions Generated" },
    { value: "500+", label: "Teachers Onboarded" },
    { value: "100%", label: "Free to Use" },
  ];

  useEffect(() => {
    document.title = 'Micropen | Voice to Paper Tool';
  }, []);

  return (
    <main className="bg-[#0a002c] min-h-screen text-white font-sans">
      {/* Navbar */}
      <nav className="bg-[#0a002c] sticky top-0 z-50 flex flex-wrap justify-between items-center px-4 py-4 shadow-md backdrop-blur-md">
        <h1 className="text-2xl font-bold text-pink-500">Micropen</h1>

        <div className="flex flex-wrap gap-4 mt-2 md:mt-0 md:gap-6 text-sm md:text-base">
          <a href="#about" className="hover:text-pink-400">About</a>
          <a href="#features" className="hover:text-pink-400">Features</a>
          <a href="#testimonials" className="hover:text-pink-400">Testimonials</a>
          <a href="#contact" className="hover:text-pink-400">Contact</a>
        </div>
      </nav>

      <CrystalRain />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 md:px-6 text-center overflow-hidden">
        <SparklesCore background="transparent" minSize={0.5} maxSize={1.5} particleDensity={80} className="absolute inset-0 z-0" particleColor="#ff00ff" />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text z-10"
        >
          Build <span className="text-pink-400">Micropen</span> — Voice to Paper
        </motion.h1>

        <p className="text-gray-300 mt-4 max-w-lg text-sm sm:text-base z-10">
          Empower teachers to create downloadable question papers using just voice – in Hindi, Bengali, or English.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center z-10 w-full sm:w-auto">
          <Link href="/dashboard" className="px-6 py-3 text-center bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-semibold shadow-lg">
            Try it Now
          </Link>
          <button className="px-6 py-3 border border-white text-white rounded-xl hover:bg-white hover:text-black">
            Watch Demo
          </button>
        </div>
      </section>

      {/* Features (Cards) */}
      <section id="features" className="py-16 px-4 sm:px-8 bg-gradient-to-br from-[#1a0033] to-[#2a0055] grid gap-6 sm:gap-8 md:grid-cols-3 text-center">
        {[
          'Dictate Questions in Hindi, Bengali or English',
          'Save as PDF instantly',
          'Change fonts, bold, underline, add tables',
        ].map((feature, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform">
            <h3 className="text-pink-400 font-semibold mb-2">Feature {i + 1}</h3>
            <p className="text-sm sm:text-base">{feature}</p>
          </div>
        ))}
      </section>

      {/* Stats */}
      <section className="bg-[#12003c] py-16 px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((item, idx) => (
          <div key={idx}>
            <h2 className="text-2xl sm:text-3xl font-bold text-pink-500">{item.value}</h2>
            <p className="text-gray-300 text-sm sm:text-base">{item.label}</p>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 text-center bg-[#190040]">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">About Micropen</h2>
        <p className="max-w-2xl mx-auto text-gray-300 text-sm sm:text-base">
          Micropen is a revolutionary tool crafted for teachers who want to create exam papers just by speaking. It turns your speech into properly formatted downloadable PDFs and allows text styling like bold, colors, underline, and tables — just like MS Word!
        </p>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-[#0f0028] py-20 px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">What Teachers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {[
            { name: "Anjali Ma'am", quote: "It's a blessing for non-tech teachers. I just speak the questions and it gets printed!" },
            { name: "Mr. Sharma", quote: "My entire monthly tests are now created with voice — no typing needed." },
          ].map((t, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-xl backdrop-blur-md">
              <p className="text-gray-300 italic text-sm sm:text-base">“{t.quote}”</p>
              <h4 className="text-pink-400 font-semibold mt-4">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#08001f] text-gray-400 text-xs sm:text-sm py-8 px-4 text-center">
        <p>© 2025 Micropen. Built with ❤️ for educators.</p>
        <div className="mt-2 space-x-2">
          <a href="#" className="hover:text-pink-400">Privacy Policy</a>
          <span>·</span>
          <a href="#" className="hover:text-pink-400">Terms</a>
        </div>
      </footer>
    </main>
  );
}
