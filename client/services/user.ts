import { apiClient } from "./axios"

import type { User } from "./auth"

export type UserData = {
    email: string;
    username: string;
    password: string;
    provider: string;
    idProvider: string;
}

export type ResponseData = {
    data: {};
    errorMessage: string;
    error: boolean
}

export async function create(dataRequest: UserData) : Promise<ResponseData> {
    const { data } = await apiClient().post('users/create', dataRequest)
        return {
            data: data.user,
            errorMessage: data.errorMessage,
            error: data.error
        }
}

export async function sendEmail(dataResponse: any): Promise<void> {
    const { email, username: name, password } = dataResponse
    
    const { data } = await apiClient().post('/users/send-email', {
        email,
        name,
        message: `Sua senha de acesso é: <b>${password}</b>`
    })

    return data
}

export async function findByProvider(provider: string, user: any): Promise<any> {
    
    const response = await apiClient().get(`/provider/find?provider=${provider}&idProvider=${user.id}`)
    
    return response.data
}

const AuthService = {
    create,
    sendEmail,
    findByProvider
}

export default AuthService