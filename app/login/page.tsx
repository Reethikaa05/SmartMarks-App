'use client'

import React, { useState } from 'react'
import AuthButton from '@/components/auth-button'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { Bookmark, Github, Mail, Chrome, ArrowRight, Loader2, Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { toast } from 'sonner'
import { createClient } from '@/utils/supabase/client'

export default function Login() {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Email State
    const [showEmailInput, setShowEmailInput] = useState(false)
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isEmailSent, setIsEmailSent] = useState(false)

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsLoading(true)
        const supabase = createClient()

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    shouldCreateUser: true,
                    emailRedirectTo: `${location.origin}/auth/callback`,
                }
            })

            if (error) throw error

            setIsEmailSent(true)
            toast.success("Magic link sent! Check your inbox.")
        } catch (error) {
            console.error(error)
            toast.error("Error sending magic link.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div
            className="flex min-h-screen items-center justify-center p-4 w-full relative overflow-hidden bg-[#02000d] selection:bg-purple-500/30 font-sans"
            onMouseMove={handleMouseMove}
        >

            {/* Background Spotlights */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-500/10 blur-[130px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 blur-[100px] rounded-full" />
                <div className="absolute inset-0 bg-dot-white opacity-[0.02]" />
            </div>

            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 lg:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            600px circle at ${mouseX}px ${mouseY}px,
                            rgba(168, 85, 247, 0.1),
                            transparent 80%
                        )
                    `,
                }}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="mb-10 text-center space-y-4">
                    <Link href="/" className="inline-flex items-center gap-3 group">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-aurora flex items-center justify-center shadow-2xl shadow-purple-500/20 group-hover:scale-110 transition-all duration-300">
                            <Bookmark className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-3xl font-black tracking-tighter text-white">SmartMarks</span>
                    </Link>
                </div>

                <div className="relative group rounded-[2.5rem] border border-white/5 bg-zinc-900/40 backdrop-blur-3xl p-[1px] overflow-hidden transition-all hover:border-white/10 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-aurora opacity-10 group-hover:opacity-20 transition-opacity" />

                    <div className="relative bg-[#02000d]/80 rounded-[2.4rem] p-8 sm:p-12">

                        {/* Header */}
                        <div className="text-center space-y-3 mb-10">
                            <div className="flex justify-center mb-2">
                                <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-black uppercase tracking-widest text-purple-400">
                                    Trusted by 10k+ creators
                                </div>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase italic">
                                {isEmailSent ? "Check Inbox" : "Welcome Back"}
                            </h1>
                            <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
                                {isEmailSent ? `Magic link sent to ${email}` : "Enter the sanctuary of focus."}
                            </p>
                        </div>

                        {/* Success State for Email */}
                        {isEmailSent ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-8"
                            >
                                <div className="h-20 w-20 bg-green-500/10 rounded-3xl flex items-center justify-center mb-6 border border-green-500/20 shadow-[0_0_50px_-5px_rgba(34,197,94,0.3)]">
                                    <Check className="h-10 w-10 text-green-400" />
                                </div>
                                <Button
                                    variant="ghost"
                                    onClick={() => { setIsEmailSent(false); setShowEmailInput(false); }}
                                    className="text-zinc-500 hover:text-white font-bold uppercase tracking-widest text-xs h-auto"
                                >
                                    Back to Login
                                </Button>
                            </motion.div>
                        ) : (
                            <div className="space-y-6">
                                {!showEmailInput ? (
                                    <>
                                        <AuthButton
                                            className="w-full h-14 bg-white text-black hover:bg-zinc-200 border-0 font-black uppercase tracking-widest rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-white/5"
                                            text="Login with Google"
                                            provider="google"
                                            icon={<Chrome className="mr-3 h-5 w-5 fill-current" />}
                                        />

                                        <div className="relative my-8">
                                            <div className="absolute inset-0 flex items-center">
                                                <span className="w-full border-t border-white/5" />
                                            </div>
                                            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.3em]">
                                                <span className="bg-[#0c091a]/80 px-4 text-zinc-600 backdrop-blur-sm">Secure Access</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <AuthButton
                                                className="h-14 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 text-zinc-400 hover:text-white transition-all font-bold uppercase tracking-widest text-xs"
                                                text="GitHub"
                                                provider="github"
                                                icon={<Github className="mr-2 h-5 w-5" />}
                                            />
                                            <button
                                                onClick={() => setShowEmailInput(true)}
                                                className="flex items-center justify-center h-14 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 transition-all text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-widest"
                                            >
                                                <Mail className="mr-2 h-5 w-5" /> Email
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    /* Email Form */
                                    <motion.form
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        onSubmit={handleEmailLogin}
                                        className="space-y-4"
                                    >
                                        <div className="space-y-2 text-left px-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
                                            <Input
                                                type="email"
                                                placeholder="name@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="h-14 bg-white/5 border-white/5 focus:border-purple-500/50 focus:ring-purple-500/10 rounded-2xl text-white placeholder:text-zinc-700"
                                                autoFocus
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full h-14 rounded-2xl bg-gradient-aurora hover:scale-[1.02] active:scale-[0.98] transition-all font-black uppercase tracking-widest text-white shadow-xl shadow-purple-500/20"
                                        >
                                            {isLoading ? <Loader2 className="animate-spin h-6 w-6" /> : <span className="flex items-center">Magic Link <ArrowRight className="ml-2 h-5 w-5" /></span>}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            className="w-full text-zinc-600 hover:text-zinc-300 font-bold uppercase tracking-widest text-[10px]"
                                            onClick={() => setShowEmailInput(false)}
                                        >
                                            Go Back
                                        </Button>
                                    </motion.form>
                                )}
                            </div>
                        )}

                        <div className="mt-12 text-center">
                            <p className="text-[9px] text-zinc-700 font-black uppercase tracking-[0.2em] leading-relaxed">
                                Protected by <span className="text-zinc-500">SmartAuth™</span> Enforced.
                                <br />
                                Built with Supabase Architecture.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <StarsIcon className="absolute -top-6 -right-6 h-12 w-12 text-purple-500/20 blur-[2px]" />
                <div className="absolute -bottom-8 -left-8 h-32 w-32 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-700" />

            </motion.div>
        </div>
    )
}

function StarsIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /><path d="M19 3v4" /><path d="M21 5h-4" /></svg>
}
