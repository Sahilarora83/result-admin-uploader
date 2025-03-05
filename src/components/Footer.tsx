
import { FC } from 'react';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-3 text-center text-gray-700" style={{ background: '#e2f4e5' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center text-sm">
          &copy; {currentYear} School of Open Learning, University of Delhi
        </div>
      </div>
    </footer>
  );
};

export default Footer;
