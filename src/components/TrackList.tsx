
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Track } from "../types/track";
import { useToast } from "@/components/ui/use-toast";

interface TrackListProps {
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
}

export function TrackList({ tracks, onTrackSelect }: TrackListProps) {
  const { toast } = useToast();

  const handleTrackSelect = (track: Track) => {
    if (!track.url || !track.cover_url) {
      toast({
        title: "Ошибка",
        description: "Трек недоступен для воспроизведения",
        variant: "destructive",
      });
      return;
    }
    onTrackSelect(track);
  };

  return (
    <div className="space-y-4">
      {tracks.map((track) => (
        <div
          key={track.id}
          className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors group"
        >
          <div className="relative">
            <img
              src={track.cover_url}
              alt={track.title}
              className="w-16 h-16 rounded-md object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
            <Button
              size="icon"
              className="absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleTrackSelect(track)}
            >
              <Play className="h-5 w-5" />
            </Button>
          </div>
          <div>
            <h3 className="font-semibold">{track.title}</h3>
            <p className="text-sm text-muted-foreground">{track.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
