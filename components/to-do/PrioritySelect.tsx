'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

type Props = {
  value: 'Low' | 'Medium' | 'High';
  onChange: (val: 'Low' | 'Medium' | 'High') => void;
};

export default function PrioritySelect({ value, onChange }: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="High">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            High
          </span>
        </SelectItem>
        <SelectItem value="Medium">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            Medium
          </span>
        </SelectItem>
        <SelectItem value="Low">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Low
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
