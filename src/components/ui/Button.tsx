'use client';

import { ButtonHTMLAttributes, FC } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const variants = {
	primary: 'bg-primary text-background hover:bg-primary-600 focus:ring-primary',
	secondary: 'bg-secondary text-white hover:bg-secondary-600 focus:ring-secondary',
	accent: 'bg-accent text-white hover:bg-accent-600 focus:ring-accent',
	outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-background focus:ring-primary',
	ghost: 'text-muted hover:text-primary hover:bg-surface focus:ring-primary',
  };

  const sizes = {
	xs: 'px-2 py-1 text-xs',
	sm: 'px-3 py-1.5 text-sm',
	md: 'px-4 py-2 text-base',
	lg: 'px-6 py-3 text-lg',
	xl: 'px-8 py-4 text-xl',
  };

  return (
	<button
	  className={cn(
		'relative font-semibold rounded-lg transition-all duration-200',
		'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
		'disabled:opacity-50 disabled:cursor-not-allowed',
		'active:scale-95 transform',
		variants[variant],
		sizes[size],
		className
	  )}
	  disabled={disabled || isLoading}
	  {...props}
	>
	  {isLoading ? (
		<div className="flex items-center justify-center gap-2">
		  <svg
			className="animate-spin h-4 w-4"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		  >
			<circle
			  className="opacity-25"
			  cx="12"
			  cy="12"
			  r="10"
			  stroke="currentColor"
			  strokeWidth="4"
			/>
			<path
			  className="opacity-75"
			  fill="currentColor"
			  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		  </svg>
		  <span>Chargement...</span>
		</div>
	  ) : (
		children
	  )}
	</button>
  );
};