'use client'

import React, { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import {
    Bookmark,
    LayoutDashboard,
    CreditCard,
    HelpCircle,
    Settings,
    LogOut,
    Search,
    Plus,
    Globe,
    Hash,
    Star,
    Zap,
    Shield,
    Check,
    Menu,
    X,
    Bell,
    User,
    ArrowRight,
    Lock,
    Cpu,
    Sparkles,
    Trash2,
    Clock,
    CreditCard as CardIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import BookmarkList from '@/components/bookmark-list'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import StripeModal from '@/components/stripe-modal'
import InvoiceModal from '@/components/invoice-modal'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('bookmarks')
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push('/login')
                return
            }
            setUser(user)
            setLoading(false)
        }
        getUser()
    }, [supabase, router])

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            toast.error("Error signing out")
        } else {
            router.push('/')
            toast.success("Successfully signed out. See you soon!")
        }
    }

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[#02000d]">
                <div className="relative">
                    <div className="h-20 w-20 rounded-full border-b-2 border-purple-500 animate-spin" />
                    <Bookmark className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-purple-500" />
                </div>
            </div>
        )
    }

    return (
        <div className="flex h-screen w-full bg-[#02000d] text-foreground overflow-hidden font-sans">

            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-dot-white opacity-[0.03]" />
            </div>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/5 bg-[#050110] backdrop-blur-xl transition-all duration-500 md:relative",
                    isSidebarOpen ? "w-72" : "w-0 md:w-20 -translate-x-full md:translate-x-0"
                )}
            >
                <div className="flex h-20 items-center px-8 border-b border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-2xl bg-gradient-aurora flex items-center justify-center shadow-2xl shadow-purple-500/20">
                            <Bookmark className="h-5 w-5 text-white" />
                        </div>
                        {isSidebarOpen && (
                            <div className="flex flex-col">
                                <span className="font-black italic tracking-tighter text-xl text-white">SmartMarks</span>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Pro Edition</span>
                            </div>
                        )}
                    </div>
                </div>

                <nav className="flex-1 space-y-2 p-6 mt-4">
                    <SidebarItem
                        icon={<LayoutDashboard className="h-5 w-5" />}
                        label="Vault"
                        active={activeTab === 'bookmarks'}
                        onClick={() => setActiveTab('bookmarks')}
                        collapsed={!isSidebarOpen}
                    />
                    <SidebarItem
                        icon={<Sparkles className="h-5 w-5" />}
                        label="AI Features"
                        active={activeTab === 'features'}
                        onClick={() => setActiveTab('features')}
                        collapsed={!isSidebarOpen}
                    />
                    <SidebarItem
                        icon={<HelpCircle className="h-5 w-5" />}
                        label="Protocol"
                        active={activeTab === 'how-it-works'}
                        onClick={() => setActiveTab('how-it-works')}
                        collapsed={!isSidebarOpen}
                    />
                    <div className="my-6 border-t border-white/5 mx-2" />
                    <SidebarItem
                        icon={<CreditCard className="h-5 w-5" />}
                        label="Billing & Plan"
                        active={activeTab === 'billing'}
                        onClick={() => setActiveTab('billing')}
                        collapsed={!isSidebarOpen}
                    />
                    <SidebarItem
                        icon={<Settings className="h-5 w-5" />}
                        label="Security"
                        active={activeTab === 'settings'}
                        onClick={() => setActiveTab('settings')}
                        collapsed={!isSidebarOpen}
                    />
                </nav>

                <div className="p-6 border-t border-white/5 space-y-6">
                    {isSidebarOpen && (
                        <div className="rounded-[2rem] bg-gradient-to-br from-purple-500/10 to-indigo-500/10 p-6 border border-purple-500/20 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-aurora opacity-0 group-hover:opacity-5 transition-opacity" />
                            <p className="text-[10px] font-black text-purple-400 mb-2 uppercase tracking-widest">Storage Status</p>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-2">
                                <div className="h-full w-[12%] bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                            </div>
                            <p className="text-xs text-zinc-500 font-bold mb-4">12 / 1,000 Saved</p>
                            <Button size="sm" className="w-full h-10 bg-white text-black hover:bg-zinc-200 text-[10px] font-black uppercase tracking-widest rounded-xl" onClick={() => setActiveTab('billing')}>
                                UPGRADE VAULT
                            </Button>
                        </div>
                    )}
                    <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-4 px-4 py-3 text-zinc-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all group"
                    >
                        <LogOut className="h-5 w-5" />
                        {isSidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative z-10">
                {/* Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-[#02000d]/80 backdrop-blur-md sticky top-0 z-20">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-3 hover:bg-white/5 rounded-xl text-zinc-500 hover:text-white transition-all border border-white/5"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                        <div className="flex flex-col">
                            <h2 className="text-xl font-black uppercase italic italic text-white leading-tight">
                                {activeTab.replace('-', ' ')}
                            </h2>
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Accessing Node_01</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        {activeTab === 'bookmarks' && (
                            <div className="hidden lg:flex items-center bg-white/5 border border-white/5 rounded-2xl px-4 py-2 w-96 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all group">
                                <Search className="h-4 w-4 text-zinc-600 group-focus-within:text-purple-400" />
                                <input
                                    type="text"
                                    placeholder="Neural Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-transparent border-none outline-none text-xs w-full ml-3 text-zinc-300 placeholder:text-zinc-700 font-bold"
                                />
                                <div className="flex items-center gap-1 opacity-20">
                                    <kbd className="h-5 px-1.5 rounded bg-white/10 text-[10px] font-black">⌘</kbd>
                                    <kbd className="h-5 px-1.5 rounded bg-white/10 text-[10px] font-black">K</kbd>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-xs font-black text-white">{user?.email?.split('@')[0]}</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-purple-400">Authenticated Member</span>
                            </div>
                            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 p-[1px] flex items-center justify-center shadow-2xl">
                                <div className="h-full w-full rounded-2xl bg-[#02000d] flex items-center justify-center text-sm font-black text-white hover:bg-zinc-900 transition-colors overflow-hidden">
                                    {user?.user_metadata?.avatar_url ? (
                                        <img src={user.user_metadata.avatar_url} alt="Profile" className="h-full w-full object-cover" />
                                    ) : (
                                        user?.email?.charAt(0).toUpperCase()
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-10 bg-[#02000d]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.02, y: -10 }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                            className="max-w-7xl mx-auto h-full"
                        >
                            {activeTab === 'bookmarks' && <BookmarkList searchQuery={searchQuery} />}
                            {activeTab === 'features' && <FeaturesView />}
                            {activeTab === 'how-it-works' && <HowItWorksView />}
                            {activeTab === 'billing' && <BillingView />}
                            {activeTab === 'settings' && <SettingsView user={user} />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    )
}

function SidebarItem({ icon, label, active, onClick, collapsed }: { icon: any, label: string, active: boolean, onClick: () => void, collapsed: boolean }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex w-full items-center gap-4 px-4 py-3.5 rounded-2xl transition-all relative group overflow-hidden",
                active
                    ? "bg-white/5 text-white shadow-2xl border border-white/5"
                    : "text-zinc-500 hover:text-white hover:bg-white/[0.03] border border-transparent"
            )}
        >
            {active && <div className="absolute inset-0 bg-gradient-aurora opacity-10" />}
            <div className={cn(
                "transition-colors",
                active ? "text-purple-400" : "group-hover:text-purple-300"
            )}>
                {icon}
            </div>
            {!collapsed && <span className="text-xs font-black uppercase tracking-widest">{label}</span>}
            {active && !collapsed && (
                <div className="absolute right-4 h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
            )}
        </button>
    )
}

function FeaturesView() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
                { title: "Semantic Analysis", desc: "AI reconstructs the context of your links for instant recall.", icon: <Cpu />, color: "text-blue-400" },
                { title: "Neural Sync", desc: "Z-latency synchronization across all edge nodes.", icon: <Zap />, color: "text-yellow-400" },
                { title: "Private Vault", desc: "E2EE layers prevent any data extraction attempts.", icon: <Shield />, color: "text-green-400" },
                { title: "Auto-Tagging", desc: "Smart categorization based on site content.", icon: <Star />, color: "text-purple-400" },
                { title: "Web Snaps", desc: "Offline archival of critical web documentation.", icon: <Globe />, color: "text-pink-400" },
                { title: "Legacy Export", desc: "Port your data to any platform via flat-file JSON.", icon: <LogOut />, color: "text-zinc-400" },
            ].map((f, i) => (
                <div key={i} className="relative p-6 rounded-3xl border border-white/5 bg-zinc-900/30 backdrop-blur-sm group hover:border-purple-500/20 transition-all">
                    <div className={cn("h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-all", f.color)}>
                        {f.icon}
                    </div>
                    <h3 className="text-xl font-black uppercase italic text-white mb-3 tracking-tight">{f.title}</h3>
                    <p className="text-zinc-500 font-medium leading-relaxed text-sm">{f.desc}</p>
                </div>
            ))}
        </div>
    )
}

function HowItWorksView() {
    return (
        <div className="max-w-4xl mx-auto space-y-20 pb-20">
            <div className="text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-black uppercase tracking-widest text-purple-400">
                    SmartMarks Protocol v4.2
                </div>
                <h1 className="text-5xl font-black uppercase italic italic text-white">System Integration</h1>
                <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">A comprehensive architectual overview.</p>
            </div>

            <div className="space-y-10">
                {[
                    { step: "01", title: "NODE INSTALLATION", desc: "Deploy the browser companion to your local machine. It creates a secure tunnel between your browsing session and the cloud vault." },
                    { step: "02", title: "NEURAL INGESTION", desc: "Capture resources with CMD+S. Our AI decomposes site metadata, identifies key entities, and generates high-level summaries." },
                    { step: "03", title: "GLOBAL RECALL", desc: "Access via the dashboard or internal command bar. Search using natural memory concepts instead of specific keywords." }
                ].map((s, i) => (
                    <div key={i} className="flex gap-12 group p-8 rounded-3xl bg-zinc-900/20 border border-white/5 hover:border-purple-500/20 transition-all">
                        <span className="text-6xl font-black text-white/5 group-hover:text-purple-500/10 transition-all italic leading-none">{s.step}</span>
                        <div className="space-y-3 pt-2">
                            <h3 className="text-xl font-black uppercase italic text-white group-hover:text-purple-400 transition-colors">{s.title}</h3>
                            <p className="text-zinc-500 font-medium text-base leading-relaxed">{s.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function BillingView() {
    const [isStripeOpen, setIsStripeOpen] = useState(false)
    const [isInvoiceOpen, setIsInvoiceOpen] = useState(false)

    return (
        <div className="space-y-12 pb-20">
            <StripeModal
                isOpen={isStripeOpen}
                onClose={() => setIsStripeOpen(false)}
                planName="PRO"
                price="9"
            />
            <InvoiceModal
                isOpen={isInvoiceOpen}
                onClose={() => setIsInvoiceOpen(false)}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Active Plan */}
                <div className="lg:col-span-2 p-10 rounded-[2.5rem] border border-white/5 bg-zinc-900/30 backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8">
                        <Clock className="h-16 w-16 text-white/5 group-hover:text-purple-500/5 transition-all" />
                    </div>
                    <div className="space-y-8 relative z-10">
                        <div className="space-y-2">
                            <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Active Subscription</p>
                            <h3 className="text-3xl font-black uppercase italic text-white">PRO TIER</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-zinc-600 uppercase">Renewal Date</p>
                                <p className="text-lg font-black text-white italic">March 15, 2026</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-zinc-600 uppercase">Monthly Investment</p>
                                <p className="text-lg font-black text-white italic">$9.00 / MO</p>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/5 flex gap-4">
                            <Button className="h-12 px-8 rounded-xl bg-white text-black font-black uppercase tracking-widest hover:bg-zinc-200" onClick={() => setIsStripeOpen(true)}>Upgrade Node</Button>
                            <Button variant="ghost" className="h-12 px-8 rounded-xl text-zinc-500 border border-white/5 font-black uppercase tracking-widest hover:bg-white/5">Cancel</Button>
                        </div>
                    </div>
                </div>

                {/* Secure Methods */}
                <div className="p-10 rounded-[2.5rem] bg-gradient-aurora flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer" onClick={() => setIsStripeOpen(true)}>
                    <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-20 transition-opacity" />
                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-3">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4 brightness-0 invert" />
                            <div className="h-1 w-1 rounded-full bg-white/40" />
                            <h3 className="text-xs font-black uppercase italic text-white">Secure Relay</h3>
                        </div>
                        <div className="h-12 w-20 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                            <Lock className="h-6 w-6 text-white" />
                        </div>
                        <p className="text-[10px] font-black italic text-white/80 uppercase tracking-widest leading-relaxed">System-wide encryption enabled. Your billing identity is protected by the Stripe Secure Bridge.</p>
                    </div>
                    <Button className="w-full h-14 bg-white text-black font-black uppercase tracking-widest rounded-2xl shadow-xl transition-all mt-10">SYNC STRIPE NODE</Button>
                </div>
            </div>

            <div className="space-y-8">
                <h3 className="text-2xl font-black uppercase italic text-white pl-4">Payment Node</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col justify-between hover:border-purple-500/30 transition-all cursor-pointer group" onClick={() => setIsStripeOpen(true)}>
                        <div className="flex justify-between items-start">
                            <div className="h-10 w-16 bg-blue-600/20 rounded-lg flex items-center justify-center font-black italic text-xs text-blue-400 border border-blue-500/20">VISA</div>
                            <Check className="h-5 w-5 text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        </div>
                        <div className="mt-10">
                            <p className="text-xl font-black text-white tracking-widest italic leading-none">•••• 4242</p>
                            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-2">Exp: 12 / 2028</p>
                        </div>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="p-8 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-4 text-zinc-700 hover:text-white hover:border-white/20 transition-all group cursor-pointer">
                                <div className="h-12 w-12 rounded-full border border-dashed border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-all">
                                    <Plus className="h-6 w-6" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest">Connect Node</span>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md bg-[#050110] border-white/10">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-black uppercase italic text-white">Initialize Payment Node</DialogTitle>
                                <DialogDescription className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
                                    Securely connect your financial protocols.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6 py-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1">Card Identification</label>
                                    <Input placeholder="0000 0000 0000 0000" className="bg-white/5 border-white/5 h-14 rounded-2xl text-white font-mono" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1">Expiry Hash</label>
                                        <Input placeholder="MM / YY" className="bg-white/5 border-white/5 h-14 rounded-2xl text-white font-mono" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1">Security Node (CVC)</label>
                                        <Input placeholder="•••" className="bg-white/5 border-white/5 h-14 rounded-2xl text-white font-mono" />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button className="w-full h-14 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95" onClick={() => toast.success("Payment Protocol Activated")}>
                                    Activate Node
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="space-y-8">
                <h3 className="text-2xl font-black uppercase italic text-white pl-4">Protocol Logs</h3>
                <div className="rounded-[2.5rem] border border-white/5 bg-zinc-900/30 overflow-hidden shadow-2xl border-b-none">
                    <div className="grid grid-cols-4 p-8 border-b border-white/5 bg-white/[0.02] text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                        <span>TIMESTAMP</span>
                        <span>VALUE</span>
                        <span>HASH</span>
                        <span className="text-right">OPERATION</span>
                    </div>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="grid grid-cols-4 p-8 border-b border-white/5 text-xs font-bold text-zinc-500 group hover:bg-white/[0.02] transition-colors">
                            <span className="text-zinc-400 font-black italic">FEB 1{i}, 2026</span>
                            <span className="text-white font-black italic">$9.00 USD</span>
                            <span className="font-mono text-[10px] opacity-30 group-hover:opacity-100 transition-opacity">0x882...12A</span>
                            <span className="text-right text-purple-400 cursor-pointer hover:underline font-black uppercase text-[10px]" onClick={() => setIsInvoiceOpen(true)}>VERIFY NODE</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function SettingsView({ user }: { user: any }) {
    const supabase = createClient()
    const router = useRouter()
    const [name, setName] = useState(user?.user_metadata?.full_name || '')
    const [isUpdating, setIsUpdating] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleUpdateProfile = async () => {
        setIsUpdating(true)
        try {
            const { error } = await supabase.auth.updateUser({
                data: { full_name: name }
            })
            if (error) throw error
            toast.success("Identity Matrix Updated")
        } catch (error) {
            toast.error("Failed to sync identity")
        } finally {
            setIsUpdating(false)
        }
    }

    const handleDeleteAccount = async () => {
        if (!confirm("CRITICAL: Are you sure? This will purge your entire cloud vault permanently.")) return

        setIsDeleting(true)
        try {
            // First delete all bookmarks (RLS handles this but good to be explicit for the user experience)
            const { error: deleteError } = await supabase
                .from('bookmarks')
                .delete()
                .eq('user_id', user.id)

            if (deleteError) throw deleteError

            // Log out the user (In a real app, you'd trigger a cloud function to delete the auth user)
            await supabase.auth.signOut()
            router.push('/')
            toast.success("Vault Purged. Account association terminated.")
        } catch (error) {
            toast.error("Failed to execute self-destruct")
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className="max-w-2xl space-y-16 pb-20">
            <div className="space-y-8">
                <h3 className="text-2xl font-black uppercase italic text-white flex items-center gap-4">
                    <User className="h-7 w-7 text-purple-500" /> Identity Matrix
                </h3>
                <div className="p-10 rounded-[3rem] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl space-y-10 group hover:bg-zinc-900/60 transition-all">
                    <div className="flex items-center gap-8">
                        <div className="h-24 w-24 rounded-[2rem] bg-gradient-aurora p-[2px] shadow-2xl">
                            <div className="h-full w-full rounded-[1.9rem] bg-zinc-900 flex items-center justify-center text-4xl font-black italic text-white overflow-hidden">
                                {user?.user_metadata?.avatar_url ? (
                                    <img src={user.user_metadata.avatar_url} alt="Avatar" className="h-full w-full object-cover" />
                                ) : (
                                    user?.email?.charAt(0).toUpperCase()
                                )}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-[9px] font-black uppercase tracking-widest text-green-400 mb-1">
                                Node Host Active
                            </div>
                            <p className="font-black text-white text-3xl italic leading-none truncate max-w-[300px]">{user?.email}</p>
                            <p className="text-zinc-600 font-black uppercase tracking-widest text-[10px]">Authorized Root User</p>
                        </div>
                    </div>

                    <div className="space-y-6 pt-10 border-t border-white/5">
                        <div className="grid gap-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1">Universal Display Handle</label>
                            <Input
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-white/5 border-white/5 focus:border-purple-500/50 rounded-2xl h-14 text-white font-bold"
                            />
                        </div>
                        <Button
                            onClick={handleUpdateProfile}
                            disabled={isUpdating}
                            className="h-14 px-10 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95"
                        >
                            {isUpdating ? "Syncing..." : "Update node profile"}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <h3 className="text-2xl font-black uppercase italic text-red-500 flex items-center gap-4">
                    <Trash2 className="h-7 w-7" /> SELF-DESTRUCT
                </h3>
                <div className="p-10 rounded-[3rem] border border-red-500/10 bg-red-500/[0.02] space-y-6 backdrop-blur-sm group hover:bg-red-500/[0.05] transition-all">
                    <p className="text-sm text-zinc-500 font-medium uppercase tracking-[0.1em] italic leading-relaxed">
                        Initializing account deletion will purge all neural associations and permanently clear your cloud vault. This action cannot be reverted.
                    </p>
                    <Button
                        variant="destructive"
                        onClick={handleDeleteAccount}
                        disabled={isDeleting}
                        className="bg-red-500/10 hover:bg-red-500/30 text-red-500 border border-red-500/20 h-14 px-10 rounded-2xl font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-red-500/10"
                    >
                        {isDeleting ? "Terminating..." : "Execute Deletion"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

function SidebarIcon({ children, className }: { children: any, className?: string }) {
    return <div className={cn("h-10 w-10 flex items-center justify-center", className)}>{children}</div>
}
