'use client'

import React, { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Check, Chrome, Loader2, Github, Mail } from 'lucide-react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

export default function AuthButton({
    nextUrl,
    text = 'Continue with Google',
    className,
    provider = 'google',
    icon
}: {
    nextUrl?: string
    text?: string
    className?: string
    provider?: 'google' | 'github'
    icon?: React.ReactNode
}) {
    const supabase = createClient()
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleLogin = async () => {
        setIsLoading(true)
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: provider,
                options: {
                    redirectTo: `${location.origin}/auth/callback?next=${nextUrl || '/dashboard'}`,
                },
            })
            if (error) throw error

            // Show Success Animation briefly before redirect
            setIsSuccess(true)
            toast.success(`Redirecting to ${provider}...`)

        } catch (error) {
            console.error('Login error:', error)
            toast.error(`Could not connect to ${provider}`)
            setIsLoading(false)
        }
    }

    return (
        <Button
            onClick={handleLogin}
            className={className}
            variant="outline"
            disabled={isLoading || isSuccess}
        >
            <AnimatePresence mode='wait'>
                {isSuccess ? (
                    <motion.div
                        key="success"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center text-green-500 font-bold"
                    >
                        <Check className="mr-2 h-5 w-5" />
                        Success!
                    </motion.div>
                ) : isLoading ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center"
                    >
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                    </motion.div>
                ) : (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center"
                    >
                        {icon || (provider === 'google' ? <Chrome className="mr-2 h-4 w-4" /> : <Github className="mr-2 h-4 w-4" />)}
                        {text}
                    </motion.div>
                )}
            </AnimatePresence>
        </Button>
    )
}
