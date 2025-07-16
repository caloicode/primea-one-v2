// components/to-do/TodoDialogTrigger.tsx
"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TodoDialogTrigger({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <Button onClick={onClick} className="flex items-center gap-2">
      <Plus className="w-4 h-4" /> Add To-Do
    </Button>
  );
}
