"use client";

import { useState } from "react";
import { ChecklistItem } from "@/types/checklist";
import { CircleCheck, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ChecklistGroupProps {
  group: string;
  items: ChecklistItem[];
}

export default function ChecklistGroup({ group, items }: ChecklistGroupProps) {
  const [open, setOpen] = useState(true);

  const completed = items.filter(
    (item) => (item.status ?? "").toLowerCase() === "completed"
  ).length;

  const percent = Math.round((completed / items.length) * 100);

  return (
    <Card>
      <CardHeader
        onClick={() => setOpen(!open)}
        className="flex flex-row items-center justify-between cursor-pointer"
      >
        <CardTitle className="text-base font-medium">{group}</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{percent}%</span>
          <Progress value={percent} className="w-24 h-2" />
        </div>
      </CardHeader>

      {open && (
        <CardContent className="space-y-3">
          {items.map((item) => {
            const status = item.status?.toLowerCase() ?? "pending";

            return (
              <div
                key={item.id}
                className="text-sm flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{item.todo}</p>
                  {item.notes && (
                    <p className="text-xs text-muted-foreground">{item.notes}</p>
                  )}
                  {item.assigned_to && (
                    <p className="text-xs text-muted-foreground italic">
                      Assigned to: {item.assigned_to}
                    </p>
                  )}
                </div>

                {status === "completed" ? (
                  <CircleCheck className="text-green-600 w-4 h-4" />
                ) : (
                  <Circle className="text-muted-foreground w-4 h-4" />
                )}
              </div>
            );
          })}
        </CardContent>
      )}
    </Card>
  );
}
