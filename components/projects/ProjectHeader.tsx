// components/projects/ProjectHeader.tsx
import { Folder } from "lucide-react";

interface ProjectHeaderProps {
  code: string;
  name: string;
  driveLink: string;
}

export default function ProjectHeader({
  code,
  name,
  driveLink,
}: ProjectHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-sm text-muted-foreground">{code}</h2>
        <h1 className="text-2xl font-bold">{name}</h1>
      </div>
      <a
        href={driveLink}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary transition"
        title="Open Drive"
      >
        <Folder className="w-6 h-6" />
      </a>
    </div>
  );
}
