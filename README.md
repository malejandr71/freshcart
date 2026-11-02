# FreshCart

FreshCart e-commerce app built with Next.js 16 (App Router), TypeScript, Tailwind v4, shadcn/ui, Swiper, React Hook Form + zod, next-auth (Credentials) and the Route E-commerce API.

## Run

```bash
npm install
cp .env.local.example .env.local   # then put any long random string in NEXTAUTH_SECRET and AUTH_SECRET (same value)
npm run dev
```

## Features
Home (slider, categories slider, products) · Product details · Register · Login (next-auth) · Protected routes (middleware) · Cart (add / update / remove / clear) · Payment (cash + online Stripe checkout) · All orders · Brands · Categories
