"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type Priority = "High" | "Medium" | "Low";

const priorityColors: Record<Priority, string> = {
  High: "bg-red-500",
  Medium: "bg-yellow-400",
  Low: "bg-green-500",
};

type Props = {
  value: Priority;
  onChange: (value: Priority) => void;
};

export default function PrioritySelect({ value, onChange }: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="priority-select">
        <SelectValue>
          <span className="flex items-center gap-2">
            <span
              className={cn("w-2 h-2 rounded-full", priorityColors[value])}
            />
            {value}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {(["High", "Medium", "Low"] as Priority[]).map((level) => (
          <SelectItem key={level} value={level}>
            <span className="flex items-center gap-2">
              <span
                className={cn("w-2 h-2 rounded-full", priorityColors[level])}
              />
              {level}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
