import { FC } from 'react';
import Footer from '@/components/Footer';
import ResultForm from '@/components/ResultForm';
import Logo from '@/components/Logo';
import { motion } from 'framer-motion';

const Index: FC = () => {
  const currentYear = new Date().getFullYear();
  const academicYear = "2024-2025";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-100 to-green-200">
      <main className="flex-1 w-full mx-auto py-10 px-6 md:px-10 lg:px-16">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10">
          <div className="text-center mb-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center items-center gap-4 mb-4"
            >
              <Logo size="lg" />
            </motion.div>

            <div className="text-left mx-auto max-w-3xl mb-8">
              <h1 className="text-xl md:text-2xl font-bold text-green-900 text-center uppercase">Department of Distance & Continuing Education</h1>
              <h2 className="text-lg md:text-xl font-bold text-green-900 text-center uppercase">School of Open Learning</h2>
              <h3 className="text-lg md:text-xl font-bold text-green-900 text-center uppercase">Campus of Open Learning, University of Delhi</h3>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="border-t border-b border-gray-300 py-6 mb-8 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-green-900">Internal Assessment Result {academicYear}</h2>
          </motion.div>

          <ResultForm />

          <div className="mt-16 text-center text-gray-700 text-sm md:text-base">
            <p>© {currentYear} School of Open Learning, University of Delhi</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Index;
