import authHeader from "./auth-header"
import { apiClient } from "./axios"
import BaseService from "./BaseService";

export type EmpresaType = {
    id: string;
    razaoSocial: string,
    nomeFantasia: string,
    cnpj: string,
    respTecnico: string,
    cep: string,
    endereco: string,
    complemento: string,
    municipio: string,
    estado: string,
    telefone: string,
    regAmbiental: string
}

export type ResponseData = {
    data: {};
    errorMessage: string;
    error: boolean
}

class EmpresaService {

    // constructor() {
    //     super(EmpresaService)
    // }
    protected static instance: EmpresaService

    headers: any

    constructor() {
        this.initializeHeaders()
    }

    public static getInstance() {
        if (!EmpresaService.instance) {
            EmpresaService.instance = new EmpresaService();
        }

        return EmpresaService.instance;
    }

    async initializeHeaders() {
        this.headers = await authHeader()
    }

    async create(dataRequest: EmpresaType): Promise<ResponseData> {
        const { data } = await apiClient().post(`/empresa`, dataRequest, this.headers)
            return {
                data: data.empresa,
                errorMessage: data.errorMessage,
                error: data.error
            }
    }

    async update(id: string, dataRequest: EmpresaType): Promise<ResponseData> {
        const { data } = await apiClient().put(`/empresa/${id}`, dataRequest, this.headers)
            return {
                data: data?.empresa,
                errorMessage: data.errorMessage,
                error: data.error
            }
    }

    async getAll() {
        const response = await apiClient().get(`/empresa`, this.headers)
        
                .then((response: any) => {
                    
                    const data = {
                        data: response.data.empresas,
                        errorMessage: response.data.errorMessage,
                        error: response.data.error
                    }  
                    return data
                })
                .catch((error: any) => {
                    return Promise.reject(error)
                })
        
        return response
    }

    async getById(id: string): Promise<ResponseData> {
        
        const response = await apiClient().get(`/empresa/${id}`, this.headers)
        
            return {
                data: response?.data,
                errorMessage: "",
                error: false
            }
    }

    async _delete(id?: string, ctx?: any): Promise<void>{
        const headers = await authHeader()
        await apiClient().delete(`/empresa/${id}`, headers)
    }
}

export default EmpresaService.getInstance()