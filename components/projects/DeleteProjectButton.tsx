"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import { toast } from "sonner";

export function DeleteProjectButton({ projectCode }: { projectCode: string }) {
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("project_code", projectCode);

    if (error) {
      toast.error("Failed to delete project.");
    } else {
      toast.success("Project deleted.");
      router.push("/protected/projects");
    }
  };

  return <ConfirmDeleteDialog onConfirm={handleDelete} />;
}
