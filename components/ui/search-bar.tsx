"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { SearchIcon, CloseIcon } from "./icons";

export function SearchBar({ placeholder = "Search..." }: { placeholder?: string }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState(searchParams.get("q") || "");

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  // Clear search on status change if needed, or keep it. 
  // Let's keep it persistent across status tabs.

  return (
    <div className="relative flex-1 max-w-md w-full">
      <div className="relative group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder={placeholder}
          className={`w-full rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm pl-11 pr-11 py-3 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 shadow-sm ${
            isPending ? "opacity-70" : ""
          }`}
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
          <SearchIcon className="h-4.5 w-4.5" />
        </div>
        {inputValue && (
          <button
            onClick={() => {
              setInputValue("");
              handleSearch("");
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        )}
      </div>
      {isPending && (
        <div className="absolute -bottom-1 left-4 right-4 h-0.5 bg-emerald-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 animate-progress" />
        </div>
      )}
    </div>
  );
}
