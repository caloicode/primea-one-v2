'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

export default function NotificationBell() {
  const [hasUnread, setHasUnread] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    let userId: string;

    const setup = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return;
      userId = user.id;

      // Initial fetch for unread
      const { data: announcements, error } = await supabase
        .from('announcements')
        .select('id, read_by')
        .neq('user_id', user.id)
        .not('read_by', 'cs', `{${user.id}}`);

      if (!error && announcements?.length > 0) {
        setHasUnread(true);
      }

      // Subscribe to new inserts/updates
      const channel = supabase
        .channel('announcements-realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'announcements' },
          (payload) => {
            const a = payload.new as { read_by: string[]; user_id: string };
            if (!a?.read_by?.includes(userId) && a.user_id !== userId) {
              setHasUnread(true);
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    };

    setup();
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => router.push('/protected/announcements')}
      className="relative"
      aria-label="View announcements"
    >
      <Bell className="h-[1.2rem] w-[1.2rem] transition-all" />
      {hasUnread && (
        <span className="absolute top-[6px] right-[6px] block w-2 h-2 rounded-full bg-red-500 ring-2 ring-background" />
      )}
    </Button>
  );
}
