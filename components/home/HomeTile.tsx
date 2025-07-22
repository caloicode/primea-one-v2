"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  House,
  Album,
  BookOpen,
  FolderCog,
  CalendarDays,
  Waypoints,
  Layers,
  Library,
  Contact,
  HelpCircle,
  Armchair,
  ImagePlay,
  NotepadText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  House,
  Album,
  BookOpen,
  FolderCog,
  CalendarDays,
  Waypoints,
  Layers,
  Library,
  Contact,
  Armchair,
  ImagePlay,
  NotepadText,
};

export default function HomeTile({
  path,
  icon,
  name,
}: {
  path: string;
  icon: string;
  name: string;
}) {
  const Icon = iconMap[icon] || HelpCircle;

  return (
    <Link
      href={path}
      target={path.startsWith("http") ? "_blank" : undefined}
      rel={path.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl",
        "border border-white/30 dark:border-white/20",
        "backdrop-blur-sm",
        "bg-white/30 dark:bg-white/10",
        "hover:shadow-lg transition hover:scale-105",
        "text-black dark:text-white",
        "aspect-square w-full"
      )}
    >
      <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
      <span className="text-xs sm:text-sm font-medium text-center">{name}</span>
    </Link>
  );
}
