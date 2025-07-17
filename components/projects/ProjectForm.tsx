"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import GroupSelector from "../to-do/GroupSelector";
import ProgressSlider from "./ProgressSlider";

type ProjectFormProps = {
  onClose?: () => void;
  onSuccess?: () => void;
  mode?: "create" | "edit";
  defaultValues?: any;
};

const statuses = ["Pending", "On-going", "Completed", "Conflicted"];

export default function ProjectForm({
  onClose,
  onSuccess,
  mode = "create",
  defaultValues = {},
}: ProjectFormProps) {
  const supabase = createClient();

  const [form, setForm] = useState({
    project_code: defaultValues.project_code || "",
    project_name: defaultValues.project_name || "",
    project_title: defaultValues.project_title || "",
    location: defaultValues.location || "",
    client: defaultValues.client || "",
    status: defaultValues.status || "Pending",
    pct: defaultValues.pct || 0,
    drive_link: defaultValues.drive_link || "",
    timeline_link: defaultValues.timeline_link || "",
    notes: defaultValues.notes || "",
    assigned_to: defaultValues.assigned_to || [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      pct: parseFloat(form.pct.toString()),
    };

    const { error } =
      mode === "edit"
        ? await supabase.from("projects").update(payload).eq("id", defaultValues.id)
        : await supabase.from("projects").insert(payload);

    if (error) {
      toast.error("Error saving project");
      console.error(error);
    } else {
      toast.success(`Project ${mode === "edit" ? "updated" : "added"} successfully!`);
      onClose?.();
      onSuccess?.();
    }
  };

  return (
    <form className="space-y-4 py-2" onSubmit={handleSubmit}>
      <div className="grid gap-4">
        {[
          { label: "Project Code", name: "project_code" },
          { label: "Project Name", name: "project_name" },
          { label: "Project Title", name: "project_title" },
          { label: "Location", name: "location" },
          { label: "Client", name: "client" },
          { label: "Drive Link", name: "drive_link" },
          { label: "Timeline Link", name: "timeline_link" },
        ].map(({ label, name }) => (
          <div key={name}>
            <Label>{label}</Label>
            <Input
              name={name}
              value={form[name as keyof typeof form]}
              onChange={handleChange}
              required={["project_code", "project_name"].includes(name)}
            />
          </div>
        ))}

        <div>
          <Label>Status</Label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 bg-background"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <ProgressSlider
          value={Math.round(form.pct * 100)}
          onChange={(val) => setForm((prev) => ({ ...prev, pct: val / 100 }))}
        />

        <div>
          <Label>Notes</Label>
          <Textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="min-h-[100px]"
          />
        </div>

        <div>
          <Label>Assigned To</Label>
          <GroupSelector
            selected={form.assigned_to}
            onChange={(ids) => setForm((prev) => ({ ...prev, assigned_to: ids }))}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        {onClose && (
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          {mode === "edit" ? "Save Changes" : "Save"}
        </Button>
      </div>
    </form>
  );
}
