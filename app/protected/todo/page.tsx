'use client';

import { useState } from 'react';
import TodoList from '@/components/to-do/TodoList';
import TodoDialog from '@/components/to-do/TodoDialog';
import type { Todo } from '@/types/todo';
import TodoDialogTrigger from '@/components/to-do/TodoDialogTrigger';

export default function TodoPage() {
  const [refresh, setRefresh] = useState(0);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 py-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📝 To-Do List</h1>
        <TodoDialogTrigger
          onClick={() => {
            setEditingTodo(null); // Reset to add mode
            setDialogOpen(true);
          }}
        />
      </div>

      <TodoList
        refresh={refresh}
        setEditingTodo={(todo) => {
          setEditingTodo(todo);
          setDialogOpen(true);
        }}
      />

      <TodoDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        todo={editingTodo}
        onSuccess={() => {
          setRefresh((r) => r + 1);
          setEditingTodo(null);
        }}
      />
    </div>
  );
}
