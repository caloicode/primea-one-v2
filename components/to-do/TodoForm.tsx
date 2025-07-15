'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Save } from 'lucide-react';
import DateRangeSelector from './DateRangeSelector';
import GroupSelector from './GroupSelector';
import PrioritySelect from './PrioritySelect';
import { DateRange } from 'react-day-picker';
import type { Todo } from '@/types/todo';

export default function TodoForm({
  onSuccess,
  todo,
}: {
  onSuccess?: () => void;
  todo?: Todo | null;
}) {
  const supabase = createClient();

  const [task, setTask] = useState('');
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [assignedUsers, setAssignedUsers] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);

  // 🟡 Populate form when editing
  useEffect(() => {
    if (todo) {
      setTask(todo.task);
      setNotes(todo.notes ?? '');
      setPriority(todo.priority as 'Low' | 'Medium' | 'High');
      setAssignedUsers(todo.assigned_users ?? []);
      setDateRange(
        todo.start_date || todo.end_date
          ? {
              from: todo.start_date ? new Date(todo.start_date) : undefined,
              to: todo.end_date ? new Date(todo.end_date) : undefined,
            }
          : undefined
      );
      setExpanded(true);
    }
  }, [todo]);

  const handleSubmit = async () => {
    if (!task.trim()) return;

    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    const payload = {
      task,
      notes,
      priority,
      start_date: dateRange?.from ?? null,
      end_date: dateRange?.to ?? null,
      assigned_users: assignedUsers,
    };

    let error;
    if (todo?.id) {
      // ✏️ Edit mode
      const res = await supabase.from('todos').update(payload).eq('id', todo.id);
      error = res.error;
    } else {
      // ➕ Add mode
      const res = await supabase.from('todos').insert({
        ...payload,
        user_id: user.id,
        is_checked: false,
      });
      error = res.error;
    }

    if (error) {
      console.error('Save failed:', error.message);
      return;
    }

    // ✅ Reset after save
    setTask('');
    setNotes('');
    setPriority('Medium');
    setDateRange(undefined);
    setAssignedUsers([]);
    setExpanded(false);
    onSuccess?.();
  };

  return (
    <div className="border p-4 rounded-lg space-y-4 bg-muted">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Add a to-do"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onFocus={() => setExpanded(true)}
        />
        <Button
          onClick={handleSubmit}
          size="icon"
          className="rounded-full w-10 h-10"
        >
          {todo ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </Button>
      </div>

      {expanded && (
        <div className="space-y-4">
          <Textarea
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 font-medium">Priority</label>
              <PrioritySelect value={priority} onChange={setPriority} />
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">Timeframe</label>
              <DateRangeSelector value={dateRange} onChange={setDateRange} />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Assign to</label>
            <GroupSelector selected={assignedUsers} onChange={setAssignedUsers} />
          </div>
        </div>
      )}
    </div>
  );
}
