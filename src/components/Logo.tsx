
import { FC } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
  };
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizes[size]} relative overflow-hidden animate-fade-in rounded-full`}>
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe80MUAyEyF80wquwX4-JrwXrZyq49VdNXwQ&s" 
          alt="University Logo" 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Logo;
