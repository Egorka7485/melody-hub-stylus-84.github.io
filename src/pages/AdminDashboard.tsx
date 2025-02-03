import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Music } from "lucide-react";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadedTracks, setUploadedTracks] = useState<File[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedTracks(files);
    toast({
      title: "Files selected",
      description: `${files.length} tracks ready to upload`,
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="glass-morphism p-6 rounded-lg space-y-6 slide-up-animation">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Upload New Tracks</h2>
            <p className="text-muted-foreground">
              Select music files to upload to the platform
            </p>
          </div>

          <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground">Drag and drop files here or</p>
              <Input
                type="file"
                accept="audio/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" className="hover-scale" asChild>
                  <span>Browse Files</span>
                </Button>
              </label>
            </div>
          </div>

          {uploadedTracks.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Selected Tracks</h3>
              {uploadedTracks.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-secondary rounded-lg"
                >
                  <Music className="h-5 w-5" />
                  <span>{file.name}</span>
                </div>
              ))}
              <Button className="w-full hover-scale">
                Upload {uploadedTracks.length} Tracks
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}