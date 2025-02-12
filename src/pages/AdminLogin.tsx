
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

  const handleSubmit = async (e: React.FormEvent) => {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-50 to-yellow-100">
      <div className="bg-white p-8 rounded-lg w-full max-w-md space-y-6 shadow-lg relative">
        <Button 
          variant="ghost" 
          className="absolute left-4 top-4"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад
        </Button>
        <div className="text-center pt-8">
          <h1 className="text-2xl font-bold text-yellow-500">Melody Hub</h1>
          <p className="text-gray-600 mt-2">Войдите в свой аккаунт</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600">
            Войти
          </Button>
          <div className="text-center">
            <Button 
              variant="link" 
              type="button"
              onClick={() => navigate("/auth")}
              className="text-sm text-gray-600"
            >
              Регистрация для пользователей
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
