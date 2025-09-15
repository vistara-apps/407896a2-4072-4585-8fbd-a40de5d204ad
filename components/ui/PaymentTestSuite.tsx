'use client';

import { useState } from 'react';
import { PaymentFlow } from './PaymentFlow';
import { TransactionConfirmation } from './TransactionConfirmation';

export function PaymentTestSuite() {
  const [activeTest, setActiveTest] = useState<string>('');
  const [txHash, setTxHash] = useState<string>('');
  const [testResults, setTestResults] = useState<{[key: string]: 'pending' | 'success' | 'failed'}>({});

  const testCases = [
    {
      id: 'usdc-payment',
      title: 'USDC Payment on Base',
      amount: '10',
      currency: 'USDC' as const,
      description: 'Test USDC payment for data access',
    },
    {
      id: 'eth-payment',
      title: 'ETH Payment on Base',
      amount: '0.01',
      currency: 'ETH' as const,
      description: 'Test ETH payment for premium features',
    },
    {
      id: 'large-payment',
      title: 'Large USDC Payment',
      amount: '100',
      currency: 'USDC' as const,
      description: 'Test large payment handling',
    },
  ];

  const handlePaymentSuccess = (testId: string) => (hash: string) => {
    setTxHash(hash);
    setTestResults(prev => ({ ...prev, [testId]: 'success' }));
    setActiveTest(testId);
  };

  const handlePaymentError = (testId: string) => (error: string) => {
    console.error(`Test ${testId} failed:`, error);
    setTestResults(prev => ({ ...prev, [testId]: 'failed' }));
  };

  const handleConfirmationSuccess = (testId: string) => () => {
    console.log(`Test ${testId} confirmed successfully`);
  };

  const handleConfirmationError = (testId: string) => (error: string) => {
    console.error(`Test ${testId} confirmation failed:`, error);
    setTestResults(prev => ({ ...prev, [testId]: 'failed' }));
  };

  const getTestStatus = (testId: string) => {
    return testResults[testId] || 'pending';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'failed': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return '✅';
      case 'failed': return '❌';
      default: return '⏳';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-lg p-6 card-shadow">
        <h2 className="text-2xl font-semibold mb-4">x402 Payment Flow Test Suite</h2>
        <p className="text-textSecondary mb-6">
          Test the complete x402 payment flow with wagmi useWalletClient integration.
          This suite verifies USDC on Base payments, transaction confirmations, and error handling.
        </p>

        <div className="grid gap-4">
          {testCases.map((testCase) => (
            <div key={testCase.id} className="border border-surface rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">{testCase.title}</h3>
                <div className={`flex items-center space-x-2 ${getStatusColor(getTestStatus(testCase.id))}`}>
                  <span>{getStatusIcon(getTestStatus(testCase.id))}</span>
                  <span className="text-sm capitalize">{getTestStatus(testCase.id)}</span>
                </div>
              </div>

              <PaymentFlow
                amount={testCase.amount}
                currency={testCase.currency}
                description={testCase.description}
                onSuccess={handlePaymentSuccess(testCase.id)}
                onError={handlePaymentError(testCase.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {txHash && activeTest && (
        <TransactionConfirmation
          txHash={txHash}
          onConfirmed={handleConfirmationSuccess(activeTest)}
          onFailed={handleConfirmationError(activeTest)}
        />
      )}

      <div className="bg-surface rounded-lg p-6 card-shadow">
        <h3 className="text-xl font-semibold mb-4">Test Results Summary</h3>
        <div className="space-y-2">
          {testCases.map((testCase) => (
            <div key={testCase.id} className="flex items-center justify-between py-2 border-b border-surface last:border-b-0">
              <span>{testCase.title}</span>
              <div className={`flex items-center space-x-2 ${getStatusColor(getTestStatus(testCase.id))}`}>
                <span>{getStatusIcon(getTestStatus(testCase.id))}</span>
                <span className="text-sm capitalize">{getTestStatus(testCase.id)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
          <strong>Note:</strong> These tests require a payment API endpoint that returns 402 responses.
          In a real implementation, you would need a server that supports x402 protocol.
        </div>
      </div>
    </div>
  );
}
