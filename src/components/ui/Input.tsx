'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/utils/format-date';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-es-text mb-2">
            {label}
          </label>
        )}
        <input
          className={cn(
            'w-full px-4 py-2 bg-es-bg3 border border-es-text-dim rounded-es',
            'text-es-text placeholder:text-es-text-dim',
            'focus:outline-none focus:ring-2 focus:ring-es-violet focus:border-transparent',
            'transition-all duration-200',
            error && 'border-error focus:ring-error',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';