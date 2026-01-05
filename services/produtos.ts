const API_URL = "https://gerenciamento-qwez.onrender.com/api/v1"

export async function fetchProdutos() {
    const res = await fetch(`${API_URL}/produtos`, {
        cache: "no-store"
    })

    if (!res.ok) {
        throw new Error("Não foi possível encontrar os produtos");
    }

    const data = await res.json();
    console.log(data.results);
    return data.results;
}