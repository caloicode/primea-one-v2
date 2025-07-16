'use client';

import Link from 'next/link';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { SignOutButton } from './SignOutButton';
import Image from 'next/image';
import links from '@/lib/data/links.json';

export default function MenuDrawer({ user }: { user: any }) {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  const avatar = user?.user_metadata?.avatar_url;
  const name = user?.user_metadata?.full_name ?? 'Unnamed User';

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-64 sm:w-80 flex flex-col">
        {/* User Avatar and Name */}
        <SheetHeader className="px-6 pt-6 text-left">
          <div className="flex flex-col items-center gap-2">
            {avatar ? (
              <Image
                src={avatar}
                alt="User Avatar"
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-lg font-medium">
                ?
              </div>
            )}
            <div className="text-sm font-medium text-center">{name}</div>
          </div>
        </SheetHeader>

        {/* Scrollable Link List */}
        <div className="flex-1 overflow-y-auto mt-6">
          <nav className="flex flex-col divide-y text-sm">
            {links.map(({ name, path }) => (
              <SheetClose asChild key={name}>
                <Link
                  href={path}
                  className={clsx(
                    'px-6 py-3 transition-colors',
                    pathname === path
                      ? 'text-primary font-semibold'
                      : 'hover:text-primary'
                  )}
                >
                  {name}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </div>

        {/* Sign Out + Footer */}
        <div className="px-6 py-4 space-y-3 text-sm text-center border-t">
          <SignOutButton />
          <div className="text-xs text-muted-foreground pt-2">
            PrimeA Design Group © {year}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
