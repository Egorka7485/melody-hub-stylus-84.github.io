
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { UserRound, Mail, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Выход выполнен успешно",
      description: "Вы вышли из аккаунта",
    });
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/")}
        >
          ← Назад
        </Button>
        
        <Card className="p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <UserRound className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Профиль пользователя
              </h1>
              <p className="text-muted-foreground">
                Управление вашим аккаунтом
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Mail className="h-5 w-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground">{user.email}</p>
              </div>
            </div>
          </div>

          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Выйти
          </Button>
        </Card>
      </div>
    </div>
  );
}
