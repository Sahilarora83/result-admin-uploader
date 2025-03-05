
import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StudentInfoProps {
  student: {
    name: string;
    solRollNo: string;
    examRollNo: string;
    course: string;
    semester: string;
    session: string;
  };
}

const StudentInfo: FC<StudentInfoProps> = ({ student }) => {
  return (
    <Card className="w-full glass-panel animate-fade-in-up">
      <CardHeader className="bg-university-100 pb-2 border-b border-university-200">
        <CardTitle className="text-lg font-medium text-university-800">Student Information</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Name:</p>
            <p className="text-base font-medium text-gray-900">{student.name}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Course:</p>
            <p className="text-base font-medium text-gray-900">{student.course}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-gray-600">SOL Roll No:</p>
            <p className="text-base font-medium text-gray-900">{student.solRollNo}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Exam Roll No:</p>
            <p className="text-base font-medium text-gray-900">{student.examRollNo}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Semester:</p>
            <p className="text-base font-medium text-gray-900">{student.semester}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Session:</p>
            <p className="text-base font-medium text-gray-900">{student.session}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentInfo;
