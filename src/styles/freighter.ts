// Freighter wallet integration for Stellar

export async function isFreighterInstalled(): Promise<boolean> {
  return typeof window !== 'undefined' && typeof window.freighterApi !== 'undefined';
}

export async function connectFreighter(): Promise<string> {
  if (!isFreighterInstalled()) {
    throw new Error('Freighter wallet not installed');
  }
  
  try {
    const publicKey = await window.freighterApi!.getPublicKey();
    return publicKey;
  } catch (error) {
    console.error('Failed to connect Freighter:', error);
    throw error;
  }
}

export async function checkFreighterConnection(): Promise<boolean> {
  if (!isFreighterInstalled()) return false;
  
  try {
    return await window.freighterApi!.isConnected();
  } catch {
    return false;
  }
}

export function truncateAddress(address: string): string {
  if (!address || address.length < 12) return address;
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}