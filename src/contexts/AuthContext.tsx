
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/user";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchProfile(session.user.id);
      }
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (session) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfile(null);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!session?.user.id) throw new Error("No user logged in");

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", session.user.id);

    if (error) throw error;
    await fetchProfile(session.user.id);
  };

  const uploadAvatar = async (file: File): Promise<string> => {
    if (!session?.user.id) throw new Error("No user logged in");

    const fileExt = file.name.split('.').pop();
    const filePath = `${session.user.id}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    await updateProfile({ avatar_url: publicUrl });
    return publicUrl;
  };

  return (
    <AuthContext.Provider value={{ session, profile, isLoading, updateProfile, uploadAvatar }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
