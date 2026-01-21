"use client";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link"

export default function Header() {
    const { user, loading, logout } = useAuth();

    if (loading) return null;
    if (!user) return null;

    return (
        <header className="h-16 bg-slate-900 text-white flex items-center px-6">
            <Link
            href="/"
            >
                <h1 className="text-lg font-semibold">Gerenciador</h1>
            </Link>
            <button 
            onClick={logout}
            className="ml-auto bg-red-600 hover:bg-red-700
            text-sm font-medium
            px-4 py-2 rounded-md
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-red-400"
            >Logout</button>
        </header>
    )
}