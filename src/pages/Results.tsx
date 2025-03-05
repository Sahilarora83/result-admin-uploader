
import { FC, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StudentInfo from '@/components/StudentInfo';
import ResultTable from '@/components/ResultTable';
import { Button } from "@/components/ui/button";
import { Printer, Download, ArrowLeft } from 'lucide-react';

const Results: FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const solRollNo = queryParams.get('sol') || '';
  const examRollNo = queryParams.get('exam') || '';
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Mock student data
  const studentData = {
    name: "Rahul Sharma",
    solRollNo: solRollNo || "00-0-00-123456",
    examRollNo: examRollNo || "DU-2023-9876543",
    course: "B.Com (Hons)",
    semester: "IV",
    session: "2023-2024",
    subjects: [
      { code: "BC401", name: "Financial Management", maxMarks: 100, marksObtained: 78, status: 'Pass' as const },
      { code: "BC402", name: "Cost Accounting", maxMarks: 100, marksObtained: 82, status: 'Pass' as const },
      { code: "BC403", name: "Business Statistics", maxMarks: 100, marksObtained: 65, status: 'Pass' as const },
      { code: "BC404", name: "Corporate Law", maxMarks: 100, marksObtained: 71, status: 'Pass' as const },
      { code: "BC405", name: "Income Tax Law", maxMarks: 100, marksObtained: 68, status: 'Pass' as const },
    ],
  };
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert("Downloading result as PDF...");
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
            Internal Assessment Result 2023-2024
          </h1>
          <p className="text-gray-600">
            Department of Distance & Continuing Education, University of Delhi
          </p>
        </div>
        
        <div className="space-y-6">
          <StudentInfo student={studentData} />
          <ResultTable studentData={studentData} />
          
          <div className="print:hidden glass-panel p-4 rounded-lg animate-fade-in-up">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> This is a digital copy of your result. For official purposes, please download the PDF or print this page.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
