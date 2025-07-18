"use client";

import { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowDownUp, FileInput } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Template = {
  id: string;
  name: string;
  link: string;
  created_at?: string;
};

export default function TemplateList({ refresh }: { refresh: number }) {
  const supabase = createClient();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [query, setQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from("templates")
        .select("id, name, link")
        .order("created_at", { ascending: false });

      if (!error && data) setTemplates(data);
    };

    fetchTemplates();
  }, [refresh]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return templates
      .filter((template) => template.name.toLowerCase().includes(q))
      .sort((a, b) => {
        const valA = a.name.toLowerCase();
        const valB = b.name.toLowerCase();
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
  }, [query, templates, sortAsc]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search template..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSortAsc((prev) => !prev)}
          title={`Sort by name (${sortAsc ? "A → Z" : "Z → A"})`}
        >
          {sortAsc ? (
            <ArrowUpDown className="w-4 h-4" />
          ) : (
            <ArrowDownUp className="w-4 h-4" />
          )}
        </Button>
      </div>

      <div className="grid gap-4">
        {filtered.map((template) => (
          <div
            key={template.id}
            className="flex justify-between items-center border rounded-lg p-4 hover:shadow transition"
          >
            <p className="text-sm font-medium">{template.name}</p>
            <a
              href={template.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <FileInput className="w-5 h-5" />
            </a>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-muted-foreground text-sm italic text-center">
            No templates found.
          </p>
        )}
      </div>
    </div>
  );
}
