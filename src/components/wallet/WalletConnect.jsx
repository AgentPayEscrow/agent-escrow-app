'use client';

import { useState, useEffect } from 'react';

export default function WalletConnect({ onConnect, onDisconnect }) {
  const [publicKey, setPublicKey] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const checkWallet = async () => {
      const installed = typeof window !== 'undefined' && typeof window.freighterApi !== 'undefined';
      setIsInstalled(installed);
    };
    checkWallet();
  }, []);

  const handleConnect = async () => {
    if (!isInstalled) {
      window.open('https://www.freighter.app/', '_blank');
      return;
    }
    
    setIsConnecting(true);
    try {
      const publicKey = await window.freighterApi.getPublicKey();
      setPublicKey(publicKey);
      if (onConnect) onConnect(publicKey);
    } catch (error) {
      alert('Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setPublicKey(null);
    if (onDisconnect) onDisconnect();
  };

  const truncate = (addr) => {
    if (!addr) return addr;
    return addr.substring(0, 6) + '...' + addr.substring(addr.length - 4);
  };

  return (
    <div>
      {publicKey ? (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-300">{truncate(publicKey)}</span>
          <button onClick={handleDisconnect} className="px-4 py-2 text-sm text-red-400">Disconnect</button>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold"
        >
          {isConnecting ? 'Connecting...' : isInstalled ? 'Connect Wallet' : 'Install Freighter'}
        </button>
      )}
    </div>
  );
}