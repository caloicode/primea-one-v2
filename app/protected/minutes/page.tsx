import Link from "next/link";
import { ArrowLeftToLine } from "lucide-react";
import MinutesList from "@/components/minutes/MinutesList";

export default function MinutesPage() {
  return (
    <main className="px-4 pt-20 pb-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center space-x-3">
          <Link
            href="/protected"
            className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
          >
            <ArrowLeftToLine className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold">Minutes</h1>
        </div>

        <MinutesList />
      </div>
    </main>
  );
}
