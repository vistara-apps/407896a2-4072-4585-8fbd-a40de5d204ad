import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTokenAmount(amount: number, decimals: number = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function truncateAddress(address: string, chars: number = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function calculateReputationLevel(score: number): string {
  if (score >= 90) return 'Elite';
  if (score >= 75) return 'Expert';
  if (score >= 50) return 'Contributor';
  if (score >= 25) return 'Member';
  return 'Newcomer';
}

export function getReputationColor(score: number): string {
  if (score >= 90) return 'text-yellow-400';
  if (score >= 75) return 'text-accent';
  if (score >= 50) return 'text-green-400';
  if (score >= 25) return 'text-blue-400';
  return 'text-gray-400';
}
