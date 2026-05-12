// Freighter wallet integration for Stellar

export interface FreighterApi {
  getPublicKey(): Promise<string>;
  isConnected(): Promise<boolean>;
  signTransaction(xdr: string, opts?: { network?: string }): Promise<{ signedXDR: string }>;
  signAuthEntry(): Promise<any>;
}

declare global {
  interface Window {
    freighterApi?: FreighterApi;
  }
}

export async function isFreighterInstalled(): Promise<boolean> {
  return typeof window !== 'undefined' && typeof window.freighterApi !== 'undefined';
}

export async function getFreighterApi(): Promise<FreighterApi | null> {
  if (!await isFreighterInstalled()) {
    return null;
  }
  return window.freighterApi!;
}

export async function connectFreighter(): Promise<string | null> {
  const freighter = await getFreighterApi();
  if (!freighter) {
    throw new Error('Freighter wallet not installed');
  }
  
  try {
    const publicKey = await freighter.getPublicKey();
    return publicKey;
  } catch (error) {
    console.error('Failed to connect Freighter:', error);
    throw error;
  }
}

export async function checkFreighterConnection(): Promise<boolean> {
  const freighter = await getFreighterApi();
  if (!freighter) return false;
  
  try {
    return await freighter.isConnected();
  } catch {
    return false;
  }
}

export function truncateAddress(address: string): string {
  if (!address || address.length < 12) return address;
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}