import { createClient } from "@/lib/supabase/server"
import { MessageCard } from "@/components/message-card"
import { FeaturesList } from "@/components/features-list"

export default async function Home() {
  const supabase = createClient()

  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)

  const latestMessage = messages?.[0] ?? null

  return (
    <div
      className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-8 font-sans"
    >
      <header
        className="border-b pb-8 text-center"
        style={{ borderColor: "var(--border)" }}
      >
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to My App
        </h1>
        <p
          className="mt-2 text-lg"
          style={{ color: "var(--muted-foreground)" }}
        >
          Built with Next.js, TypeScript, and Supabase
        </p>
      </header>

      <main className="flex flex-1 flex-col gap-12 py-8">
        <section>
          <h2 className="text-2xl font-bold">Get Started</h2>
          <p
            className="mt-3 leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            This is your landing page. You can customize it with your own
            content.
          </p>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold">Features</h2>
          <FeaturesList />
        </section>

        <section
          className="rounded-lg border-l-4 p-8"
          style={{
            backgroundColor: "var(--muted)",
            borderLeftColor: "var(--primary)",
          }}
        >
          <h2 className="mb-6 text-2xl font-bold">Message from Supabase</h2>

          {error && (
            <p
              className="rounded-md p-4 text-base"
              style={{
                backgroundColor: "#fef2f2",
                color: "var(--destructive)",
              }}
            >
              Error: {error.message}
            </p>
          )}

          {!error && !latestMessage && (
            <p style={{ color: "var(--muted-foreground)" }}>
              No messages found.
            </p>
          )}

          {latestMessage && (
            <MessageCard
              message={latestMessage.message}
              timestamp={latestMessage.created_at}
              status={latestMessage.status}
            />
          )}
        </section>
      </main>

      <footer
        className="border-t pt-8 text-center text-sm"
        style={{
          borderColor: "var(--border)",
          color: "var(--muted-foreground)",
        }}
      >
        <p>&copy; 2026 My App. All rights reserved.</p>
      </footer>
    </div>
  )
}
