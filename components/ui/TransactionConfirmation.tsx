'use client';

import { useState, useEffect } from 'react';
import { usePublicClient } from 'wagmi';
import { base } from 'wagmi/chains';

interface TransactionConfirmationProps {
  txHash: string;
  onConfirmed?: () => void;
  onFailed?: (error: string) => void;
}

export function TransactionConfirmation({ txHash, onConfirmed, onFailed }: TransactionConfirmationProps) {
  const publicClient = usePublicClient();
  const [status, setStatus] = useState<'pending' | 'confirmed' | 'failed'>('pending');
  const [confirmations, setConfirmations] = useState(0);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!txHash || !publicClient) return;

    const checkConfirmation = async () => {
      try {
        const receipt = await publicClient.getTransactionReceipt({ hash: txHash as `0x${string}` });

        if (receipt) {
          if (receipt.status === 'success') {
            setStatus('confirmed');
            setConfirmations(receipt.confirmations || 1);
            onConfirmed?.();
          } else {
            setStatus('failed');
            setError('Transaction failed');
            onFailed?.('Transaction failed');
          }
        } else {
          // Transaction not yet mined, check if it exists
          const tx = await publicClient.getTransaction({ hash: txHash as `0x${string}` });
          if (tx) {
            setStatus('pending');
            setConfirmations(0);
          } else {
            setStatus('failed');
            setError('Transaction not found');
            onFailed?.('Transaction not found');
          }
        }
      } catch (err: any) {
        console.error('Error checking transaction:', err);
        setError(err.message);
        onFailed?.(err.message);
      }
    };

    // Check immediately
    checkConfirmation();

    // Set up polling for confirmations
    const interval = setInterval(checkConfirmation, 3000); // Check every 3 seconds

    return () => clearInterval(interval);
  }, [txHash, publicClient, onConfirmed, onFailed]);

  const getStatusColor = () => {
    switch (status) {
      case 'confirmed': return 'text-green-600';
      case 'failed': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'confirmed': return '✅';
      case 'failed': return '❌';
      default: return '⏳';
    }
  };

  return (
    <div className="bg-surface rounded-lg p-6 card-shadow">
      <h3 className="text-xl font-semibold mb-4">Transaction Confirmation</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-textSecondary">Status:</span>
          <div className={`flex items-center space-x-2 font-medium ${getStatusColor()}`}>
            <span>{getStatusIcon()}</span>
            <span className="capitalize">{status}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-textSecondary">Transaction Hash:</span>
          <a
            href={`https://basescan.org/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent/80 font-mono text-sm break-all"
          >
            {txHash.slice(0, 10)}...{txHash.slice(-8)}
          </a>
        </div>

        {status === 'confirmed' && (
          <div className="flex items-center justify-between">
            <span className="text-textSecondary">Confirmations:</span>
            <span className="font-medium text-green-600">{confirmations}</span>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        {status === 'pending' && (
          <div className="flex items-center justify-center space-x-2 text-yellow-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
            <span>Waiting for confirmation...</span>
          </div>
        )}
      </div>
    </div>
  );
}
