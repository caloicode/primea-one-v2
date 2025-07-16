// components/projects/ProjectDetailsCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProjectDetailsCardProps {
  title: string
  location: string
  client: string
}

export default function ProjectDetailsCard({ title, location, client }: ProjectDetailsCardProps) {
  return (
    <Card className="gap-3">
      <CardHeader className="pb-1">
        <CardTitle className="text-sm">Project Details</CardTitle>
      </CardHeader>
      <CardContent className="text-sm mt-0 space-y-1">
        <p>
          <span className="font-medium">Title:</span> {title}
        </p>
        <p>
          <span className="font-medium">Location:</span> {location}
        </p>
        <p>
          <span className="font-medium">Client:</span> {client}
        </p>
      </CardContent>
    </Card>
  )
}
