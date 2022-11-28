import { Prisma, Projeto, ProjetoUser } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";

export interface ProjetoType {
    nome: string;
    active: boolean;
    id_user: string;
    id_role: string;
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
        
        const projetoExists = await prismaClient.projeto.findFirst({
            where: {
                AND: {
                    projeto_users: {
                        some: {
                            id_user: data?.id_user ? data?.id_user : userId
                        }
                    },
                    nome: data.nome
                }
            }
        })

        if (projetoExists) {
            throw new Error('Já existe um Projeto cadastrada com este nome')
        }

        const roleAdmin = await prismaClient.role.findFirst({ 
            where: { name: { mode: Prisma.QueryMode.insensitive, equals: 'admin' } } 
        })
        
        const projeto = await prismaClient.projeto.create({
            data: {
                nome: data?.nome,
                projeto_users: {
                    create: {
                        users: {
                            connect: {
                                id: data?.id_user ? data?.id_user : userId
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
                            active: data?.active,
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

    async changeActive(projetoId: string, userId: string): Promise<Projeto> {
        const projetoUser = await prismaClient.projetoUser.update({
            data: {
                active: true
            },
            where: {
                id_projeto_id_user: {
                    id_projeto: projetoId,
                    id_user: userId
                }
            },
            include: {
                projeto: true
            }
        })

        return projetoUser.projeto
    }

    async getDefaultData(projetoId: string, userId: string) : Promise<any> {
        const data = await prismaClient.umf.findFirst({
            include: {
                projeto: true
            },
            where: {
                projeto: {
                    id: projetoId,
                    projeto_users: {
                        some: {
                            users: {
                                id: userId
                            }
                        }
                    }
                }
            }
        })

        return data
    }

    async delete(id: string): Promise<void> {
        await prismaClient.projeto.update({
            data: {
                excluido: true
            },
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
                    excluido: false,
                    projeto_users: {
                        some: {
                            id_user: id
                        }
                    }
                }
            } : {
                excluido: false,
                projeto_users: {
                    some: {
                        id_user: id
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
                        },
                        where: {
                            id_user: id
                        }
                    },
                    pessoa: true
                },
                where,
                take: perPage ? parseInt(perPage) : 50,
                skip: skip ? skip : 0,
                orderBy: {
                    ...orderByTerm
                }
            }),
            prismaClient.projeto.count()
        ])

        const data = projetos.map((projeto: any) => {
            return {
                id: projeto?.id,
                nome: projeto?.nome,
                active: projeto?.projeto_users[0].active,
                pessoa: projeto?.pessoa[0]
            }
        })

        return {
            data,
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
                    OR: {
                        username: { mode: Prisma.QueryMode.insensitive, contains: search },
                        email: { mode: Prisma.QueryMode.insensitive, contains: search },
                    },
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

        const [users, total] = await prismaClient.$transaction([
            prismaClient.user.findMany({
                include: {
                    users_roles: {
                        include: {
                            roles: {
                                select: {
                                    id: true,
                                    name: true
                                }    
                            }
                        }
                    },
                },
                where,
                take: perPage ? parseInt(perPage) : 50,
                skip: skip ? skip : 0,
                orderBy: {
                    ...orderByTerm
                }
            }),
            prismaClient.user.count()
        ])

        const data = users.map((user) => {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                image: user.image,
                email_verified: user.email_verified,
                roles: user.users_roles.map((user_roles) => {
                    return {
                        ...user_roles.roles
                    }
                })
            }
        })

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
                AND: {
                    excluido: false,
                    nome: { mode: Prisma.QueryMode.insensitive, contains: text }
                }
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
            include: {
                pessoa: true
            },
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