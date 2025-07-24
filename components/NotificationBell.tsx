'use client';

import { useRouter } from 'next/navigation';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotificationBell() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => router.push('/protected/announcements')}
      className="relative"
      aria-label="View announcements"
    >
      <Bell className="h-[1.2rem] w-[1.2rem] transition-all" />
      <span className="absolute top-[6px] right-[6px] block w-2 h-2 rounded-full bg-red-500" />
    </Button>
  );
}
