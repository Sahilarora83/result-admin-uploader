// src/components/ResultTable.tsx
import { FC } from 'react';

interface ResultTableProps {
  studentData: {
    solRollNo: string;
    name: string;
    programName: string;
    results: {
      courseCode: string;
      courseName: string;
      maxMarks: number;
      marksObtained: number;
    }[];
  };
}

const ResultTable: FC<ResultTableProps> = ({ studentData }) => {
  return (
    <div className="w-full animate-fade-in-up glass-panel rounded-lg overflow-hidden">
      <div className="bg-university-100 p-4 border-b border-university-200">
        <h3 className="text-lg font-medium text-university-800">Result Details</h3>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <p><strong>Sol Roll No.:</strong> {studentData.solRollNo}</p>
          <p><strong>Student Name:</strong> {studentData.name}</p>
          <p><strong>Program Name:</strong> {studentData.programName}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Code</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maximum Marks</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks Obtained</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {studentData.results.map((result, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-3 px-4 text-sm text-gray-900">{result.courseCode}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{result.courseName}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{result.maxMarks}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{result.marksObtained}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultTable;
