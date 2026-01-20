"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { JSX } from "react";

export function Providers({ children }: { children: React.ReactNode }): JSX.Element {
    return <AuthProvider>{children}</AuthProvider>;
}