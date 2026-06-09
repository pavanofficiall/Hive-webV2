"use client"

import Link from "next/link"
import { Post } from "@/lib/supabase"
import { GlimpseLogo } from "@/components/ui/glimpse-logo"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

interface BlogPostContentProps {
  post: Post
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <div className="min-h-screen bg-[#030611] text-white">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-500/5 blur-[180px] rounded-full" />
      </div>

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#030611]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <GlimpseLogo className="h-7 w-7" />
            <span className="text-lg font-bold tracking-wider text-white uppercase">HIVE</span>
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm text-text-muted hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All posts
          </Link>
        </div>
      </header>

      <article className="relative pt-28 pb-32">
        {/* Cover image */}
        {post.cover_image && (
          <div className="mx-auto max-w-5xl px-6 mb-12">
            <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden border border-white/[0.08]">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030611]/60 to-transparent" />
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mx-auto max-w-3xl px-6 mb-12">
          <div className="flex items-center gap-5 text-xs text-text-muted font-mono mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-400" />
              {formatDate(post.published_at || post.created_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-400" />
              {readingTime(post.content)} min read
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.1] mb-6">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-xl text-text-muted leading-relaxed border-l-2 border-brand-500/40 pl-5">
              {post.excerpt}
            </p>
          )}
          <div className="mt-8 border-b border-white/[0.06]" />
        </div>

        {/* Body */}
        <div className="mx-auto max-w-3xl px-6 prose-blog">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold text-white mt-12 mb-6 leading-tight">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-bold text-white mt-10 mb-4 leading-tight">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-semibold text-white/90 mt-8 mb-3">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-text-muted leading-[1.9] mb-6 text-[19px]">{children}</p>
              ),
              a: ({ href, children }) => (
                <a href={href} className="text-brand-400 hover:text-brand-300 underline underline-offset-4 transition-colors" target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              ul: ({ children }) => (
                <ul className="list-none space-y-2 mb-6 pl-0">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 space-y-2 mb-6 text-text-muted">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="flex gap-2 items-start text-text-muted text-[19px] leading-relaxed">
                  <span className="text-brand-400 shrink-0 mt-1.5">▸</span>
                  <span>{children}</span>
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-brand-500/50 pl-5 py-1 my-6 bg-brand-500/5 rounded-r-xl">
                  {children}
                </blockquote>
              ),
              code: ({ className, children, ...props }) => {
                const isInline = !className
                return isInline ? (
                  <code className="bg-white/[0.08] text-brand-300 rounded px-1.5 py-0.5 text-[16px] font-mono">
                    {children}
                  </code>
                ) : (
                  <code className={`block ${className || ""}`} {...props}>{children}</code>
                )
              },
              pre: ({ children }) => (
                <pre className="bg-[#0d1424] border border-white/[0.08] rounded-xl p-5 overflow-x-auto mb-6 text-[16px] font-mono leading-relaxed">
                  {children}
                </pre>
              ),
              hr: () => <hr className="border-white/[0.06] my-10" />,
              strong: ({ children }) => (
                <strong className="text-white font-semibold">{children}</strong>
              ),
              img: ({ src, alt }) => (
                <img src={src} alt={alt} className="w-full rounded-2xl border border-white/[0.08] my-6" />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer CTA */}
        <div className="mx-auto max-w-3xl px-6 mt-20">
          <div className="rounded-3xl border border-brand-500/20 bg-brand-500/5 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Ready to automate your pipeline?</h3>
            <p className="text-sm text-text-muted mb-6">See how Hive helps agencies 10x their outbound volume.</p>
            <a
              href="https://calendly.com/nexawork/hive"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Book a Free Call
            </a>
          </div>
        </div>
      </article>
    </div>
  )
}
