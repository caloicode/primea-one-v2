import MinutesList from "@/components/minutes/MinutesList"

export default function MinutesPage() {
  return (
    <main className="px-4 pt-20 pb-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Minutes</h1>
        <MinutesList />
      </div>
    </main>
  )
}
