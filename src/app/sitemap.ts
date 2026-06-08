import type { MetadataRoute } from "next"
import { createClient } from "@supabase/supabase-js"

const BASE_URL = "https://hive.nexaworks.tech"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]

  // Dynamic blog posts from Supabase
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data: posts } = await supabase
      .from("posts")
      .select("slug, updated_at, published_at")
      .eq("published", true)
      .order("published_at", { ascending: false })

    blogPages = (posts || []).map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.published_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  } catch {
    // Supabase unavailable at build time — skip blog pages
  }

  return [...staticPages, ...blogPages]
}
