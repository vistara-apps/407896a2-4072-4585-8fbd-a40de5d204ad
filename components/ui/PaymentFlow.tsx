'use client';

import { useState } from 'react';
import { useWalletClient } from 'wagmi';
import { withPaymentInterceptor } from 'x402-axios';
import axios from 'axios';
import { base } from 'wagmi/chains';

interface PaymentFlowProps {
  amount: string;
  currency: 'USDC' | 'ETH';
  description: string;
  onSuccess?: (txHash: string) => void;
  onError?: (error: string) => void;
}

export function PaymentFlow({ amount, currency, description, onSuccess, onError }: PaymentFlowProps) {
  const { data: walletClient } = useWalletClient();
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<string>('');

  const handlePayment = async () => {
    if (!walletClient) {
      onError?.('Wallet not connected');
      return;
    }

    setIsProcessing(true);
    setStatus('Initializing payment...');

    try {
      // Create axios instance with x402 payment interceptor
      const baseURL = process.env.NEXT_PUBLIC_PAYMENT_API_URL || (typeof window !== 'undefined' ? window.location.origin : '');
      const api = withPaymentInterceptor(
        axios.create({
          baseURL,
          timeout: 30000,
        }),
        walletClient
      );

      setStatus('Sending payment request...');

      // Make a request that will trigger a 402 response
      const response = await api.post('/api/pay', {
        amount,
        currency,
        description,
        chainId: base.id, // Base network
      });

      setStatus('Payment successful!');

      // Extract transaction hash from response headers if available
      const txHash = response.headers['x-payment-response']?.split(',')[0] || 'unknown';
      onSuccess?.(txHash);

    } catch (error: any) {
      console.error('Payment failed:', error);
      setStatus(`Payment failed: ${error.message}`);
      onError?.(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-surface rounded-lg p-6 card-shadow">
      <h3 className="text-xl font-semibold mb-4">x402 Payment Flow</h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-textSecondary">Amount:</span>
          <span className="font-medium">{amount} {currency}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-textSecondary">Network:</span>
          <span className="font-medium">Base</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-textSecondary">Description:</span>
          <span className="font-medium">{description}</span>
        </div>
      </div>

      {status && (
        <div className={`p-3 rounded-md mb-4 ${
          status.includes('failed') || status.includes('error')
            ? 'bg-red-50 text-red-700 border border-red-200'
            : status.includes('successful')
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-blue-50 text-blue-700 border border-blue-200'
        }`}>
          {status}
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={isProcessing || !walletClient}
        className={`w-full py-3 px-4 rounded-md font-medium transition-all duration-200 ${
          isProcessing || !walletClient
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-accent text-white hover:bg-accent/90 shadow-sm hover:shadow-md'
        }`}
      >
        {isProcessing ? 'Processing...' : !walletClient ? 'Connect Wallet' : `Pay ${amount} ${currency}`}
      </button>

      {!walletClient && (
        <p className="text-sm text-textSecondary mt-2 text-center">
          Please connect your wallet to make payments
        </p>
      )}
    </div>
  );
}
