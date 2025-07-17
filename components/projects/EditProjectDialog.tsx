"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SquarePen } from "lucide-react";
import ProjectForm from "./ProjectForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  project: any; // ideally, type this properly
};

export function EditProjectDialog({ project }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          title="Edit project"
          className="text-muted-foreground hover:text-primary"
        >
          <SquarePen className="w-5 h-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-left">
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>

        <ProjectForm
          mode="edit"
          defaultValues={project}
          onClose={() => setOpen(false)} // 👈 Add this
          onSuccess={() => router.refresh()} // 👈 Optional: force refresh after close
        />
      </DialogContent>
    </Dialog>
  );
}
