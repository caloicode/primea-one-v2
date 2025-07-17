import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { FolderClosed, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { EditProjectDialog } from "@/components/projects/EditProjectDialog";
import { DeleteProjectButton } from "@/components/projects/DeleteProjectButton";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ project_code: string }>;
}) {
  const { project_code } = await params;

  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("project_code", project_code)
    .single();

  if (error || !project) return notFound();

  return (
    <main className="px-4 pt-20 pb-10">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Top Row: Icons */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-muted-foreground">
              {project.project_code}
            </p>
            <h3 className="text-2xl font-semibold">{project.project_name}</h3>
          </div>

          <div className="flex gap-3 items-center">
            {project.drive_link && (
              <a
                href={project.drive_link}
                target="_blank"
                rel="noopener noreferrer"
                title="Open Drive Folder"
                className="text-muted-foreground hover:text-primary"
              >
                <FolderClosed className="w-5 h-5" />
              </a>
            )}
            <EditProjectDialog project={project} />
            <div className="flex gap-3 items-center">
              {project.drive_link && (
                <a
                  href={project.drive_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open Drive Folder"
                  className="text-muted-foreground hover:text-primary"
                >
                  <FolderClosed className="w-5 h-5" />
                </a>
              )}
              <DeleteProjectButton projectCode={project.project_code} />
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="text-sm text-muted-foreground space-y-1">
          {/* Progress Bar */}
          <div className="space-y-1">
            <p className="mb-1">
              <strong>Progress:</strong>
            </p>
            <div className="flex items-center gap-2">
              <Progress value={project.pct} className="flex-1" />
              <span className="text-sm text-muted-foreground">
                {project.pct}%
              </span>
            </div>
          </div>

          <p>
            <strong>Title:</strong> {project.project_title}
          </p>

          <p>
            <strong>Location:</strong> {project.location}
          </p>
          <p>
            <strong>Client:</strong> {project.client}
          </p>
          <p>
            <strong>Status:</strong> {project.status}
          </p>

          <p>
            <strong>Notes:</strong> {project.notes}
          </p>
        </div>
      </div>
    </main>
  );
}
