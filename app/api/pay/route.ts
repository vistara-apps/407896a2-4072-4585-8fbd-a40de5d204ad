import { NextRequest, NextResponse } from 'next/server';

// Mock x402 payment endpoint for testing
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, description, chainId } = body;

    // Validate required fields
    if (!amount || !currency || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, currency, description' },
        { status: 400 }
      );
    }

    // For x402 protocol, return 402 Payment Required with payment instructions
    const paymentInstructions = {
      version: '1',
      chainId: chainId || 8453, // Base mainnet
      currency: currency.toLowerCase(),
      amount: amount,
      recipient: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', // Mock recipient address
      description: description,
      callbackUrl: `${request.nextUrl.origin}/api/pay/verify`,
      expiry: Math.floor(Date.now() / 1000) + 300, // 5 minutes
    };

    return new NextResponse(
      JSON.stringify({
        error: 'Payment Required',
        payment: paymentInstructions,
      }),
      {
        status: 402,
        headers: {
          'Content-Type': 'application/json',
          'X-Payment-Required': JSON.stringify(paymentInstructions),
        },
      }
    );
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Mock verification endpoint
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const txHash = searchParams.get('txHash');

  if (!txHash) {
    return NextResponse.json(
      { error: 'Missing txHash parameter' },
      { status: 400 }
    );
  }

  // Mock successful verification
  return NextResponse.json({
    success: true,
    txHash,
    status: 'confirmed',
    message: 'Payment verified successfully',
  });
}
