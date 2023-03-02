import { 
    Prisma, 
    Projeto, 
    // ProjetoUser 
} from "@prisma/client";
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
                active: true,
                users_roles: {
                    some: {
                        user_id: userId
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
                    users_roles: {
                        some: {
                            user_id: data?.id_user ? data?.id_user : userId
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
        }) as any

        const projeto = await prismaClient.projeto.create({
            data: {
                nome: data?.nome,
                users_roles: {
                    
                        create: {
                            users: {
                                connect: {
                                    id: data?.id_user ? data?.id_user : userId
                                }
                            },
                            roles: {
                                connect: {
                                    id: roleAdmin?.id
                                }
                            },
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
                active: data?.active
            }
        })

        return projeto
    }

    async changeActive(projetoId: string, userId: string): Promise<Projeto> {
        const projeto = await prismaClient.projeto.update({
            data: {
                active: true
            },
            where: {
                id: projetoId
            }
        })

        return projeto
    }

    async getDefaultData(projetoId: string | any, userId: string) : Promise<any> {
        const data = await prismaClient.umf.findFirst({
            include: {
                projeto: true,
                upa: true
            },
            where: {
                projeto: {
                    id: projetoId,
                    users_roles: {
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
                    users_roles: {
                        some: {
                            user_id: id
                        }
                    }
                }
            } : {
                excluido: false,
                users_roles: {
                    some: {
                        user_id: id
                    }
                }
            }

        const [projetos, total] = await prismaClient.$transaction([
            prismaClient.projeto.findMany({
                include: {
                    pessoa: true
                },
                where: {
                    excluido: false,
                    users_roles: {
                        some: {
                            user_id: id
                        }
                    }
                },
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
                active: projeto?.active,
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

    async getActive(id: string): Promise<any> {
        const user = await prismaClient.userRole.findFirst({
            include: {
                projeto: {
                    include: {
                        pessoa: true
                    }
                },

            },
            where: {
                AND: {
                    projeto: {
                        active: true
                    },
                    user_id: id
                }
                
            }
        })

        return user?.projeto
    }
}

export default new ProjetoService