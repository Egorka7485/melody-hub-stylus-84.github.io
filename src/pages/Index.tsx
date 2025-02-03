import { useState } from "react";
import { MusicPlayer } from "../components/MusicPlayer";
import { TrackList } from "../components/TrackList";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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
];

const categories = [
  { id: 1, title: "Премьера", description: "Открывает вам главные новинки", color: "bg-orange-400" },
  { id: 2, title: "Дежавю", description: "Знакомит с тем, что вы ещё не слушали", color: "bg-purple-500" },
  { id: 3, title: "Плейлист дня", description: "Звучит по-вашему каждый день", color: "bg-green-500" },
];

export default function Index() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const filteredTracks = mockTracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-yellow-500">Melody Hub</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-black hover:text-yellow-500">Главное</a>
                <a href="#" className="text-black hover:text-yellow-500">Подкасты и книги</a>
                <a href="#" className="text-black hover:text-yellow-500">Детям</a>
                <a href="#" className="text-black hover:text-yellow-500">Коллекция</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative w-64">
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
                  className="text-black hover:text-yellow-500"
                  onClick={() => navigate("/admin/dashboard")}
                >
                  <User className="h-5 w-5" />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  className="text-black hover:text-yellow-500"
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
          <a href="#" className="text-black font-medium hover:text-yellow-500 border-b-2 border-yellow-500 pb-4">ВСЕ</a>
          <a href="#" className="text-gray-600 hover:text-yellow-500">НАСТРОЕНИЯ И ЖАНРЫ</a>
          <a href="#" className="text-gray-600 hover:text-yellow-500">НОВЫЕ РЕЛИЗЫ</a>
          <a href="#" className="text-gray-600 hover:text-yellow-500">ЧАРТ</a>
          <a href="#" className="text-gray-600 hover:text-yellow-500">ПОДБОРКИ</a>
        </nav>

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
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">Все треки</h2>
          <TrackList
            tracks={filteredTracks}
            onTrackSelect={(track) => setCurrentTrack(track)}
          />
        </div>
      </main>

      <MusicPlayer currentTrack={currentTrack} />
    </div>
  );
}