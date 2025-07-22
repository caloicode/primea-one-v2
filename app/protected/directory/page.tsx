import DirectoryList from "@/components/directory/DirectoryList";

export default function DirectoryPage() {
  return (
    <main className="px-4 pt-20 pb-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Calling Card Directory</h1>
        <DirectoryList refresh={0} />
      </div>
    </main>
  );
}
