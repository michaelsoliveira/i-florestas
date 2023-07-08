import { prismaClient } from "../database/prismaClient";
import { Prisma, Especie, prisma } from "@prisma/client";
import { getProjeto } from "./ProjetoService";

export interface EspecieType {
    nome: string;
    nome_orgao: string;
    nome_cientifico: string;
    id_categoria?: string;
}

class EspecieService {
    async create(dataRequest: any, projetoId?: string): Promise<Especie> {
        const { nome, nome_cientifico, nome_orgao, id_projeto, id_categoria } = dataRequest as any
        const especieExists = await prismaClient.especie.findFirst({ 
            where: { 
                AND: {
                    nome: dataRequest.nome,
                    id_projeto: id_projeto ? id_projeto : projetoId
                }
            } 
        })
        
        if (especieExists) {
            throw new Error('Já existe uma espécie cadastrada com este nome')
        }

        const data = {
            nome,
            nome_cientifico,
            nome_orgao,
        }

        const especie = prismaClient.especie.create({ data }) as any

        await prismaClient.categoriaEspeciePoa.create({
            data: {
                id_especie: especie?.id,
                id_categoria: id_categoria
            }
        })

        return especie
    }

    async update(id: string, dataRequest: EspecieType): Promise<Especie | null> {
        const { nome, nome_cientifico, nome_orgao, id_categoria } = dataRequest as any

        const data = {
                nome,
                nome_cientifico,
                nome_orgao,
            }

        await prismaClient.especie.update({
            where: {
                id
            },
            data
        })

        await prismaClient.categoriaEspeciePoa.deleteMany({
            where: {
                id_especie: id
            }
        })

        await prismaClient.categoriaEspeciePoa.create({
            data: {
                id_especie: id,
                id_categoria: id_categoria
            }
        })

        return this.findById(id)
    }

    async delete(id: string): Promise<void> {
        await prismaClient.especie.delete({
            where: {
                id
            }
        })
    }

    async deleteEspecies(ids: string[]) {
        ids.forEach(id => {
            prismaClient.especie.delete({
                where: { id }
            })
        })   
    }

    async getAll(query?: any, userId?: string): Promise<any> {
        const { perPage, page, order, search, orderBy, projetoId } = query
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
                AND: [{
                        nome: { mode: Prisma.QueryMode.insensitive, contains: search }
                    },
                    {
                    projeto: {
                        id: projetoId
                    }
                }]
            } : {
                projeto: {
                    id: projetoId
                }
            }

        const [data, total] = await prismaClient.$transaction([
            prismaClient.especie.findMany({
                include: {
                    categoria_especie: {
                        include: {
                            categoria: {
                                select: {
                                    id: true,
                                    nome: true
                                }
                            }
                        } 
                    }
                },
                where,
                take: perPage ? parseInt(perPage) : 50,
                skip: skip ? skip : 0,
                orderBy: {
                    ...orderByTerm
                }
            }),
            prismaClient.especie.count({where})
        ])
                        
        return {
            orderBy,
            order,
            data,
            perPage,
            page,
            skip,
            count: total
        }
    }

    async findById(id: string) : Promise<Especie | null> {
        const especie = await prismaClient.especie.findUnique({
            include: {
                categoria_especie: {
                    include: {
                        categoria: {
                            select: {
                                id: true,
                                nome: true
                            }
                        }
                    } 
                }
            },
            where: {
                id
            }
        })

        return especie
    }
}

export default new EspecieService