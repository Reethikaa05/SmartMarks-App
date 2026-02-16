'use client'

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ShieldCheck, Lock, CreditCard, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

export default function StripeModal({ isOpen, onClose, planName, price }: { isOpen: boolean, onClose: () => void, planName: string, price: string }) {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)

    const handlePayment = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            toast.success("Payment Protocol Authenticated!")
            onClose()
        }, 2000)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[450px] bg-[#0A0A0F] border-white/10 p-0 overflow-hidden rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <div className="bg-[#635BFF] p-6 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-[-50%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-br from-white/20 to-transparent rotate-12 pointer-events-none" />
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="h-12 w-12 bg-white rounded-xl shadow-2xl flex items-center justify-center mb-4">
                            <CreditCard className="text-[#635BFF] h-6 w-6" />
                        </div>
                        <DialogHeader>
                            <DialogTitle className="text-white font-black uppercase tracking-widest text-xs opacity-80 text-center">Stripe Gateway</DialogTitle>
                            <DialogDescription className="sr-only">Securely process your payment for the selected plan.</DialogDescription>
                        </DialogHeader>
                        <p className="text-3xl font-black italic text-white mt-1">${price}.00</p>
                        <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-1">FOR {planName} NODE</span>
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1">Card Terminal Information</label>
                            <div className="relative">
                                <Input placeholder="4242 4242 4242 4242" className="bg-white/5 border-white/10 h-14 rounded-2xl text-white font-mono pl-12" />
                                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1">Expiry Hash</label>
                                <Input placeholder="MM / YY" className="bg-white/5 border-white/10 h-14 rounded-2xl text-white font-mono" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1">CVC Code</label>
                                <Input placeholder="•••" className="bg-white/5 border-white/10 h-14 rounded-2xl text-white font-mono" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1">Billing Geography</label>
                            <Input placeholder="United States" className="bg-white/5 border-white/10 h-14 rounded-2xl text-white font-bold" />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                        <ShieldCheck className="h-5 w-5 text-green-500" />
                        <p className="text-[10px] font-medium text-green-500/80 uppercase leading-snug">Encryption Layer Active. Payment processed via secure Stripe bridge.</p>
                    </div>

                    <Button
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full h-16 bg-[#635BFF] hover:bg-[#5249e0] text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all relative overflow-hidden group"
                    >
                        {loading ? (
                            <div className="flex items-center gap-3">
                                <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                <span>Verifying...</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-3">
                                <span>Pay with Stripe</span>
                                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        )}
                    </Button>

                    <div className="flex items-center justify-center gap-4 opacity-20 hover:opacity-40 transition-opacity">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6 grayscale-0 contrast-200" />
                        <div className="h-4 w-px bg-zinc-600" />
                        <Lock className="h-3 w-3 text-white" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">SSL SECURE</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
