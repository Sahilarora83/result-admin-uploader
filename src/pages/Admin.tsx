
import { FC, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FileUploader from '@/components/FileUploader';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload, Users, FileText, Search } from 'lucide-react';

const Admin: FC = () => {
  const [activeTab, setActiveTab] = useState<string>('upload');
  const [uploadHistory, setUploadHistory] = useState<any[]>([]);
  const { toast } = useToast();
  
  const handleSuccessfulUpload = (uploadDetails: any) => {
    setUploadHistory(prev => [uploadDetails, ...prev]);
    toast({
      title: "Upload successful",
      description: `${uploadDetails.filename} has been successfully uploaded.`,
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
        
        <Tabs 
          defaultValue="upload" 
          className="animate-fade-in"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-2 md:w-[400px] mb-6">
            <TabsTrigger value="upload" className="text-sm">Upload Results</TabsTrigger>
            <TabsTrigger value="history" className="text-sm">Upload History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="mt-0">
            <FileUploader onUploadSuccess={handleSuccessfulUpload} />
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
                              <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                                upload.status === 'complete' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {upload.status === 'complete' ? 'Complete' : 'Error'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-sm">
                              <button 
                                className="text-university-600 hover:text-university-800 transition-colors mr-2"
                                onClick={() => {
                                  toast({
                                    title: "Download started",
                                    description: `Downloading ${upload.filename}`,
                                  });
                                }}
                              >
                                <Download className="h-4 w-4" />
                              </button>
                              
                              <button 
                                className="text-university-600 hover:text-university-800 transition-colors"
                                onClick={() => {
                                  toast({
                                    title: "Search results",
                                    description: `Viewing records for ${upload.filename}`,
                                  });
                                }}
                              >
                                <Search className="h-4 w-4" />
                              </button>
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
