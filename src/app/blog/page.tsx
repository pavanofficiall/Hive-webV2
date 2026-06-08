"use client"

import { useEffect, useState } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { supabase, Post } from "@/lib/supabase"
import { BlogCard } from "@/components/blog/blog-card"
import { GlimpseLogo } from "@/components/ui/glimpse-logo"
import { ArrowLeft, Rss } from "lucide-react"

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false })
      setPosts(data || [])
      setLoading(false)
    }
    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen bg-[#030611] text-white">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/5 blur-[150px] rounded-full" />
      </div>

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#030611]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <GlimpseLogo className="h-7 w-7" />
            <span className="text-lg font-bold tracking-wider text-white uppercase">HIVE</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Rss className="w-4 h-4 text-brand-400" />
            <span className="font-mono tracking-widest text-xs uppercase">Blog</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-xs font-mono text-brand-300 tracking-widest uppercase mb-6">
            <Rss className="w-3 h-3" />
            Insights &amp; Updates
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6 leading-[1.05]">
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-blue-300 to-brand-400">
              Hive
            </span>{" "}
            Blog
          </h1>
          <p className="text-lg text-text-muted max-w-xl mx-auto leading-relaxed">
            Insights on outbound automation, lead generation, and scaling your agency&apos;s revenue pipeline.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <main className="relative mx-auto max-w-7xl px-6 lg:px-8 pb-32">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-2xl bg-white/[0.03] border border-white/[0.06] animate-pulse"
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-32">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brand-500/10 border border-brand-500/20 mb-6">
              <svg className="w-10 h-10 text-brand-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6m-6-4h2" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white/60 mb-2">No posts yet</h2>
            <p className="text-sm text-text-muted">Check back soon — we&apos;re writing something great.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Back to home */}
        <div className="mt-20 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>
        </div>
      </main>
    </div>
  )
}
