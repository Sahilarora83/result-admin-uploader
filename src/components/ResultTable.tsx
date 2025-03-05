
import { FC } from 'react';

interface ResultTableProps {
  studentData: {
    name: string;
    course: string;
    subjects: {
      code: string;
      name: string;
      maxMarks: number;
      marksObtained: number;
      status: 'Pass' | 'Fail';
    }[];
  };
}

const ResultTable: FC<ResultTableProps> = ({ studentData }) => {
  // Calculate total marks and percentage
  const totalMaxMarks = studentData.subjects.reduce((acc, subject) => acc + subject.maxMarks, 0);
  const totalObtainedMarks = studentData.subjects.reduce((acc, subject) => acc + subject.marksObtained, 0);
  const percentage = ((totalObtainedMarks / totalMaxMarks) * 100).toFixed(2);
  
  // Determine overall status
  const overallStatus = studentData.subjects.every(subject => subject.status === 'Pass') ? 'PASS' : 'FAIL';
  
  return (
    <div className="w-full animate-fade-in-up glass-panel rounded-lg overflow-hidden">
      <div className="bg-university-100 p-4 border-b border-university-200">
        <h3 className="text-lg font-medium text-university-800">Result Details</h3>
      </div>
      
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Code</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Name</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Marks</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks Obtained</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {studentData.subjects.map((subject, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-3 px-4 text-sm text-gray-900">{subject.code}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{subject.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{subject.maxMarks}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{subject.marksObtained}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      subject.status === 'Pass' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {subject.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 border-t border-gray-200">
                <td colSpan={2} className="py-3 px-4 text-sm font-medium text-gray-900">Total</td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">{totalMaxMarks}</td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">{totalObtainedMarks}</td>
                <td className="py-3 px-4 text-sm font-medium">
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    overallStatus === 'PASS' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {overallStatus}
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        <div className="mt-6 p-4 bg-green-soft rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Percentage:</p>
              <p className="text-lg font-medium text-gray-900">{percentage}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Final Result:</p>
              <p className={`text-lg font-medium ${
                overallStatus === 'PASS' ? 'text-green-700' : 'text-red-700'
              }`}>
                {overallStatus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultTable;
