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
      <nav className="bg-[#0a002c] sticky top-0 z-50 flex justify-between items-center px-6 py-4 shadow-md backdrop-blur-md">
        <h1 className="text-2xl font-bold text-pink-500">Micropen</h1>

        <div className="space-x-6">
          <a href="#about" className="hover:text-pink-400">About</a>
          <a href="#features" className="hover:text-pink-400">Features</a>
          <a href="#testimonials" className="hover:text-pink-400">Testimonials</a>
          <a href="#contact" className="hover:text-pink-400">Contact</a>
        </div>
      </nav>
      <CrystalRain />
      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <SparklesCore background="transparent" minSize={0.5} maxSize={1.5} particleDensity={80} className="absolute inset-0 z-0" particleColor="#ff00ff" />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text z-10"
        >
          Build <span className="text-pink-400">Micropen</span> — Voice to Paper
        </motion.h1>

        <p className="text-gray-300 mt-4 max-w-xl z-10">
          Empower teachers to create downloadable question papers using just voice – in Hindi, Bengali, or English.
        </p>

        <div className="mt-8 flex gap-4 flex-wrap justify-center z-10">
          <Link href="/dashboard" className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-semibold shadow-lg">
            Try it Now
          </Link>
          <button className="px-6 py-3 border border-white text-white rounded-xl hover:bg-white hover:text-black">
            Watch Demo
          </button>
        </div>
      </section>

      {/* Features (Cards) */}
      <section id="features" className="py-20 px-8 bg-gradient-to-br from-[#1a0033] to-[#2a0055] grid gap-8 md:grid-cols-3 text-center">
        {['Dictate Questions in Hindi, Bengali or English', 'Save as PDF instantly', 'Change fonts, bold, underline, add tables'].map((feature, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform">
            <h3 className="text-pink-400 font-semibold mb-2">Feature {i + 1}</h3>
            <p>{feature}</p>
          </div>
        ))}
      </section>

      {/* Stats */}
      <section className="bg-[#12003c] py-16 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((item, idx) => (
          <div key={idx}>
            <h2 className="text-3xl font-bold text-pink-500">{item.value}</h2>
            <p className="text-gray-300">{item.label}</p>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 text-center bg-[#190040]">
        <h2 className="text-3xl font-bold text-white mb-4">About Micropen</h2>
        <p className="max-w-2xl mx-auto text-gray-300">
          Micropen is a revolutionary tool crafted for teachers who want to create exam papers just by speaking. It turns your speech into properly formatted downloadable PDFs and allows text styling like bold, colors, underline, and tables — just like MS Word!
        </p>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-[#0f0028] py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-10">What Teachers Say</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            { name: "Anjali Ma'am", quote: "It's a blessing for non-tech teachers. I just speak the questions and it gets printed!" },
            { name: "Mr. Sharma", quote: "My entire monthly tests are now created with voice — no typing needed." },
          ].map((t, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-xl backdrop-blur-md">
              <p className="text-gray-300 italic">“{t.quote}”</p>
              <h4 className="text-pink-400 font-semibold mt-4">— {t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#08001f] text-gray-400 text-sm py-8 text-center">
        <p>© 2025 Micropen. Built with ❤️ for educators.</p>
        <div className="mt-2">
          <a href="#" className="hover:text-pink-400">Privacy Policy</a> · <a href="#" className="hover:text-pink-400">Terms</a>
        </div>
      </footer>
    </main>
  );
}
