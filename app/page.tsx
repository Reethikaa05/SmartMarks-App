'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Bookmark,
  ShieldCheck,
  Zap,
  ArrowRight,
  Star,
  Layers,
  Command,
  Search,
  Folder,
  Globe,
  Hash,
  Check,
  CreditCard,
  Smartphone,
  Globe2,
  Lock,
  Sparkles,
  MousePointer2,
  Cpu,
  Fingerprint
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LandingPage() {
  const { scrollYProgress } = useScroll()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className="flex flex-col min-h-screen bg-[#02000d] text-foreground overflow-hidden selection:bg-purple-500/30 font-sans relative"
      onMouseMove={handleMouseMove}
    >

      {/* Interactive Global Spotlight */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-10 opacity-0 transition duration-300 lg:opacity-100"
        style={{
          background: useMotionTemplate`
                  radial-gradient(
                      800px circle at ${mouseX}px ${mouseY}px,
                      rgba(168, 85, 247, 0.05),
                      transparent 80%
                  )
              `,
        }}
      />

      {/* Extreme Background FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-dot-white opacity-[0.03]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl rounded-[2.5rem] border border-white/5 bg-black/40 backdrop-blur-3xl shadow-2xl px-10 py-5 flex items-center justify-between transition-all duration-500 hover:border-white/10 hover:py-6">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="h-12 w-12 rounded-2xl bg-gradient-aurora flex items-center justify-center shadow-2xl shadow-purple-500/30 group-hover:scale-110 transition-all duration-300">
            <Bookmark className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="tracking-tighter text-3xl font-black italic bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40 leading-none">SmartMarks</span>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600">Secure Protocol v4</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
          <a href="#features" className="hover:text-white transition-all relative group">
            Features
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-purple-500 group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#how-it-works" className="hover:text-white transition-all relative group">
            Protocol
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-purple-500 group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#pricing" className="hover:text-white transition-all relative group">
            Access
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-purple-500 group-hover:w-full transition-all duration-300" />
          </a>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/login">
            <Button variant="ghost" className="text-zinc-500 hover:text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/5 px-8 hidden sm:flex">Entry</Button>
          </Link>
          <Link href="/login">
            <Button className="rounded-2xl px-8 h-12 bg-white text-black hover:bg-zinc-200 font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-white/5 transition-all hover:scale-[1.05] active:scale-95">
              GET STARTED
            </Button>
          </Link>
        </div>
      </nav>

      <main className="relative z-10">

        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col items-center justify-center pt-48 pb-20 px-4 text-center">
          <motion.div
            style={{ opacity, scale }}
            className="max-w-6xl mx-auto space-y-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 backdrop-blur-2xl shadow-[0_0_30px_rgba(168,85,247,0.2)]"
            >
              <Sparkles className="h-4 w-4" />
              INTELLIGENCE SYNCED ACROSS NODES
            </motion.div>

            <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] text-white">
              <span className="inline-block hover:scale-[1.02] transition-transform duration-500 cursor-default">SAVE THE</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-aurora drop-shadow-[0_0_50px_rgba(168,85,247,0.4)] italic">INTERNET.</span>
            </h1>

            <p className="text-lg md:text-2xl text-zinc-500 max-w-4xl mx-auto leading-relaxed font-black uppercase tracking-tighter italic">
              Deploy your second brain. A high-bandwidth vault designed for elite researchers, <br className="hidden md:block" />
              developers, and visionaries. Z-latency recall implemented at the edge.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10">
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-20 px-12 rounded-[2rem] text-2xl font-black bg-gradient-aurora text-white shadow-[0_20px_50px_rgba(168,85,247,0.3)] border-t border-white/20 transition-all hover:-translate-y-3 hover:shadow-[0_40px_80px_rgba(168,85,247,0.5)] group uppercase relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 flex items-center">
                    INITIALIZE VAULT <ArrowRight className="ml-4 h-7 w-7 group-hover:translate-x-2 transition-transform" />
                  </span>
                </Button>
              </Link>
              <div className="flex items-center gap-6 text-zinc-600 font-black uppercase tracking-widest text-[9px]">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-12 w-12 rounded-2xl border-2 border-[#02000d] bg-zinc-900 flex items-center justify-center shadow-xl">
                      <Fingerprint className="h-6 w-6 text-purple-600/40" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-start leading-none gap-1">
                  <span className="text-zinc-400 font-black text-xs lowercase">/10k+ instances active</span>
                  <span>uptime 99.99% enforced</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Extreme Mockup */}
          <motion.div
            initial={{ opacity: 0, rotateX: 20, scale: 0.8 }}
            whileInView={{ opacity: 1, rotateX: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            viewport={{ once: true }}
            className="mt-40 w-full max-w-7xl mx-auto px-6 perspective-1000"
          >
            <div className="relative group p-[1px] rounded-[3rem] bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-4xl group">
              <div className="absolute -inset-10 bg-gradient-aurora opacity-10 blur-[100px] rounded-full group-hover:opacity-20 transition-opacity duration-1000" />
              <div className="rounded-[2.9rem] bg-black/80 backdrop-blur-3xl overflow-hidden shadow-2xl border border-white/5 relative z-10">
                <div className="h-14 border-b border-white/5 flex items-center px-10 gap-4 bg-white/[0.03]">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/20" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/20" />
                    <div className="h-3 w-3 rounded-full bg-green-500/20" />
                  </div>
                  <div className="flex-1 bg-white/5 rounded-full py-1 text-center text-[9px] font-black tracking-[0.5em] text-zinc-700 uppercase">PROTOCOL_NODE_01:3000</div>
                  <div className="opacity-20"><ShieldCheck className="h-4 w-4" /></div>
                </div>
                <div className="relative aspect-[16/10] bg-[#02000d] flex overflow-hidden group-hover:scale-[1.01] transition-transform duration-1000">
                  {/* Neural Scan Line Animation */}
                  <motion.div
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent z-50 shadow-[0_0_15px_rgba(168,85,247,0.8)] pointer-events-none"
                  />

                  {/* Mock UI Layer */}
                  <div className="absolute inset-0 flex p-6 gap-6">
                    {/* Mock Sidebar */}
                    <div className="w-56 h-full bg-white/[0.03] rounded-3xl border border-white/5 p-6 flex flex-col gap-6">
                      <div className="h-8 w-32 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-xl" />
                      <div className="space-y-3">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                          <div key={i} className={cn("h-4 rounded-lg", i === 1 ? "bg-white/10 w-full" : "bg-white/5 w-[80%]")} />
                        ))}
                      </div>
                      <div className="mt-auto p-6 rounded-2xl bg-gradient-aurora/10 border border-purple-500/20 relative overflow-hidden group/card">
                        <Sparkles className="h-8 w-8 text-purple-400 absolute -right-2 -bottom-2 opacity-20" />
                        <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest leading-relaxed">System Health Optimal</p>
                      </div>
                    </div>
                    {/* Mock Main Area */}
                    <div className="flex-1 flex flex-col gap-6">
                      <div className="h-20 w-full bg-white/[0.03] rounded-3xl border border-white/5 flex items-center px-8 justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center"><Search className="h-4 w-4 text-purple-400" /></div>
                          <div className="h-4 w-48 bg-white/10 rounded-md" />
                        </div>
                        <div className="h-10 px-6 rounded-xl bg-white/5 border border-white/10 flex items-center text-[10px] font-black text-zinc-500 uppercase tracking-widest">Global Recall Active</div>
                      </div>

                      <div className="flex-1 grid grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                          <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="rounded-3xl border border-white/5 bg-zinc-900/40 p-6 space-y-4 hover:bg-zinc-900/60 transition-colors"
                          >
                            <div className="h-32 w-full bg-white/5 rounded-2xl relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
                            </div>
                            <div className="h-4 w-3/4 bg-white/10 rounded-md" />
                            <div className="h-3 w-1/2 bg-white/5 rounded-md" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Fog/Atmosphere Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02000d] via-transparent to-transparent opacity-80 pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FEATURES SECTION (Bento 2.0) */}
        <section id="features" className="py-60 px-6 relative">
          <div className="max-w-7xl mx-auto space-y-32">
            <div className="text-center space-y-6">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-none">HIGH-SPEED <br /> <span className="text-purple-500">INFRASTRUCTURE.</span></h2>
              <p className="text-zinc-600 text-[10px] uppercase tracking-[0.5em] font-black">Performance is not an option. It's the standard.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-8 h-auto">
              <FeatureCard
                className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-zinc-900/50 to-purple-900/10"
                title="Semantic Neural Ingestion"
                desc="Our AI decomposes your resources into multi-dimensional vectors, enabling memory-based recall that mimics human thought. No more searching for keywords."
                icon={<Cpu className="h-10 w-10 text-purple-400" />}
                large
              />
              <FeatureCard
                title="Z-Latency Sync"
                desc="Global database replication via decentralized nodes ensures 50ms access anywhere."
                icon={<Zap className="h-8 w-8 text-yellow-500" />}
              />
              <FeatureCard
                title="E2EE Vault"
                desc="Your data is encrypted locally before transmission. Not even we can see it."
                icon={<Lock className="h-8 w-8 text-blue-500" />}
              />
              <FeatureCard
                className="md:col-span-2"
                title="Hyper-Scalable API"
                desc="Programmable entry points. Connect your vault to Slack, Discord, or Notion with our low-level SDK."
                icon={<Command className="h-8 w-8 text-green-400" />}
              />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS (PROTOCOL FLOW) */}
        <section id="how-it-works" className="py-60 px-6 bg-white/[0.01] border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-[-10%] w-[40%] h-[40%] bg-purple-600/5 blur-[120px] rounded-full animate-pulse" />
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-20">
              <div className="space-y-6">
                <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-zinc-500 uppercase tracking-widest inline-block">Workflow v5.0</div>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none text-white">THE <br /> <span className="text-gradient-aurora">METHOD.</span></h2>
                <p className="text-zinc-600 font-bold uppercase tracking-[0.2em] text-xs italic">Defragmenting your digital memory.</p>
              </div>

              <div className="space-y-16">
                <StepItem
                  number="STEP_01"
                  title="CAPTURE"
                  desc="Deploy the 2MB companion. CMD+S instantly snapshots any web asset, preserving it in high-fidelity for eternity."
                />
                <StepItem
                  number="STEP_02"
                  title="DECOMPOSE"
                  desc="Our AI autonomous engine extracts context, generates tags, and structures your data into a searchable directory."
                />
                <StepItem
                  number="STEP_03"
                  title="RECALL"
                  desc="Access your second brain instantly. Search for feelings, themes, or colors—our semantic engine does the rest."
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/20 blur-[150px] rounded-full" />
              <div className="relative rounded-[3rem] border border-white/10 bg-zinc-900/40 p-12 backdrop-blur-3xl shadow-4xl group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-aurora opacity-10 group-hover:opacity-15 transition-opacity" />
                <div className="space-y-8 relative z-10">
                  <div className="h-6 w-1/3 bg-white/10 rounded-full" />
                  <div className="h-64 w-full bg-white/5 rounded-[2rem] border border-white/5 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-dot-white opacity-20" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                      className="h-32 w-32 rounded-full border border-purple-500/30 border-t-purple-500"
                    />
                    <Bookmark className="absolute h-10 w-10 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="h-24 w-full bg-white/5 rounded-2xl border border-white/5" />
                    <div className="h-24 w-full bg-white/5 rounded-2xl border border-white/5" />
                  </div>
                  <Button className="w-full h-16 bg-white text-black font-black uppercase tracking-widest rounded-2xl text-lg">SYSTEM ACTIVE</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING (ACCESS TIERS) */}
        <section id="pricing" className="py-60 px-6 relative">
          <div className="max-w-7xl mx-auto space-y-32">
            <div className="text-center space-y-6">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none text-white">ACCESS <br /> <span className="text-zinc-800">NODES.</span></h2>
              <p className="text-zinc-600 text-[10px] uppercase tracking-[0.5em] font-black">Secure your slot in the cloud infrastructure.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <PricingCard
                title="EXPLORER"
                price="0"
                desc="Initial system deployment."
                features={["500 Neural Entry Limits", "Basic Tagging Protocol", "2 Multi-Node Sync"]}
              />
              <PricingCard
                title="POWERHOUSE"
                price="9"
                desc="For advanced knowledge collectors."
                features={["Unlimited Data Ingestion", "AI Semantic Engine", "Unlimited Node Sync", "Web Clipper Pro Node", "Team Core Access"]}
                highlight
              />
              <PricingCard
                title="ARCHIVIST"
                price="29"
                desc="For large scale organizations."
                features={["Everything in Powerhouse", "Full-site Snapshots", "System-level API", "Custom Namespace", "24/7 Priority Uplink"]}
              />
            </div>

            {/* Secure Method Payment Icons */}
            <div className="mt-32 text-center space-y-12">
              <p className="text-zinc-700 font-black uppercase tracking-[0.4em] text-[10px]">VERIFIED SECURE CHANNELS</p>
              <div className="flex flex-wrap items-center justify-center gap-16 grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
                <div className="flex items-center gap-3 text-3xl font-black italic tracking-tighter uppercase leading-none"><CreditCard className="h-10 w-10 text-blue-500" /> VISA</div>
                <div className="flex items-center gap-3 text-3xl font-black italic tracking-tighter uppercase leading-none"><Check className="h-10 w-10 text-green-500 font-black" /> STRIPE</div>
                <div className="flex items-center gap-3 text-3xl font-black italic tracking-tighter uppercase leading-none text-white">APPLE PAY</div>
                <div className="flex items-center gap-3 text-3xl font-black italic tracking-tighter uppercase leading-none text-blue-400">PAYPAL</div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-60 px-6">
          <div className="max-w-6xl mx-auto rounded-[4rem] bg-gradient-aurora p-1 shadow-4xl group">
            <div className="bg-[#02000d] rounded-[3.9rem] py-32 px-10 text-center space-y-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-aurora opacity-0 group-hover:opacity-10 transition-opacity duration-[2s]" />
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-600/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000" />
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight italic uppercase text-white">INITIALIZE <br /> <span className="text-gradient-aurora">UP-LINK?</span></h2>
              <Link href="/login" className="inline-block relative z-10">
                <Button size="lg" className="h-24 px-16 rounded-[2.5rem] text-3xl font-black bg-white text-black hover:scale-110 hover:shadow-2xl hover:shadow-white/20 active:scale-95 transition-all uppercase italic">
                  Join The Protocol
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer (Architect Footer) */}
      <footer className="py-32 px-10 border-t border-white/5 bg-black/60 backdrop-blur-3xl relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-24">
          <div className="col-span-2 space-y-10 px-4 md:px-0">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-aurora flex items-center justify-center shadow-2xl">
                <Bookmark className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black italic tracking-tighter leading-none">SmartMarks</span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Secure Global Node</span>
              </div>
            </div>
            <p className="text-zinc-500 max-w-md font-black italic uppercase text-sm leading-relaxed">System-Level Knowledge Management. <br /> Deploying the future, one node at a time.</p>
          </div>
          <div className="space-y-8">
            <p className="font-black uppercase tracking-[0.3em] text-[10px] text-zinc-400">STRUCTURE</p>
            <div className="flex flex-col gap-6 text-zinc-600 font-black text-xs uppercase italic tracking-widest">
              <a href="#features" className="hover:text-purple-400 transition-colors">Infrastructure</a>
              <a href="#how-it-works" className="hover:text-purple-400 transition-colors">Protocol</a>
              <a href="#pricing" className="hover:text-purple-400 transition-colors">Tiers</a>
            </div>
          </div>
          <div className="space-y-8">
            <p className="font-black uppercase tracking-[0.3em] text-[10px] text-zinc-400">GOVERNANCE</p>
            <div className="flex flex-col gap-6 text-zinc-600 font-black text-xs uppercase italic tracking-widest">
              <a href="#" className="hover:text-purple-400 transition-colors">Security Manual</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Entity Privacy</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Node Contact</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-16 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-6 opacity-30">
          <p className="text-zinc-700 text-[9px] font-black tracking-[0.5em] uppercase">© 2026 SMARTMARKS ARCHITECT TECHNOLOGIES. DECENTRALIZED.</p>
          <div className="flex gap-10 font-black text-[9px] uppercase tracking-[0.3em] text-zinc-700">
            <span>v4.2.0-STABLE</span>
            <span>ENCRYPTED_AES256</span>
          </div>
        </div>
      </footer>

      <StarsIcon className="fixed top-20 right-20 h-24 w-24 text-purple-500/10 blur-[2px] opacity-20 pointer-events-none" />
      <div className="fixed -bottom-40 -left-40 h-80 w-80 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

    </div>
  )
}

function FeatureCard({ className, title, desc, icon, large }: { className?: string, title: string, desc: string, icon: any, large?: boolean }) {
  return (
    <div className={cn(
      "group relative p-10 rounded-[3.5rem] border border-white/5 bg-zinc-900/40 backdrop-blur-3xl hover:border-purple-500/30 transition-all duration-700 overflow-hidden",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-aurora opacity-0 group-hover:opacity-10 transition-opacity duration-1000" />
      <div className={cn("mb-8 p-5 rounded-[2rem] bg-white/5 w-fit border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-2xl", large ? "h-20 w-20" : "h-1 object-fit")}>
        {icon}
      </div>
      <h3 className={cn("font-black tracking-tight mb-6 uppercase italic text-white", large ? "text-4xl" : "text-2xl")}>{title}</h3>
      <p className="text-zinc-500 font-black uppercase tracking-tighter italic leading-relaxed text-sm">{desc}</p>
    </div>
  )
}

function StepItem({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="group flex gap-12 items-start">
      <div className="text-xl font-black text-purple-500/40 bg-purple-500/5 h-14 w-32 flex items-center justify-center rounded-2xl border border-purple-500/10 group-hover:bg-purple-500/20 transition-all duration-700 italic">
        {number}
      </div>
      <div className="space-y-4 pt-2">
        <h3 className="text-3xl font-black tracking-tighter italic text-white group-hover:text-purple-400 transition-all duration-500 uppercase">{title}</h3>
        <p className="text-zinc-500 font-black uppercase tracking-tighter italic text-sm leading-relaxed max-w-lg">{desc}</p>
      </div>
    </div>
  )
}

function PricingCard({ title, price, desc, features, highlight }: { title: string, price: string, desc: string, features: string[], highlight?: boolean }) {
  return (
    <div className={cn(
      "relative p-12 rounded-[3.5rem] border flex flex-col transition-all duration-700 hover:-translate-y-6 group",
      highlight
        ? "bg-gradient-aurora border-transparent shadow-[0_0_80px_-20px_rgba(168,85,247,0.5)]"
        : "bg-zinc-900/40 border-white/5 hover:border-white/20 backdrop-blur-3xl"
    )}>
      {highlight && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-8 py-2 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl z-20">
          RECOMMENDED_ACCESS
        </div>
      )}
      <div className="mb-12 space-y-4">
        <h3 className={cn("text-2xl font-black uppercase italic tracking-tight", highlight ? "text-white" : "text-zinc-400")}>{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className={cn("text-7xl font-black tracking-tighter italic", "text-white")}>${price}</span>
          <span className={cn("font-black text-xs opacity-40 uppercase", highlight ? "text-white" : "text-zinc-500")}>/NODE_MO</span>
        </div>
        <p className={cn("text-xs font-black uppercase italic tracking-tighter", highlight ? "text-white/80" : "text-zinc-500")}>{desc}</p>
      </div>
      <ul className="space-y-5 mb-16 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex gap-5 items-center">
            <div className={cn("h-7 w-7 rounded-full flex items-center justify-center border transition-all", highlight ? "bg-white text-purple-600 border-white" : "bg-purple-600/20 text-purple-400 border-purple-500/20")}>
              <Check className="h-4 w-4" />
            </div>
            <span className={cn("font-black text-[11px] uppercase tracking-tighter italic", highlight ? "text-white" : "text-zinc-400")}>{f}</span>
          </li>
        ))}
      </ul>
      <Link href="/login">
        <Button className={cn(
          "w-full h-16 rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all italic text-xs",
          highlight
            ? "bg-white text-black hover:bg-zinc-200 shadow-2xl shadow-white/10"
            : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
        )}>
          SELECT NODE
        </Button>
      </Link>
    </div>
  )
}

function StarsIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /><path d="M19 3v4" /><path d="M21 5h-4" /></svg>
}
