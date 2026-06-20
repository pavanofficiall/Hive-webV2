"use client"

import Link from "next/link"
import { Post } from "@/lib/supabase"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { useTranslations } from "next-intl"

interface BlogCardProps {
  post: Post
}

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function BlogCard({ post }: BlogCardProps) {
  const t = useTranslations("BlogCard")
  const mins = readingTime(post.content)
  const date = post.published_at || post.created_at

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col bg-[#0a0f1e] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-brand-500/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]"
    >
      {/* Cover image */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-brand-500/10 to-blue-900/10 shrink-0">
        {post.cover_image ? (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6m-6-4h2" />
              </svg>
            </div>
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-text-muted font-mono">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {formatDate(date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {mins} {t('minRead')}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-white leading-snug group-hover:text-brand-300 transition-colors duration-300 line-clamp-2">
          {post.title}
        </h2>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-sm text-text-muted leading-relaxed line-clamp-3 flex-1">
            {post.excerpt}
          </p>
        )}

        {/* Read more */}
        <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-medium text-brand-400 group-hover:text-brand-300 transition-colors">
          {t('readArticle')}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>

      {/* Hover glow border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ring-1 ring-brand-500/20" />
    </Link>
  )
}
