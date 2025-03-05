// src/pages/Admin.tsx
import { FC, useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload, Trash2, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import * as XLSX from 'xlsx';

const Admin: FC = () => {
  const [activeTab, setActiveTab] = useState<string>('upload');
  const [uploadHistory, setUploadHistory] = useState<any[]>([]);
  const { toast } = useToast();

  // Load upload history from localStorage when component mounts
  useEffect(() => {
    const storedUploads = localStorage.getItem('resultUploads');
    if (storedUploads) {
      setUploadHistory(JSON.parse(storedUploads));
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const newUpload = {
          filename: file.name,
          date: new Date().toLocaleString(),
          records: jsonData.length,
          status: 'complete',
          data: jsonData,
        };

        const newHistory = [newUpload, ...uploadHistory];
        setUploadHistory(newHistory);
        localStorage.setItem('resultUploads', JSON.stringify(newHistory));
        localStorage.setItem('studentData', JSON.stringify(jsonData));

        toast({
          title: "Upload successful",
          description: `${file.name} has been successfully uploaded.`,
        });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleDeleteFile = (index: number) => {
    const updatedHistory = [...uploadHistory];
    const deletedFile = updatedHistory[index];
    updatedHistory.splice(index, 1);
    setUploadHistory(updatedHistory);
    localStorage.setItem('resultUploads', JSON.stringify(updatedHistory));

    if (deletedFile && deletedFile.data) {
      const storedData = localStorage.getItem('studentData');
      if (storedData) {
        const studentMap = new Map(JSON.parse(storedData));
        deletedFile.data.forEach((student: any) => {
          studentMap.delete(student.solRollNo);
          studentMap.delete(student.examRollNo);
        });
        localStorage.setItem('studentData', JSON.stringify(Array.from(studentMap.entries())));
      }
    }

    toast({
      title: "File deleted",
      description: `${deletedFile.filename} has been removed from your uploads.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header variant="admin" />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-university-800">Admin Dashboard</h1>
          <p className="text-gray-600">Manage student results and upload new data</p>
        </div>
        <Tabs defaultValue="upload" className="animate-fade-in" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:w-[400px] mb-6">
            <TabsTrigger value="upload" className="text-sm">Upload Results</TabsTrigger>
            <TabsTrigger value="history" className="text-sm">Upload History</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="mt-0">
            <label className="block text-sm font-medium text-gray-700">
              Upload Excel File
              <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="mt-1 block w-full" />
            </label>
          </TabsContent>
          <TabsContent value="history" className="mt-0">
            <Card className="glass-panel animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-university-800">Recent Uploads</CardTitle>
              </CardHeader>
              <CardContent>
                {uploadHistory.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No upload history available yet.</p>
                    <p className="text-sm mt-2">Upload a file to see it listed here.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {uploadHistory.map((upload, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm">{upload.filename}</td>
                            <td className="py-3 px-4 text-sm">{upload.date}</td>
                            <td className="py-3 px-4 text-sm">{upload.records}</td>
                            <td className="py-3 px-4 text-sm">
                              <span className={`inline-flex px-2 py-1 text-xs rounded-full ${upload.status === 'complete' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {upload.status === 'complete' ? 'Complete' : 'Error'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-sm flex items-center">
                              <Button variant="ghost" size="sm" className="text-university-600 hover:text-university-800 transition-colors mr-1" onClick={() => {
                                toast({
                                  title: "Download started",
                                  description: `Downloading ${upload.filename}`,
                                });
                              }}>
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 transition-colors" onClick={() => handleDeleteFile(index)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
