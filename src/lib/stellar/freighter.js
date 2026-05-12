export async function isFreighterInstalled() {
  return typeof window !== 'undefined' && typeof window.freighterApi !== 'undefined';
}

export async function connectFreighter() {
  if (!isFreighterInstalled()) {
    throw new Error('Freighter wallet not installed');
  }
  const publicKey = await window.freighterApi.getPublicKey();
  return publicKey;
}

export function truncateAddress(address) {
  if (!address || address.length < 12) return address;
  return address.substring(0, 6) + '...' + address.substring(address.length - 4);
}