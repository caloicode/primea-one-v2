'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ModeToggle } from '@/components/light-dark-toggle';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true); // ⏳
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace('/protected');
      } else {
        setIsCheckingSession(false); // ✅ done checking, show login UI
      }
    };

    checkSession();
  }, [router, supabase]);

  const handleGoogleLogin = async () => {
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

  if (isCheckingSession) return null; // Let loading.tsx handle this

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat">
      <header className="absolute top-4 right-4">
        <ModeToggle />
      </header>

      <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl w-full max-w-md text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-black">PrimeA One</h1>
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
  );
}
