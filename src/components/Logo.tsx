
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
          src="/lovable-uploads/759006c9-8433-4c72-9e0f-402d9984606d.png" 
          alt="University Logo" 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Logo;
