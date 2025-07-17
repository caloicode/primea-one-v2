"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import TodoRow from "./TodoRow";
import TodoDetails from "./TodoDetails";
import type { Todo, User } from "@/types/todo";

export default function TodoList({
  refresh,
  setEditingTodo,
  projectCode,
}: {
  refresh: number;
  setEditingTodo: (todo: Todo) => void;
  projectCode: string;
}) {
  const supabase = createClient();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("project_code", projectCode)
        .order("created_at", { ascending: false });

      if (!error && data) setTodos(data as Todo[]);
    };

    const fetchUsers = async () => {
      const { data, error } = await supabase.rpc("get_all_users");
      if (!error && data) setUsers(data as User[]);
    };

    fetchTodos();
    fetchUsers();
  }, [refresh, projectCode]);

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <Collapsible
          key={todo.id}
          className={`border rounded-md px-3 py-2 shadow-sm transition-colors
      ${
        todo.is_checked
          ? "bg-green-100 dark:bg-green-900/20"
          : "bg-white dark:bg-muted"
      }
    `}
        >
          <TodoRow
            todo={todo}
            updateLocal={(updated) => {
              setTodos((prev) =>
                prev.map((t) =>
                  t.id === updated.id ? { ...t, ...updated } : t
                )
              );
            }}
          />
          <CollapsibleContent className="mt-2">
            <TodoDetails
              todo={todo}
              users={users}
              onDelete={(id) =>
                setTodos((prev) => prev.filter((t) => t.id !== id))
              }
              onEdit={(t) => setEditingTodo(t)}
            />
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
