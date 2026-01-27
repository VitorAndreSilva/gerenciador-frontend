"use client";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link"
import { useState } from "react";

export default function Header() {
    const { user, loading, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    if (loading) return null;
    //if (!user) return null;

    return (
        <header className="h-16 bg-slate-900 text-white flex items-center px-6">
            <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden mr-4 p-2"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            {menuOpen && (
                <nav className="absolute top-16 left-0 rigth-0 bg-slate-800 flex flex-col p-4">
                    <Link
                    href="/produtos"
                    className="px-3 py-2 rounded hover:bg-gray-100"
                    >
                        Produtos
                    </Link>
                    <Link
                    href="/marcas"
                    className="px-3 py-2 rounded hover:bg-gray-100"
                    >
                        Marcas
                    </Link>
                </nav>
            )}
            <div className="md:hidden flex-1 flex justify-center">
                <Link
                href="/"
                >
                    <h1 className="md:text-lg sm:text-md font-semibold">Gerenciador</h1>
                </Link>
            </div>
            <div className="hidden md:block">
                <Link
                href="/"
                >
                    <h1 className="md:text-lg sm:text-md font-semibold">Gerenciador</h1>
                </Link>
            </div>
            {user && (
                <button 
                onClick={logout}
                className="ml-auto bg-red-600 hover:bg-red-700
                text-sm font-medium
                px-4 py-2 rounded-md
                transition-colors
                focus:outline-none focus:ring-2 focus:ring-red-400"
                >Logout</button>
            )}
        </header>
    )
}