# BytePlus Pro - Base Mini App

Own Your Data, Earn Your Rewards.

A consumer-first platform enabling users to securely share personal data with brands and researchers for rewards, fostering community-driven growth.

## Features

- **Granular Data Wallet & Consent Management**: Users can securely store their data and define precise permissions for what data is shared, with whom, and for how long.
- **Direct Data Monetization**: Enables users to earn rewards (tokens, micro-payments) directly for sharing their data through the platform.
- **Privacy-Preserving Data Pools**: Data is aggregated and anonymized using techniques like differential privacy.
- **Brand Data Campaigns & Researcher Access**: A portal for brands and researchers to create specific data requests.
- **Community & Reputation System**: Features like referral networks, cohort formation, and a reputation/karma system.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

3. Add your OnchainKit API key to `.env.local`:
```
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base Network
- **Wallet Integration**: MiniKit + OnchainKit
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Architecture

The app follows a modular component architecture with:

- `/app` - Next.js App Router pages and layouts
- `/components` - Reusable UI components
- `/lib` - Utility functions and type definitions

## Key Components

- **AppShell**: Main application wrapper
- **ProfileHeader**: User profile display with reputation
- **DataCard**: Campaign and data sharing cards
- **RewardDisplay**: Token and fiat reward visualization
- **ConsentToggle**: Data sharing permission controls
- **ProgressBar**: Campaign progress tracking

## Environment Variables

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
- `NEXT_PUBLIC_CHAIN_ID`: Base network chain ID (8453)
- `NEXT_PUBLIC_RPC_URL`: Base network RPC URL

## License

MIT License
