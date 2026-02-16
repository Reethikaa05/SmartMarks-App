'use client'

import { useState, useMemo, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Plus, Trash2, Globe, Copy, Check, Edit2, Search, Filter, MoreVertical, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from '@/lib/utils'

export type Bookmark = {
    id: string
    title: string
    url: string
    created_at: string
}

export default function BookmarkList({ searchQuery = "" }: { searchQuery?: string }) {
    const supabase = createClient()
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
    const [loading, setLoading] = useState(true)
    const [adding, setAdding] = useState(false)
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [copiedId, setCopiedId] = useState<string | null>(null)

    // Edit State
    const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null)
    const [editTitle, setEditTitle] = useState('')
    const [editUrl, setEditUrl] = useState('')

    // Fetch Bookmarks
    const fetchBookmarks = async () => {
        try {
            const { data, error } = await supabase
                .from('bookmarks')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setBookmarks(data || [])
        } catch (error) {
            console.error('Error fetching bookmarks:', error)
            toast.error('Failed to load bookmarks')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBookmarks()
    }, [])

    const addBookmark = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title || !url) return

        setAdding(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('Not authenticated')

            const { data, error } = await supabase
                .from('bookmarks')
                .insert([{ title, url, user_id: user.id }])
                .select()
                .single()

            if (error) throw error

            setBookmarks([data, ...bookmarks])
            setTitle('')
            setUrl('')
            toast.success('Bookmark saved to vault!')
        } catch (error) {
            console.error('Error adding bookmark:', error)
            toast.error('Failed to add bookmark')
        } finally {
            setAdding(false)
        }
    }

    const deleteBookmark = async (id: string) => {
        try {
            const { error } = await supabase
                .from('bookmarks')
                .delete()
                .eq('id', id)

            if (error) throw error

            setBookmarks(bookmarks.filter((b) => b.id !== id))
            toast.success('Removed from collection')
        } catch (error) {
            console.error('Error deleting bookmark:', error)
            toast.error('Failed to delete bookmark')
        }
    }

    const updateBookmark = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!editingBookmark || !editTitle || !editUrl) return

        try {
            const { error } = await supabase
                .from('bookmarks')
                .update({ title: editTitle, url: editUrl })
                .eq('id', editingBookmark.id)

            if (error) throw error

            setBookmarks(bookmarks.map(b =>
                b.id === editingBookmark.id ? { ...b, title: editTitle, url: editUrl } : b
            ))
            setEditingBookmark(null)
            toast.success('Changes protected and saved')
        } catch (error) {
            console.error('Error updating bookmark:', error)
            toast.error('Update failed')
        }
    }

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text)
        setCopiedId(id)
        toast.success("Link copied")
        setTimeout(() => setCopiedId(null), 2000)
    }

    // "AI" Search & Filter
    const filteredBookmarks = useMemo(() => {
        return bookmarks.filter(b =>
            b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.url.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [bookmarks, searchQuery])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="h-12 w-12 rounded-full border-t-2 border-purple-500 animate-spin" />
                <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs">Accessing Cloud Vault...</p>
            </div>
        )
    }

    return (
        <div className="space-y-10">
            {/* Add Section */}
            <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-3xl overflow-hidden rounded-3xl group transition-all hover:bg-zinc-900/60 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-aurora opacity-10" />
                <CardHeader>
                    <CardTitle className="text-xl font-black uppercase italic italic flex items-center gap-2">
                        <Plus className="h-5 w-5 text-purple-400" /> Save New Insight
                    </CardTitle>
                    <CardDescription className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold">Instantly secure any web resource</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                    <form onSubmit={addBookmark} className="flex gap-4 items-end flex-wrap md:flex-nowrap">
                        <div className="flex-1 space-y-2 w-full">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1">Context / Title</label>
                            <Input
                                placeholder="e.g., Design Inspiration 2026"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="bg-white/5 border-white/5 focus:border-purple-500/50 rounded-xl h-12"
                            />
                        </div>
                        <div className="flex-1 space-y-2 w-full">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1">Encrypted URL</label>
                            <Input
                                placeholder="https://..."
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                                type="url"
                                className="bg-white/5 border-white/5 focus:border-purple-500/50 rounded-xl h-12"
                            />
                        </div>
                        <Button type="submit" disabled={adding} className="h-12 px-8 rounded-xl bg-white text-black font-black uppercase tracking-widest hover:bg-zinc-200 transition-all hover:scale-[1.02] shadow-xl w-full md:w-auto">
                            {adding ? <div className="h-4 w-4 border-2 border-black/20 border-t-black animate-spin rounded-full" /> : 'Protect'}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* List Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-black tracking-tighter uppercase italic">
                        Vault ({filteredBookmarks.length})
                    </h2>
                    <div className="flex items-center gap-2">
                        <div className="px-2 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-[9px] font-black text-purple-400 uppercase tracking-[0.2em] flex items-center gap-1">
                            <Filter className="h-3 w-3" /> AI Filter Active
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {filteredBookmarks.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="col-span-full py-20 text-center space-y-4 rounded-[2.5rem] border border-dashed border-white/5 bg-white/[0.01]"
                            >
                                <div className="h-16 w-16 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-4 grayscale opacity-20">
                                    <Search className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold uppercase italic">No Matches Found</h3>
                                <p className="text-zinc-600 font-medium uppercase tracking-[0.2em] text-[10px]">Your cloud vault is silent. Adjust your query.</p>
                            </motion.div>
                        ) : (
                            filteredBookmarks.map((bookmark) => (
                                <motion.div
                                    key={bookmark.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="group"
                                >
                                    <div className="relative p-[1px] rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent group-hover:from-purple-500/20 transition-all duration-500 shadow-xl">
                                        <Card className="h-full bg-zinc-900 border-none rounded-[1.9rem] overflow-hidden">
                                            <CardContent className="p-6 h-full flex flex-col justify-between">
                                                <div className="space-y-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                            <Globe className="h-5 w-5 text-zinc-600 group-hover:text-purple-400 transition-colors" />
                                                        </div>
                                                        <div className="flex gap-1">
                                                            <Dialog open={editingBookmark?.id === bookmark.id} onOpenChange={(open) => {
                                                                if (open) {
                                                                    setEditingBookmark(bookmark)
                                                                    setEditTitle(bookmark.title)
                                                                    setEditUrl(bookmark.url)
                                                                } else {
                                                                    setEditingBookmark(null)
                                                                }
                                                            }}>
                                                                <DialogTrigger asChild>
                                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                                                                        <Edit2 className="h-4 w-4" />
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent className="bg-[#02000d] border-white/10 rounded-3xl overflow-hidden p-8">
                                                                    <div className="absolute inset-0 bg-gradient-aurora opacity-5 pointer-events-none" />
                                                                    <DialogHeader>
                                                                        <DialogTitle className="text-2xl font-black uppercase italic">Modify Entry</DialogTitle>
                                                                        <DialogDescription className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Update your cloud-secured data</DialogDescription>
                                                                    </DialogHeader>
                                                                    <form onSubmit={updateBookmark} className="space-y-6 mt-4">
                                                                        <div className="space-y-4">
                                                                            <div className="space-y-2">
                                                                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1">Display Label</label>
                                                                                <Input
                                                                                    value={editTitle}
                                                                                    onChange={(e) => setEditTitle(e.target.value)}
                                                                                    className="bg-white/5 border-white/5 focus:border-purple-500/50 rounded-xl h-12"
                                                                                />
                                                                            </div>
                                                                            <div className="space-y-2">
                                                                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-1">Destination URL</label>
                                                                                <Input
                                                                                    value={editUrl}
                                                                                    onChange={(e) => setEditUrl(e.target.value)}
                                                                                    className="bg-white/5 border-white/5 focus:border-purple-500/50 rounded-xl h-12"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <DialogFooter className="gap-3">
                                                                            <Button type="submit" className="flex-1 bg-white text-black font-black uppercase tracking-widest hover:bg-zinc-200 h-12 rounded-xl">Commit Changes</Button>
                                                                        </DialogFooter>
                                                                    </form>
                                                                </DialogContent>
                                                            </Dialog>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 text-zinc-500 hover:text-red-400 hover:bg-red-400/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                                                onClick={() => deleteBookmark(bookmark.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors line-clamp-1">{bookmark.title}</h3>
                                                        <p className="text-zinc-600 font-medium text-xs truncate max-w-full">{bookmark.url}</p>
                                                    </div>
                                                </div>

                                                <div className="pt-6 flex items-center justify-between border-t border-white/5 mt-6">
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white bg-white/[0.03] rounded-lg"
                                                            onClick={() => copyToClipboard(bookmark.url, bookmark.id)}
                                                        >
                                                            {copiedId === bookmark.id ? <Check className="h-3 w-3 mr-2 text-green-400" /> : <Copy className="h-3 w-3 mr-2" />}
                                                            {copiedId === bookmark.id ? 'Copied' : 'Copy'}
                                                        </Button>
                                                        <a href={bookmark.url} target="_blank" rel="noreferrer">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white bg-white/[0.03] rounded-lg"
                                                            >
                                                                <ExternalLink className="h-3 w-3 mr-2" /> Visit
                                                            </Button>
                                                        </a>
                                                    </div>
                                                    <span className="text-[10px] font-black text-zinc-800 uppercase tracking-tighter">
                                                        {new Date(bookmark.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
