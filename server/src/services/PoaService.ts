import { prismaClient } from "../database/prismaClient";
import { Prisma, Poa } from "@prisma/client";
import { getProjeto } from "./ProjetoService";

export interface PoaType {
    descricao: string;
    pmfs: string;
    corte_maximo: number;
    resp_elab: string;
    resp_exec: string;
    situacao: string;
    uts: any
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

        const situacaoPoa = await prismaClient.situacaoPoa.findFirst({
            where: {
                nome: { contains: 'Novo' }
            }
        })
        
        const poa = await prismaClient.poa.create({
            data: {
                descricao: data.descricao,
                corte_maximo: data.corte_maximo,
                pmfs: data.pmfs,
                situacao_poa: {
                    connect: {
                        id: situacaoPoa?.id
                    }
                },
                resp_elab: {
                    create: {
                        resp_tecnico: {
                            connect: {
                                id: data?.resp_elab
                            }
                        }
                    }
                },
                resp_exec: {
                    create: {
                        resp_tecnico: {
                            connect: {
                                id: data?.resp_exec
                            }
                        }
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

        const uts = data?.uts && await prismaClient.ut.updateMany({
            where: {
                id: {
                    in: data?.uts
                }
            },
            data: {
                id_poa: poa.id
            }
        })

        return poa
    }

    async update(id: string, data: any): Promise<Poa> {
        
        data?.resp_exec !== data?.id_resp_exec &&
        
            await prismaClient.responsavelExecucao.update({
                data: {
                    id_resp_tecnico: data?.resp_exec
                },
                where: {
                    id: data?.id_resp_exec
                }
            })

        data?.resp_elab !== data?.id_resp_elab &&
        
            await prismaClient.responsavelElaboracao.update({
                data: {
                    id_resp_tecnico: data?.resp_elab
                },
                where: {
                    id: data?.id_resp_elab
                }
            })

            const uts = data?.uts && await prismaClient.ut.updateMany({
                where: {
                    id: {
                        in: data?.uts
                    }
                },
                data: {
                    id_poa: id
                }
            })

        const poa = await 
            prismaClient.poa.update({
                where: {
                    id
                },
                data: {
                    descricao: data.descricao,
                    corte_maximo: data.corte_maximo,
                    pmfs: data?.pmfs,
                }
            })

        return poa
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
                include: {
                    situacao_poa: true
                },
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
                resp_elab: {
                    include: {
                        resp_tecnico: {
                            include: {
                                pessoa: {
                                    include: {
                                        pessoaFisica: {
                                            select: {
                                                nome: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                resp_exec: {
                    include: {
                        resp_tecnico: {
                            include: {
                                pessoa: {
                                    include: {
                                        pessoaFisica: {
                                            select: {
                                                nome: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                situacao_poa: true
            }
        })

        return poa
    }
}

export default new PoaService