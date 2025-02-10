
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      toast({
        title: "Успешный вход",
        description: "Добро пожаловать в систему",
      });
      navigate("/admin/dashboard");
    } else {
      toast({
        title: "Ошибка входа",
        description: "Неверные учетные данные",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800">
      <div className="relative w-full max-w-md">
        <Button
          variant="ghost"
          className="absolute left-4 top-4"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад
        </Button>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-full space-y-6 shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-yellow-500">Melody Hub</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Вход для администраторов</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600">
              Войти
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
