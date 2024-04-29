import { EspecieType } from "./IEspecieType"
import { UtType } from "./IUtType"

export interface ArvoreType {
    id: string
    created_at: string
    updated_at: string
    numero_arvore: number
    dap: string
    altura: string
    fuste: number
    area_basal: number
    volume: string
    comentario: any
    orient_x: string
    lat_y: number
    long_x: number
    faixa: number
    derrubada: boolean
    motivo_nao_derrubada: any
    substituida: boolean
    secoes: any
    ponto_gps: any
    lat: number
    lng: number
    id_ut: string
    id_especie: string
    id_situacao: any
    id_motivo_preservacao: any
    id_observacao: any
    id_substituta: any
    especie: EspecieType
    situacao_arvore: any
    ut: UtType
  }