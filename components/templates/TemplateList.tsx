'use client';

import { useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  ArrowUpDown,
  ArrowDownUp,
  FileInput,
  Plus,
  Pencil,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog';
import TemplateForm from './TemplateForm'; // will create this after

type Template = {
  id: string;
  name: string;
  link: string;
};

export default function TemplateList({ refresh }: { refresh: number }) {
  const supabase = createClient();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [query, setQuery] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editEntry, setEditEntry] = useState<Template | null>(null);

  const fetchTemplates = async () => {
    const { data, error } = await supabase
      .from('templates')
      .select('id, name, link')
      .order('created_at', { ascending: false });

    if (!error && data) setTemplates(data);
  };

  useEffect(() => {
    fetchTemplates();
  }, [refresh]);

  const handleDelete = async (id: string) => {
    await supabase.from('templates').delete().eq('id', id);
    fetchTemplates();
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return templates
      .filter((t) => t.name.toLowerCase().includes(q))
      .sort((a, b) => {
        const aVal = a.name.toLowerCase();
        const bVal = b.name.toLowerCase();
        return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      });
  }, [templates, query, sortAsc]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search template..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSortAsc((prev) => !prev)}
          title={`Sort by name (${sortAsc ? 'A → Z' : 'Z → A'})`}
        >
          {sortAsc ? (
            <ArrowUpDown className="w-4 h-4" />
          ) : (
            <ArrowDownUp className="w-4 h-4" />
          )}
        </Button>
      </div>

      <div className="grid gap-4">
        {filtered.map((template) => (
          <div
            key={template.id}
            className="flex justify-between items-center border rounded-lg p-4 hover:shadow transition"
          >
            <div className="text-sm font-medium">{template.name}</div>
            <div className="flex items-center gap-2">
              <a
                href={template.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <FileInput className="w-5 h-5" />
              </a>
              <button
                onClick={() => {
                  setEditEntry(template);
                  setShowForm(true);
                }}
                className="text-muted-foreground hover:text-primary"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <ConfirmDeleteDialog onConfirm={() => handleDelete(template.id)} />
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-muted-foreground text-sm italic text-center">
            No templates found.
          </p>
        )}
      </div>

      {/* FAB */}
      <Button
        className="fixed bottom-6 right-6 rounded-full p-4 shadow-lg"
        onClick={() => {
          setEditEntry(null);
          setShowForm(true);
        }}
      >
        <Plus className="w-5 h-5" />
      </Button>

      {/* Template Form Dialog */}
      {showForm && (
        <TemplateForm
          initialData={editEntry || undefined}
          onCancel={() => setShowForm(false)}
          onSuccess={() => {
            fetchTemplates();
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}
