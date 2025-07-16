'use client';

import { ModeToggle } from '@/components/light-dark-toggle';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${location.origin}/auth/callback?next=/protected`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <main
      className={`
        min-h-screen flex flex-col items-center justify-center px-4 relative text-center
       bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat
      `}
    >
      {/* Top-right toggle */}
      <header className="absolute top-4 right-4">
        <ModeToggle />
      </header>

      <div className="space-y-6 max-w-md w-full">
        <h1 className="text-4xl font-bold tracking-tight">Primea One</h1>
        <p className="text-muted-foreground text-sm">
          <strong>One</strong> unified platform to access our project management tools.
        </p>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-center">
          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-4"
          >
            <Image
              src="/google.png"
              alt="Google logo"
              width={20}
              height={20}
              className="rounded-sm"
            />
            {isLoading ? 'Redirecting...' : 'Sign in with Google'}
          </Button>
        </div>
      </div>
    </main>
  );
}
