"use client";

import { deleteProduto } from "@/services/produtos";
import { useRouter } from "next/navigation";

type Props = {
    produto: {
        id: number;
        nome: string;
        marca: string;
        preco: number;
        quantidade: number;
    }
}

export default function ProdutoItem({ produto }: Props) {
    const router = useRouter();

    async function handleDelete() {
        const confirmacao = confirm("Deseja realmente excluir o produto?");
        if (!confirmacao) return;

        await deleteProduto(produto.id);
        router.refresh();
    }

    return (
         <div className="border-t p-2 flex justify-between items-center cursor-pointer">
            <div onClick={() => router.push(`produtos/${produto.id}`)}>
                <h3 className="font-medium">{produto.marca} {produto.nome}</h3>
                <p className="font-normal text-gray-700">
                    Preço: {produto.preco}
                </p>
                <p className="text-sm text-gray-600">
                    Quantidade: {produto.quantidade}
                </p>
            </div>
            <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 text-sm"
            >Excluir</button>
         </div>
    )
}