# Next Events Platform

A modern event management platform built with Next.js 15, featuring authentication, event creation, and management capabilities.

## Features

- User authentication (login, register, password reset)
- Event creation and management
- Event browsing and details view
- Stripe payment integration
- Email notifications
- Responsive design with modern UI components

## Tech Stack

- [Next.js 15](https://nextjs.org) with App Router
- [Prisma](https://prisma.io) for database management
- [NextAuth.js](https://next-auth.js.org) for authentication
- [Radix UI](https://www.radix-ui.com/) for UI components
- [Stripe](https://stripe.com) for payments
- [React Email](https://react.email) for email templates

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up your environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your database, auth, and Stripe credentials

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Database Setup

Initialize your database with the seed data:

```bash
npm run seed
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)
