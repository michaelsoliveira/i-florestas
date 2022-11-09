import { Prisma, Projeto } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";

export interface ProjetoType {
    nome: string;
    active: boolean;
    id_empresa: string;
}

export const getProjeto = async (userId: string) => {
    return await prismaClient.projeto.findFirst({
        where: {
            AND: {
                projeto_users: {
                    some: {
                        id_user: userId,
                        active: true
                    }
                },
            }
        }
    })
}

class ProjetoService {
    async create(data: ProjetoType, userId: string): Promise<Projeto> {

        const empresaExists = await prismaClient.empresa.findFirst({
            where: {
                AND: {
                    projeto: {
                        some: {
                            projeto_users: {
                                some: {
                                    id_user: userId
                                }
                            }
                        }
                    }
                }
            }
        })

        if (!empresaExists) {
            throw new Error('É necessário criar uma empresa primeiro')
        }
        
        const projetoExists = await prismaClient.projeto.findFirst({
            where: {
                AND: {
                    projeto_users: {
                        some: {
                            id_user: userId
                        }
                    },
                    nome: data.nome,
                    empresa: {
                        id: data?.id_empresa
                    }
                }
            }
        })

        if (projetoExists) {
            throw new Error('Já existe um Projeto cadastrada com este nome')
        }
        
        const projeto = await prismaClient.projeto.create({
            data: {
                nome: data?.nome,
                empresa: {
                    connect: {
                        id: data?.id_empresa
                    }
                },
                projeto_users: {
                    create: {
                        users: {
                            connect: {
                                id: userId
                            }
                        },
                        active: data?.active
                    }
                }
            }
        })

        return projeto
    }

    async update(id: string, data: ProjetoType, userId: string): Promise<Projeto> {
        const projeto = await prismaClient.projeto.update({
            where: {
                id
            },
            data: {
                nome: data?.nome,
                projeto_users: {
                    update: {
                        data: {
                            active: data?.active
                        },
                        where: {
                            id_projeto_id_user: {
                                id_projeto: id,
                                id_user: userId
                            }
                        }
                    }
                }
            }
        })

        return projeto
    }

    async delete(id: string): Promise<void> {
        await prismaClient.projeto.delete({
            where: {
                id
            }
        })
        .then(response => {
            console.log(response)
        })
    }

    async getAll(id:string, query?: any): Promise<any> {
        const { perPage, page, search, orderBy, order, id_empresa } = query
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
        const whereWithoutEmpresa = search ?
            {
                AND: {
                    nome: { mode: Prisma.QueryMode.insensitive, contains: search },
                    projeto_users: {
                        some: {
                            id_user: id
                        }
                    }
                }
            } : {
                projeto_users: {
                    some: {
                        id_user: id
                    }
                }
            }

        const whereWithEmpresa = search ? {
            AND: {
                nome: { mode: Prisma.QueryMode.insensitive, contains: search },
                projeto_users: {
                    some: {
                        id_user: id
                    }
                },
                empresa: {
                    id: id_empresa
                }
            }
        } : {
            AND: {
                projeto_users: {
                    some: {
                        id_user: id
                    }
                },
                empresa: {
                    id: id_empresa
                }
            }
        }

        const [projetos, total] = await prismaClient.$transaction([
            prismaClient.projeto.findMany({
                select: {
                    id: true,
                    nome: true,
                    projeto_users: {
                        select: {
                            active: true
                        }
                    }
                },
                where: id_empresa ? whereWithEmpresa : whereWithoutEmpresa,
                take: perPage ? parseInt(perPage) : 50,
                skip: skip ? skip : 0,
                orderBy: {
                    ...orderByTerm
                }
            }),
            prismaClient.projeto.count({where: id_empresa ? whereWithEmpresa : whereWithoutEmpresa})
        ])

        return {
            data: projetos,
            perPage,
            page,
            skip,
            count: total,
        }
    }

    async deleteProjetos(projetos: string[]): Promise<void> {
          
        await prismaClient.projeto.deleteMany({
            where: {
                id: { in: projetos}
            }
        })
        
    }

    async getUsers(projetoId: string, query?: any): Promise<any> {
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
                    projeto_users: {
                        some: {
                            id_projeto: projetoId
                        }
                    }
                }
            } : {
                projeto_users: {
                    some: {
                        id_projeto: projetoId
                    }
                }
            }

        const [data, total] = await prismaClient.$transaction([
            prismaClient.user.findMany({
                where: where,
                take: perPage ? parseInt(perPage) : 50,
                skip: skip ? skip : 0,
                orderBy: {
                    ...orderByTerm
                }
            }),
            prismaClient.projeto.count({where})
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

    async search(text: any) {
        const projetos = await prismaClient.projeto.findMany({
            where: {
                nome: { mode: Prisma.QueryMode.insensitive, contains: text }
            },
            orderBy: {
                nome:   'asc'
            },
        })

        return projetos
    }

    async findById(id: string) : Promise<any> {
        const projeto = await prismaClient.projeto.findUnique({ where: { id } })

        return projeto
    }

    async getActive(id: string): Promise<Projeto | null> {
        const projeto = await prismaClient.projeto.findFirst({
            where: {
                AND: {
                    projeto_users: {
                        some: {
                            active: true,
                            id_user: id
                        }
                    },
                }
                
            }
        })

        return projeto
    }
}

export default new ProjetoService