import { useState } from "react";
import { MusicPlayer } from "../components/MusicPlayer";
import { TrackList } from "../components/TrackList";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Mock data for demonstration
const mockTracks = [
  {
    id: "1",
    title: "Sample Track 1",
    artist: "Artist 1",
    url: "/path/to/audio1.mp3",
    coverUrl: "https://picsum.photos/200",
  },
  {
    id: "2",
    title: "Sample Track 2",
    artist: "Artist 2",
    url: "/path/to/audio2.mp3",
    coverUrl: "https://picsum.photos/201",
  },
  // Add more mock tracks as needed
];

export default function Index() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTracks = mockTracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search tracks..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="glass-morphism p-6 rounded-lg slide-up-animation">
            <h2 className="text-2xl font-bold mb-6">All Tracks</h2>
            <TrackList
              tracks={filteredTracks}
              onTrackSelect={(track) => setCurrentTrack(track)}
            />
          </div>
        </div>
      </div>

      <MusicPlayer currentTrack={currentTrack} />
    </div>
  );
}