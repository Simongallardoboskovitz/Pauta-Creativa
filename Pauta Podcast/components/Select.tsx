import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label:string;
  options: { value: string; label: string }[];
}

const Select: React.FC<SelectProps> = ({ label, name, options, ...props }) => {
  const chevronIcon = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`;

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-brand-dark/80">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="w-full px-1 py-2 bg-transparent border-0 border-b-2 border-brand-dark/20 rounded-none focus:outline-none focus:ring-0 focus:border-brand-orange transition-colors duration-300 appearance-none text-lg"
        style={{
          backgroundImage: chevronIcon,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
        }}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-brand-beige text-brand-dark">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;