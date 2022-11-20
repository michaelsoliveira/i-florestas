// import { CategoriaEspecie } from "../entities/CategoriaEspecie";
import { getRepository, ILike } from "typeorm";
import { prismaClient } from "../database/prismaClient";
import { Prisma, PrismaClient } from "@prisma/client";
import { CategoriaEspecie } from "@prisma/client";

export interface CategoriaType {
    nome: string;
    criterio_fuste?: number;
    criterio_dminc?: number;
    criterio_dmaxc?: number;
    criterio_n_min?: number;
    criterio_perc_min?: number;
    preservar?: boolean;
    criterio_ltura?: number;
    criterio_volume?: number;
    id_projeto: string;
}

class CategoriaService {
    async create(data: CategoriaType): Promise<CategoriaEspecie> {
        const categoriaExists = await prismaClient.categoriaEspecie.findFirst({ 
            where: { 
                AND: {
                    nome: data.nome,
                    id_projeto: data?.id_projeto
                }
            } 
        })

        if (categoriaExists) {
            throw new Error('Já existe uma categoria cadastrada com este nome')
        }

        console.log(data)

        const categoria = await prismaClient.categoriaEspecie.create({
            data
        })

        return categoria
    }

    async update(id: string, data: CategoriaType): Promise<CategoriaEspecie> {
        const categoria = await prismaClient.categoriaEspecie.update({
            data,
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
        const { perPage, page, search, orderBy, order } = query
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
                                active: true,
                                id_user: userId
                            }
                        }
                    }
                }
            } : {
                projeto: {
                    projeto_users: {
                        some: {
                            active: true,
                            id_user: userId
                        }
                    }
                }
            }
        const [data, total] = await prismaClient.$transaction([
            prismaClient.categoriaEspecie.findMany({
                where,
                orderBy: orderByTerm,
                take: perPage ? parseInt(perPage) : 50,
                skip: skip ? skip : 0,
            }),
            prismaClient.categoriaEspecie.count()
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
        const data = await prismaClient.categoriaEspecie.findMany({
            where: {
                AND: {
                    nome: { mode: Prisma.QueryMode.insensitive, contains: q },
                    projeto: {
                        projeto_users: {
                            some: {
                                id_user: userId,
                                active: true
                            }
                        }
                    }
                }
            }
        })
        return data
    }

    async findById(id: string) : Promise<any> {
        const categoria = await prismaClient.categoriaEspecie.findUnique({ where: { id } })

        return categoria
    }
}

export default new CategoriaService