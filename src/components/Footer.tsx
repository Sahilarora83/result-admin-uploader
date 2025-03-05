
import { FC } from 'react';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-4 px-6 border-t border-green-light/30 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center text-sm text-gray-600">
          &copy; {currentYear} School of Open Learning, University of Delhi. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
