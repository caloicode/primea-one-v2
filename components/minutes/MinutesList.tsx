"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Plus, EllipsisVertical } from "lucide-react";
import MinutesForm from "./MinutesForm";
import DeleteMinutesDialog from "./DeleteMinutesDialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

interface Minute {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
}

interface User {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
}

export default function MinutesList() {
  const [minutes, setMinutes] = useState<(Minute & { user: User | null })[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMinute, setEditMinute] = useState<Minute | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const supabase = createClient();

  const fetchAll = async () => {
    const [{ data: minutesData }, { data: usersData }] = await Promise.all([
      supabase.from("minutes").select("*").order("created_at", { ascending: false }),
      supabase.rpc("get_all_users"),
    ]);

    if (!minutesData || !usersData) return;

    const enriched = minutesData.map((m) => ({
      ...m,
      user: usersData.find((u: User) => u.id === m.user_id) || null,
    }));

    setAllUsers(usersData);
    setMinutes(enriched);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    await supabase.from("minutes").delete().eq("id", deleteId);
    setDeleteId(null);
    fetchAll();
  };

  return (
    <div className="relative">
      <div className="space-y-6">
        {minutes.map((minute) => (
          <div key={minute.id} className="border rounded p-4 bg-card">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Image
                  src={minute.user?.avatar_url || "/avatar.png"}
                  alt={minute.user?.full_name || ""}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold">
                    {minute.user?.full_name || "Unknown User"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(minute.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setEditMinute(minute);
                      setDialogOpen(true);
                    }}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDeleteId(minute.id)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h3 className="text-lg font-bold mb-1">{minute.title}</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {minute.content}
            </p>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <MinutesForm
            initialData={
              editMinute
                ? { title: editMinute.title, content: editMinute.content }
                : undefined
            }
            onCancel={() => {
              setDialogOpen(false);
              setEditMinute(null);
            }}
            onSuccess={() => {
              setDialogOpen(false);
              setEditMinute(null);
              fetchAll();
            }}
          />
        </DialogContent>
      </Dialog>

      <DeleteMinutesDialog
        open={!!deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />

      <Button
        className="fixed bottom-5 right-5 rounded-full h-12 w-12 p-0"
        onClick={() => {
          setEditMinute(null);
          setDialogOpen(true);
        }}
      >
        <Plus className="w-5 h-5" />
      </Button>
    </div>
  );
}