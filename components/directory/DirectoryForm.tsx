'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { createClient } from '@/lib/supabase/client';

type DirectoryFormProps = {
  initialData?: {
    company_name: string;
    image_link: string;
    tags: string; // comma-separated
  };
  onSubmit?: (data: {
    company_name: string;
    image_link: string;
    tags: string;
  }) => void;
  onCancel?: () => void;
  entryId?: string; // Optional for update
  onSuccess: () => void;
};

export default function DirectoryForm({
  initialData,
  onCancel,
  entryId,
  onSuccess,
}: DirectoryFormProps) {
  const supabase = createClient();
  const [companyName, setCompanyName] = useState(initialData?.company_name || '');
  const [imageLink, setImageLink] = useState(initialData?.image_link || '');
  const [tags, setTags] = useState(initialData?.tags || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      company_name: companyName.trim(),
      image_link: imageLink.trim(),
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ''),
    };

    if (entryId) {
      // Update
      await supabase.from('directory').update(payload).eq('id', entryId);
    } else {
      // Insert
      await supabase.from('directory').insert(payload);
    }

    setLoading(false);
    onSuccess();
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="company_name">Company Name</Label>
        <Input
          id="company_name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="image_link">Google Drive Link</Label>
        <Input
          id="image_link"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </div>
  );
}
