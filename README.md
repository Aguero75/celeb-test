# celeb-test

A fan subscription management platform built with Next.js. Live demo: [celeb-test.vercel.app](https://celeb-test.vercel.app)

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router) with React 19 and TypeScript
- **Authentication:** [Clerk](https://clerk.com)
- **Database / Backend:** [Supabase](https://supabase.com)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) with `tailwindcss-animate` and `class-variance-authority`
- **UI utilities:** `lucide-react` (icons), `lottie-react` (animations), `react-hot-toast` (notifications), `react-dropzone` (file uploads), `date-fns` (date formatting)
- **Linting:** ESLint

## Getting Started

### Prerequisites

- Node.js (version compatible with Next.js 16)
- A [Supabase](https://supabase.com) project
- A [Clerk](https://clerk.com) application

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Aguero75/celeb-test.git
cd celeb-test
npm install
```

### Environment Variables

Create a `.env.local` file in the project root and add your Clerk and Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

> Update the variable names above to match whatever your Supabase/Clerk setup actually uses in the codebase.

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result. The app auto-updates as you edit files in `src/app`.

### Other Scripts

```bash
npm run build   # Build for production
npm run start   # Start the production server
npm run lint    # Run ESLint
```

## Project Structure

```
.
├── public/        # Static assets
├── src/app/       # Next.js App Router pages, layouts, and components
├── AGENTS.md      # Notes for AI coding agents working in this repo
├── CLAUDE.md      # Notes for Claude Code
└── package.json
```

## Deployment

This project is deployed on [Vercel](https://vercel.com). To deploy your own instance, push the repository to Vercel and configure the environment variables listed above in your project settings. See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to open a pull request or file an issue.

## License

No license has been specified for this project yet.
