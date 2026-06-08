"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase, Post } from "@/lib/supabase"
import { AdminGuard } from "@/components/admin/admin-guard"
import { GlimpseLogo } from "@/components/ui/glimpse-logo"
import {
  ArrowLeft, Save, Globe, Eye, EyeOff,
  Image as ImageIcon, FileText, AlertCircle, CheckCircle2, Loader2
} from "lucide-react"

type PostFormData = {
  title: string
  slug: string
  excerpt: string
  cover_image: string
  content: string
  published: boolean
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

interface PostEditorProps {
  initialData?: Partial<Post>
  postId?: string
  mode: "new" | "edit"
}

function PostEditor({ initialData, postId, mode }: PostEditorProps) {
  const router = useRouter()
  const [form, setForm] = useState<PostFormData>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    cover_image: initialData?.cover_image || "",
    content: initialData?.content || "",
    published: initialData?.published || false,
  })
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write")
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null)

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  function handleTitleChange(value: string) {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: mode === "new" ? slugify(value) : prev.slug,
    }))
  }

  async function handleSave(publish?: boolean) {
    if (!form.title.trim()) { showToast("Title is required.", "error"); return }
    if (!form.slug.trim()) { showToast("Slug is required.", "error"); return }
    if (!form.content.trim()) { showToast("Content is required.", "error"); return }

    setSaving(true)
    const publishedValue = publish !== undefined ? publish : form.published

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      excerpt: form.excerpt.trim() || null,
      cover_image: form.cover_image.trim() || null,
      content: form.content,
      published: publishedValue,
      published_at: publishedValue ? new Date().toISOString() : null,
    }

    let error
    if (mode === "new") {
      const res = await supabase.from("posts").insert([payload])
      error = res.error
    } else {
      const res = await supabase.from("posts").update(payload).eq("id", postId)
      error = res.error
    }

    if (error) {
      const msg = error.message.includes("duplicate") ? "A post with this slug already exists." : error.message
      showToast(msg, "error")
    } else {
      showToast(publishedValue ? "Post published!" : "Saved as draft.")
      setTimeout(() => router.push("/admin/dashboard"), 1200)
    }
    setSaving(false)
  }

  return (
    <div className="min-h-screen bg-[#030611] text-white">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-500/5 blur-[150px] rounded-full" />
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-xl border text-sm font-medium shadow-2xl ${
          toast.type === "success"
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
            : "bg-red-500/10 border-red-500/30 text-red-300"
        }`}>
          {toast.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#030611]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link href="/admin/dashboard" className="flex items-center gap-2 text-text-muted hover:text-white transition-colors group shrink-0">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-2 min-w-0">
              <GlimpseLogo className="h-6 w-6 shrink-0" />
              <span className="text-sm font-bold text-white uppercase tracking-wider truncate">
                {mode === "new" ? "New Post" : "Edit Post"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] text-sm text-text-muted hover:text-white transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Save Draft
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-sm font-semibold text-white transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Globe className="w-3.5 h-3.5" />}
              Publish
            </button>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-5xl px-6 lg:px-8 py-10 space-y-8">
        {/* Title */}
        <div>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title..."
            className="w-full bg-transparent border-none outline-none text-4xl font-black text-white placeholder:text-white/20 tracking-tight leading-tight"
          />
        </div>

        {/* Slug */}
        <div className="flex items-center gap-3 py-2 border-b border-white/[0.06]">
          <span className="text-xs font-mono text-text-muted shrink-0">hive.com/blog/</span>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm((prev) => ({ ...prev, slug: slugify(e.target.value) }))}
            placeholder="your-post-slug"
            className="flex-1 bg-transparent border-none outline-none text-xs font-mono text-brand-400 placeholder:text-text-muted/40"
          />
        </div>

        {/* Grid: excerpt + cover */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Excerpt */}
          <div className="bg-[#080e1f] border border-white/[0.06] rounded-2xl p-5">
            <label className="flex items-center gap-2 text-xs font-mono text-text-muted uppercase tracking-widest mb-3">
              <FileText className="w-3.5 h-3.5" />
              Excerpt
            </label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
              placeholder="A short summary of the post..."
              rows={4}
              className="w-full bg-transparent outline-none text-sm text-text-muted placeholder:text-text-muted/30 resize-none leading-relaxed"
            />
          </div>

          {/* Cover image */}
          <div className="bg-[#080e1f] border border-white/[0.06] rounded-2xl p-5">
            <label className="flex items-center gap-2 text-xs font-mono text-text-muted uppercase tracking-widest mb-3">
              <ImageIcon className="w-3.5 h-3.5" />
              Cover Image URL
            </label>
            <input
              type="url"
              value={form.cover_image}
              onChange={(e) => setForm((prev) => ({ ...prev, cover_image: e.target.value }))}
              placeholder="https://..."
              className="w-full bg-transparent outline-none text-sm text-text-muted placeholder:text-text-muted/30 mb-3"
            />
            {form.cover_image && (
              <div className="relative h-24 rounded-xl overflow-hidden border border-white/[0.06]">
                <img src={form.cover_image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Content editor */}
        <div className="bg-[#080e1f] border border-white/[0.06] rounded-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-white/[0.06]">
            {(["write", "preview"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3.5 text-xs font-mono uppercase tracking-widest transition-all ${
                  activeTab === tab
                    ? "text-white border-b-2 border-brand-500 bg-brand-500/5"
                    : "text-text-muted hover:text-white"
                }`}
              >
                {tab === "write" ? "✏️ Write" : "👁 Preview"}
              </button>
            ))}
            <div className="ml-auto flex items-center px-4 gap-2">
              {form.published ? (
                <button onClick={() => setForm(f => ({...f, published: false}))} className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300">
                  <EyeOff className="w-3 h-3" /> Unpublish on save
                </button>
              ) : (
                <button onClick={() => setForm(f => ({...f, published: true}))} className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300">
                  <Eye className="w-3 h-3" /> Publish on save
                </button>
              )}
            </div>
          </div>

          {activeTab === "write" ? (
            <textarea
              value={form.content}
              onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
              placeholder={`# Your post title\n\nStart writing in **Markdown**...\n\n## Section heading\n\nParagraph text here.`}
              className="w-full min-h-[500px] bg-transparent outline-none text-sm text-text-muted placeholder:text-text-muted/30 resize-y leading-[1.9] font-mono p-6"
            />
          ) : (
            <div className="p-6 min-h-[500px]">
              {form.content ? (
                <div className="prose prose-sm prose-invert max-w-none text-text-muted leading-[1.9] whitespace-pre-wrap text-sm font-mono">
                  {form.content}
                </div>
              ) : (
                <p className="text-text-muted/30 text-sm font-mono">Nothing to preview yet...</p>
              )}
            </div>
          )}
        </div>

        {/* Word count */}
        <div className="text-xs font-mono text-text-muted/40 text-right">
          {form.content.trim().split(/\s+/).filter(Boolean).length} words
          {" · "}
          ~{Math.max(1, Math.ceil(form.content.trim().split(/\s+/).filter(Boolean).length / 200))} min read
        </div>
      </main>
    </div>
  )
}

export { PostEditor }
