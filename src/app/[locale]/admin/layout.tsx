import type { Metadata } from "next"

// Admin pages should never appear in search results
export const metadata: Metadata = {
  title: "Admin — HIVE",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
