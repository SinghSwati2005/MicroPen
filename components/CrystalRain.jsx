"use client";
import React, { useEffect, useRef } from "react";

const CrystalRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const crystals = [];

    for (let i = 0; i < 100; i++) {
      crystals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 2,
        speed: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.5
      });
    }

    function drawCrystal(crystal) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(173,216,230,${crystal.opacity})`; // light blue
      ctx.arc(crystal.x, crystal.y, crystal.size, 0, Math.PI * 2);
      ctx.fill();
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      crystals.forEach(c => {
        c.y += c.speed;
        if (c.y > height) c.y = 0;
        drawCrystal(c);
      });
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 z-0 w-full h-full pointer-events-none"
    />
  );
};

export default CrystalRain;
