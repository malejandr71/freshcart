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

## UI Design
The UI is styled after the FreshCart **Figma** design (top bar, navbar with search, hero slider, features strip, Shop By Category, Featured Products cards, footer, two-column login/register, cart summary, payment card, orders list).
The logic, file names and function names follow Eng. Huda Khaled's lessons (e.g. `CartId`, `isLoading`, `afterPayment()`, `CahPaymentAction`, `onlinePaymentAction`, `deleteCartItemAction`, `clearCartItemAction`).
