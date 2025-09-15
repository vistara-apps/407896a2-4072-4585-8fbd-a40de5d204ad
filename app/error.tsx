'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center space-y-4 max-w-md mx-auto px-6">
        <div className="text-6xl">⚠️</div>
        <h2 className="text-2xl font-bold text-textPrimary">
          Something went wrong!
        </h2>
        <p className="text-textSecondary">
          We encountered an error while loading BytePlus Pro. Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors duration-200"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
