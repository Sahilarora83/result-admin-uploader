
import { FC } from 'react';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-4 text-center text-gray-700 border-t border-gray-200" style={{ background: '#e2f4e5' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center text-sm flex flex-col md:flex-row justify-center items-center gap-2">
          <span>&copy; {currentYear} School of Open Learning, University of Delhi</span>
          <span className="hidden md:inline">|</span>
          <span>Department of Distance & Continuing Education</span>
        </div>
        <div className="mt-1 text-xs text-gray-500">
          For technical support, contact: support@sol.du.ac.in
        </div>
      </div>
    </footer>
  );
};

export default Footer;
