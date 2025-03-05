
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Logo from "@/components/Logo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center result-container p-4">
      <div className="text-center glass-panel p-8 md:p-12 rounded-lg max-w-lg mx-auto animate-fade-in-up">
        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>
        
        <h1 className="text-4xl font-bold text-university-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center justify-center rounded-md bg-university-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-university-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-university-700"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
