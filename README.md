# 🚀 Next.js + Supabase + Google OAuth Boilerplate

A minimalist Next.js boilerplate with built-in **Supaase Google OAuth**, **ShadCN UI**, and **Dark/Light mode support** — perfect for modern SaaS apps and dashboards.

---

## ✨ Features

- ✅ Google Sign-in via Supabase Auth
- 🧠 Session handling with Supabase SSR helpers
- 🎨 ShadCN UI (Radix + Tailwind CSS)
- 🌓 Dark/light theme toggle using `next-themes`
- 🧼 Clean folder structure — ready for scaling
- 💨 TailwindCSS + base UI setup

---

## 🔧 Installation

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
pnpm install # or npm install / yarn install
```

### 1. Setup environment variables

Create a `.env.local` file:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Configure Supabase Auth

- Enable **Google provider** in Supabase Auth dashboard
- Add redirect URL: `http://localhost:3000/auth/callback`
- Add this domain in Google Cloud OAuth:
  - Authorized JS Origins: `http://<supabase-url>.supabase.co`
  - Authorized Redirect URI: `https://<supabase-url>.supabase.co/auth/v1/callback`

---

## 🧾 Folder Structure

```bash
.
├── app/
│   ├── page.tsx                  # Public homepage (with Google Sign-In)
│   ├── layout.tsx                # Base layout (optional)
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts          # Google OAuth callback handler
│   └── protected/
│       ├── page.tsx              # Protected dashboard
│       └── layout.tsx            # Layout with theme toggle & sign-out
│
├── components/
│   ├── ui/
│   │   └── button.tsx            # ShadCN button component
│   ├── ModeToggle.tsx            # Dark/light mode toggle (not in ui/)
│   ├── sign-in-button.tsx        # Google Sign-In button logic
│   └── sign-out-button.tsx       # Supabase Sign-Out button
│
├── lib/
│   └── supabase/
│       ├── client.ts             # Supabase browser client
│       ├── server.ts             # Supabase server client (SSR)
│       └── middleware.ts         # Session middleware
│
├── public/
├── styles/
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## 🧪 Running Dev Server

```bash
pnpm dev # or npm run dev / yarn dev
```

Then visit: [http://localhost:3000](http://localhost:3000)

---

## 📦 Stack

- [Next.js 15 (App Router)](https://nextjs.org/)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [ShadCN UI](https://ui.shadcn.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [next-themes](https://github.com/pacocoursey/next-themes)

---

## 💎 Author

Built by Caroline Codilla using 💡 and ☕  
Boilerplate powered by **Supabase + Next.js + ShadCN**

---

## 📜 License

MIT
