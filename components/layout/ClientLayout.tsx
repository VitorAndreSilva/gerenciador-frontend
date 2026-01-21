"use client";

import dynamic from "next/dynamic";
import { AuthProvider } from "@/contexts/AuthContext";
import Sidebar from "./Sidebar";

const Header = dynamic(() => import("./Header"), {
    ssr: false,
});

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
              <Header />
              <div className="flex">
                <Sidebar />
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </AuthProvider>
    );
}