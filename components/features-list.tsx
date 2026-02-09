const features = [
  { label: "Server-side rendering with Next.js" },
  { label: "Type safety with TypeScript" },
  { label: "Supabase for database and auth" },
]

export function FeaturesList() {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {features.map((feature) => (
        <li
          key={feature.label}
          className="rounded-lg border p-6 text-base leading-relaxed"
          style={{
            backgroundColor: "var(--muted)",
            color: "var(--foreground)",
            borderColor: "var(--border)",
          }}
        >
          {feature.label}
        </li>
      ))}
    </ul>
  )
}
