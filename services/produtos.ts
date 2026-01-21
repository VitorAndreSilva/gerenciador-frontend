import api from "./api";

type ProdutoPayload = {
    nome: string,
    marca: number,
    tipo: string,
    capacidade: number,
    preco: number,
    quantidade: number,
}

export async function fetchProdutos() {
    const response = await api.get('/produtos/');
    return response.data.results;
}

export async function createProdutos(produto: ProdutoPayload) {
    const response = await api.post('/produtos/', produto);
    return response.data;
}

export async function deleteProduto(id: number) {
    await api.delete(`/produtos/${id}/`);
}