
import { FC } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

interface HeaderProps {
  variant?: 'student' | 'admin';
}

const Header: FC<HeaderProps> = ({ variant = 'student' }) => {
  return (
    <header className="w-full py-4 px-6 md:px-8 bg-white/90 backdrop-blur-md border-b border-green-light/30 sticky top-0 z-50 shadow-sm transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Logo size="md" />
          <div className="hidden md:block">
            <h1 className="text-university-800 text-xl md:text-2xl font-medium">
              Department of Distance & Continuing Education
            </h1>
            <div className="text-gray-600 text-sm md:text-base">
              School of Open Learning, University of Delhi
            </div>
          </div>
        </div>
        
        <nav>
          <ul className="flex items-center space-x-4">
            {variant === 'admin' ? (
              <>
                <li>
                  <Link 
                    to="/admin" 
                    className="text-gray-600 hover:text-university-600 text-sm px-2 py-1 rounded-md transition-all duration-200 animated-border-button"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/" 
                    className="text-gray-600 hover:text-university-600 text-sm px-2 py-1 rounded-md transition-all duration-200 animated-border-button"
                  >
                    Student Portal
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/login" 
                    className="bg-university-600 text-white hover:bg-university-700 text-sm px-3 py-1.5 rounded-md transition-all duration-200"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link 
                    to="/" 
                    className="text-gray-600 hover:text-university-600 text-sm px-2 py-1 rounded-md transition-all duration-200 animated-border-button"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/login" 
                    className="bg-university-600 text-white hover:bg-university-700 text-sm px-3 py-1.5 rounded-md transition-all duration-200"
                  >
                    Admin Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
