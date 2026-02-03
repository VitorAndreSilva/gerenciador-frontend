import api from "./api";

export type Marca = {
    id: number,
    nome: string
}

export async function fetchMarcas(): Promise<Marca[]> {
    const response = await api.get('/marcas/');
    //console.log(response.data.results);
    return response.data;
}