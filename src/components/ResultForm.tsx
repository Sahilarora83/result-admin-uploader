
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

  // Format SOL Roll Number with dashes (00-0-00-000000)
  const formatSolRollNo = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format with dashes according to the pattern 00-0-00-000000
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 3) {
      return `${digits.substring(0, 2)}-${digits.substring(2)}`;
    } else if (digits.length <= 5) {
      return `${digits.substring(0, 2)}-${digits.substring(2, 3)}-${digits.substring(3)}`;
    } else {
      return `${digits.substring(0, 2)}-${digits.substring(2, 3)}-${digits.substring(3, 5)}-${digits.substring(5, 11)}`;
    }
  };

  // Handle SOL Roll Number input
  const handleSolRollNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSolRollNo(formatSolRollNo(value));
  };

  // Handle Exam Roll Number input (only digits, max 12)
  const handleExamRollNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 12) {
      setExamRollNo(value);
    }
  };

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
    
    // Validate SOL Roll Number format if provided
    if (solRollNo && solRollNo.length !== 14) {
      toast({
        title: "Error",
        description: "SOL Roll Number must be in format 00-0-00-000000 (14 characters)",
        variant: "destructive",
      });
      return;
    }
    
    // Validate Exam Roll Number length if provided
    if (examRollNo && examRollNo.length !== 12) {
      toast({
        title: "Error",
        description: "Exam Roll Number must be 12 digits",
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
      className="w-full max-w-xl mx-auto p-6 md:p-8 animate-fade-in-up"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="solRollNo" className="text-gray-700 flex items-center font-bold">
            SOL Roll No
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="solRollNo"
            placeholder="00-0-00-000000"
            className="transition-all duration-300 focus:ring-2 focus:ring-green-500 border-gray-300 h-12"
            value={solRollNo}
            onChange={handleSolRollNoChange}
            required={!examRollNo}
            maxLength={14} // 00-0-00-000000 (14 characters including dashes)
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="examRollNo" className="text-gray-700 flex items-center font-bold">
            Exam Roll Number
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="examRollNo"
            placeholder="Enter your 12-digit exam roll number"
            className="transition-all duration-300 focus:ring-2 focus:ring-green-500 border-gray-300 h-12"
            value={examRollNo}
            onChange={handleExamRollNoChange}
            required={!solRollNo}
            inputMode="numeric"
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full h-12 bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 text-black font-bold text-lg"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
