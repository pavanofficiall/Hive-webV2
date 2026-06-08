"use client"

import { AdminGuard } from "@/components/admin/admin-guard"
import { PostEditor } from "@/components/admin/post-editor"

function NewPostContent() {
  return <PostEditor mode="new" />
}

export default function NewPostPage() {
  return (
    <AdminGuard>
      <NewPostContent />
    </AdminGuard>
  )
}
