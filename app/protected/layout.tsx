// app/protected/layout.tsx

import { ReactNode } from "react";
import NavBar from "@/components/NavBar";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col">
      <NavBar />
      <div className="pt-20 px-4 max-w-screen-xl w-full mx-auto">
        {children}
      </div>
    </main>
  );
}
