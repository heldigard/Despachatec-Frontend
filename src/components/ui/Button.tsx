import { ButtonHTMLAttributes } from 'react';

export function Button({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90 transition"
      {...props}
    >
      {children}
    </button>
  );
}
