import { Umf } from "../entities/Umf";
import { prismaClient } from "../database/prismaClient";
import { Prisma, Projeto } from "@prisma/client";

export interface UmfType {
    nome: string;
    localizacao?: string;
    estado?: string;
    municipio?: string;
}

class UmfService {

    async getProjeto(id: string): Promise<Projeto | null> {
        const projeto = await prismaClient.projeto.findFirst({
            where: {
                AND: {
                    empresa: {
                        empresa_users: {
                            some: {
                                users: {
                                    id
                                }
                            }
                        }
                    },
                    active: true
                }
            }
        })

        return projeto
    }
    
    async create(data: UmfType, userId: string): Promise<any> {
        
        const umfExists = await prismaClient.umf.findFirst({
            where: {
                AND: {
                    nome: data.nome
                }
                
            }
        })
        
        if (umfExists) {
            throw new Error('Já existe uma Umf cadastrada com este nome')
        }
        const projeto = await prismaClient.projeto.findFirst({
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
        
        const umf = await prismaClient.umf.create({
            data: {
                nome: data.nome,
                localizacao: data.localizacao,
                municipio: data.municipio,
                estado: {
                    connect: {
                        id: data.estado
                    }
                },
                projeto: {
                    connect: {
                        id: projeto?.id
                    }
                }
                    
            }
        })

        return umf
    }

    async update(id: string, data: UmfType): Promise<Umf> {
        await prismaClient.umf.update({
            where: {
                id
            },
            data: {
                nome: data.nome,
                localizacao: data.localizacao,
                municipio: data.municipio,
                estado: {
                    connect: {
                        id: data.estado
                    }
                },
            }
        })

        return this.findById(id)
    }

    async delete(id: string): Promise<void> {
        await prismaClient.umf.delete({
            where: {
                id
            }
        })
        .then(response => {
            console.log(response)
        })
    }

    async getAll(query?: any, id?: string): Promise<any> {
        const { perPage, page, search, orderBy, order } = query
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

        const projeto = await prismaClient.projeto.findFirst({
            where: {
                AND: {
                    empresa: {
                        empresa_users: {
                            some: {
                                users: {
                                    id
                                }
                            }
                        }
                    },
                    active: true
                }
            }
        })

        let where = {
            OR: {
                nome: {
                    mode: Prisma.QueryMode.insensitive,
                    contains: search ? search : ''
                },
                municipio: {
                    mode: Prisma.QueryMode.insensitive,
                    contains: search ? search : ''
                }
            },
            AND: {
                id_projeto: projeto?.id
            }   
        }
        
        const [umfs, total] = await prismaClient.$transaction([
            prismaClient.umf.findMany({
                where,
                take: perPage ? parseInt(perPage) : 10,
                skip: skip ? skip : 0,
                orderBy: {
                    ...orderByTerm
                },
                include: {
                    estado: true
                }
            }),
            prismaClient.umf.count({ where })
        ])

        return {
            data: umfs,
            perPage,
            page,
            skip,
            count: total,
        }
    }

    async deleteUmfs(umfs: string[]): Promise<any> {
          
        await prismaClient.umf.deleteMany({
            where: {
                id: { in: umfs}
            }
        })
        
    }

    async search(q: any) {
        const umfs = await prismaClient.umf.findMany({
            where: {
                nome: {
                    mode: 'insensitive',
                    contains: q
                }
            }
        })
        return umfs
    }

    async findById(id: string) : Promise<any> {
        const umf = await prismaClient.umf.findUnique({ 
            where: { id },
            include: {
                estado: true
            }
        })

        return umf
    }
}

export default new UmfService