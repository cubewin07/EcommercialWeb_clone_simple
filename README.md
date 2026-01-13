# MyShop — Shoppe Clone (Simple)

## Overview
- A simple e‑commerce front‑end inspired by Shopee. It focuses on product browsing, product details, and a functional shopping cart, with basic authentication and a user dashboard.

## Why I Built This
- This is my first project to get comfortable with React and JavaScript. I wanted hands‑on practice with components, routing, state management, forms, styling, and common UI patterns used in modern web apps.

## What I Learned
- React fundamentals: components, props, JSX, and hooks (useState, useEffect, useContext).
- Global state with Context + useReducer for a shopping cart.
- Client‑side routing with React Router v6 (createHashRouter).
- Form handling and validation using react‑hook‑form and Zod.
- Authentication basics with Context and localStorage (login/register/logout).
- Styling with SCSS Modules and a simple GlobalStyles wrapper.
- UI animations using Framer Motion for cart interactions.
- Building a banner carousel and hover tooltips with controlled navigation.
- UX safeguards: 404 page, “login required” modal, and product‑not‑found handling.

## Features Added
- Home page with image banner carousel and featured products.
- Product listing grid with hover tooltip showing rating/reviews and in‑cart quantity.
- Product detail page with add‑to‑cart and quantity update.
- Shopping cart with increase/decrease quantity, remove items, per‑item totals, grand total, animated transitions, and an empty‑cart state.
- Authentication: register with validation, login/logout; protected actions (e.g., view cart, add to cart) prompt login.
- Dashboard page placeholder with logout and sample recent orders.
- Header with animated cart count and protected cart icon navigation.
- Routing across Home, Products, Product Detail, Cart, Login, Register, Dashboard, and a custom 404 page.

## Tech Notes
- Built with Create React App, React Router, Context + useReducer, SCSS Modules, Framer Motion, Material UI, React Hook Form, and Zod.
