
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ResultForm: FC = () => {
  const [solRollNo, setSolRollNo] = useState<string>('');
  const [examRollNo, setExamRollNo] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!solRollNo && !examRollNo) {
      toast({
        title: "Error",
        description: "Please enter at least one roll number",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // For demo, navigate to results page with query params
      navigate(`/results?sol=${solRollNo}&exam=${examRollNo}`);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-xl mx-auto glass-panel p-6 md:p-8 rounded-lg animate-fade-in-up"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="solRollNo" className="text-gray-700 flex items-center">
            SOL Roll Number
            <span className="text-university-500 ml-1">*</span>
          </Label>
          <Input
            id="solRollNo"
            placeholder="00-0-00-000000"
            pattern="[0-9\-]*"
            className="transition-all duration-300 focus:ring-2 focus:ring-university-300 border-gray-300"
            value={solRollNo}
            onChange={(e) => setSolRollNo(e.target.value)}
            required={!examRollNo}
          />
          <p className="text-xs text-muted-foreground">Enter your SOL Roll Number or Exam Roll Number</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="examRollNo" className="text-gray-700 flex items-center">
            Exam Roll Number
            <span className="text-university-500 ml-1">*</span>
          </Label>
          <Input
            id="examRollNo"
            placeholder="Enter your exam roll number"
            className="transition-all duration-300 focus:ring-2 focus:ring-university-300 border-gray-300"
            value={examRollNo}
            onChange={(e) => setExamRollNo(e.target.value)}
            required={!solRollNo}
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-green-dark hover:bg-green-dark/90 transition-all duration-300"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </span>
          ) : (
            "Search"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ResultForm;
