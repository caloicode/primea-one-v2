'use client';

import links from '@/lib/data/links.json';
import HomeTile from '@/components/home/HomeTile';
import RandomQuoteBubble from '@/components/RandomQuoteBubble';

export default function ProtectedHomePage() {
  return (
    <main
      className={`
        min-h-screen flex flex-col items-center px-4 pt-24 relative text-center
        bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat
      `}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-0 dark:bg-black/40" />

      {/* Top-right floating quote */}
      <div className="absolute top-4 right-4 z-10">
        <RandomQuoteBubble />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center space-y-10 w-full">
        <h1 className="text-3xl font-bold text-white drop-shadow">Primea One</h1>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-8 max-w-4xl w-full">
          {links.map(({ name, path, icon }) => (
            <HomeTile key={name} name={name} path={path} icon={icon} />
          ))}
        </div>
      </div>
    </main>
  );
}
