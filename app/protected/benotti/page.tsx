"use client";

import { Cog } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BenottiPage() {
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
        <Button
          asChild
          className="mt-4 bg-[#0F9D58] hover:bg-[#0c7c45] text-white"
        >
          <a
            href="https://docs.google.com/spreadsheets/d/1DZDzHRho7QFNEQvyqHzoei3_2A6iElJ-xbr-j07v9uY/edit?gid=1168921751#gid=1168921751"
            target="_blank"
            rel="noopener noreferrer"
          >
            See Benotti Database
          </a>
        </Button>
      </div>
    </main>
  );
}
