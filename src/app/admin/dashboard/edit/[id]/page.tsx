"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase, Post } from "@/lib/supabase"
import { AdminGuard } from "@/components/admin/admin-guard"
import { PostEditor } from "@/components/admin/post-editor"

function EditPostContent() {
  const params = useParams()
  const id = params?.id as string
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) return
    async function fetchPost() {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single()
      if (data) {
        setPost(data)
      } else {
        setNotFound(true)
      }
      setLoading(false)
    }
    fetchPost()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030611] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-[#030611] flex items-center justify-center text-white/50">
        Post not found.
      </div>
    )
  }

  return <PostEditor mode="edit" postId={post.id} initialData={post} />
}

export default function EditPostPage() {
  return (
    <AdminGuard>
      <EditPostContent />
    </AdminGuard>
  )
}
