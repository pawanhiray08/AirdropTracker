# Multiple Airdrop Daily Tracker

A comprehensive tool for tracking crypto airdrops, trends, and project updates with real-time notifications.

## Features

- **Airdrop Tracker**
  - Track participation in various airdrops
  - View ongoing and upcoming airdrops
  - Mark airdrops as joined/not joined

- **Real-Time Notifications**
  - Automated updates for new airdrops
  - Real-time tracking of participation status

- **Crypto & NFT Trends**
  - Live cryptocurrency trends across different blockchains
  - Top trending NFT projects and collections
  - Real-time market data and analytics

- **Twitter/X Integration**
  - Latest updates from crypto projects
  - Trending crypto discussions
  - Influencer insights

## Tech Stack

- Frontend: Next.js (deployed on Vercel)
- Backend: Supabase
- Database: PostgreSQL (via Supabase)
- Real-time Updates: Supabase Realtime
- APIs: Twitter API, CoinGecko, NFT APIs

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   TWITTER_API_KEY=your_twitter_api_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Setup

- Node.js 18+ required
- Supabase account
- Twitter Developer Account
- Vercel account (for deployment)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
