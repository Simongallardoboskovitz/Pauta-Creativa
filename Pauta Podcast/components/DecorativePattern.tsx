import React from 'react';

const DecorativePattern: React.FC = () => {
  const patterns = React.useMemo(() => {
    const p = [];
    for (let i = 0; i < 70; i++) {
      p.push({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        transform: `rotate(${Math.random() * 90 - 45}deg)`,
        color: ['bg-gray-200', 'bg-gray-400', 'bg-white'][Math.floor(Math.random() * 3)],
        width: `${Math.random() * 25 + 15}px`,
        height: '8px',
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 3 + 4}s`
      });
    }
    return p;
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ maskImage: 'radial-gradient(circle at center, white 70%, transparent 100%)' }} aria-hidden="true">
      {patterns.map((style, i) => (
        <div
          key={i}
          className={`absolute rounded-full animate-pulse ${style.color} shadow-sm`}
          style={{
            top: style.top,
            left: style.left,
            width: style.width,
            height: style.height,
            transform: style.transform,
            animationDelay: style.animationDelay,
            animationDuration: style.animationDuration,
          }}
        />
      ))}
    </div>
  );
};

export default DecorativePattern;
