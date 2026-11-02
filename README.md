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

## Auth rules
Home, Product Details, Brands and Categories are public. Login is required only for Cart, Wishlist and buying (Payment / All Orders) — handled in `src/middleware.ts` and in `CartBtn` / `WishlistBtn`.

## API coverage (Route E-commerce API)
| Group | Endpoints used | Where |
|---|---|---|
| Categories | all, specific | `/categories`, `/categories/[id]` |
| SubCategories | all, specific, on category | `/categories`, `/subcategories/[id]`, `/categories/[id]` |
| Brands | all, specific | `/brands`, `/brands/[id]` |
| Products | all (+ filters / pagination), specific | `/`, `/products`, `/productDetails/[id]` |
| Auth | signup, signin, forgotPasswords, verifyResetCode, resetPassword, changeMyPassword, updateMe, verifyToken | `/register`, `/login`, `/forgotpassword`, `/profile` |
| Wishlist | add, remove, get | ❤️ button, `/wishlist` |
| Addresses | add, remove, specific, get all | `/profile`, `/payment` |
| Cart (v2) | add, get, update, remove, clear, applyCoupon | `CartContext`, `/cart` |
| Reviews | create, get for product, get all, get by id, update, delete | `/productDetails/[id]`, home |
| Orders | cash, checkout-session, user orders | `/payment`, `/allorders` |

Not used on purpose: `Get All Users` and `getAllOrders` (admin data for all users), Cart v1 (the lessons use Cart v2).
