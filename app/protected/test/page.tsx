'use client';

import { useState } from 'react';
import GroupSelector from '@/components/to-do/GroupSelector';

export default function TestPage() {
  const [assignedIds, setAssignedIds] = useState<string[]>([]);

  return (
    <div className="w-full max-w-xl mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">👥 Group Selector Test (with Google Name + Avatar)</h1>

      <GroupSelector selected={assignedIds} onChange={setAssignedIds} />

      <pre className="text-sm mt-4 border p-3 bg-muted font-mono rounded">
        {JSON.stringify(assignedIds, null, 2)}
      </pre>
    </div>
  );
}
