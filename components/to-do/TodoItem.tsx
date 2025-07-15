'use client';

import { useState } from 'react';
import { Todo } from '@/types/todo';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2 } from 'lucide-react';

type Props = {
  todo: Todo;
};

export default function TodoItem({ todo }: Props) {
  const [expanded, setExpanded] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500';
      case 'Medium':
        return 'bg-yellow-400';
      case 'Low':
        return 'bg-green-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="border rounded-lg p-3 bg-muted">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <Checkbox checked={todo.is_checked} className="shrink-0" />
          <span className="font-medium">{todo.task}</span>
        </div>
        <span
          className={`w-3 h-3 rounded-full ${getPriorityColor(todo.priority)}`}
        />
      </div>

      {expanded && (
        <div className="mt-3 space-y-2 text-sm text-muted-foreground">
          {todo.notes && <p><strong>Notes:</strong> {todo.notes}</p>}
          {(todo.start_date || todo.end_date) && (
            <p>
              <strong>Timeframe:</strong>{' '}
              {todo.start_date ? new Date(todo.start_date).toLocaleDateString() : ''} —{' '}
              {todo.end_date ? new Date(todo.end_date).toLocaleDateString() : ''}
            </p>
          )}
          {todo.assigned_users?.length > 0 && (
            <p><strong>Assigned to:</strong> {todo.assigned_users.length} user(s)</p>
          )}
          <div className="flex justify-end gap-2">
            <Badge variant="outline" className="cursor-pointer"><Pencil className="w-4 h-4" /></Badge>
            <Badge variant="destructive" className="cursor-pointer"><Trash2 className="w-4 h-4" /></Badge>
          </div>
        </div>
      )}
    </div>
  );
}
