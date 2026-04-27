import React from "react";
import { MenuIcon, CloseIcon } from "@/components/ui/icons";

interface MobileMenuToggleProps {
  isOpen: boolean;
  onClick: () => void;
  variant?: "emerald" | "glass";
  className?: string;
}

export function MobileMenuToggle({ 
  isOpen, 
  onClick, 
  variant = "emerald", 
  className = "" 
}: MobileMenuToggleProps) {
  const themes = {
    emerald: "border-emerald-700 bg-emerald-800 text-emerald-400 shadow-lg hover:bg-emerald-700",
    glass: "border-white/20 bg-white/10 text-white hover:bg-white/20 shadow-xl"
  };

  return (
    <button 
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition-all ${themes[variant]} ${className}`}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
    </button>
  );
}
