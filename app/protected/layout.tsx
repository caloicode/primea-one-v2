// app/protected/layout.tsx

import { ReactNode } from "react";
import NavBar from "@/components/NavBar";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 w-full">
  {children}
</div>

    </main>
  );
}
