// src/components/ResultForm.tsx
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

  const handleSolRollNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSolRollNo(e.target.value);
  };

  const handleExamRollNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExamRollNo(e.target.value);
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

    setIsSubmitting(true);

    try {
      const storedData = localStorage.getItem('studentData');
      if (storedData) {
        const studentData = JSON.parse(storedData).find((student: any) => student.solRollNo === solRollNo || student.examRollNo === examRollNo);
        if (studentData) {
          navigate(`/results`, { state: { studentData } });
        } else {
          toast({
            title: "No data found",
            description: "No results found for the provided roll numbers.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while fetching results.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto p-6 md:p-8 animate-fade-in-up">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="solRollNo" className="text-gray-700 flex items-center font-bold">
            SOL Roll No
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="solRollNo"
            placeholder="Enter your SOL roll number"
            className="transition-all duration-300 focus:ring-2 focus:ring-green-500 border-gray-300 h-12"
            value={solRollNo}
            onChange={handleSolRollNoChange}
            required={!examRollNo}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="examRollNo" className="text-gray-700 flex items-center font-bold">
            Exam Roll Number
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="examRollNo"
            placeholder="Enter your exam roll number"
            className="transition-all duration-300 focus:ring-2 focus:ring-green-500 border-gray-300 h-12"
            value={examRollNo}
            onChange={handleExamRollNoChange}
            required={!solRollNo}
          />
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 text-black font-bold text-lg">
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
