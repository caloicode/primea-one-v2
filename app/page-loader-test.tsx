'use client';

import { useEffect, useState } from 'react';
import { ModeToggle } from '@/components/light-dark-toggle';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';
import Loader from '@/components/Loader';

export default function Home() {
  const [initialLoading, setInitialLoading] = useState(true); // ✅ test only
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Simulate loader for 2 seconds (for preview)
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

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
    <>
      {initialLoading && <Loader />} {/* ✅ Overlay loader on top */}
      <main className="min-h-screen flex flex-col items-center justify-center px-4 relative bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat">
        {/* Top-right toggle */}
        <header className="absolute top-4 right-4 z-10">
          <ModeToggle />
        </header>

        {/* Glass Card */}
        <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl w-full max-w-md text-center space-y-6 z-10">
          <h1 className="text-4xl font-bold tracking-tight text-black">
            PrimeA One
          </h1>
          <p className="text-sm text-black">
            <strong>One</strong> unified platform to access our project management tools.
          </p>

          {error && <p className="text-sm text-red-300">{error}</p>}

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
    </>
  );
}
