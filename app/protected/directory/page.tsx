import Link from "next/link";
import DirectoryList from "@/components/directory/DirectoryList";
import { ExternalLink, ArrowLeftToLine } from "lucide-react";

export default function DirectoryPage() {
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
          <h1 className="text-xl font-bold">Calling Card Directory</h1>
        </div>

        <a
          href="https://drive.google.com/drive/folders/15vin8lpy5g9RGnjAzHsakpUfOuUTBIS5?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-green-600 hover:underline font-medium"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          Go to Directory Drive
        </a>

        <DirectoryList refresh={0} />
      </div>
    </main>
  );
}
