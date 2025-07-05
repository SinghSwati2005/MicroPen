"use client";

import React, { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaChartLine, FaFileAlt, FaPlus, FaRegCalendarAlt } from "react-icons/fa";
import CreateNewProject from "@/components/CreateNewProject";

const data = [
  { name: "Week 1", uv: 4000 },
  { name: "Week 2", uv: 3000 },
  { name: "Week 3", uv: 5000 },
  { name: "Week 4", uv: 2000 },
];

const DashboardPage = () => {
  const [pdfCount, setPdfCount] = useState(0); // ✅ move inside function

  useEffect(() => {
    fetch("/pdfs/index.json")
      .then(res => res.json())
      .then(data => setPdfCount(data.length || 0))
      .catch(err => console.error("Failed to fetch PDF count:", err));
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0f021c] to-[#1f0c3a] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 backdrop-blur-md shadow-xl p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-pink-500 mb-8">Micropen</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/dashboard" className="hover:text-pink-400 flex items-center gap-2">
            <FaChartLine /> Dashboard
          </Link>
          <Link href="/dashboard/my-works" className="hover:text-pink-400 flex items-center gap-2">
            <FaFileAlt /> My Works
          </Link>
          <Link href="/dashboard/create" className="hover:text-pink-400 flex items-center gap-2">
            <FaPlus /> Create New
          </Link>
          <Link href="/dashboard/calendar" className="hover:text-pink-400 flex items-center gap-2">
            <FaRegCalendarAlt /> Calendar
          </Link>
        </nav>
        <div className="mt-auto">
          <UserButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <CreateNewProject />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { title: "PDFs Created", value: pdfCount },
            { title: "Languages Used", value: "3" },
            { title: "Active Users", value: "489" },
            { title: "Downloads", value: "3.1K" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 p-6 rounded-xl shadow-lg backdrop-blur-md"
            >
              <h3 className="text-lg text-pink-400 font-semibold mb-2">{item.title}</h3>
              <p className="text-2xl font-bold">{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 p-6 rounded-xl shadow-lg backdrop-blur-md">
            <h3 className="text-lg font-semibold mb-4">Monthly Activity</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip contentStyle={{ backgroundColor: "#111" }} />
                <Bar dataKey="uv" fill="#f472b6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/5 p-6 rounded-xl shadow-lg backdrop-blur-md">
            <h3 className="text-lg font-semibold mb-4">Client Stats</h3>
            <ul className="space-y-3">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Chrome Users</span>
                <span>70%</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Mobile Users</span>
                <span>25%</span>
              </li>
              <li className="flex justify-between">
                <span>Tablet Users</span>
                <span>5%</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
