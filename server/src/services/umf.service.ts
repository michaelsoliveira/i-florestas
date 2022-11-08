import { prismaClient } from "../database/prismaClient";
import { Prisma, Umf } from "@prisma/client";
import { getProjeto } from "./ProjetoService";

export interface UmfType {
    nome: string;
    localizacao?: string;
    estado?: string;
    municipio?: string;
}

class UmfService {
    
    async create(data: UmfType, userId: string): Promise<any> {
        const projeto = await getProjeto(userId)
        
        const umfExists = await prismaClient.umf.findFirst({
            where: {
                AND: {
                    projeto: {
                            id: projeto?.id
                    },
                    nome: data.nome
                }
                
            }
        })
        
        if (umfExists) {
            throw new Error('Já existe uma Umf cadastrada com este nome')
        }
        
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

    async getUmf(userId: string): Promise<Umf | null> {
        const projeto = await getProjeto(userId)
        const umf = await prismaClient.umf.findFirst({
            where: {
                projeto: {
                    id: projeto?.id
                }
            }
        })

        return umf
    }

    async getAll(id: string, query?: any): Promise<any> {
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

        const projeto = await getProjeto(id)

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
                where: {
                    projeto: {
                        AND: {
                            id: projeto?.id,
                            projeto_users: {
                                some: {
                                    id_user: id
                                }
                            }
                        }
                        
                    }
                },
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

    async search(userId: string, q?: any) {
        const projeto = await getProjeto(userId)
        const umfs = await prismaClient.umf.findMany({
            where: {
                AND: {
                    projeto: {
                        id: projeto?.id
                    },
                    nome: {
                        mode: Prisma.QueryMode.insensitive,
                        contains: q
                    }
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