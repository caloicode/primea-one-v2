'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import links from '@/lib/data/links.json';
import RandomQuoteBubble from '@/components/RandomQuoteBubble';

export default function ProtectedHomePage() {
  return (
    <div className="w-full flex flex-col items-center space-y-10 text-center relative">
      <h1 className="text-3xl font-bold">Primea One</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md sm:max-w-lg">
        {links.map(({ name, path }) => (
          <Button asChild key={name} variant="secondary" className="w-full">
            <Link
              href={path}
              target={path.startsWith('http') ? '_blank' : undefined}
              rel={path.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {name}
            </Link>
          </Button>
        ))}
      </div>

      <RandomQuoteBubble />
    </div>
  );
}
