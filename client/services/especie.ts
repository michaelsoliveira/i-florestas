import authHeader from "./auth-header"
import { apiClient } from "./axios"

export type CategoriaEspecieType = {
    id: string;
    nome: string
}

export type EspecieType = {
    id: string;
    nome: string;
    nomeOrgao: string;
    nomeCientifico: string;
    categoria?: CategoriaEspecieType
}

export type ResponseData = {
    data: {};
    message: string;
    error: boolean
}

export async function create(dataRequest: EspecieType): Promise<ResponseData> {
    const { provider, headers } = await authHeader()
    const { data } = await apiClient().post(`/especie`, dataRequest, headers)
        return {
            data: data.especie,
            message: data.message,
            error: data.error
        }
}

export async function update(id: string, dataRequest: EspecieType): Promise<ResponseData> {
    const { provider, headers } = await authHeader()
    const { data } = await apiClient().put(`/especie/${id}`, dataRequest, headers)
        return {
            data: data.especie,
            message: data.message,
            error: data.error
        }
}

export async function getAll() {
    // const { provider, headers } = await authHeader()
    const request = await apiClient().get(`/especie`)
            .then((response: any) => {
                
                const data = {
                    data: response.data.especies,
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
    const response = await apiClient().get(`/especie/${id}`, headers)
    
        return {
            data: response.data,
            message: "",
            error: false
        }
}

export async function _delete(id: string, ctx?: any): Promise<void>{
    const { provider, headers } = await authHeader()
    await apiClient().delete(`/especie/${id}`, headers)
}

const especieService = {
    create,
    update,
    getById,
    getAll,
    delete: _delete
}

export default especieService