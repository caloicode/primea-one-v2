'use client';

import Image from 'next/image';
import { SquarePen } from 'lucide-react';
import type { Todo, User } from '@/types/todo';
import { createClient } from '@/lib/supabase/client';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';

export default function TodoDetails({
  todo,
  users,
  onDelete,
  onEdit,
}: {
  todo: Todo;
  users: User[];
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}) {
  const supabase = createClient();

  const handleDelete = async () => {
    const { error } = await supabase.from('todos').delete().eq('id', todo.id);
    if (!error) onDelete(todo.id);
    else console.error('Delete failed:', error.message);
  };

  return (
    <div className="space-y-2 px-1">
      <div className="flex justify-end gap-2 mb-1">
        <button
          onClick={() => onEdit(todo)}
          className="text-sm text-muted-foreground hover:text-primary"
        >
          <SquarePen className="w-4 h-4" />
        </button>
        <ConfirmDeleteDialog onConfirm={handleDelete} />
      </div>

      {todo.notes && (
        <p className="text-sm">
          <span className="text-muted-foreground">Notes:</span>{' '}
          <span>{todo.notes}</span>
        </p>
      )}

      {(todo.start_date || todo.end_date) && (
        <p className="text-sm text-muted-foreground">
          Timeframe:{' '}
          <span className="text-foreground">
            {todo.start_date} — {todo.end_date}
          </span>
        </p>
      )}

      {todo.assigned_users?.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {todo.assigned_users.map((id) => {
            const user = users.find((u) => u.id === id);
            return user ? (
              <div
                key={id}
                className="flex items-center gap-1 text-xs bg-secondary rounded-full px-2 py-1"
              >
                {user.avatar_url && (
                  <Image
                    src={user.avatar_url}
                    alt={user.full_name}
                    width={18}
                    height={18}
                    className="rounded-full"
                  />
                )}
                <span>{user.full_name}</span>
              </div>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
}
