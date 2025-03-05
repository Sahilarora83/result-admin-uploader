
import { FC, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StudentInfo from '@/components/StudentInfo';
import ResultTable from '@/components/ResultTable';
import { Button } from "@/components/ui/button";
import { Printer, Download, ArrowLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface StudentData {
  name: string;
  solRollNo: string;
  examRollNo: string;
  course: string;
  semester: string;
  session: string;
  subjects: {
    code: string;
    name: string;
    maxMarks: number;
    marksObtained: number;
    status: 'Pass' | 'Fail';
  }[];
}

const Results: FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const solRollNo = queryParams.get('sol') || '';
  const examRollNo = queryParams.get('exam') || '';
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchStudentData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      try {
        // In a real app, you would fetch from an API
        // Here we'll check localStorage for uploaded data
        const storedData = localStorage.getItem('studentData');
        
        if (!storedData) {
          setNotFound(true);
          setIsLoading(false);
          return;
        }
        
        const studentMap = new Map(JSON.parse(storedData));
        
        // Try to find student by SOL Roll No or Exam Roll No
        let student = null;
        if (solRollNo) {
          student = studentMap.get(solRollNo);
        }
        
        if (!student && examRollNo) {
          student = studentMap.get(examRollNo);
        }
        
        if (student) {
          setStudentData(student);
          setNotFound(false);
        } else {
          setNotFound(true);
          toast({
            title: "Result not found",
            description: "No results found for the provided roll numbers.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
        setNotFound(true);
        toast({
          title: "Error",
          description: "An error occurred while fetching results.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (solRollNo || examRollNo) {
      fetchStudentData();
    } else {
      setNotFound(true);
      setIsLoading(false);
      toast({
        title: "Missing information",
        description: "Please provide either SOL Roll Number or Exam Roll Number.",
        variant: "destructive",
      });
    }
  }, [solRollNo, examRollNo, toast]);
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    // In a real app, this would generate a PDF
    toast({
      title: "Downloading PDF",
      description: "Your result is being downloaded as a PDF.",
    });
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col result-container">
        <Header />
        
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-university-600 border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-university-800">Loading result data...</p>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col result-container">
        <Header />
        
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <div className="mb-4 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Result Not Found</h2>
            <p className="text-gray-600 mb-6">We couldn't find any results matching the provided roll numbers. Please verify your information and try again.</p>
            <Link to="/">
              <Button className="bg-university-600 hover:bg-university-700">
                Return to Search
              </Button>
            </Link>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  const currentYear = new Date().getFullYear();
  const academicYear = `${currentYear}-${currentYear + 1}`;
  
  return (
    <div className="min-h-screen flex flex-col result-container">
      <Header />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 print:hidden animate-fade-in">
          <Link 
            to="/" 
            className="text-university-600 hover:text-university-800 transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Search</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePrint}
              className="flex items-center gap-1"
            >
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDownload}
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
          </div>
        </div>
        
        <div className="print:mb-8 mb-4 text-center animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-university-800 mb-2">
            Internal Assessment Result {academicYear}
          </h1>
          <p className="text-gray-600">
            Department of Distance & Continuing Education, University of Delhi
          </p>
        </div>
        
        {studentData && (
          <div className="space-y-6">
            <StudentInfo 
              student={{
                name: studentData.name,
                solRollNo: studentData.solRollNo,
                examRollNo: studentData.examRollNo,
                course: studentData.course,
                semester: studentData.semester,
                session: studentData.session
              }} 
            />
            <ResultTable studentData={studentData} />
            
            <div className="print:hidden glass-panel p-4 rounded-lg animate-fade-in-up">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> This is a digital copy of your result. For official purposes, please download the PDF or print this page.
              </p>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
