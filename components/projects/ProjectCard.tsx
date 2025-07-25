'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Folder } from "lucide-react";
import { useRouter } from "next/navigation";
import { Project } from "@/types/project";

export default function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();
  const percent = Math.round((project.pct ?? 0) * 100);

  const openDrive = (e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ Prevent bubble
    window.open(project.drive_link, "_blank");
  };

  const openProject = () => {
    router.push(`/protected/projects/${project.project_code}`);
  };

  return (
    <div
      onClick={openProject}
      className="block cursor-pointer"
    >
      <Card className="w-full p-3 sm:p-4 hover:shadow-md transition">
        <CardContent className="flex flex-col gap-2 p-0">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">
                {project.project_code}
              </p>
              <p className="text-base font-semibold">{project.project_name}</p>
            </div>
            <button onClick={openDrive}>
              <Folder className="w-5 h-5 text-muted-foreground hover:text-primary" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-primary transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground w-10 text-right">
              {percent}%
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
