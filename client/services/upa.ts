import authHeader from "./auth-header"
import { apiClient } from "./axios"

export type SpatialRefSysType = {
    srid: number;
    srtext: string
}

export type EquacaoVolumeType = {
    id: string;
    nome: string;
}

export type UpaType = {
    id: string;
    descricao: string;
    ano: number;
    tipo: number;
    spatial_ref_sys: SpatialRefSysType
    equacao_volume: EquacaoVolumeType
}

export type ResponseData = {
    data: {};
    message: string;
    error: boolean
}

export async function create(dataRequest: UpaType): Promise<ResponseData> {
    const { provider, headers } = await authHeader()
    const { data } = await apiClient().post(`/upa`, dataRequest, headers)
        return {
            data: data.upa,
            message: data.message,
            error: data.error
        }
}

export async function update(id: string, dataRequest: UpaType): Promise<ResponseData> {
    console.log(dataRequest)
    const { provider, headers } = await authHeader()
    const { data } = await apiClient().put(`/upa/${id}`, dataRequest, headers)
        return {
            data: data.upa,
            message: data.message,
            error: data.error
        }
}

export async function getAll() {
    const { provider, headers } = await authHeader()
    const request = await apiClient().get(`/upa`, headers)
            .then((response: any) => {
                
                const data = {
                    data: response.data.upas,
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
    const response = await apiClient().get(`/upa/${id}`, headers)
    
        return {
            data: response.data,
            message: "",
            error: false
        }
}

export async function _delete(id: string, ctx?: any): Promise<void>{
    const { provider, headers } = await authHeader()
    await apiClient().delete(`/upa/${id}`, headers)
}

const upaService = {
    create,
    update,
    getById,
    getAll,
    delete: _delete
}

export default upaService