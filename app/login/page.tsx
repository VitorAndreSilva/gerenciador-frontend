"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/services/auth";

export default function Login() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e:React.FormEvent) {
        e.preventDefault();

        try {
            const data = await login(username, password);
            document.cookie = `token=${data.access}; path=/; SameSite=Lax` // Para o middleware
            localStorage.setItem("token", data.access); // Para o axios
            localStorage.setItem("user", JSON.stringify(data.user));
            router.push("/");
        } catch (error: unknown) {
            console.error("Erro ao realizar login: ", error);
        }
    }

    return(
        <div className="max-w-sm mx-auto mt-20">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input 
                type="text" 
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="border p-2"
                />
                <input 
                type="password" 
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border p-2"
                />
                <button 
                type="submit"
                className="bg-blue-600 text-white p-2 rounded"
                >
                    Entrar
                </button>
            </form>
        </div>
    )
}