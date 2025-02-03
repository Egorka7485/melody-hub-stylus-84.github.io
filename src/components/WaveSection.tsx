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
          className="bg-black/20 hover:bg-black/30 text-white rounded-full p-8 hover:scale-105 transition-all duration-300"
        >
          <img 
            src="/lovable-uploads/34fddc51-3552-4391-a256-7ef1a8cb5c37.png" 
            alt="Play"
            className="h-8 w-8 mix-blend-multiply invert"
          />
        </Button>
      </div>
    </div>
  );
}