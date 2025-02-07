
import { useState, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Track } from "../types/track";

interface MusicPlayerProps {
  currentTrack: Track | null;
}

export function MusicPlayer({ currentTrack }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-morphism p-4 animate-slide-up">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={currentTrack.cover_url}
            alt={currentTrack.title}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div>
            <h3 className="font-semibold">{currentTrack.title}</h3>
            <p className="text-sm text-muted-foreground">{currentTrack.artist}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button onClick={togglePlay} size="icon" className="hover-scale">
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
          <Button variant="ghost" size="icon">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          <Slider
            value={[volume]}
            max={1}
            step={0.1}
            onValueChange={handleVolumeChange}
            className="w-24"
          />
        </div>

        <audio
          ref={audioRef}
          src={currentTrack.url}
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
}
