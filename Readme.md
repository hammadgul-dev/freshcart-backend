# FreshCart — REST API Backend

Production-ready RESTful API for the FreshCart e-commerce platform, built with **Node.js**, **Express.js**, and **MongoDB**. Features JWT authentication, Nodemailer email service, and Cloudinary image storage.

---

## Features

- **JWT Authentication** — Secure token-based authentication
- **User Management** — Signup, login, token verification, and logout
- **Email Service** — Automated emails on user registration via Nodemailer and Gmail SMTP
- **Cart Management** — Add, remove, and retrieve cart items per user
- **Favorites** — Save and manage favorite products per user
- **Grocery Catalog** — Seed and serve grocery data from JSON with MongoDB
- **Products API** — Integrated with DummyJSON external API for product data
- **Contact Form** — Store and manage user contact submissions
- **Cloudinary Integration** — Cloud-based image storage for grocery product images
- **Serverless Ready** — Configured for Vercel serverless deployment with `vercel.json`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas + Mongoose |
| Authentication | JWT (JSON Web Tokens) |
| Email Service | Nodemailer + Gmail SMTP |
| Image Storage | Cloudinary |
| External API | DummyJSON |
| Deployment | Vercel (Serverless) |

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/signup` | Register new user | No |
| GET | `/signup/verify-token` | Verify JWT token | Yes |
| GET | `/grocery` | Seed and fetch grocery items | No |
| GET | `/product` | Fetch products from DummyJSON | No |
| GET | `/cart-items` | Get user cart | Yes |
| POST | `/cart-items` | Add item to cart | Yes |
| DELETE | `/cart-items` | Remove cart item | Yes |
| GET | `/favorite` | Get user favorites | Yes |
| POST | `/favorite` | Add to favorites | Yes |
| DELETE | `/favorite` | Remove from favorites | Yes |
| POST | `/contact-us` | Submit contact form | No |
| POST | `/logout` | Logout and clear user data | Yes |

---

> **Note:** On first request after inactivity, the serverless function may take a few seconds to cold start. This is expected behavior on free hosting tier.

---

## Links

- Frontend Repository: [github.com/hammadgul-dev/freshcart-frontend](https://github.com/hammadgul-dev/freshcart-frontend)
- Live Demo: [freshcart-frontend-tau.vercel.app](https://freshcart-frontend-tau.vercel.app)

---

