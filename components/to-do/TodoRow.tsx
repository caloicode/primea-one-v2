"use client";

import { useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import type { Todo } from "@/types/todo";

export default function TodoRow({
  todo,
  updateLocal,
}: {
  todo: Todo;
  updateLocal: (updated: Partial<Todo> & { id: string }) => void;
}) {
  const supabase = createClient();
  const [isPending, startTransition] = useTransition();

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const is_checked = e.target.checked;
    startTransition(async () => {
      const { error } = await supabase
        .from("todos")
        .update({ is_checked })
        .eq("id", todo.id);

      if (!error) {
        updateLocal({ id: todo.id, is_checked });
      }
    });
  };

  const getPriorityColor = () => {
    switch (todo.priority) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-400";
      default:
        return "bg-green-500";
    }
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.is_checked}
          onChange={handleCheck}
          className="w-4 h-4 accent-primary"
        />
        <span
          className={`text-sm line-clamp-1 ${
            todo.is_checked ? "line-through text-muted-foreground" : ""
          }`}
        >
          {todo.task}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${getPriorityColor()}`} />
        <CollapsibleTrigger asChild>
          <Button size="icon" variant="ghost" className="w-6 h-6">
            <ChevronDown className="w-4 h-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
    </div>
  );
}
