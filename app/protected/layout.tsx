import Link from "next/link";
import { ModeToggle } from "@/components/light-dark-toggle";
import { SignOutButton } from "@/components/SignOutButton";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col">
      <nav className="w-full flex justify-between items-center border-b border-border p-4">
        <Link href="/" className="text-lg font-semibold">
          Primea
        </Link>
        <div className="flex gap-3 items-center">
          <ModeToggle />
          <SignOutButton />
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-start px-4 py-10">
        {children}
      </div>
    </main>
  );
}
