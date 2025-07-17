"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProjectForm from "@/components/projects/ProjectForm";
import ProjectList from "@/components/projects/ProjectList";
import { createClient } from "@/lib/supabase/client";

export default function ProjectsPage() {
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const preload = async () => {
      const { error } = await supabase.from("projects").select("id").limit(1);
      if (error) console.error("Failed to preload projects:", error);
      setLoading(false);
    };

    preload();
  }, []);

  return (
    <main className="px-4 pt-20 pb-10">
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <h1 className="text-xl font-semibold text-muted-foreground">
          PROJECTS
        </h1>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : (
          <ProjectList refresh={refresh} />
        )}
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 rounded-full w-12 h-12 p-0 shadow-md z-50"
      >
        <Plus className="w-5 h-5" />
      </Button>

      {/* Shadcn Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader className="text-left">
            <DialogTitle>Add a New Project</DialogTitle>
          </DialogHeader>

          <ProjectForm
            onClose={() => {
              setShowForm(false);
              setRefresh((r) => r + 1);
            }}
          />
        </DialogContent>
      </Dialog>
    </main>
  );
}
