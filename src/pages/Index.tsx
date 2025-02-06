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

const mockTracks = [
  {
    id: "1",
    title: "Бобр",
    artist: "SLAVA SKRIPKA",
    url: "/path/to/audio1.mp3",
    coverUrl: "https://picsum.photos/200",
  },
  {
    id: "2",
    title: "Худи",
    artist: "Джиган, Artik & Asti, NILETTO",
    url: "/path/to/audio2.mp3",
    coverUrl: "https://picsum.photos/201",
  },
  {
    id: "3",
    title: "Планы на завтра",
    artist: "TIGO, Migrant",
    url: "/path/to/audio3.mp3",
    coverUrl: "https://picsum.photos/202",
  },
];

const categories = [
  { id: 1, title: "Премьера", description: "Открывает вам главные новинки", color: "bg-orange-400" },
  { id: 2, title: "Дежавю", description: "Знакомит с тем, что вы ещё не слушали", color: "bg-purple-500" },
  { id: 3, title: "Плейлист дня", description: "Звучит по-вашему каждый день", color: "bg-green-500" },
];

export default function Index() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showChart, setShowChart] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleWavePlay = () => {
    setCurrentTrack(mockTracks[0]);
  };

  const filteredTracks = mockTracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
                  className="pl-10 bg-gray-50"
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Categories */}
        <nav className="flex space-x-6 mb-8 border-b pb-4">
          <a href="#" className="text-foreground font-medium hover:text-yellow-500 border-b-2 border-yellow-500 pb-4">ВСЕ</a>
          <a href="#" className="text-muted-foreground hover:text-yellow-500">НАСТРОЕНИЯ И ЖАНРЫ</a>
          <a href="#" className="text-muted-foreground hover:text-yellow-500">НОВЫЕ РЕЛИЗЫ</a>
          <a 
            href="#" 
            className="text-muted-foreground hover:text-yellow-500"
            onClick={(e) => {
              e.preventDefault();
              setShowChart(true);
            }}
          >
            ЧАРТ
          </a>
        </nav>

        {showChart ? (
          <div className="bg-card rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Чарт</h2>
            <p className="text-muted-foreground mb-4">Треки, популярные на Яндекс Музыке прямо сейчас</p>
            <TrackList
              tracks={filteredTracks}
              onTrackSelect={(track) => setCurrentTrack(track)}
            />
          </div>
        ) : (
          <>
            {/* Wave Section */}
            <WaveSection onPlay={handleWavePlay} />

            {/* Featured Section */}
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

            {/* Tracks List */}
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Чарт</h2>
              <TrackList
                tracks={filteredTracks}
                onTrackSelect={(track) => setCurrentTrack(track)}
              />
            </div>
          </>
        )}
      </main>

      <MusicPlayer currentTrack={currentTrack} />
      <ThemeToggle />
    </div>
  );
}