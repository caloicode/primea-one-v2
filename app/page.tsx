"use client";

import { ModeToggle } from "@/components/light-dark-toggle";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback?next=/protected`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Header */}
      <header className="absolute top-4 right-4 flex items-center gap-4">
        <ModeToggle />
      </header>

      {/* Page Content */}
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold">This is the homepage</h1>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button onClick={handleGoogleLogin} disabled={isLoading}>
          {isLoading ? "Redirecting..." : "Sign in with Google"}
        </Button>
      </div>
    </main>
  );
}
