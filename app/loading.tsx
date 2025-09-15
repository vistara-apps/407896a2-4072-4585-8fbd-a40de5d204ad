export default function Loading() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-accent/20 rounded-full"></div>
          <div className="absolute top-0 w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="space-y-2">
          <div className="text-xl font-semibold text-textPrimary">Loading BytePlus Pro</div>
          <div className="text-textMuted">Preparing your data dashboard...</div>
        </div>
      </div>
    </div>
  );
}
