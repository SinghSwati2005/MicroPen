"use client";

import React from "react";
import { cn } from "@/lib/utils"

export const SparklesCore = ({
  className,
  background = "#000",
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 120,
}) => {
  return (
    <canvas
      className={cn(
        "absolute inset-0 z-0 h-full w-full animate-fade-in",
        className
      )}
      id="sparkles"
      style={{
        background,
      }}
      data-min-size={minSize}
      data-max-size={maxSize}
      data-density={particleDensity}
    />
  );
};
