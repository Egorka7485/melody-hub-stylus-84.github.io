import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WaveSectionProps {
  onPlay: () => void;
}

export function WaveSection({ onPlay }: WaveSectionProps) {
  return (
    <div className="relative w-full h-[400px] mb-12 overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-500 animate-pulse opacity-75 blur-3xl" />
      <div className="relative h-full flex flex-col items-center justify-center text-white">
        <h2 className="text-4xl font-bold mb-8">Моя волна</h2>
        <Button 
          onClick={onPlay}
          className="bg-black/20 hover:bg-black/30 text-white rounded-full p-8"
        >
          <Play className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
}