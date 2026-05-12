'use client';

import { useState, useEffect } from 'react';
import WalletConnect from '@/components/wallet/WalletConnect';

interface Agent {
  id: number;
  name: string;
  address: string;
  status: 'active' | 'paused';
  balance: number;
  totalSpent: number;
}

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load demo agents when wallet is connected
    if (walletAddress) {
      setAgents([
        { id: 1, name: 'Trading Bot', address: walletAddress, status: 'active', balance: 5000000, totalSpent: 2000000 },
        { id: 2, name: 'Payment Processor', address: walletAddress, status: 'active', balance: 10000000, totalSpent: 3000000 },
      ]);
    } else {
      setAgents([]);
    }
    setLoading(false);
  }, [walletAddress]);

  const handleConnect = (key: string) => {
    setWalletAddress(key);
  };

  const handleDisconnect = () => {
    setWalletAddress(null);
    setAgents([]);
  };

  const createAgent = () => {
    if (!walletAddress) {
      alert('Please connect your wallet first');
      return;
    }
    
    const name = prompt('Enter agent name:', 'My AI Agent');
    if (!name) return;
    
    const newAgent: Agent = {
      id: Date.now(),
      name,
      address: walletAddress,
      status: 'active',
      balance: 0,
      totalSpent: 0,
    };
    
    setAgents([...agents, newAgent]);
    alert(`Agent "${name}" created successfully!`);
  };

  const toggleAgentStatus = (id: number) => {
    setAgents(agents.map(agent =>
      agent.id === id
        ? { ...agent, status: agent.status === 'active' ? 'paused' : 'active' }
        : agent
    ));
  };

  const totalVolume = agents.reduce((sum, agent) => sum + agent.totalSpent, 0);
  const activeAgents = agents.filter(a => a.status === 'active').length;

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <header className="flex justify-between items-center py-4 border-b border-white/10 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-xl">
              ⚡
            </div>
            <span className="text-2xl font-bold">
              Agent<span className="gradient-text">Pay</span>
            </span>
          </div>
          <WalletConnect onConnect={handleConnect} onDisconnect={handleDisconnect} />
        </header>

        {/* Hero Section */}
        <div className="text-center py-12">
          <div className="inline-block bg-purple-500/15 border border-purple-500/30 rounded-full px-4 py-1.5 text-sm mb-6">
            🤖 AI-Powered Autonomous Payments
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Let AI Agents Pay{' '}
            <span className="gradient-text">Autonomously</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Spending limits. Human oversight. Zero-knowledge proofs. On Stellar.
          </p>
          {walletAddress && (
            <button
              onClick={createAgent}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              + Create New Agent
            </button>
          )}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
          <div className="glass-card p-6 text-center hover:translate-y-[-4px] transition-all">
            <div className="text-4xl font-bold gradient-text">{agents.length}</div>
            <div className="text-gray-400 text-sm mt-2">Total Agents</div>
          </div>
          <div className="glass-card p-6 text-center hover:translate-y-[-4px] transition-all">
            <div className="text-4xl font-bold gradient-text">${(totalVolume / 1000000).toFixed(2)}</div>
            <div className="text-gray-400 text-sm mt-2">Total Volume</div>
          </div>
          <div className="glass-card p-6 text-center hover:translate-y-[-4px] transition-all">
            <div className="text-4xl font-bold gradient-text">{activeAgents}</div>
            <div className="text-gray-400 text-sm mt-2">Active Agents</div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
          <div className="glass-card p-6 text-center hover:translate-y-[-4px] transition-all">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">Create Agents</h3>
            <p className="text-gray-400 text-sm">Deploy AI agents with custom spending limits in seconds</p>
          </div>
          <div className="glass-card p-6 text-center hover:translate-y-[-4px] transition-all">
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">Set Limits</h3>
            <p className="text-gray-400 text-sm">Daily, weekly, and monthly spending caps per agent</p>
          </div>
          <div className="glass-card p-6 text-center hover:translate-y-[-4px] transition-all">
            <div className="text-5xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold mb-2">ZK Privacy</h3>
            <p className="text-gray-400 text-sm">Zero-knowledge proofs keep your payments private</p>
          </div>
        </div>

        {/* Agents Dashboard */}
        <div className="glass-card p-6 my-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">📋 My Agents</h2>
            {walletAddress && (
              <button
                onClick={createAgent}
                className="px-4 py-2 bg-purple-600/20 rounded-full text-sm hover:bg-purple-600/30 transition-colors"
              >
                + New Agent
              </button>
            )}
          </div>
          
          {!walletAddress ? (
            <div className="text-center py-12 text-gray-400">
              <p>Connect your wallet to see your AI agents</p>
            </div>
          ) : agents.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p>No agents yet. Click "Create New Agent" to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex flex-wrap justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all"
                >
                  <div>
                    <div className="font-semibold">{agent.name}</div>
                    <div className="text-gray-400 text-xs font-mono">
                      {agent.address.substring(0, 10)}...
                    </div>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      agent.status === 'active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {agent.status === 'active' ? '● Active' : '⏸ Paused'}
                    </span>
                  </div>
                  <div className="font-semibold gradient-text">
                    ${(agent.balance / 1000000).toFixed(2)}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleAgentStatus(agent.id)}
                      className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition-colors"
                    >
                      {agent.status === 'active' ? 'Pause' : 'Resume'}
                    </button>
                    <button
                      className="px-3 py-1 bg-purple-500/20 rounded-full text-xs hover:bg-purple-500/30 transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-white/10 mt-12 text-gray-400 text-sm">
          <p>Built on Stellar Soroban | Powered by Next.js + NestJS + Rust</p>
          <p className="mt-2">© 2026 AgentPay Escrow — Secure AI Agent Payments</p>
        </footer>
      </div>
    </main>
  );
}