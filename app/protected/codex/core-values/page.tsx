"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function CoreValuesPage() {
  const values = [
    {
      title: "Discipline",
      quote: "“True discipline begins with respect — for time, for work, for one another.”",
      description: `Discipline at Primea is not about rigidity or control. It is about mutual respect — for the process, for the people we work with, and for the standards we uphold. It means showing up with integrity, being present, and honoring the shared space we create together. It’s the quiet force behind our consistency, our communication, and our capacity to grow as individuals and as a team.`,
    },
    {
      title: "Dedication",
      quote: "“We give our best — not because we have to, but because we care.”",
      description: `Dedication is expressed in our commitment to every project, every collaboration, and every detail. It’s the willingness to go further — to refine, to rethink, to rise above shortcuts. At Primea, we are dedicated not only to what we build, but to how we build it — with openness, enthusiasm, and heart.`,
    },
    {
      title: "Definition",
      quote: "“In growing together, we begin to define who we are — and what Primea stands for.”",
      description: `Definition is a value we are still shaping — a horizon we move toward together. It represents our evolving identity as an individual and as a design firm: how we think, how we express, how we are remembered. Through shared experiences, diverse voices, and an openness to learning, we work toward a deeper understanding of who we are — as designers, as collaborators, and as a community.`,
    },
  ];

  return (
    <main className="max-w-3xl mx-auto mt-16 px-6 pb-20">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Core Values</h1>
      <p className="text-muted-foreground mb-10">
        At Primea, we are guided by three core values (3Ds) that define not only the
        quality of our work, but the kind of environment we cultivate together — rooted
        in respect, commitment, and the pursuit of identity.
      </p>

      <div className="space-y-6">
        {values.map((value, idx) => (
          <Card key={idx}>
            <CardHeader className="flex flex-row items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary" />
              <CardTitle>{value.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="italic text-muted-foreground mb-4">
                {value.quote}
              </blockquote>
              <p className="leading-relaxed">{value.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
