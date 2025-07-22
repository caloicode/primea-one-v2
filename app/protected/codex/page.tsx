"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Target,
  Pyramid,
  Cuboid,
  Shapes,
  MonitorCog,
  BookUser,
  Hexagon,
  SquareLibrary,
  ChartLine,
  ArrowLeftToLine
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Section {
  title: string;
  icon: React.ReactNode;
  items: React.ReactNode[];
}

export default function CodexPage() {
  const sections: Section[] = [
    {
      title: "INTRODUCTION",
      icon: <BookOpen className="w-5 h-5 text-primary" />,
      items: [
        "What is this handbook for?",
        "Who should read this?",
        "How to use it",
      ],
    },
    {
      title: "VISION, MISSION & CORE VALUES",
      icon: <Target className="w-5 h-5 text-primary" />,
      items: [
        "Vision",
        "Mission",
        <Link key="core-values" href="/protected/codex/core-values" className="underline text-primary">
          Core Values
        </Link>,
      ],
    },
    {
      title: "ORGANIZATIONAL STRUCTURE",
      icon: <Pyramid className="w-5 h-5 text-primary" />,
      items: [
        "Org Chart / Listing of Teams and Roles",
        "Responsibilities",
        "Culture of Collaboration",
      ],
    },
    {
      title: "DESIGN PHILOSOPHY",
      icon: <Cuboid className="w-5 h-5 text-primary" />,
      items: [
        "Architectural design principles we should follow",
        "Interior Design Ethos (e.g., modularity, craftsmanship, elegance)",
        "What makes a “Primea” project?",
      ],
    },
    {
      title: "OPERATIONAL STANDARD",
      icon: <Shapes className="w-5 h-5 text-primary" />,
      items: [
        <Link key="file-naming" href="/protected/codex/file-naming" className="underline text-primary">
          File Naming Conventions
        </Link>,
        "Drawing Standards and Templates",
        "Forms Standard",
        "Project Timeline & Reporting Protocols",
      ],
    },
    {
      title: "WORKFLOW PROCESS",
      icon: <MonitorCog className="w-5 h-5 text-primary" />,
      items: [
          "Project Phases (See SPP Docs)",
        "Daily/Weekly Documentation Standard",
        "Internal Reviews & Feedback Loops",
      ],
    },
    {
      title: "COMMUNICATION STANDARDS",
      icon: <BookUser className="w-5 h-5 text-primary" />,
      items: ["Internal Communication Etiquette", "Client Communication"],
    },
    {
      title: "BRAND IDENTITY GUIDELINES",
      icon: <Hexagon className="w-5 h-5 text-primary" />,
      items: ["Brand Identity Guidelines"],
    },
    {
      title: "TEMPLATES INDEX & CONTINUOUS IMPROVEMENT",
      icon: (
        <div className="flex space-x-1 items-center">
          <SquareLibrary className="w-5 h-5 text-primary" />
          <ChartLine className="w-5 h-5 text-primary" />
        </div>
      ),
      items: [
        "Templates Index",
        "Continuous Improvement (Regular review of the handbook, experimentation and testing)",
      ],
    },
  ];

  return (
    <main className="max-w-4xl mx-auto p-6 mt-16 space-y-6">
       <div className="flex items-center space-x-3">
          <Link
            href="/protected"
            className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
          >
            <ArrowLeftToLine className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold">The Primea Codex</h1>
        </div>
      <p className="text-muted-foreground text-sm leading-relaxed">
        The Primea Codex is our organization manual— a curated collection of who we are,
        how we work, and what we believe in as a design practice. It is more than just
        a set of rules or templates; it’s a reflection of Primea’s core — our shared
        standards, our design philosophy, and our commitment to consistency and growth.
        <br />
        <br />
        Inside the Codex, you’ll find our vision, mission, core values, our protocols,
        our project workflows, and a growing set of templates and tools that guide us
        from concept to completion. Whether you're a new team member onboarding, an
        architect refining your documentation, or an interior designer referencing past
        specs — the Codex serves as our common reference point.
        <br />
        <br />
        As we evolve, so will the Codex. Everyone is encouraged to contribute to it —
        to sharpen, to update, to improve — as part of our continuous pursuit of
        excellence in both architecture, interior design and collaboration.
      </p>

      {sections.map((section, idx) => (
        <Card key={idx}>
          <CardHeader className="flex flex-row items-center space-x-3">
            {section.icon}
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1">
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </main>
  );
}
