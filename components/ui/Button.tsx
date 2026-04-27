'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'yellow' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
  fullWidth?: boolean;
}

const variants = {
  primary:
    'bg-zpurple text-white shadow-game hover:bg-zpurple-dark active:shadow-game-sm active:translate-y-1',
  secondary:
    'bg-white text-zpurple border-2 border-zpurple shadow-game-sm hover:bg-purple-50 active:shadow-none active:translate-y-1',
  yellow:
    'bg-zyellow text-zdark shadow-game hover:bg-yellow-400 active:shadow-game-sm active:translate-y-1',
  ghost:
    'bg-transparent text-zpurple hover:bg-purple-50 border-2 border-transparent hover:border-purple-100',
  danger:
    'bg-red-500 text-white shadow-game-sm hover:bg-red-600 active:shadow-none active:translate-y-1',
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-base rounded-2xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
  xl: 'px-10 py-5 text-xl rounded-3xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        font-bold transition-all duration-150 btn-game
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
