import { Especie } from "../entities/Especie";
import { getRepository, ILike } from "typeorm";
import { prismaClient } from "../database/prismaClient";
import { Prisma } from "@prisma/client";

export interface EspecieType {
    nome: string;
    nome_orgao: string;
    nome_cientifico: string;
    id_categoria?: string;
}

class EspecieService {
    async create(dataRequest: any, projetoId?: string): Promise<any> {
        const { nome, nome_cientifico, nome_orgao, id_projeto } = dataRequest
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

        const preparedData = {
            nome,
            nome_cientifico,
            nome_orgao,
            projeto: {
                connect: {
                    id: id_projeto ? id_projeto : projetoId
                }
            }
        }

        const data = dataRequest?.id_categoria ? {
            ...preparedData,
            categoria_especie: {
                connect: {
                    id: dataRequest?.id_categoria
                }
            }
        } : preparedData

        const especie = prismaClient.especie.create({ data })

        return especie
    }

    async update(id: string, dataRequest: EspecieType): Promise<Especie> {
        const { nome, nome_cientifico, nome_orgao } = dataRequest
        const preparedData = {
                nome,
                nome_cientifico,
                nome_orgao,
            }

        const data = dataRequest?.id_categoria ? {
            ...preparedData,
            categoria_especie: {
                connect: {
                    id: dataRequest?.id_categoria
                }
            }
        } : preparedData

        await prismaClient.especie.update({
            where: {
                id
            },
            data
        })

        return this.findById(id)
    }

    async delete(id: string): Promise<void> {
        await getRepository(Especie).delete(id)
            .then(response => {
                return response.affected
            })
    }

    async deleteEspecies(ids: string[]) {
        ids.forEach(id => {
            getRepository(Especie).delete(id)
        })   
    }

    async getAll(query?: any, userId?: string): Promise<any> {
        const { perPage, page, order, search, orderBy } = query
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
                AND: {
                    nome: { mode: Prisma.QueryMode.insensitive, contains: search },
                    projeto: {
                        projeto_users: {
                            some: {
                                id_user: userId,
                                active: true
                            }
                        }
                    }
                }
            } : {
                projeto: {
                    projeto_users: {
                        some: {
                            id_user: userId,
                            active: true
                        }
                    }
                }
            }

        const [data, total] = await prismaClient.$transaction([
            prismaClient.especie.findMany({
                include: {
                    categoria_especie: {
                        select: {
                            id: true,
                            nome: true
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

    async getAllWithCategory(): Promise<Especie[]> {
        const query = getRepository(Especie).createQueryBuilder('especie')
        const especies = query.leftJoinAndSelect('especie.categoria', 'categoria').getMany()

        return especies
    }

    async findById(id: string) : Promise<any> {
        const especie = await prismaClient.especie.findUnique({
            include: {
                categoria_especie: {
                    select: {
                        id: true,
                        nome: true
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