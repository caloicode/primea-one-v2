import TemplateList from "@/components/templates/TemplatesList";

export default function TemplatesPage() {
  return (
    <main className="px-4 pt-20 pb-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Templates</h1>
        <TemplateList refresh={0} />
      </div>
    </main>
  );
}
