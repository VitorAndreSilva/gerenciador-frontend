import { fetchMarcas } from "@/services/marcas";

type Marca = {
    id: number,
    nome: string,
}

export default async function Marcas() {
    const marcas: Marca[] = await fetchMarcas();
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Marcas</h2>
            <div>
                {marcas.map((marca) => (
                    <div key={marca.id} className="border-t">
                        <h3 className="p-2">{marca.nome}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}