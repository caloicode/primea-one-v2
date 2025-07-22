"use client";

import { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowDownUp } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";

export default function ProjectList({ refresh }: { refresh: number }) {
  const supabase = createClient();
  const [projects, setProjects] = useState<Project[]>([]);
  const [query, setQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) setProjects(data as Project[]);
    };

    fetchProjects();
  }, [refresh]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return projects
      .filter(
        (project) =>
          project.project_code.toLowerCase().includes(q) ||
          project.project_name.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        const valA = a.project_code.toLowerCase();
        const valB = b.project_code.toLowerCase();
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
  }, [query, projects, sortAsc]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Search project..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSortAsc((prev) => !prev)}
          title={`Sort by project_code (${sortAsc ? "A → Z" : "Z → A"})`}
        >
          {sortAsc ? (
            <ArrowUpDown className="w-4 h-4" />
          ) : (
            <ArrowDownUp className="w-4 h-4" />
          )}
        </Button>
      </div>

      <div className="grid gap-4">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center">
            No matching projects found.
          </p>
        )}
      </div>
    </div>
  );
}
