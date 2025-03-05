
import { FC } from 'react';
import Footer from '@/components/Footer';
import ResultForm from '@/components/ResultForm';

const Index: FC = () => {
  const currentYear = new Date().getFullYear();
  const academicYear = `${currentYear}-${currentYear + 1}`;
  
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#e2f4e5' }}>
      <main className="flex-1 w-full mx-auto py-8 md:py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <div className="flex justify-center items-center gap-4 mb-4">
              <img
                src="/lovable-uploads/759006c9-8433-4c72-9e0f-402d9984606d.png"
                alt="University of Delhi Logo"
                className="w-16 h-16 md:w-20 md:h-20"
              />
            </div>
            
            <div className="text-left mx-auto max-w-3xl mb-8">
              <h1 className="text-xl md:text-2xl font-bold text-green-900">
                DEPARTMENT OF DISTANCE & CONTINUING EDUCATION,
              </h1>
              <h2 className="text-lg md:text-xl font-bold text-green-900">
                SCHOOL OF OPEN LEARNING,
              </h2>
              <h3 className="text-lg md:text-xl font-bold text-green-900">
                CAMPUS OF OPEN LEARNING, UNIVERSITY OF DELHI
              </h3>
            </div>
          </div>
          
          <div className="border-t border-b border-gray-300 py-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-green-900">
              Internal Assessment Result 2023-2024
            </h2>
          </div>
          
          <ResultForm />
          
          <div className="mt-16 text-center text-gray-800">
            <p>©2024 School of Open Learning, University of Delhi</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
