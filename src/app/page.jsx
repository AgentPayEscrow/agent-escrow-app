'use client';

import { useState, useEffect } from 'react';
import WalletConnect from '@/components/wallet/WalletConnect';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState(null);

  const handleConnect = (key) => {
    setWalletAddress(key);
  };

  const handleDisconnect = () => {
    setWalletAddress(null);
  };

  const truncate = (addr) => {
    if (!addr) return addr;
    return addr.substring(0, 6) + '...' + addr.substring(addr.length - 4);
  };

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <header className="flex justify-between items-center py-4 border-b border-white/10 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-xl">⚡</div>
            <span className="text-2xl font-bold">Agent<span className="gradient-text">Pay</span></span>
          </div>
          <WalletConnect onConnect={handleConnect} onDisconnect={handleDisconnect} />
        </header>

        <div className="text-center py-12">
          <div className="inline-block bg-purple-500/15 border border-purple-500/30 rounded-full px-4 py-1.5 text-sm mb-6">
            🤖 AI-Powered Autonomous Payments
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Let AI Agents Pay{' '}
            <span className="gradient-text">Autonomously</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Spending limits. Human oversight. On Stellar.
          </p>
          {walletAddress && (
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold">
              + Create New Agent
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
          <div className="glass-card p-6 text-center">
            <div className="text-4xl font-bold gradient-text">0</div>
            <div className="text-gray-400 text-sm">Total Agents</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-4xl font-bold gradient-text">$0</div>
            <div className="text-gray-400 text-sm">Total Volume</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-4xl font-bold gradient-text">0</div>
            <div className="text-gray-400 text-sm">Active Agents</div>
          </div>
        </div>

        <div className="glass-card p-6 my-12">
          <h2 className="text-2xl font-bold mb-6">📋 My Agents</h2>
          {!walletAddress ? (
            <div className="text-center py-12 text-gray-400">Connect your wallet to see your AI agents</div>
          ) : (
            <div className="text-center py-12 text-gray-400">No agents yet. Click "Create New Agent" to start</div>
          )}
        </div>

        <footer className="text-center py-8 border-t border-white/10 mt-12 text-gray-400 text-sm">
          <p>Built on Stellar Soroban | Powered by Next.js + NestJS + Rust</p>
        </footer>
      </div>
    </main>
  );
}