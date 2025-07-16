'use client';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function ConfirmDeleteDialog({
  onConfirm,
}: {
  onConfirm: () => void;
}) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    await onConfirm();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="text-sm text-red-500 hover:text-destructive">
          <Trash2 className="w-4 h-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Flex row for Cancel and Delete buttons */}
        <div className="flex justify-center gap-2 pt-4">
          <AlertDialogCancel className="px-4">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600 text-white px-4"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
