// components/projects/ProjectTodos.tsx
"use client";

import { useState } from "react";
import TodoList from "../to-do/TodoList";
import TodoDialog from "../to-do/TodoDialog";
import { Todo } from "@/types/todo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ProjectTodos({ projectCode }: { projectCode: string }) {
  const [refresh, setRefresh] = useState(0);
  const [open, setOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  return (
    <div className="mt-10 space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">📋 To-Do List</h4>
        <Button
          onClick={() => {
            setEditingTodo(null);
            setOpen(true);
          }}
          size="sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
      </div>

      <TodoList
        refresh={refresh}
        setEditingTodo={(todo) => {
          setEditingTodo(todo);
          setOpen(true);
        }}
        projectCode={projectCode}
      />

      <TodoDialog
        open={open}
        setOpen={setOpen}
        todo={editingTodo}
        onSuccess={() => setRefresh((prev) => prev + 1)}
        projectCode={projectCode} // 👈 here
      />
    </div>
  );
}
