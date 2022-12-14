import { prismaClient } from "../database/prismaClient";
import { Arvore } from "@prisma/client";
import { getProjeto } from "./ProjetoService";

export interface ArvoreType {
    numero_arvore: number;
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

class ArvoreService {
    async create(data: ArvoreType, projetoId?: string): Promise<Arvore> {
        const arvoreExists = await prismaClient.arvore.findFirst({ 
            where: { 
                AND: {
                    numero_arvore: data.numero_arvore,
                    ut: {
                        upa: {
                            umf: {
                                projeto: {
                                    id: projetoId
                                }
                            }
                        }
                    }
                }
            } 
        })

        if (arvoreExists) {
            throw new Error('Já existe uma árvore cadastrada com este número')
        }

        const arvore = await prismaClient.arvore.create({
            data
        })

        return arvore
    }

    async update(id: string, data: ArvoreType): Promise<Arvore> {
        const arvore = await prismaClient.arvore.update({
            data,
            where: {
                id
            }
        })

        return arvore
    }

    async delete(id: string): Promise<void> {
        await prismaClient.arvore.delete({
            where: { id }
        })
            .then(response => {
                console.log(response)
            })
    }

    async getAll(userId: string, query?: any): Promise<any> {
        const projeto = await getProjeto(userId)
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
                    numero_arvore: parseInt(search),
                    ut: {
                        upa: {
                            umf: {
                                projeto: {
                                    id: projeto?.id
                                }
                            }
                        }
                    }
                }
            } : {
                ut: {
                    upa: {
                        umf: {
                            projeto: {
                                id: projeto?.id
                            }
                        }
                    }
                }
            }
        const [data, total] = await prismaClient.$transaction([
            prismaClient.arvore.findMany({
                where,
                orderBy: orderByTerm,
                take: perPage ? parseInt(perPage) : 50,
                skip: skip ? skip : 0,
            }),
            prismaClient.arvore.count()
        ])

        return {
            data,
            perPage,
            page,
            skip,
            count: total
        }
    }

    async deleteArvores(arvores: string[]) {
        
        await prismaClient.arvore.deleteMany({
            where: { id: { in: arvores} }
        })
         
    }

    async search(q: any, userId: string) {
        const projeto = await getProjeto(userId)
        const data = await prismaClient.arvore.findMany({
            where: {
                AND: {
                    numero_arvore: parseInt(q),
                    ut: {
                        upa: {
                            umf: {
                                projeto: {
                                    id: projeto?.id
                                }
                            }
                        }
                    }
                }
            }
        })
        return data
    }

    async findById(id: string) : Promise<any> {
        const arvore = await prismaClient.arvore.findUnique({ where: { id } })

        return arvore
    }
}

export default new ArvoreService