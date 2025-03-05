
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Logo from '@/components/Logo';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const Login: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // For demo purposes using a timeout to simulate API call
    setTimeout(() => {
      // Demo credentials: admin/admin123
      if (username === 'admin' && password === 'admin123') {
        toast({
          title: "Success",
          description: "You've successfully logged in",
        });
        navigate('/admin');
      } else {
        toast({
          title: "Error",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          
          <h1 className="text-2xl font-bold text-university-800">
            Admin Login
          </h1>
          <p className="text-gray-600 mt-1">
            Department of Distance & Continuing Education
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="glass-panel p-6 md:p-8 rounded-lg shadow-md animate-fade-in-up">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="transition-all duration-300 focus:ring-2 focus:ring-university-300 border-gray-300"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="transition-all duration-300 focus:ring-2 focus:ring-university-300 border-gray-300 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="text-right">
              <a href="#" className="text-sm text-university-600 hover:text-university-700 animated-border-button">
                Forgot password?
              </a>
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-university-600 hover:bg-university-700 transition-all duration-300"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </Button>
            
           
          </div>
        </form>
        
        <div className="text-center mt-6">
          <a 
            href="/"
            className="text-sm text-university-600 hover:text-university-700 animated-border-button inline-flex items-center gap-1"
          >
            <span>Back to student portal</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
