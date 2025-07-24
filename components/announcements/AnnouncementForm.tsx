// components/minutes/MinutesForm.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";

interface AnnouncementFormProps {
  initialData?: {
    title: string;
    content: string;
  };
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function AnnouncementForm({ initialData, onSuccess, onCancel }: AnnouncementFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSubmit = async () => {
    setLoading(true);
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    if (initialData) {
      await supabase.from("announcements").update({ title, content }).eq("user_id", user.id);
    } else {
      await supabase.from("announcements").insert({ title, content, user_id: user.id });
    }

    setLoading(false);
    onSuccess();
  };

  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle>{initialData ? "Edit Announcement" : "Create an Announcement"}</DialogTitle>
      </DialogHeader>
      <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} rows={6} />
      <div className="flex justify-end gap-2">
        {onCancel && <Button variant="outline" onClick={onCancel}>Cancel</Button>}
        <Button onClick={handleSubmit} disabled={loading}>{initialData ? "Save Changes" : "Add"}</Button>
      </div>
    </div>
  );
}
