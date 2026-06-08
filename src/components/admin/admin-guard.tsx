"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

const ADMIN_SESSION_KEY = "hive_admin_session"

export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "authenticated"
}

export function loginAdmin() {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(ADMIN_SESSION_KEY, "authenticated")
  }
}

export function logoutAdmin() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(ADMIN_SESSION_KEY)
  }
}

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      router.replace("/admin")
    }
  }, [router])

  if (typeof window !== "undefined" && !isAdminLoggedIn()) {
    return null
  }

  return <>{children}</>
}
