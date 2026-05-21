"use client";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="rounded-xl p-6 bg-red-500/10 border border-red-500/20 text-center">
      <p className="text-red-400 mb-3">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-full text-sm font-medium bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
        >
          Réessayer
        </button>
      )}
    </div>
  );
}