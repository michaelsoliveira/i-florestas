import { prismaClient } from "../database/prismaClient";
import { Prisma, Poa } from "@prisma/client";
import { getProjeto } from "./ProjetoService";

export interface PoaType {
    descricao: string;
    corte_maximo: number;
    resp_elab: string;
    resp_exec: string;
    situacao: string;
}

class PoaService {
    async create(data: PoaType, userId: string): Promise<Poa> {

        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })
        const projeto = await getProjeto(userId)
        
        const poaExists = await prismaClient.poa.findFirst({
            where: {
                AND: [
                        { descricao: data.descricao },
                        {    
                            projeto: {
                                id: projeto?.id
                            }
                        }
                ]
            }
        })
        
        if (poaExists) {
            throw new Error('Já existe uma Poa cadastrada com este nome')
        }
        
        const poa = await prismaClient.poa.create({
            data: {
                descricao: data.descricao,
                corte_maximo: data.corte_maximo,
                resp_exec: {
                    connect: {
                        id: data?.resp_exec
                    }
                },
                resp_elab: {
                    connect: {
                        id: data?.resp_elab
                    }
                },
                projeto: {
                    connect: {
                        id: projeto?.id
                    }
                },
                user: {
                    connect: {
                        id: user?.id
                    }
                }
            }
        })

        return poa
    }

    async update(id: string, data: PoaType): Promise<Poa> {
        await prismaClient.poa.update({
            where: {
                id
            },
            data: {
                descricao: data.descricao,
                corte_maximo: data.corte_maximo,
                resp_exec: {
                    connect: {
                        id: data?.resp_exec
                    }
                },
                resp_elab: {
                    connect: {
                        id: data?.resp_elab
                    }
                }  
            }
        })

        return this.findById(id)
    }

    async delete(id: string): Promise<void> {
        await prismaClient.poa.delete({
            where: {
                id
            }
        })
        .then(response => {
            console.log(response)
        })
    }

    async getAll(userId: string, query?: any): Promise<any> {
        const { perPage, page, search, orderBy, order, umf } = query
        const skip = (page - 1) * perPage
        
        let orderByTerm = {}
        
        const orderByElement = orderBy ? orderBy.split('.') : {}
        if (orderByElement instanceof Array) {
            orderByTerm = orderByElement.length == 2 ? 
            {
                [orderByElement[1]]: order,
            } : {}
        } else {
            orderByTerm = {
                [orderByElement]: order
            }
        }

        const projeto = await getProjeto(userId)

        const where = {
                descricao: {
                    mode: Prisma.QueryMode.insensitive,
                    contains: search ? search : ''
                },
                AND: [
                // { id_umf: umf },
                {    
                    projeto: {
                        id: projeto?.id
                    }
                    
                }   
            ]
        }
        
        const [poas, total] = await prismaClient.$transaction([
            prismaClient.poa.findMany({
                where,
                take: perPage ? parseInt(perPage) : 10,
                skip: skip ? skip : 0,
                orderBy: {
                    ...orderByTerm
                }
            }),
            prismaClient.poa.count({ where })
        ])

        return {
            data: poas,
            perPage,
            page,
            skip,
            count: total,
        }
    }

    async deletePoas(poas: string[]): Promise<any> {
        await prismaClient.poa.deleteMany({
            where: {
                id: { in: poas}
            }
        })
        
    }

    async search(userId: string, q: any) : Promise<Poa[]> {
        const projeto = await getProjeto(userId)
        const upas = await prismaClient.poa.findMany({
            where: {
                AND: [{
                        projeto: {
                            id: projeto?.id 
                    },
                    descricao: {
                        mode: Prisma.QueryMode.insensitive,
                        contains: q
                    }
                }]
            }
        })
        return upas
    }

    async findById(id: string) : Promise<any> {
        const poa = await prismaClient.poa.findUnique({ 
            where: { id },
            include: {
                resp_elab: true,
                resp_exec: true,
                situacao_poa: true
            }
        })

        return poa
    }
}

export default new PoaService