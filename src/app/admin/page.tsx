"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GlimpseLogo } from "@/components/ui/glimpse-logo"
import { loginAdmin } from "@/components/admin/admin-guard"
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react"

const ADMIN_EMAIL = "pavan@hive.com"
const ADMIN_PASSWORD = "Pvn@77HivegoO"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    await new Promise((r) => setTimeout(r, 600)) // simulated delay

    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      loginAdmin()
      router.push("/admin/dashboard")
    } else {
      setError("Invalid credentials. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#030611] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-500/8 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-900/5 blur-[120px] rounded-full" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <GlimpseLogo className="h-9 w-9" />
            <span className="text-2xl font-black tracking-widest text-white uppercase">HIVE</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono text-text-muted tracking-widest uppercase">
            <Lock className="w-3 h-3 text-brand-400" />
            Admin Portal
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#080e1f] border border-white/[0.08] rounded-3xl p-8 shadow-[0_0_80px_rgba(59,130,246,0.06)]">
          <h1 className="text-xl font-bold text-white mb-2">Sign in</h1>
          <p className="text-sm text-text-muted mb-8">Access the Hive blog admin dashboard.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-text-muted mb-2 uppercase tracking-widest">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="admin@hive.com"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-text-muted/40 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-text-muted mb-2 uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-11 pr-12 py-3.5 text-sm text-white placeholder:text-text-muted/40 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-brand-500 hover:bg-brand-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 text-sm shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Sign in to Dashboard"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-text-muted/40 mt-8 font-mono">
          © {new Date().getFullYear()} HIVE by Nexaworks
        </p>
      </div>
    </div>
  )
}
