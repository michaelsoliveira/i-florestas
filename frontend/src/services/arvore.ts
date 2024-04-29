'use server'
    
import { authOptions } from "@/lib/authOptions";
import { ArvoreType } from "@/types/IArvore";
import { getServerSession } from "next-auth";

const NUM_WRITES = 1500

export interface FetchRequest {
    upaId?: string | null;
    utId?: string | null;
    page: string;
    perPage: string;
    order: string;
    orderBy: string;
    searchBy: string | null;
    search?: string | null;
}

export interface ResponseArvore {
    error: boolean;
    arvores: ArvoreType[];
    message: string;
    count: number;
}

const base_url = process.env.NEXT_PUBLIC_API_URL

export async function fetchArvoreData({ upaId, utId, page, perPage, order, orderBy, search, searchBy }: FetchRequest): Promise<ResponseArvore> {
    const session = await getServerSession(authOptions)
    
    const url = `${process.env.NEXT_PUBLIC_API_URL}/arvore/get-all?upaId=${upaId}&utId=${utId}&page=${page}&perPage=${perPage}&orderBy=${orderBy}&order=${order}&searchBy=${searchBy}&search=${search}`
    
    const result = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${session?.accessToken}`
        }
    }).then((data) => data.json())

    return result
}

export async function getGeoJson(utId: string, upaId: string) {
    const session = await getServerSession(authOptions)
    const urlInventario = utId !== 'all'
        ? `${base_url}/arvore/get-geo-json?ut=${utId}`
        : `${base_url}/arvore/get-geo-json?upaId=${upaId}`;
    
    const urlDataUtShape =
      utId && utId !== 'all'
        ? `${base_url}/ut/get-geo-json-shape?type=by-ut&id=${utId}`
        : upaId &&
          `${base_url}/ut/get-geo-json-shape?type=by-upa&id=${upaId}`
    const request_inventario = fetch(urlInventario, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${session?.accessToken}`
        }
    }).then((data) => data.json())

    const request_shape_ut = fetch(urlDataUtShape, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${session?.accessToken}`
        }
    }).then((data) => data.json())
    
    const [inventario, shape_ut] = await Promise.all([request_inventario, request_shape_ut])

    return {
      inventario: inventario?.geo_json_arvore,
      shape_ut: shape_ut?.geo_json_shape_ut
    }
  }

// Função para inserir todos os dados em paralelo usando Promise.all
export async function createPipelineImport(dados: any) {
        let lotes = [];
        for (let i = 0; i < dados.data.length; i += NUM_WRITES) {
            lotes.push(dados.data.slice(i, i + NUM_WRITES));
        }
        
        return lotes
}

export async function createImport(dados: any, upaId?: any) {
    try {
        const response = await importInventario(upaId, dados.data, dados.columns).then((data: any) => {
            return { 
                error: false,
                message: 'Importação Realizada com Sucesso!!!'   
            }
        })

        return response
    } catch(error: any) {
        return {
            error: true,
            message: error.message
        }
    }
    
}

export async function importInventario(upaId: string, data: any, columns: any) {
    const session = await getServerSession(authOptions)
    const url = `${process.env.NEXT_PUBLIC_API_URL}/arvore/import-inventario?upaId=${upaId}`
    
    await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify({ columns, data })
    })
    // .then((data) => data.json())
}