'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DateRangeSelector from './DateRangeSelector';
import GroupSelector from './GroupSelector';
import PrioritySelect from './PrioritySelect';
import { DateRange } from 'react-day-picker';

export default function TodoForm({ onSuccess }: { onSuccess?: () => void }) {
  const supabase = createClient();

  const [todo, setTodo] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [assignedUsers, setAssignedUsers] = useState<string[]>([]);

  const handleSubmit = async () => {
    if (!todo.trim()) return;

    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    const { error } = await supabase.from('todos').insert({
      user_id: user.id,
      task: todo,
      notes,
      priority,
      start_date: dateRange?.from ?? null,
      end_date: dateRange?.to ?? null,
      assigned_users: assignedUsers,
      is_checked: false
    });

    if (error) {
      console.error('Insert failed:', error.message);
      return;
    }

    setTodo('');
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
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onFocus={() => setExpanded(true)}
        />
        <Button
          onClick={handleSubmit}
          size="icon"
          className="rounded-full w-10 h-10"
        >
          <Plus className="w-5 h-5" />
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
