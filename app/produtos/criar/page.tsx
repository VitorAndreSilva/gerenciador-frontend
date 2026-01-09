"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { fetchMarcas, Marca } from "@/services/marcas";
import { createProdutos } from "@/services/produtos";

export default function NovoProduto() {
    const router = useRouter();

    const [nome, setNome] = useState("");
    const [marca, setMarca] = useState<number>(0);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [tipo, setTipo] = useState("");
    const [capacidade, setCapacidade] = useState(0);
    const [preco, setPreco] = useState(0);
    const [quantidade, setQuantidade] = useState(0);

    useEffect(() => {
        fetchMarcas().then(setMarcas);
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await createProdutos({
            nome,
            marca,
            tipo,
            capacidade,
            preco,
            quantidade
        });

        alert("Produto cadastrado com sucesso");
        router.replace("/produtos");
    }

    return (
        <div className="max-w-md">
            <h2 className="text-2xl font-bold mb-4">Cadastrar novo produto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                className="w-full border p-2"
                type="text" 
                placeholder="nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
                />
                <select
                className="w-full border p-2"
                value={marca}
                onChange={e => setMarca(Number(e.target.value))}
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
                type="text" 
                placeholder="tipo"
                value={tipo}
                onChange={e => setTipo(e.target.value)}
                />
                <input 
                className="w-full border p-2"
                type="text"
                placeholder="capacidade"
                value={capacidade}
                onChange={e => setCapacidade(Number(e.target.value))}
                />
                <input 
                className="w-full border p-2"
                type="text"
                placeholder="preco"
                value={preco}
                onChange={e => setPreco(Number(e.target.value))}
                />
                <input 
                className="w-full border p-2"
                type="text"
                placeholder="quantidade"
                value={quantidade}
                onChange={e => setQuantidade(Number(e.target.value))}
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Cadastrar produto</button>
            </form>
        </div>
    )
}