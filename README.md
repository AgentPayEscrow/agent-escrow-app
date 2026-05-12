markdown
# Agent Escrow Frontend

Next.js 15 TypeScript Tailwind CSS Stellar Mainnet License: MIT

The Agent Escrow Frontend is the web dashboard for the Agent Escrow platform. It provides agent management, spending limits, payment tracking, and Freighter wallet integration.

## 📚 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Contributing](#contributing)

## 🎯 Overview
Agent Escrow Frontend enables:

- Wallet connection via Freighter
- Agent creation and management
- Spending limit configuration
- Payment monitoring and history

## ✨ Features

| Feature | Description |
|---------|-------------|
| Wallet Connection | Connect Freighter wallet |
| Agent Management | Create, pause, resume agents |
| Spending Limits | Daily, weekly, monthly caps |
| Real-time Updates | Live payment status |
| Responsive Design | Mobile-friendly interface |

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Wallet | Freighter API |
| Blockchain | Stellar Soroban |

## 📁 Project Structure
src/
├── app/
│ ├── layout.tsx # Root layout
│ └── page.tsx # Home page
├── components/
│ └── wallet/
│ └── WalletConnect.tsx
├── lib/
│ └── stellar/
│ └── freighter.ts
└── styles/
└── globals.css

text

## ⚡ Quick Start
```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
🔗 Live Demo
https://AgentPayEscrow.github.io/agent-escrow-app/

🤝 Contributing
Pull requests welcome! See CONTRIBUTING.md for guidelines.