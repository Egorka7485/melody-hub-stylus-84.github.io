
import { Play, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Track } from "../types/track";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useToggleLikeTrack } from "@/hooks/useLikedTracks";

interface TrackListProps {
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
  likedTrackIds?: string[];
}

export function TrackList({ tracks, onTrackSelect, likedTrackIds = [] }: TrackListProps) {
  const { toast } = useToast();
  const { session } = useAuth();
  const toggleLike = useToggleLikeTrack();

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

  const handleLikeClick = async (track: Track) => {
    if (!session) {
      toast({
        title: "Необходима авторизация",
        description: "Пожалуйста, войдите в систему чтобы добавлять треки в избранное",
        variant: "destructive",
      });
      return;
    }

    const isLiked = likedTrackIds.includes(track.id);
    try {
      await toggleLike.mutateAsync({ trackId: track.id, isLiked });
      toast({
        title: isLiked ? "Удалено из избранного" : "Добавлено в избранное",
        description: `Трек "${track.title}" ${isLiked ? "удален из" : "добавлен в"} избранное`,
      });
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    }
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
          <div className="flex-1">
            <h3 className="font-semibold">{track.title}</h3>
            <p className="text-sm text-muted-foreground">{track.artist}</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className={likedTrackIds.includes(track.id) ? "text-red-500" : ""}
            onClick={() => handleLikeClick(track)}
          >
            <Heart className="h-5 w-5" fill={likedTrackIds.includes(track.id) ? "currentColor" : "none"} />
          </Button>
        </div>
      ))}
    </div>
  );
}
