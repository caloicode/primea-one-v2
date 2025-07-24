"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function NotificationBell() {
  const [hasUnread, setHasUnread] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    let userId: string;

    const checkUnread = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return;
      userId = user.id;

      const { data: announcements, error } = await supabase
        .from("announcements")
        .select("id, read_by")
        .neq("user_id", user.id)
        .not("read_by", "cs", `{${user.id}}`);

      setHasUnread(!error && announcements?.length > 0);
    };

    checkUnread(); // Initial check

    // Re-check when user comes back to tab
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        checkUnread();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    // Subscribe to realtime updates
    const channel = supabase
      .channel("announcements-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "announcements" },
        (payload) => {
          const a = payload.new as { read_by: string[]; user_id: string };
          if (!a?.read_by?.includes(userId) && a.user_id !== userId) {
            setHasUnread(true);
          }
        }
      )
      .subscribe();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => router.push("/protected/announcements")}
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
