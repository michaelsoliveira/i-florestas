'use client'

import React, { createContext, ReactNode, useState } from "react"

export interface Poa {
    id: string
    descricao: string
    data_ultimo_plan?: Date
    pmfs: string
    protocolo_poa?: string
    corte_maximo?: number
    num_art_resp_elab?: number
    num_art_resp_exec?: number
    id_detentor?: string;
    id_resp_exec?: string
    id_resp_elab?: string
    id_proponente?: any
    id_situacao?: string
    user_id?: string
    id_projeto?: string
    situacao_poa: SituacaoPoa
  }
  
  export interface SituacaoPoa {
    id: string
    nome: string
  }

  export const initialPoa = {
    id: '',
    descricao: '',
    pmfs: '',
    situacao_poa: {
        id: '',
        nome: ''
    }
  }

type PoaType = {
    poa: Poa;
    setPoa: (poa: any) => void
}

type Props = {
    children: ReactNode
}

export const PoaContext = createContext({} as PoaType)

export function PoaProvider({ children }: Props) {
    const [poa, setPoa] = useState<Poa>(initialPoa)
    
    return (
        <PoaContext.Provider value={{ poa, setPoa }}>
            { children }
        </PoaContext.Provider>
    )
}