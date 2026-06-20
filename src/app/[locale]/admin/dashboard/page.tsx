"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase, Post } from "@/lib/supabase"
import { AdminGuard, logoutAdmin } from "@/components/admin/admin-guard"
import { GlimpseLogo } from "@/components/ui/glimpse-logo"
import {
  Plus, Eye, EyeOff, Pencil, Trash2, LogOut,
  FileText, Globe, AlertCircle, CheckCircle2,
  BarChart3, Calendar
} from "lucide-react"

function DashboardContent() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null)

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  async function fetchPosts() {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchPosts() }, [])

  async function togglePublish(post: Post) {
    setTogglingId(post.id)
    const { error } = await supabase
      .from("posts")
      .update({
        published: !post.published,
        published_at: !post.published ? new Date().toISOString() : null,
      })
      .eq("id", post.id)

    if (error) {
      showToast("Failed to update post.", "error")
    } else {
      showToast(!post.published ? "Post published!" : "Post unpublished.")
      await fetchPosts()
    }
    setTogglingId(null)
  }

  async function deletePost(id: string) {
    if (!confirm("Delete this post permanently?")) return
    setDeletingId(id)
    const { error } = await supabase.from("posts").delete().eq("id", id)
    if (error) {
      showToast("Failed to delete post.", "error")
    } else {
      showToast("Post deleted.")
      setPosts((prev) => prev.filter((p) => p.id !== id))
    }
    setDeletingId(null)
  }

  function handleLogout() {
    logoutAdmin()
    router.replace("/admin")
  }

  const published = posts.filter((p) => p.published)
  const drafts = posts.filter((p) => !p.published)

  return (
    <div className="min-h-screen bg-[#030611] text-white">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-brand-500/5 blur-[150px] rounded-full" />
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-xl border text-sm font-medium shadow-2xl animate-in slide-in-from-top-2 fade-in duration-300 ${
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
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <GlimpseLogo className="h-7 w-7" />
            <div>
              <span className="text-base font-black tracking-widest text-white uppercase">HIVE</span>
              <span className="ml-2 text-xs text-brand-400 font-mono tracking-widest uppercase bg-brand-500/10 border border-brand-500/20 rounded px-1.5 py-0.5">Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/blog" target="_blank" className="flex items-center gap-2 text-xs text-text-muted hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/[0.04]">
              <Globe className="w-3.5 h-3.5" />
              View site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs text-text-muted hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-red-500/5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-6 lg:px-8 py-10">
        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Total Posts", value: posts.length, icon: FileText, color: "text-blue-400" },
            { label: "Published", value: published.length, icon: Globe, color: "text-emerald-400" },
            { label: "Drafts", value: drafts.length, icon: BarChart3, color: "text-amber-400" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#080e1f] border border-white/[0.06] rounded-2xl p-5 flex items-center gap-4">
              <div className={`p-2.5 rounded-xl bg-white/[0.04] ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-text-muted">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <Link
            href="/admin/dashboard/new"
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
          >
            <Plus className="w-4 h-4" />
            New Post
          </Link>
        </div>

        {/* Posts table */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-white/[0.03] border border-white/[0.06] rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-white/[0.08] rounded-3xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 mb-5">
              <FileText className="w-8 h-8 text-brand-400/60" />
            </div>
            <p className="text-white/50 mb-6">No posts yet. Create your first blog post!</p>
            <Link
              href="/admin/dashboard/new"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm"
            >
              <Plus className="w-4 h-4" />
              Create first post
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="group flex items-center gap-4 bg-[#080e1f] border border-white/[0.06] rounded-2xl px-6 py-4 hover:border-white/[0.12] transition-all duration-300"
              >
                {/* Status dot */}
                <div className={`w-2 h-2 rounded-full shrink-0 ${post.published ? "bg-emerald-400" : "bg-amber-400/60"}`} />

                {/* Title & meta */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold text-white text-sm truncate">{post.title}</h3>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border shrink-0 ${
                      post.published
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                    }`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-muted font-mono">
                    <span>/{post.slug}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {post.published && (
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-2 text-text-muted hover:text-white hover:bg-white/[0.06] rounded-lg transition-all"
                      title="View post"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  )}

                  <button
                    onClick={() => togglePublish(post)}
                    disabled={togglingId === post.id}
                    className={`p-2 rounded-lg transition-all disabled:opacity-50 ${
                      post.published
                        ? "text-amber-400 hover:bg-amber-500/10"
                        : "text-emerald-400 hover:bg-emerald-500/10"
                    }`}
                    title={post.published ? "Unpublish" : "Publish"}
                  >
                    {togglingId === post.id ? (
                      <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                    ) : post.published ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Globe className="w-4 h-4" />
                    )}
                  </button>

                  <Link
                    href={`/admin/dashboard/edit/${post.id}`}
                    className="p-2 text-text-muted hover:text-brand-400 hover:bg-brand-500/10 rounded-lg transition-all"
                    title="Edit post"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => deletePost(post.id)}
                    disabled={deletingId === post.id}
                    className="p-2 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50"
                    title="Delete post"
                  >
                    {deletingId === post.id ? (
                      <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <DashboardContent />
    </AdminGuard>
  )
}
