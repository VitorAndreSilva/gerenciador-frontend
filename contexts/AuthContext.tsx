"use client";

import { createContext, JSX, useContext, useState } from "react";
import api from "@/services/api";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

type User = {
    id: number;
    username: string;
    is_admin: boolean;
}

type JWTPayload = {
  user_id: number;
  username: string;
  is_staff: boolean;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null); // Cria um canal global para conceder informações sobre autenticação

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(() => {
        if (typeof window === "undefined") return null;
        const cookies = document.cookie.split("; ");
        const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));
        if (!tokenCookie) return null;

        const token = tokenCookie.split("=")[1];
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        
        const decoded = jwtDecode<JWTPayload>(token)
        return {
            id: decoded.user_id,
            username: decoded.username,
            is_admin: decoded.is_staff
        }
    });

    const loading = false;

    function login(token: string) {
        const decoded = jwtDecode<JWTPayload>(token)
        const user: User = {
            id: decoded.user_id,
            username: decoded.username,
            is_admin: decoded.is_staff
        }
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUser(user);
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        document.cookie = "token=; Max-Age=0; path=/";
        delete api.defaults.headers.common["Authorization"];
        setUser(null);
        router.push("/login");
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("Erro ao usar o AuthContext");
    return context;
}