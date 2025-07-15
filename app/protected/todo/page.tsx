'use client';

import { useState } from 'react';
import TodoForm from '@/components/to-do/TodoForm';
import TodoList from '@/components/to-do/TodoList';
import type { Todo } from '@/types/todo';

export default function TodoPage() {
  const [refresh, setRefresh] = useState(0);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 py-10">
      <h1 className="text-2xl font-bold">
        {editingTodo ? '✏️ Edit To-Do' : '➕ Add a To-Do'}
      </h1>
      <TodoForm
        todo={editingTodo}
        onSuccess={() => {
          setRefresh((r) => r + 1);
          setEditingTodo(null);
        }}
      />
      <TodoList refresh={refresh} setEditingTodo={setEditingTodo} />
    </div>
  );
}
