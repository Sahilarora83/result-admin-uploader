import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StudentInfo from '@/components/StudentInfo';
import ResultTable from '@/components/ResultTable';
import { Button } from "@/components/ui/button";
import { Printer, Download, ArrowLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface StudentData {
  examFlag: string;
  examType: string;
  collCode: string;
  refNo: string;
  rollNo: string;
  name: string;
  courseCode: string;
  courseName: string;
  partAll: number;
  semAll: number;
  paperId: string;
  paperName: string;
  maxMarks: number;
  obtMarks: number;
  paperType: string;
  examRollNumber: string;
}

const Results: FC = () => {
  const location = useLocation();
  const { studentData } = location.state || {};
  const [data, setData] = useState<StudentData[] | null>(studentData || null);
  const { toast } = useToast();

  useEffect(() => {
    if (!studentData) {
      toast({
        title: "Error",
        description: "No data found for the provided roll numbers.",
        variant: "destructive",
      });
    }
  }, [studentData, toast]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast({
      title: "Downloading PDF",
      description: "Your result is being downloaded as a PDF.",
    });
  };

  if (!data) {
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
            <Button to="/" className="bg-university-600 hover:bg-university-700">
              Return to Search
            </Button>
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
          <Button to="/" className="text-university-600 hover:text-university-800 transition-colors flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Search</span>
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint} className="flex items-center gap-1">
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload} className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
          </div>
        </div>
        <div className="print:mb-8 mb-4 text-center animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-university-800 mb-2">
            Internal Assessment Result 2024-2025
          </h1>
          <p className="text-gray-600">
            Department of Distance & Continuing Education, University of Delhi
          </p>
        </div>
        <div className="space-y-6">
          <StudentInfo student={data[0]} />
          <ResultTable studentData={data} />
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
