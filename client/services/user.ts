import { apiClient } from "./axios"

import authHeader from "./auth-header"

export type UserData = {
    email: string;
    username: string;
    password: string;
    provider: string;
    idProvider: string;
    image: string;
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

export async function update(id:string, dataRequest: UserData) : Promise<ResponseData> {
    
    const { provider, headers } = await authHeader()
    const { data } = await apiClient().put(`/users/${id}`, dataRequest, headers)
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

export async function findProvider(email: string): Promise<any> {
    const { provider, headers } = await authHeader()
    // const response = await apiClient().get(`/provider/find?provider=${provider}&idProvider=${user.id}`)
    const response = await apiClient().get(`/users/provider/find-by-email?email=${email}`, headers)
    console.log(response.data)
    return response.data
}

const UserService = {
    create,
    sendEmail,
    findProvider,
    update
}

export default UserService