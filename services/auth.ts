import api from "./api";

type Login = {
    access: string,
    user: {
        id: number;
        username: string;
        is_admin: boolean;
    }
}

export async function login(username:string, password:string) {
    const response = await api.post<Login>("/auth/login/", {
        username,
        password
    })

    return response.data;
}