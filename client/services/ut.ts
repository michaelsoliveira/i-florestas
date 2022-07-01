import authHeader from "./auth-header"
import { apiClient } from "./axios"
import { UpaType } from "./upa";

export interface UtType {
    id: string;
    numero_ut: number;
    area_util: number;
    area_total: number;
    quantidade_faixas: number;
    largura_faixas: number;
    latitude: number;
    longitude: number;
    comprimento_faixas: number;
    upa: UpaType;
}

export type ResponseData = {
    data: {};
    message: string;
    error: boolean
}

export async function create(dataRequest: UtType): Promise<ResponseData> {
    const { provider, headers } = await authHeader()
    const { data } = await apiClient().post(`/ut`, dataRequest, headers)
        return {
            data: data.upa,
            message: data.message,
            error: data.error
        }
}

export async function update(id: string, dataRequest: UtType): Promise<ResponseData> {
    console.log(dataRequest)
    const { provider, headers } = await authHeader()
    const { data } = await apiClient().put(`/ut/${id}`, dataRequest, headers)
        return {
            data: data.upa,
            message: data.message,
            error: data.error
        }
}

export async function getAll() {
    const { provider, headers } = await authHeader()
    const request = await apiClient().get(`/ut`, headers)
            .then((response: any) => {
                
                const data = {
                    data: response.data.uts,
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
    const response = await apiClient().get(`/ut/${id}`, headers)
    
        return {
            data: response.data,
            message: "",
            error: false
        }
}

export async function _delete(id: string, ctx?: any): Promise<void>{
    const { provider, headers } = await authHeader()
    await apiClient().delete(`/ut/${id}`, headers)
}

const utService = {
    create,
    update,
    getById,
    getAll,
    delete: _delete
}

export default utService