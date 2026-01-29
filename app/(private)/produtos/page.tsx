"use client"

import Link from "next/link";
import { fetchProdutos } from "@/services/produtos"
import ProdutoItem from "@/components/produtos/ProdutoItem";
import { useEffect, useState } from "react";

type Produto = {
    id: number,
    nome: string,
    marca: string,
    preco: number,
    quantidade: number
}

export default function Produtos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProdutos().then(setProdutos).finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Carregando...</p>
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Produtos</h2>
            <div>
                {produtos.map((produto) => (
                    <ProdutoItem 
                    key={produto.id}
                    produto={produto}
                    />
                ))}
            </div>
            <Link 
            href="/produtos/criar"
            className="inline-block mt-3 px-2 py-2 rounded hover:bg-black hover:text-white border"
            >Adicionar produto
            </Link>
        </div>
    )
}