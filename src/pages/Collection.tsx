
import { useAuth } from "@/contexts/AuthContext";
import { useLikedTracks } from "@/hooks/useLikedTracks";
import { TrackList } from "@/components/TrackList";
import { MusicPlayer } from "@/components/MusicPlayer";
import { useState } from "react";
import { Track } from "@/types/track";
import { useNavigate } from "react-router-dom";

export default function Collection() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const { data: likedTracks = [], isLoading } = useLikedTracks();

  if (!isAuthenticated) {
    navigate("/admin");
    return null;
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
          <div>Загрузка...</div>
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
