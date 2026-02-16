'use client'

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Bookmark, Download, FileText, Printer, CheckCircle2 } from 'lucide-react'

export default function InvoiceModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px] bg-[#0A0A0F] border-white/10 p-0 overflow-hidden rounded-[2.5rem]">
                <div className="flex flex-col md:flex-row h-full">
                    {/* Invoice Sidebar */}
                    <div className="w-full md:w-64 bg-zinc-900/50 p-8 border-r border-white/5 flex flex-col justify-between">
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-gradient-aurora flex items-center justify-center">
                                    <Bookmark className="h-5 w-5 text-white" />
                                </div>
                                <span className="font-black italic text-xl text-white">SmartMarks</span>
                            </div>
                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-relaxed">Invoice Details</p>
                                <div className="space-y-1">
                                    <p className="text-xs text-white font-bold">#INV-2026-042</p>
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase">Issued FEB 17, 2026</p>
                                </div>
                                <div className="space-y-1 pt-4">
                                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Status</p>
                                    <div className="flex items-center gap-2 text-green-500">
                                        <CheckCircle2 className="h-4 w-4" />
                                        <span className="text-xs font-black uppercase tracking-widest">Paid In Full</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button className="w-full bg-white text-black font-black uppercase tracking-widest h-12 rounded-xl text-[10px] flex gap-2">
                                <Download className="h-4 w-4" /> Save as PDF
                            </Button>
                            <Button variant="ghost" className="w-full text-zinc-500 font-black uppercase tracking-widest h-12 rounded-xl text-[10px] flex gap-2 hover:bg-white/5">
                                <Printer className="h-4 w-4" /> Print Node
                            </Button>
                        </div>
                    </div>

                    {/* Invoice Content */}
                    <div className="flex-1 p-10 bg-white selection:bg-black selection:text-white">
                        <div className="flex justify-between items-start mb-20 text-black">
                            <DialogHeader>
                                <DialogTitle className="text-4xl font-black italic tracking-tighter uppercase leading-none mb-2 text-black">Invoice</DialogTitle>
                                <DialogDescription className="text-zinc-400 font-black text-xs uppercase tracking-widest">Protocol Service Receipt</DialogDescription>
                            </DialogHeader>
                            <div className="text-right space-y-1 text-black">
                                <p className="font-black italic text-lg leading-tight">Feb 17, 2026</p>
                                <p className="text-zinc-500 font-bold text-[9px] uppercase tracking-widest">San Francisco, CA 94103</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-12 mb-20 text-black">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Billed To</p>
                                <p className="font-black italic text-lg leading-tight uppercase">Authorized User Node</p>
                                <p className="text-zinc-500 font-bold text-xs">active-host@smartmarks.io</p>
                            </div>
                            <div className="space-y-1 text-right">
                                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Sender Node</p>
                                <p className="font-black italic text-lg leading-tight uppercase">SmartMarks Architect Inc.</p>
                                <p className="text-zinc-500 font-bold text-xs">billing@protocol.io</p>
                            </div>
                        </div>

                        <div className="space-y-6 mb-20 text-black">
                            <div className="grid grid-cols-4 pb-4 border-b-2 border-black text-[10px] font-black text-black/60 uppercase tracking-widest">
                                <span className="col-span-2">Description</span>
                                <span>Quantity</span>
                                <span className="text-right">Amount</span>
                            </div>
                            <div className="grid grid-cols-4 pb-4 border-b border-zinc-100 text-black">
                                <div className="col-span-2 space-y-1">
                                    <p className="font-black italic text-sm">PRO TIER NODE SERVICE</p>
                                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter italic">Month-to-month neural infrastructure access</p>
                                </div>
                                <span className="font-bold text-sm">01</span>
                                <span className="text-right font-black italic text-sm">$9.00</span>
                            </div>
                        </div>

                        <div className="flex justify-end pt-8 text-black">
                            <div className="w-64 space-y-4">
                                <div className="flex justify-between items-center text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                                    <span>Subtotal</span>
                                    <span>$9.00</span>
                                </div>
                                <div className="flex justify-between items-center text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                                    <span>Sync Tax (0%)</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t-2 border-black text-black">
                                    <span className="font-black uppercase tracking-[0.2em] text-xs">Total Node Due</span>
                                    <span className="text-2xl font-black italic">$9.00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
