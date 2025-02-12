
import { useAuth } from "@/contexts/AuthContext";
import { useLikedTracks } from "@/hooks/useLikedTracks";
import { TrackList } from "@/components/TrackList";
import { MusicPlayer } from "@/components/MusicPlayer";
import { useState, useEffect } from "react";
import { Track } from "@/types/track";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function Collection() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const { data: likedTracks = [], isLoading, error } = useLikedTracks();

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Требуется авторизация",
        description: "Пожалуйста, войдите в систему чтобы просматривать коллекцию",
        variant: "destructive",
      });
      navigate("/auth");
    }
  }, [isAuthenticated, navigate, toast]);

  if (!isAuthenticated) {
    return null;
  }

  if (error) {
    console.error("Error fetching liked tracks:", error);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-destructive">Ошибка при загрузке коллекции</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Моя коллекция</h1>
          <p className="text-muted-foreground">
            {likedTracks.length} {likedTracks.length === 1 ? 'трек' : 'треков'}
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <p className="text-muted-foreground">Загрузка...</p>
          </div>
        ) : (
          <TrackList
            tracks={likedTracks}
            onTrackSelect={setCurrentTrack}
            likedTrackIds={likedTracks.map(track => track.id)}
          />
        )}
      </main>

      <MusicPlayer 
        currentTrack={currentTrack} 
        onTrackChange={setCurrentTrack}
      />
    </div>
  );
}
