'use client';

import { useState } from 'react';
import TodoForm from '@/components/to-do/TodoForm';
import TodoList from '@/components/to-do/TodoList';

export default function TodoPage() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 py-10">
      <h1 className="text-2xl font-bold">➕ Add a To-Do</h1>

      <TodoForm onSuccess={() => setRefresh((r) => r + 1)} />

      <div className="pt-6 border-t">
        <h2 className="text-xl font-semibold mb-2">📋 Your To-Do List</h2>
        <TodoList key={refresh} />
      </div>
    </div>
  );
}
