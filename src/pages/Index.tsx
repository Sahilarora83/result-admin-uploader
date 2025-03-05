
import { FC } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ResultForm from '@/components/ResultForm';
import Logo from '@/components/Logo';

const Index: FC = () => {
  const currentYear = new Date().getFullYear();
  const academicYear = `${currentYear}-${currentYear + 1}`;
  
  return (
    <div className="min-h-screen flex flex-col result-container">
      <Header />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          
          <h1 className="text-2xl md:text-4xl font-bold text-university-800 mb-3">
            Department of Distance & Continuing Education
          </h1>
          <h2 className="text-lg md:text-xl text-gray-700 mb-1">
            School of Open Learning
          </h2>
          <h3 className="text-base md:text-lg text-gray-600">
            Campus of Open Learning, University of Delhi
          </h3>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 mb-8 text-center shadow-sm border border-white/30 animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-bold text-university-800 mb-2">
              Internal Assessment Result {academicYear}
            </h2>
            <p className="text-gray-600">
              Enter your SOL Roll Number or Exam Roll Number to view your result
            </p>
          </div>
          
          <ResultForm />
          
          <div className="mt-8 text-center text-sm text-gray-600 animate-fade-in-up">
            <p>For any queries, please contact the examination department.</p>
            <p className="mt-1">Email: examdept@sol.du.ac.in | Phone: +91-XXXXXXXXXX</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
