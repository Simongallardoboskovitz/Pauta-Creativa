import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 animate-fade-in py-16">
      <div className="w-16 h-16 border-4 border-t-4 border-brand-dark/10 border-t-brand-orange rounded-full animate-spin"></div>
      <p className="text-lg text-brand-dark/70">Cocinando ideas a fuego lento...</p>
    </div>
  );
};

export default Loader;