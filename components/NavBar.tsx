"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NotificationBell from "./NotificationBell";
import { ModeToggle } from "./light-dark-toggle";
import MenuDrawer from "@/components/MenuDrawer";
import { createClient } from "@/lib/supabase/client";

export default function NavBar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    fetchUser();
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between px-6 py-3 max-w-screen-xl mx-auto">
        {/* Logo + Brand */}
        <Link
          href="/protected"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <Image
            src="/logo.png"
            alt="PrimeA logo"
            width={28}
            height={28}
            className="rounded-full object-cover"
          />
          PrimeA
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <NotificationBell />
          <ModeToggle />
          <MenuDrawer user={user} />
        </div>
      </div>
    </header>
  );
}
