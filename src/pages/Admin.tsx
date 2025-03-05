
import { FC, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FileUploader from '@/components/FileUploader';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload, Users, FileText, Search } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
}

const StatCard: FC<StatCardProps> = ({ title, value, icon, trend }) => {
  return (
    <Card className="glass-panel animate-fade-in-up">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
            
            {trend && (
              <p className={`text-xs mt-2 flex items-center gap-1 ${
                trend.direction === 'up' ? 'text-green-600' :
                trend.direction === 'down' ? 'text-red-600' :
                'text-gray-600'
              }`}>
                {trend.direction === 'up' && '↑'}
                {trend.direction === 'down' && '↓'}
                {trend.value}
              </p>
            )}
          </div>
          
          <div className="p-2 rounded-full bg-university-100">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Admin: FC = () => {
  const [activeTab, setActiveTab] = useState<string>('upload');
  const { toast } = useToast();
  
  // Mock data for recent uploads
  const recentUploads = [
    { id: 1, filename: 'BA_Program_Sem3_Results.xlsx', date: '2023-11-15', status: 'complete', records: 245 },
    { id: 2, filename: 'BCom_Sem4_Results.xlsx', date: '2023-11-10', status: 'complete', records: 189 },
    { id: 3, filename: 'MA_English_Sem2_Results.xlsx', date: '2023-11-05', status: 'error', records: 0 },
    { id: 4, filename: 'BSc_Chemistry_Sem1_Results.xlsx', date: '2023-10-30', status: 'complete', records: 120 },
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header variant="admin" />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-university-800">Admin Dashboard</h1>
          <p className="text-gray-600">Manage student results and upload new data</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Total Students" 
            value="4,287" 
            icon={<Users className="h-6 w-6 text-university-600" />}
            trend={{ value: "12% from last month", direction: "up" }}
          />
          
          <StatCard 
            title="Result Uploads" 
            value="32" 
            icon={<Upload className="h-6 w-6 text-university-600" />}
            trend={{ value: "5 this week", direction: "neutral" }}
          />
          
          <StatCard 
            title="Result Downloads" 
            value="1,247" 
            icon={<Download className="h-6 w-6 text-university-600" />}
            trend={{ value: "18% from last week", direction: "up" }}
          />
          
          <StatCard 
            title="Total Courses" 
            value="24" 
            icon={<FileText className="h-6 w-6 text-university-600" />}
            trend={{ value: "2 new courses", direction: "up" }}
          />
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
            <FileUploader />
          </TabsContent>
          
          <TabsContent value="history" className="mt-0">
            <Card className="glass-panel animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-university-800">Recent Uploads</CardTitle>
              </CardHeader>
              
              <CardContent>
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
                      {recentUploads.map((upload) => (
                        <tr key={upload.id} className="border-b hover:bg-gray-50">
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
