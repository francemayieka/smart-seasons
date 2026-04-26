"use client";

import React, { useRef } from "react";
import { prefetchDataAction } from "@/lib/prefetch";

interface SmartPrefetchProps {
  type: "dashboard" | "agents" | "fields";
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function SmartPrefetch({ type, children, delay = 150, className = "" }: SmartPrefetchProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const prefetchedRef = useRef(false);

  const handleMouseEnter = () => {
    if (prefetchedRef.current) return;

    timerRef.current = setTimeout(async () => {
      // Trigger prefetch on server
      await prefetchDataAction(type);
      prefetchedRef.current = true;
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={className}>
      {children}
    </div>
  );
}
