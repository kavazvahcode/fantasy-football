# Fantasy Football SSG Application

A modern, high-performance fantasy football player analysis tool built with Next.js 15, featuring Static Site Generation (SSG) for optimal performance and user experience.

## 🌐 Live Demo

**[View Live Application →](https://fantasy-football-topaz.vercel.app/)**

_The application is deployed on Vercel with automatic deployments from the main branch._

## 🚀 Technology Stack

- **Next.js 15.4.7** - Latest version with App Router and RSC
- **React 19** - Latest React with concurrent features
- **Tailwind CSS v4** - Modern utility-first CSS framework
- **TypeScript 5** - Type-safe development
- **Static Site Generation (SSG)** - Pre-rendered at build time for maximum performance

## 📊 Features

- **Player Analytics Dashboard** - Interactive table with player statistics
- **Advanced Filtering** - Cascade filtering by operator, game type, and slate name
- **Responsive Player Card** - Detailed player information display
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Pagination System** - Efficient data navigation with customizable rows per page
- **Real-time Player Selection** - Synchronized table and card views

## 🗂️ Data Source

All player data is stored in the `data.json` file located in the project root. This file contains DFS (Daily Fantasy Sports) slate information including:

- Player statistics and salaries
- Operator information (DraftKings, FanDuel, etc.)
- Game types and slate details
- Fantasy points and projections

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation & Development

1. **Clone the repository**

```bash
git clone <repository-url>
cd fantasy-football
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Production Build

```bash
# Build for production (SSG)
npm run build

# Start production server
npm start
```

## 🏗️ Architecture

### Static Site Generation (SSG)

- **Build-time data processing** - All data from `data.json` is processed during build
- **Pre-rendered pages** - Fully static HTML generation for maximum performance
- **Client-side hydration** - Interactive features activated after page load
- **Zero API calls** - All data included in the initial bundle

### Project Structure

```
fantasy-football/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main page (Server Component)
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles + Tailwind
├── components/            # Reusable UI components
│   ├── FilterPanel/       # Filter controls
│   ├── FilteredPlayersInfo/ # Main content area
│   ├── PlayerCard/        # Player detail card
│   ├── Table/             # Data table with pagination
│   ├── Select/            # Custom select component
│   └── Pagination/        # Pagination controls
├── providers/             # React Context providers
│   └── FantasyDataProvider/ # Data management context
├── lib/                   # Business logic
│   └── data-processor.ts  # Build-time data processing
├── types/                 # TypeScript type definitions
│   ├── fantasy-football.ts # Core types
│   └── index.ts           # Type exports
└── data.json             # Source data file
```

## 🎨 Design System

The application uses a custom dark theme with CSS variables defined in `globals.css`:

- **Color Palette** - Dark theme with accent colors
- **Responsive Typography** - Mobile-first font scaling
- **Component Consistency** - Reusable design tokens
- **Accessibility** - WCAG compliant color contrasts

## 📱 Responsive Features

- **Mobile-first Design** - Optimized for small screens
- **Adaptive Layouts** - Different layouts for desktop/mobile
- **Touch-friendly** - Optimized for mobile interactions
- **Performance** - Minimal bundle size and fast loading

## 🔧 Performance Optimizations

- **Static Generation** - Pre-rendered at build time
- **Image Optimization** - Next.js automatic image optimization
- **Bundle Splitting** - Automatic code splitting
- **Caching** - Build-time data caching with singleton pattern
- **Tree Shaking** - Unused code elimination

## 🚢 Deployment

### Live Production Application

**Current deployment**: [https://fantasy-football-topaz.vercel.app/](https://fantasy-football-topaz.vercel.app/)

### Vercel (Recommended)

The easiest deployment option for Next.js applications:

1. Push code to GitHub/GitLab/Bitbucket
2. Connect repository to [Vercel](https://vercel.com)
3. Automatic deployment on every push

**Benefits of Vercel deployment:**

- **Zero Configuration** - Works out of the box with Next.js
- **Global CDN** - Fast loading worldwide
- **Automatic HTTPS** - SSL certificates included
- **Preview Deployments** - Every PR gets a preview URL
- **Analytics** - Built-in performance monitoring

### Manual Deployment

```bash
npm run build
```

Deploy the `.next` output to any static hosting provider.

## 📄 License

This project is private and confidential.
