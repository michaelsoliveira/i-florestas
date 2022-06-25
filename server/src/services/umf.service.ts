import { Umf } from "../entities/Umf";
import { getRepository, ILike } from "typeorm";
import { Empresa } from "../entities/Empresa";
import { prismaClient } from "../database/prismaClient";
import { Query } from "typeorm/driver/Query";
import { Console } from "console";


export interface UmfType {
    nome: string;
    localizacao?: string;
    estado?: string;
    municipio?: string;
}

class UmfService {
    async create(data: UmfType, userId: string): Promise<any> {
        
        const umfExists = await prismaClient.umf.findFirst({
            where: {
                nome: data.nome
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
                empresa: {
                    connect: {
                        id: empresa?.id
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

    async getAll(query?: any): Promise<any> {
        const { perPage, page, search, orderBy, order } = query
        const skip = (page - 1) * perPage
        let orderByTerm = {}
        const searchTermFilter = search
            ? {OR: [{nome: {contains: search}}, {municipio: {contains: search}}]}
            : {};
        
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
        
        const [umfs, total] = await prismaClient.$transaction([
            prismaClient.umf.findMany({
                where: {
                    // OR: [{nome: {mode: 'insensitive', contains: search}}, {municipio: {mode: 'insensitive', contains: search}}]
                    ...searchTermFilter
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
            prismaClient.umf.count()
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