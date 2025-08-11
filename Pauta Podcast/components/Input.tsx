import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...props }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-brand-dark/80">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="w-full px-1 py-2 bg-transparent border-0 border-b-2 border-brand-dark/20 rounded-none focus:outline-none focus:ring-0 focus:border-brand-orange transition-colors duration-300 placeholder-brand-dark/30 text-lg"
        {...props}
      />
    </div>
  );
};

export default Input;