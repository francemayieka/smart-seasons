import React from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function GlobalLoading() {
  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <LoadingSpinner size="lg" label="Loading SmartSeasons..." />
    </div>
  );
}
