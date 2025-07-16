"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Todo } from "@/types/todo";
import TodoForm from "./TodoForm";

export default function TodoDialog({
  open,
  setOpen,
  todo,
  onSuccess,
}: {
  open: boolean;
  setOpen: (state: boolean) => void;
  todo?: Todo | null;
  onSuccess: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-xl"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{todo ? "✏️ Edit To-Do" : "➕ Add To-Do"}</DialogTitle>
        </DialogHeader>

        <TodoForm
          todo={todo}
          onSuccess={() => {
            onSuccess();
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
