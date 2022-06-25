import authHeader from "./auth-header"
import { apiClient } from "./axios"
import { Estado } from "../components/Utils/Estado";

export type UmfType = {
    id: string;
    nome: string;
    municipio: string;
    localizacao: string;
    estado: Estado;
}

export type ResponseData = {
    data: {};
    message: string;
    error: boolean
}

export async function create(dataRequest: UmfType): Promise<ResponseData> {
    const { provider, headers } = await authHeader()
    const { data } = await apiClient().post(`/umf`, dataRequest, headers)
        return {
            data: data.umf,
            message: data.message,
            error: data.error
        }
}

export async function update(id: string, dataRequest: UmfType): Promise<ResponseData> {
    const { provider, headers } = await authHeader()
    const { data } = await apiClient().put(`/umf/${id}`, dataRequest, headers)
        return {
            data: data.umf,
            message: data.message,
            error: data.error
        }
}

export async function getAll() {
    const { provider, headers } = await authHeader()
    const request = await apiClient().get(`/umf`, headers)
            .then((response: any) => {
                
                const data = {
                    data: response.data.umfs,
                    message: response.data.message,
                    error: response.data.error
                }  
                return data
            })
            .catch((error: any) => {
                return Promise.reject(error)
            })
    
    return request
}

export async function getById(id: string): Promise<ResponseData> {
    const { provider, headers } = await authHeader()
    const response = await apiClient().get(`/umf/${id}`, headers)
    
        return {
            data: response.data,
            message: "",
            error: false
        }
}

export async function _delete(id: string, ctx?: any): Promise<void>{
    const { provider, headers } = await authHeader()
    await apiClient().delete(`/umf/${id}`, headers)
}

const umfService = {
    create,
    update,
    getById,
    getAll,
    delete: _delete
}

export default umfService