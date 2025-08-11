import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`w-full px-6 py-4 bg-brand-orange text-white font-bold text-base rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-beige focus:ring-brand-orange transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;