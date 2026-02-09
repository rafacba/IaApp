interface MessageCardProps {
  message: string
  timestamp: string
  status: string
}

export function MessageCard({ message, timestamp, status }: MessageCardProps) {
  return (
    <div
      className="rounded-lg border p-6"
      style={{
        backgroundColor: "var(--card)",
        color: "var(--card-foreground)",
        borderColor: "var(--border)",
      }}
    >
      <p className="text-lg font-medium leading-relaxed">{message}</p>
      <div className="mt-4 flex flex-col gap-1">
        <p
          className="text-sm"
          style={{ color: "var(--muted-foreground)" }}
        >
          Received at: {new Date(timestamp).toLocaleString()}
        </p>
        <p
          className="text-sm font-medium"
          style={{ color: "var(--primary)" }}
        >
          Status: {status}
        </p>
      </div>
    </div>
  )
}
