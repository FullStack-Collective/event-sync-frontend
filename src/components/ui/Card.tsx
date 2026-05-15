'use client';

import { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: FC<CardProps> = ({ children, className, hover = true }) => {
  return (
    <div
      className={cn(
        'bg-surface rounded-xl shadow-card overflow-hidden',
        hover && 'transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader: FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn('p-6 border-b border-border', className)}>
      {children}
    </div>
  );
};

export const CardBody: FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  return <div className={cn('p-6', className)}>{children}</div>;
};

export const CardFooter: FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn('p-6 border-t border-border', className)}>
      {children}
    </div>
  );
};