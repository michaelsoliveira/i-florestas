import { prismaClient } from "../database/prismaClient";
import { Query } from "typeorm/driver/Query";
import { Console } from "console";
import { Upa } from "@prisma/client";

export interface UpaType {
    descricao: string;
    ano: string;
    umf: string;
    equacao_volume: string;
    tipo: string;
    spatial_ref_sys: number;
}

class UpaService {
    async create(data: UpaType, userId: string): Promise<Upa> {
        
        const upaExists = await prismaClient.upa.findFirst({
            where: {
                descricao: data.descricao
            }
        })

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
        
        if (upaExists) {
            throw new Error('Já existe uma Umf cadastrada com este nome')
        }
        
        const upa = await prismaClient.upa.create({
            data: {
                descricao: data.descricao,
                ano: Number.parseInt(data.ano),
                tipo: Number.parseInt(data.tipo),
                empresa: {
                    connect: {
                        id: empresa?.id
                    }
                },
                umf: {
                    connect: {
                        id: data.umf
                    }
                },
                equacao_volume: {
                    connect: {
                        id: data.equacao_volume
                    }
                },
                spatial_ref_sys: {
                    connect: {
                        srid: data.spatial_ref_sys
                    }
                }
                    
            }
        })

        return upa
    }

    async update(id: string, data: UpaType): Promise<Upa> {
        await prismaClient.upa.update({
            where: {
                id
            },
            data: {
                descricao: data.descricao,
                ano: Number.parseInt(data.ano),
                tipo: Number.parseInt(data.tipo),
                umf: {
                    connect: {
                        id: data.umf
                    }
                },
                equacao_volume: {
                    connect: {
                        id: data.equacao_volume
                    }
                },
                spatial_ref_sys: {
                    connect: {
                        srid: data.spatial_ref_sys
                    }
                }
                    
            }
        })

        return this.findById(id)
    }

    async delete(id: string): Promise<void> {
        await prismaClient.upa.delete({
            where: {
                id
            }
        })
        .then(response => {
            console.log(response)
        })
    }

    async getAll(query?: any): Promise<any> {
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
        
        const [upas, total] = await prismaClient.$transaction([
            prismaClient.upa.findMany({
                where: {
                    OR: {
                        descricao: {
                            mode: 'insensitive',
                            contains: search ? search : ''
                        }
                    },
                    AND: {
                        id_umf: umf
                    }   
                },
                take: perPage ? parseInt(perPage) : 10,
                skip: skip ? skip : 0,
                orderBy: {
                    ...orderByTerm
                },
                include: {
                    equacao_volume: true,
                    spatial_ref_sys: true,
                    umf: true
                }
            }),
            prismaClient.upa.count()
        ])

        return {
            data: upas,
            perPage,
            page,
            skip,
            count: total,
        }
    }

    async deleteUpas(upas: string[]): Promise<any> {
        await prismaClient.upa.deleteMany({
            where: {
                id: { in: upas}
            }
        })
        
    }

    async search(q: any) : Promise<Upa[]> {
        const upas = await prismaClient.upa.findMany({
            where: {
                descricao: {
                    mode: 'insensitive',
                    contains: q
                }
            }
        })
        return upas
    }

    async findById(id: string) : Promise<any> {
        const upa = await prismaClient.upa.findUnique({ 
            where: { id },
            include: {
                empresa: true,
                spatial_ref_sys: true,
                equacao_volume: true,
                umf: true
            }
        })

        return upa
    }
}

export default new UpaService