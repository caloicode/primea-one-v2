"use client";

import { Cog } from "lucide-react";

export default function ProcessesPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="flex flex-col items-center gap-4 text-muted-foreground">
        <Cog className="w-12 h-12 animate-spin-slow" />
        <h1 className="text-xl font-semibold">
          This page is currently under development
        </h1>
        <p className="text-sm">
          We're working on something great. Please check back soon!
        </p>
      </div>
    </main>
  );
}
