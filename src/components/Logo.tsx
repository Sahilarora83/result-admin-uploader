
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
          src="/lovable-uploads/d68cbc76-6f02-4dd9-955b-16c92fee493d.png" 
          alt="University Logo" 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Logo;
