import { Prisma, Projeto } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";

export interface ProjetoType {
    nome: string;
}

export const getProjeto = async (userId: string) => {
    return await prismaClient.projeto.findFirst({
        where: {
            AND: {
                empresa: {
                    empresa_users: {
                        some: {
                            users: {
                                id: userId
                            }
                        }
                    }
                },
                active: true
            }
        }
    })
}

class ProjetoService {
    async create(data: ProjetoType, userId: string): Promise<Projeto> {
        
        const projetoExists = await prismaClient.projeto.findFirst({
            where: {
                AND: {
                    empresa: {
                        empresa_users: {
                            some: {
                                users: {
                                    id: userId
                                }
                            }
                        }
                    },
                    nome: data.nome
                }
            }
        })

        if (projetoExists) {
            throw new Error('Já existe um Projeto cadastrada com este nome')
        }

        const empresa = await prismaClient.empresa.findFirst({
            where: {
                empresa_users: {
                    some: {
                        users: {
                            id: userId
                        }
                    }
                }
            }
        })

        if (!empresa) {
            throw new Error('Por favor configure os dados básicos da empresa antes de cadastrar o Projeto!')
        }

        const projeto = await prismaClient.projeto.create({
            data: {
                ...data,
                empresa: {
                    connect: {
                        id: empresa?.id
                    }
                }
            }
        })

        return projeto
    }

    async update(id: string, data: ProjetoType): Promise<Projeto> {
        await prismaClient.projeto.update({
            where: {
                id
            },
            data
        })

        return this.findById(id)
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
                    empresa: {
                        empresa_users: {
                            some: {
                                id_user: id
                            }
                        }
                    }
                }
            } : {
                empresa: {
                    empresa_users: {
                        some: {
                            id_user: id
                        }
                    }
                }
            }

        const [projetos, total] = await prismaClient.$transaction([
            prismaClient.projeto.findMany({
                where,
                take: perPage ? parseInt(perPage) : 50,
                skip: skip ? skip : 0,
                orderBy: {
                    ...orderByTerm
                }
            }),
            prismaClient.projeto.count({where})
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
                    active: true,
                    empresa: {
                        empresa_users: {
                            some: {
                                id_user: id
                            }
                        }
                    }
                }
                
            }
        })

        return projeto
    }
}

export default new ProjetoService