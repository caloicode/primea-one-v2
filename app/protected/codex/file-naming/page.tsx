"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, FolderKanban, FileCode2, Info } from "lucide-react";

export default function FileNamingPage() {
  return (
    <main className="max-w-3xl mx-auto mt-16 px-6 pb-20">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Naming System</h1>

      {/* Folder Naming */}
      <Card>
        <CardHeader className="flex items-center gap-3">
          <FolderKanban className="w-5 h-5 text-primary" />
          <CardTitle>Folder Naming Standard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            <strong>Format:</strong> <code className="font-mono">CODE-NAME</code>
          </p>
          <p className="text-muted-foreground">Examples:</p>
          <pre className="bg-muted p-3 rounded text-sm font-mono">
            24C-PACIFIC_GRAND_VILLAS{"\n"}
            25B-BEACON
          </pre>
        </CardContent>
      </Card>

      {/* File Naming */}
      <Card className="mt-6">
        <CardHeader className="flex items-center gap-3">
          <FileCode2 className="w-5 h-5 text-primary" />
          <CardTitle>File Naming Standard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            <strong>Format:</strong>{" "}
            <code className="font-mono">YYYY_MM_DD-CODE-NAME-PROJECT_PART</code>
          </p>
          <p className="text-muted-foreground">Example:</p>
          <pre className="bg-muted p-3 rounded text-sm font-mono">
            2025_04_30-24C-PACIFIC_GRAND_VILLAS-FLOOR_PLANS
          </pre>

          <h3 className="font-semibold text-sm">Notes:</h3>
          <ul className="list-disc pl-5 text-sm">
            <li>
              <strong>Underscores [ _ ]</strong>: for word separation
            </li>
            <li>
              <strong>Hyphens [ - ]</strong>: for segment separation
            </li>
          </ul>

          <p className="text-sm">
            <strong>Version Control:</strong> If multiple revisions are made in a day,
            add <code className="font-mono">V01</code>, <code className="font-mono">V02</code>, etc.
          </p>

          <div className="text-sm space-y-2">
            <p className="text-green-600 font-medium">✅ Correct Versions:</p>
            <pre className="bg-muted p-3 rounded font-mono text-sm">
              2025_04_30-24C-PACIFIC_GRAND_VILLAS-FLOOR_PLANS-V01{"\n"}
              2025_04_30-24C-PACIFIC_GRAND_VILLAS-FLOOR_PLANS-V02{"\n"}
              2025_04_30-24C-PACIFIC_GRAND_VILLAS-FLOOR_PLANS-V03
            </pre>

            <p className="text-red-600 font-medium">❌ Incorrect Versions:</p>
            <pre className="bg-muted p-3 rounded font-mono text-sm text-muted-foreground">
              2025_04_30-24C-PACIFIC_GRAND_VILLAS-FLOOR_PLANS-FINAL{"\n"}
              2025_04_30-24C-PACIFIC_GRAND_VILLAS-FLOOR_PLANS-FINALER{"\n"}
              2025_04_30-24C-PACIFIC_GRAND_VILLAS-FLOOR_PLANS-FINALIST{"\n"}
              2025_04_30-24C-PACIFIC_GRAND_VILLAS-FLOOR_PLANS-GRAND_FINALIST
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Why the Convention */}
      <Card className="mt-6">
        <CardHeader className="flex items-center gap-3">
          <Info className="w-5 h-5 text-primary" />
          <CardTitle>Why the Naming Convention?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <p>
            The structure of Primea’s naming convention is intentionally designed to
            promote clarity, consistency, and efficiency — both visually and
            functionally.
          </p>

          <p>
            <strong>YYYY_MM_DD for Chronological Sorting:</strong> This format ensures
            that files are auto-sorted properly in folders, reducing confusion when
            referencing or updating versions.
          </p>

          <p>
            <strong>Hyphens [ - ] for Segment Separation:</strong> Clear separation of
            parts like date, code, name, and type makes filenames easily scannable.
          </p>

          <p>
            <strong>Underscores [ _ ] for Word Grouping:</strong> Underscores keep word
            groups together for quick selection, e.g.{" "}
            <code className="font-mono">PACIFIC_GRAND_VILLAS</code> can be selected with
            a double-click — unlike hyphens, which select only one word.
          </p>

          <p>
            This rule helps streamline file management during coordination, submissions,
            and internal reviews.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
