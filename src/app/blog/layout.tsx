import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog — Outbound Automation Insights",
  description:
    "Insights on outbound automation, lead generation, and scaling your agency's revenue pipeline. Tips, case studies, and strategies from the HIVE team.",
  alternates: {
    canonical: "https://hive.nexaworks.tech/blog",
  },
  openGraph: {
    type: "website",
    url: "https://hive.nexaworks.tech/blog",
    title: "HIVE Blog — Outbound Automation Insights",
    description:
      "Insights on outbound automation, lead generation, and scaling your agency's revenue pipeline.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HIVE Blog — Outbound Automation Insights",
    description:
      "Tips, case studies, and strategies for lead gen agencies.",
    images: ["/og-image.png"],
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
