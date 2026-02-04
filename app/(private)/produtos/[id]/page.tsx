"use client"

import React, { useEffect, useState } from "react";
import { getProdutoById } from "@/services/produtos";
import { fetchMarcas, Marca } from "@/services/marcas";
import { editProduto } from "@/services/produtos";
import { useParams } from "next/navigation";

type Produto = {
    id: number,
    nome: string,
    marca: number,
    preco: number,
    quantidade: number
}

export default function ProdutoId() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const [nome, setNome] = useState("");
    const [marca, setMarca] = useState<number>(0);
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [preco, setPreco] = useState<number | "">("");
    const [quantidade, setQuantidade] = useState<number | "">("");

    useEffect(() => {
        fetchMarcas().then(setMarcas);
        if (!id) return;
        getProdutoById(id)
        .then((produto: Produto) => {
            setNome(produto.nome);
            setMarca(produto.marca);
            setPreco(produto.preco);
            setQuantidade(produto.quantidade);
        })
    }, [id])

    async function handleEdit(e: React.FormEvent) {
        try {
            e.preventDefault();

            if (preco === "" || quantidade === "") {
                alert("Preencha todos os campos numéricos")
                return;
            }

            if (!id) return;

            await editProduto({
                nome,
                marca,
                preco,
                quantidade
            }, id);
                
            alert("Produto editado com sucesso");

        } catch (e) {
            alert("Erro ao salvar produto");
            console.log("Erro na edição de produto: ", e);
        }
    }

    return (
        <div className="max-w-md">
            <h2 className="text-2xl font-bold mb-4">Cadastrar novo produto</h2>
            <form onSubmit={handleEdit} className="space-y-4">
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
    )
}