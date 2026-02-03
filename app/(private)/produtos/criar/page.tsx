"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { fetchMarcas, Marca } from "@/services/marcas";
import { createProdutos } from "@/services/produtos";
import RequireAuth from "@/components/auth/RequireAuth";

export default function NovoProduto() {
    const router = useRouter();

    const [nome, setNome] = useState("");
    const [marca, setMarca] = useState<number>(0);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [preco, setPreco] = useState<number | "">("");
    const [quantidade, setQuantidade] = useState<number | "">("");

    useEffect(() => {
        fetchMarcas().then(setMarcas);
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (preco === "" || quantidade === "") {
            alert("Preencha todos os campos numéricos")
            return;
        }

        await createProdutos({
            nome,
            marca,
            preco,
            quantidade
        });

        alert("Produto cadastrado com sucesso");
        router.replace("/produtos");
    }

    return (
        <RequireAuth>
            <div className="max-w-md">
                <h2 className="text-2xl font-bold mb-4">Cadastrar novo produto</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                    className="w-full border p-2"
                    type="text" 
                    placeholder="Nome do produto"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                    />
                    <select
                    className="w-full border p-2"
                    value={marca || ""}
                    onChange={e => setMarca(Number(e.target.value))}
                    required
                    >
                        <option value="">Selecione a marca</option>
                        {marcas.map((marca) => (
                            <option key={marca.id} value={marca.id}>
                                {marca.nome}
                            </option>
                        ))}
                    </select>
                    <input 
                    className="w-full border p-2"
                    type="number"
                    placeholder="Preço"
                    value={preco}
                    onChange={e => setPreco(e.target.value === "" ? "" : Number(e.target.value))}
                    required
                    />
                    <input 
                    className="w-full border p-2"
                    type="number"
                    placeholder="Quantidade"
                    value={quantidade}
                    onChange={e => setQuantidade(e.target.value === "" ? "" : Number(e.target.value))}
                    required
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Cadastrar produto</button>
                </form>
            </div>
        </RequireAuth>
    )
}