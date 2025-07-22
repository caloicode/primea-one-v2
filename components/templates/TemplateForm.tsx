"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

type TemplateFormProps = {
  initialData?: {
    id?: string;
    name: string;
    link: string;
  };
  onSuccess: () => void;
  onCancel: () => void;
};

export default function TemplateForm({
  initialData,
  onSuccess,
  onCancel,
}: TemplateFormProps) {
  const supabase = createClient();

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    link: initialData?.link || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const isEditMode = Boolean(initialData?.id);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (isEditMode) {
      await supabase
        .from("templates")
        .update({
          name: formData.name.trim(),
          link: formData.link.trim(),
        })
        .eq("id", initialData?.id);
    } else {
      await supabase.from("templates").insert([
        {
          name: formData.name.trim(),
          link: formData.link.trim(),
        },
      ]);
    }

    setIsLoading(false);
    onSuccess();
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Template" : "Add Template"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div>
            <label className="text-sm font-medium">Template Name</label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="e.g. MedCert LPCMC"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Template Link</label>
            <Input
              value={formData.link}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, link: e.target.value }))
              }
              placeholder="https://docs.google.com/..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isEditMode ? "Save Changes" : "Add Template"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
