import { FC, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, X, FileX, Info } from "lucide-react";

interface FileUploaderProps {
  onUploadSuccess: (uploadDetails: any) => void;
}

// Mock function to parse Excel data
const parseExcelData = (file: File): Promise<any[]> => {
  return new Promise((resolve) => {
    // In a real application, you would use a library like xlsx or exceljs
    // For this demo, we'll simulate parsing by generating mock data
    setTimeout(() => {
      const recordCount = Math.floor(Math.random() * 200) + 50; // Random number between 50-250
      const mockData = [];
      
      for (let i = 0; i < recordCount; i++) {
        mockData.push({
          name: `Student ${i + 1}`,
          solRollNo: `00-0-00-${(100000 + i).toString().padStart(6, '0')}`,
          examRollNo: `${(1000000000000 + i).toString().slice(0, 12)}`,
          course: "B.Com (Hons)",
          semester: "IV",
          session: "2023-2024",
          subjects: [
            { code: "BC401", name: "Financial Management", maxMarks: 100, marksObtained: Math.floor(Math.random() * 40) + 60, status: 'Pass' },
            { code: "BC402", name: "Cost Accounting", maxMarks: 100, marksObtained: Math.floor(Math.random() * 40) + 60, status: 'Pass' },
            { code: "BC403", name: "Business Statistics", maxMarks: 100, marksObtained: Math.floor(Math.random() * 40) + 60, status: 'Pass' },
            { code: "BC404", name: "Corporate Law", maxMarks: 100, marksObtained: Math.floor(Math.random() * 40) + 60, status: 'Pass' },
            { code: "BC405", name: "Income Tax Law", maxMarks: 100, marksObtained: Math.floor(Math.random() * 40) + 60, status: 'Pass' },
          ]
        });
      }
      
      resolve(mockData);
    }, 2000);
  });
};

const FileUploader: FC<FileUploaderProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState<number>(0);
  const [batchName, setBatchName] = useState<string>('');
  const [courseType, setCourseType] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (selectedFile) {
      // Check if file is an Excel file
      if (!selectedFile.name.match(/\.(xlsx|xls|csv)$/)) {
        toast({
          title: "Invalid file format",
          description: "Please upload only Excel files (.xlsx, .xls, .csv)",
          variant: "destructive",
        });
        return;
      }
      
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setUploadStatus('idle');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select an Excel file to upload.",
        variant: "destructive",
      });
      return;
    }
    
    if (!batchName.trim()) {
      toast({
        title: "Batch name required",
        description: "Please enter a batch name for this upload.",
        variant: "destructive",
      });
      return;
    }
    
    if (!courseType.trim()) {
      toast({
        title: "Course type required",
        description: "Please enter a course type for this upload.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    setUploadStatus('uploading');
    setProgress(0);
    
    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + 5;
      });
    }, 200);
    
    try {
      // Parse Excel data
      const parsedData = await parseExcelData(file!);
      
      // Set final progress
      setProgress(100);
      
      // Update status after a brief delay
      setTimeout(() => {
        setIsUploading(false);
        setUploadStatus('success');
        
        // Store upload information
        const uploadDetails = {
          filename: fileName,
          date: new Date().toISOString().split('T')[0],
          records: parsedData.length,
          status: 'complete',
          batchName,
          courseType,
          data: parsedData
        };
        
        // Call the success callback
        onUploadSuccess(uploadDetails);
        
        // Process student data for lookup
        const existingDataStr = localStorage.getItem('studentData');
        let studentMap = new Map();
        
        // If there's existing data, load it first
        if (existingDataStr) {
          studentMap = new Map(JSON.parse(existingDataStr));
        }
        
        // Add new student data to the map
        parsedData.forEach(student => {
          studentMap.set(student.solRollNo, student);
          studentMap.set(student.examRollNo, student);
        });
        
        // Save updated student data
        localStorage.setItem('studentData', JSON.stringify(Array.from(studentMap.entries())));
        
        // Keep upload form open for next upload
        setTimeout(() => {
          // Only reset file and status, keep batch name and course type
          setFile(null);
          setFileName('');
          setUploadStatus('idle');
          setProgress(0);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }, 3000);
      }, 500);
    } catch (error) {
      console.error('Error processing file:', error);
      setIsUploading(false);
      setUploadStatus('error');
      setProgress(0);
      clearInterval(progressInterval);
      
      toast({
        title: "Upload failed",
        description: "There was an error processing your file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetUpload = () => {
    setFile(null);
    setFileName('');
    setUploadStatus('idle');
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="w-full glass-panel animate-fade-in-up shadow-lg">
      <CardHeader className="bg-university-50 rounded-t-lg">
        <CardTitle className="text-university-800 flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Student Results
        </CardTitle>
        <CardDescription>
          Upload Excel file (.xlsx, .xls, .csv) containing student results data.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="batchName" className="text-gray-700">Batch Name</Label>
              <Input
                id="batchName"
                placeholder="e.g., BA Program 2023-24"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                className="border-gray-300 focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="courseType" className="text-gray-700">Course Type</Label>
              <Input
                id="courseType"
                placeholder="e.g., Internal Assessment"
                value={courseType}
                onChange={(e) => setCourseType(e.target.value)}
                className="border-gray-300 focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          
          <div 
            className={`
              border-2 border-dashed rounded-lg p-8 
              ${file ? 'border-university-300 bg-university-50/50' : 'border-gray-300 hover:border-university-300 bg-gray-50/50'} 
              transition-all duration-300 
              flex flex-col items-center justify-center gap-4
              relative
            `}
          >
            {!file ? (
              <>
                <div className="p-4 rounded-full bg-university-100">
                  <Upload className="h-8 w-8 text-university-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop your file here, or click to browse
                  </p>
                  <p className="text-xs text-gray-500">
                    Supports .xlsx, .xls, .csv formats
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </>
            ) : (
              <div className="w-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-md bg-university-100">
                    <FileSpreadsheet className="h-6 w-6 text-university-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{fileName}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <button 
                    onClick={resetUpload}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    disabled={isUploading}
                    aria-label="Remove file"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
                
                {uploadStatus === 'uploading' && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Uploading...</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-university-500 h-2 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {uploadStatus === 'success' && (
                  <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-2 rounded">
                    <CheckCircle className="h-4 w-4" />
                    <span>Upload complete! Results are now in the system.</span>
                  </div>
                )}
                
                {uploadStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-2 rounded">
                    <AlertCircle className="h-4 w-4" />
                    <span>Upload failed. Please try again.</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-blue-700 mb-1">File Requirements</h4>
                <ul className="list-disc list-inside text-xs text-blue-600 space-y-1">
                  <li>Excel file must contain headers: Student Name, SOL Roll No (format: 00-0-00-000000), Exam Roll No</li>
                  <li>Each student's data must be in a separate row</li>
                  <li>Include columns for course code, marks obtained, and maximum marks</li>
                  <li>Maximum file size: 10MB</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FileX className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-yellow-700 mb-1">Common Upload Errors</h4>
                <ul className="list-disc list-inside text-xs text-yellow-600 space-y-1">
                  <li>Missing required columns in the Excel file</li>
                  <li>Invalid SOL Roll Number format (must be 00-0-00-000000)</li>
                  <li>Duplicate student entries</li>
                  <li>Invalid marks (exceeding maximum marks)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end gap-3 bg-gray-50 rounded-b-lg p-4">
        <Button 
          variant="outline" 
          onClick={resetUpload}
          disabled={!file || isUploading}
          className="border-gray-300"
        >
          Reset
        </Button>
        <Button 
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="bg-university-600 hover:bg-university-700"
        >
          {isUploading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </span>
          ) : (
            "Upload Results"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FileUploader;
