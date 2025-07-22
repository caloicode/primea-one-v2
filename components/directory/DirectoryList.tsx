"use client";

import { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  ArrowDownUp,
  Contact,
  SquarePen,
  Plus,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DirectoryForm from "@/components/directory/DirectoryForm";

type Entry = {
  id: string;
  company_name: string;
  image_link: string;
  tags: string[];
};

export default function DirectoryList({ refresh }: { refresh: number }) {
  const supabase = createClient();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [query, setQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editEntry, setEditEntry] = useState<Entry | null>(null);

  const fetchDirectory = async () => {
    const { data, error } = await supabase
      .from("directory")
      .select("id, company_name, image_link, tags")
      .order("created_at", { ascending: false });

    if (!error && data) setEntries(data);
  };

  useEffect(() => {
    fetchDirectory();
  }, [refresh]);

  const handleDelete = async (id: string) => {
    await supabase.from("directory").delete().eq("id", id);
    fetchDirectory();
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return entries
      .filter((entry) =>
        [entry.company_name, entry.tags.join(", ")].some((field) =>
          field.toLowerCase().includes(q)
        )
      )
      .sort((a, b) => {
        const valA = a.company_name.toLowerCase();
        const valB = b.company_name.toLowerCase();
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
  }, [query, entries, sortAsc]);

  return (
    <div className="space-y-6 relative">
      {/* Search + Sort */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search company or tag..."
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

      {/* List */}
      <div className="grid gap-4">
        {filtered.map((entry) => (
          <div
            key={entry.id}
            className="flex justify-between items-center border rounded-lg p-4 hover:shadow transition"
          >
            <div>
              <p className="text-sm font-medium">{entry.company_name}</p>
              <p className="text-xs text-muted-foreground">
                {entry.tags.join(", ")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={entry.image_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Contact className="w-5 h-5 text-[#0F9D58] hover:text-[#0c7c45] transition-colors" />
              </a>
              <button
                onClick={() => {
                  setEditEntry(entry);
                  setDialogOpen(true);
                }}
              >
                <SquarePen className="w-4 h-4 text-muted-foreground hover:text-primary" />
              </button>
              <ConfirmDeleteDialog onConfirm={() => handleDelete(entry.id)} />
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-muted-foreground text-sm italic text-center">
            No matching entries found.
          </p>
        )}
      </div>

      {/* FAB */}
      <Button
        className="fixed bottom-6 right-6 rounded-full w-12 h-12 p-0"
        onClick={() => {
          setEditEntry(null);
          setDialogOpen(true);
        }}
      >
        <Plus className="w-5 h-5" />
      </Button>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editEntry ? "Edit Entry" : "Add New Entry"}
            </DialogTitle>
          </DialogHeader>

          <DirectoryForm
            entryId={editEntry?.id}
            initialData={
              editEntry
                ? {
                    company_name: editEntry.company_name,
                    image_link: editEntry.image_link,
                    tags: editEntry.tags.join(", "),
                  }
                : undefined
            }
            onCancel={() => setDialogOpen(false)}
            onSuccess={() => {
              fetchDirectory();
              setDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
