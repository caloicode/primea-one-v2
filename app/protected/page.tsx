// app/protected/page.tsx

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <div className="w-full max-w-xl text-center space-y-8">
      <h1 className="text-3xl font-bold">Test Change 💎</h1>
      <div className="text-left text-sm border rounded p-4 font-mono bg-muted overflow-auto">
        <h2 className="text-base font-semibold mb-2">User info:</h2>
        <pre>{JSON.stringify(data.user, null, 2)}</pre>
      </div>
    </div>
  );
}
