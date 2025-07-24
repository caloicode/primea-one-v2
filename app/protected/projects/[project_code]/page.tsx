import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { FolderClosed, ArrowLeftToLine } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { EditProjectDialog } from "@/components/projects/EditProjectDialog";
import { DeleteProjectButton } from "@/components/projects/DeleteProjectButton";
import ProjectTodos from "@/components/projects/ProjectTodos";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

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

  const pct = Number(
    (project.pct <= 1 ? project.pct * 100 : project.pct).toFixed(2)
  );

  // 🧠 Fetch all users to match assigned_to uuids
  let assignedUsers = [];
  if (project.assigned_to?.length > 0) {
    const { data: usersData, error: usersError } = await supabase.rpc("get_all_users");
    if (!usersError && usersData) {
      assignedUsers = usersData.filter((user: any) =>
        project.assigned_to.includes(user.id)
      );
    }
  }

  return (
    <main className="px-4 pt-20 pb-10">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Top Row */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-muted-foreground">
              {project.project_code}
            </p>

            <div className="flex items-center space-x-3">
              <Link
                href="/protected/projects"
                className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
              >
                <ArrowLeftToLine className="w-5 h-5" />
              </Link>
              <h3 className="text-2xl font-semibold">{project.project_name}</h3>
            </div>
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
            <DeleteProjectButton projectCode={project.project_code} />
          </div>
        </div>

        {/* Details */}
        <div className="text-sm text-muted-foreground space-y-1">
          <div className="space-y-1">
            <p className="mb-1">
              <strong>Progress:</strong>
            </p>
            <div className="flex items-center gap-2">
              <Progress value={pct} className="flex-1" />
              <span className="text-sm text-muted-foreground">
                {pct.toFixed(0)}%
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

          {/* 👥 Assigned Users */}
          {assignedUsers.length > 0 && (
            <div className="pt-2">
              <strong>Assigned To:</strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {assignedUsers.map((user: any) => (
                  <Badge
                    key={user.id}
                    className="flex items-center gap-2 px-2 py-1 rounded-full"
                  >
                    {user.avatar_url && (
                      <Image
                        src={user.avatar_url}
                        alt={user.full_name || ""}
                        width={16}
                        height={16}
                        className="rounded-full"
                      />
                    )}
                    <span>{user.full_name || "Unknown"}</span>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <ProjectTodos projectCode={project.project_code} />
      </div>
    </main>
  );
}
