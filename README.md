# 🌌 SmartMarks: The Neural Bookmark Vault

**SmartMarks** is a high-bandwidth, "second brain" platform designed for elite researchers, developers, and visionaries. Built with a hyper-professional "Cyberpunk-SaaS" aesthetic, it leverages decentralized architecture concepts to provide a secure, low-latency environment for saving and recalling the internet.

---

## 🚀 Vision
In an age of information overload, standard bookmark managers are obsolete. SmartMarks treats your data as a neural asset, utilizing semantic recall simulations and high-fidelity UI to ensure your digital library is as fast as your thoughts.

## ✨ Core Features

### 🧠 Neural Recall
*   **Semantic Search Simulation**: Find resources based on context and concepts rather than just keywords.
*   **Global Node Sync**: Instantaneous data availability across simulated decentralized edge nodes.

### 💳 Financial Infrastructure
*   **Stripe Secure Relay**: A realistic, branded payment gateway simulation for upgrading storage tiers.
*   **Protocol Invoicing**: Auto-generated, professional invoices with PDF download capabilities for expense tracking.

### 🎨 Architect Design System
*   **Neural Scan Hero**: A dynamic, animated dashboard preview featuring real-time "scanning" effects.
*   **Aura Gradients & Glassmorphism**: High-contrast, vibrant UI components designed for visual excellence.
*   **Micro-Animations**: Extensive use of Framer Motion for smooth, interactive transitions.

## 🛠 Tech Stack

*   **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
*   **Authentication & Database**: [Supabase](https://supabase.com/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)
*   **Toasts**: [Sonner](https://sonner.emilkowal.ski/)

---

## 🚧 Technical Challenges & Engineering Solutions

### 1. Navigating Bleeding-Edge Framework Transitions (Next.js 16 Proxy)
*   **The Challenge**: During development, Next.js 16 released a major update deprecating the standard `middleware.ts` convention in favor of a specialized `proxy.ts` architecture. This caused significant routing and authentication "ghosting" in the production environment.
*   **The Solution**: I proactively refactored the entire request-interception layer, migrating logic from `middleware.ts` to the new `proxy.ts` protocol. This ensured compatibility with the latest Vercel Edge Runtime and maintained a secure barrier between the landing pages and the private dashboard.

### 2. Zero-Trust Data Isolation via Supabase RLS
*   **The Challenge**: Managing a decentralized bookmark vault requires that data is never accessible to unauthorized "nodes" or other users, even if the database API is directly queried.
*   **The Solution**: I architected a **Zero-Trust** security model using Supabase Row Level Security (RLS). By implementing SQL-level policies (`auth.uid() = user_id`), I ensured that data isolation is enforced at the database layer, making it physically impossible for one user to intercept another's neural assets, regardless of frontend vulnerabilities.

### 3. Cross-Environment Identity Synchronization
*   **The Challenge**: Deployment to Vercel introduced complex redirect loops where the Supabase Auth server would default to `localhost` even in a production state, leading to "Connection Refused" errors for external users.
*   *   **The Solution**: I implemented a dynamic environment configuration handler that synchronizes the `Site URL` and `Redirect URLs` between the local development node and the production Vercel node. This involved configuring Supabase Auth settings to recognize the production origin as a trusted secure bridge.

### 4. Eliminating Cumulative Layout Shift (CLS) in Dynamic Hero Mockups
*   **The Challenge**: High-fidelity hero animations often cause layout jumps during hydration, hurting Core Web Vitals and User Experience.
*   **The Solution**: I moved from static images to a **CSS-calculated aspect-ratio container** powered by Framer Motion. By pre-defining geometry and using GPU-accelerated transforms (transforms vs top/left), I achieved a stable 100% layout consistency with zero shifts across all viewport sizes.

### 5. Balancing High-Fidelity Design with WCAG Accessibility
*   **The Challenge**: Maintaining a "glassmorphic" aesthetic while adhering to accessibility standards (Radix UI runtime errors for missing descriptors).
*   **The Solution**: I utilized `sr-only` (Screen Reader Only) utility classes within the Radix UI primitives. This ensures screen readers can identify modal contexts (e.g., "Stripe Secure Relay") without compromising the professional, minimalist cyberpunk visual design.

---

## 📥 Getting Started

### Prerequisites
*   Next.js 
*   Supabase Account

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 📜 License
SmartMarks is distributed under the Architect Technologies Protocol License. Decentralized and free for personal vault use.
