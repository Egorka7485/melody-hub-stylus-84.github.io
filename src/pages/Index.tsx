import { useState } from "react";
import { MusicPlayer } from "../components/MusicPlayer";
import { TrackList } from "../components/TrackList";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { WaveSection } from "../components/WaveSection";
import { ThemeToggle } from "../components/ThemeToggle";
import { useTracks, useUpdatePlayCount } from "../hooks/useTracks";
import { Track } from "../types/track";
import { useToast } from "@/components/ui/use-toast";

const categories = [
  { id: 1, title: "Премьера", description: "Открывает вам главные новинки", color: "bg-orange-400" },
  { id: 2, title: "Дежавю", description: "Знакомит с тем, что вы ещё не слушали", color: "bg-purple-500" },
  { id: 3, title: "Плейлист дня", description: "Звучит по-вашему каждый день", color: "bg-green-500" },
];

export default function Index() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showMainMenu, setShowMainMenu] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const { data: tracks = [], isLoading, error } = useTracks();
  const updatePlayCount = useUpdatePlayCount();

  const handleTrackSelect = async (track: Track) => {
    setCurrentTrack(track);
    try {
      await updatePlayCount.mutateAsync(track.id);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить количество прослушиваний",
        variant: "destructive",
      });
    }
  };

  const handleWavePlay = () => {
    if (tracks.length > 0) {
      handleTrackSelect(tracks[0]);
    }
  };

  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <img 
                src="/lovable-uploads/fa38c363-37a6-4b2d-9b3f-7365e9548f13.png" 
                alt="Lifestyle Label" 
                className="h-16 transform hover:scale-105 transition-all duration-300 hover:drop-shadow-lg animate-fade-in dark:invert dark:brightness-200 mix-blend-multiply dark:mix-blend-normal"
              />
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-foreground hover:text-yellow-500">Главное</a>
                <a href="#" className="text-foreground hover:text-yellow-500">Коллекция</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative w-48">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Поиск треков..."
                  className="pl-10 bg-background border-input text-foreground placeholder:text-muted-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-yellow-500"
                  onClick={() => navigate("/admin/dashboard")}
                >
                  <User className="h-5 w-5" />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-yellow-500"
                  onClick={() => navigate("/admin")}
                >
                  Войти
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <nav className="flex space-x-6 mb-8 border-b pb-4">
          <a 
            href="#" 
            className={`${
              selectedCategory === "all" 
                ? "text-foreground font-medium border-b-2 border-yellow-500" 
                : "text-muted-foreground"
            } hover:text-yellow-500 pb-4`}
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory("all");
              setShowChart(false);
              setShowMainMenu(true);
            }}
          >
            ВСЕ
          </a>
          <a 
            href="#" 
            className={`${
              selectedCategory === "moods" 
                ? "text-foreground font-medium border-b-2 border-yellow-500" 
                : "text-muted-foreground"
            } hover:text-yellow-500 pb-4`}
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory("moods");
              setShowChart(false);
              setShowMainMenu(false);
            }}
          >
            НАСТРОЕНИЯ И ЖАНРЫ
          </a>
          <a 
            href="#" 
            className={`${
              selectedCategory === "new" 
                ? "text-foreground font-medium border-b-2 border-yellow-500" 
                : "text-muted-foreground"
            } hover:text-yellow-500 pb-4`}
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory("new");
              setShowChart(false);
              setShowMainMenu(false);
            }}
          >
            НОВЫЕ РЕЛИЗЫ
          </a>
          <a 
            href="#" 
            className={`${
              selectedCategory === "chart" 
                ? "text-foreground font-medium border-b-2 border-yellow-500" 
                : "text-muted-foreground"
            } hover:text-yellow-500 pb-4`}
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory("chart");
              setShowChart(true);
              setShowMainMenu(false);
            }}
          >
            ЧАРТ
          </a>
        </nav>

        {showChart ? (
          <div className="bg-card rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Чарт</h2>
            {isLoading ? (
              <p className="text-muted-foreground">Загрузка треков...</p>
            ) : error ? (
              <p className="text-red-500">Ошибка при загрузке треков</p>
            ) : (
              <>
                <p className="text-muted-foreground mb-4">Треки, популярные на нашей площадке прямо сейчас</p>
                <TrackList
                  tracks={filteredTracks}
                  onTrackSelect={handleTrackSelect}
                />
              </>
            )}
          </div>
        ) : showMainMenu ? (
          <>
            <WaveSection onPlay={handleWavePlay} />
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`${category.color} rounded-lg p-6 text-white hover:scale-105 transition-transform cursor-pointer`}
                  >
                    <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Чарт</h2>
              {isLoading ? (
                <p className="text-muted-foreground">Загрузка треков...</p>
              ) : error ? (
                <p className="text-red-500">Ошибка при загрузке треков</p>
              ) : (
                <TrackList
                  tracks={filteredTracks}
                  onTrackSelect={handleTrackSelect}
                />
              )}
            </div>
          </>
        ) : null}
      </main>

      <MusicPlayer currentTrack={currentTrack} onTrackChange={handleTrackSelect} />
      <ThemeToggle />
    </div>
  );
}
