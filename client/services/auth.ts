import { string } from "yup/lib/locale";
import { api } from "./api"
import { apiClient } from "./axios"
import client from './client'

export type SignInRequestData = {
    email: string;
    password: string;
}

export type User = {
    id: string;
    email: string;
    username: string;
}

type DataResponse = {
    error: boolean;
    errorMessage: string;
    data: {
        user: User,
        token: {
            accessToken: string;
            expiresIn: number;
        };
        refreshToken: string;
    };
}

export async function signInRequest(dataRequest: SignInRequestData) : Promise<DataResponse>{
    try {
        const dataResponse = await api.post('/auth/login', dataRequest)
        const { error, errorMessage, data } = dataResponse.data as DataResponse
        return Promise.resolve({
            error,
            errorMessage,
            data
        })
    } catch (error: any) {
        return Promise.reject(error.response)
    }
    
}

export async function handleRefreshToken(token: string): Promise<any> {
    
    const response = await apiClient().post('/auth/refresh', { token })
    
    return response.data
}

export async function getUser() : Promise<User>{
    return await apiClient().get('/auth/me')
}