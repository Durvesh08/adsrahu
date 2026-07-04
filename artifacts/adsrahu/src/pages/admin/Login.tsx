import React, { useState } from "react";
import { useLocation } from "wouter";
import { Eye, EyeOff, Lock, Shield } from "lucide-react";
import { login } from "@/lib/admin-auth";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const success = await login(password);
      if (success) {
        setLocation("/admin/dashboard");
      } else {
        setError("Invalid password. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Login failed. Please check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#020408] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(59,130,246,0.1) 0%, transparent 70%)'}} />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-indigo-600/8 blur-[100px]" />

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-amber-400/25 blur-lg animate-pulse" />
              <div className="relative w-16 h-16 rounded-full border border-amber-400/40 overflow-hidden" style={{boxShadow:'0 0 30px rgba(251,191,36,0.3)'}}>
                <img src="/logo.jpg" alt="Adsrahu" className="absolute w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Admin Panel</h1>
          <p className="text-gray-500 text-sm">Sign in to manage <span className="text-white font-medium">Adsrahu</span></p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#060912]/80 backdrop-blur-xl p-8" style={{boxShadow:'0 0 60px rgba(59,130,246,0.06)'}}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-11 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all"
                  required
                  data-testid="input-admin-password"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              data-testid="button-admin-login"
              className="w-full h-11 rounded-xl btn-premium font-semibold text-sm text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Sign In Securely
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          Adsrahu Admin Portal · Restricted Access
        </p>
      </div>
    </div>
  );
}
