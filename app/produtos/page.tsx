import { fetchProdutos } from "@/services/produtos"

type Produto = {
    id: number,
    nome: string,
    marca: string,
    quantidade: number
}

export default async function Produtos() {
    const produtos: Produto[] = await fetchProdutos();
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Produtos</h2>
            <div>
                {produtos.map((produto) => (
                    <div key={produto.id} className="border-t">
                        <h3 className="p-2">{produto.marca} {produto.nome}</h3>
                        <p className="p-2">Quantidade: {produto.quantidade}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}