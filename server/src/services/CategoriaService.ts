// import { CategoriaEspecie } from "../entities/CategoriaEspecie";
import { prismaClient } from "../database/prismaClient";
import { Prisma, PrismaClient } from "@prisma/client";
import { CategoriaEspecie } from "@prisma/client";
import { getProjeto } from "./ProjetoService";

export interface CategoriaType {
    nome: string;
    criterio_fuste?: number;
    criterio_dminc?: number;
    criterio_dmaxc?: number;
    criterio_n_min?: number;
    criterio_perc_min?: number;
    preservar?: boolean;
    criterio_altura?: number;
    criterio_volume?: number;
    id_projeto: string;
    id_poa: string;
}

class CategoriaService {
    async create(data: CategoriaType): Promise<CategoriaEspecie> {
        const { nome, 
                criterio_fuste, 
                criterio_dminc, 
                criterio_dmaxc,
                criterio_n_min,
                criterio_perc_min,
                preservar,
                criterio_altura,
                criterio_volume,
                id_projeto } = data
        const where = data?.id_poa ? { 
            AND: [
                { nome: data.nome },
                { id_projeto: data?.id_projeto },
                { id_poa: data?.id_poa }
            ]
        } : {
            AND: [
                { nome: data.nome },
                { id_projeto: data?.id_projeto }
            ]
        }

        const categoriaExists = await prismaClient.categoriaEspecie.findFirst({ 
            where
        })

        if (categoriaExists) {
            throw new Error('Já existe uma categoria cadastrada com este nome')
        }

        const categoria = await prismaClient.categoriaEspecie.create({
            data : data?.id_poa ? data : 
                {   
                    nome, 
                    criterio_fuste, 
                    criterio_dminc, 
                    criterio_dmaxc,
                    criterio_n_min,
                    criterio_perc_min,
                    preservar,
                    criterio_altura,
                    criterio_volume,
                    id_projeto 
                }
        })

        return categoria
    }

    async update(id: string, data: CategoriaType): Promise<CategoriaEspecie> {
        const { 
                nome, 
                criterio_fuste, 
                criterio_dminc, 
                criterio_dmaxc,
                criterio_n_min,
                criterio_perc_min,
                preservar,
                criterio_altura,
                criterio_volume
            } = data

        const categoria = await prismaClient.categoriaEspecie.update({
            data: { 
                nome, 
                criterio_fuste, 
                criterio_dminc, 
                criterio_dmaxc,
                criterio_n_min,
                criterio_perc_min,
                preservar,
                criterio_altura,
                criterio_volume
            },
            where: {
                id
            }
        })

        return categoria
    }

    async delete(id: string): Promise<void> {
        await prismaClient.categoriaEspecie.delete({
            where: { id }
        })
            .then(response => {
                console.log(response)
            })
    }

    async getAll(userId: string, query?: any): Promise<any> {
        const { perPage, page, search, orderBy, order, poa, projetoId } = query
        const skip = (page - 1) * perPage
        let orderByTerm = {}
        
        const orderByElement = orderBy ? orderBy.split('.') : {}
        
        if (orderByElement.length == 2) {
            orderByTerm = {
                [orderByElement[1]]: order
            }
        } else {
            orderByTerm = {
                [orderByElement]: order
            }
        }
        const where = search ?
            {
                AND: [
                        {
                        nome: { mode: Prisma.QueryMode.insensitive, contains: search }
                        },
                        {
                            projeto: {
                                id: projetoId
                            }
                        },
                        {
                            id_poa:  poa ? poa : null
                        }
                    ]
            } : {
                AND: [
                    {
                        id_poa:  poa ? poa : null
                    },
                    {
                        projeto: {
                            id: projetoId
                        }
                    }
                ]
                
            }
        const [data, total] = await prismaClient.$transaction([
            prismaClient.categoriaEspecie.findMany({
                where,
                orderBy: orderByTerm,
                take: perPage ? parseInt(perPage) : 50,
                skip: skip ? skip : 0,
            }),
            prismaClient.categoriaEspecie.count({where})
        ])

        return {
            data,
            perPage,
            page,
            skip,
            count: total
        }
    }

    async deleteCategorias(categorias: string[]) {
        
        await prismaClient.categoriaEspecie.deleteMany({
            where: { id: { in: categorias} }
        })
         
    }

    async search(q: any, userId?: string) {
        const projeto = getProjeto(userId) as any
        const data = await prismaClient.categoriaEspecie.findMany({
            where: {
                AND: [
                        {
                        nome: { mode: Prisma.QueryMode.insensitive, contains: q }
                        },
                        { 
                            projeto: {
                                id: projeto?.id
                            }
                        }
                    ]
            }
        })
        return data
    }

    async getByPoa(poaId: string, userId: string) : Promise<CategoriaEspecie[]> {
        const projeto = getProjeto(userId) as any
        const categorias = await prismaClient.categoriaEspecie.findMany({
            where: {
                AND: [
                    {
                        id_poa:  poaId ? poaId : null
                    },
                    {
                        projeto: {
                            id: projeto?.id
                        }
                    }
                ]
            }
        })

        return categorias
    }

    async findById(id: string) : Promise<any> {
        const categoria = await prismaClient.categoriaEspecie.findUnique({ where: { id } })

        return categoria
    }
}

export default new CategoriaService