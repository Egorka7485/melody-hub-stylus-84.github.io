import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface WaveSectionProps {
  onPlay: () => void;
}

const data = [
  { time: "0s", value: 30 },
  { time: "5s", value: 85 },
  { time: "10s", value: 45 },
  { time: "15s", value: 90 },
  { time: "20s", value: 40 },
  { time: "25s", value: 95 },
  { time: "30s", value: 35 },
];

export function WaveSection({ onPlay }: WaveSectionProps) {
  const [showChart, setShowChart] = useState(false);

  const handlePlay = () => {
    setShowChart(true);
    onPlay();
  };

  return (
    <div className="relative w-full h-[400px] mb-12 overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-500 animate-pulse opacity-75 blur-3xl" />
      <div className="relative h-full flex flex-col items-center justify-center text-white">
        <h2 className="text-4xl font-bold mb-8">Моя волна</h2>
        {!showChart ? (
          <Button 
            onClick={handlePlay}
            className="bg-black/20 hover:bg-black/30 text-white rounded-full p-8"
          >
            <Play className="h-8 w-8" />
          </Button>
        ) : (
          <div className="w-full h-48 px-8">
            <ChartContainer
              config={{
                wave: {
                  theme: {
                    light: "#ffffff",
                    dark: "#ffffff",
                  },
                },
              }}
            >
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="white" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="white" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
                  stroke="white" 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="white" 
                  tickLine={false}
                  axisLine={false}
                  hide
                />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent
                          className="bg-black/50 border-none"
                          content={`Value: ${payload[0].value}`}
                        />
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="white"
                  fill="url(#waveGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        )}
      </div>
    </div>
  );
}