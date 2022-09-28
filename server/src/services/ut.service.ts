import { prismaClient } from "../database/prismaClient";
import { Query } from "typeorm/driver/Query";
import { Console } from "console";
import { Ut } from "@prisma/client";

export interface UtType {
    numero_ut: number;
    area_util: number;
    area_total: number;
    quantidade_faixas: number;
    largura_faixas: number;
    latitude: number;
    longitude: number;
    comprimento_faixas: number;
    upa: string;
}

class UpaService {
    async create(data: any, userId: string): Promise<Ut> {
        
        const { 
            numero_ut, 
            area_util, 
            area_total, 
            quantidade_faixas, 
            comprimento_faixas, 
            largura_faixas, 
            latitude, 
            longitude,
            id_upa
        } = data
        
        const utExists = await prismaClient.ut.findFirst({
            where: {
                numero_ut: parseInt(numero_ut)
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
        
        if (utExists) {
            throw new Error('Já existe uma Ut cadastrada com este número')
        }
        
        const upa = await prismaClient.ut.create({
            data: {
                numero_ut: parseInt(numero_ut), 
                area_util: parseFloat(area_util), 
                area_total: parseFloat(area_total), 
                quantidade_faixas: parseInt(quantidade_faixas), 
                comprimento_faixas: parseInt(comprimento_faixas), 
                largura_faixas: parseInt(largura_faixas), 
                latitude: parseFloat(latitude), 
                longitude: parseFloat(longitude),
                id_empresa: empresa?.id,
                id_upa
            }
        })

        return upa
    }

    async update(id: string, data: UtType): Promise<Ut> {

        const { 
            numero_ut, 
            area_util, 
            area_total, 
            quantidade_faixas, 
            comprimento_faixas, 
            largura_faixas, 
            latitude, 
            longitude 
        } = data

        await prismaClient.ut.update({
            where: {
                id
            },
            data: {
                numero_ut, 
                area_util, 
                area_total, 
                quantidade_faixas, 
                comprimento_faixas, 
                largura_faixas, 
                latitude, 
                longitude,
                upa: {
                    connect: {
                        id: data.upa
                    }
                }
                    
            }
        })

        return this.findById(id)
    }

    async delete(id: string): Promise<void> {
        await prismaClient.ut.delete({
            where: {
                id
            }
        })
        .then(response => {
            console.log(response)
        })
    }

    async getAll(query?: any, userId?: string): Promise<any> {

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

        const { perPage, page, search, orderBy, order, upa } = query
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
        
        const [uts, total] = await prismaClient.$transaction([
            prismaClient.ut.findMany({
                where: {
                    OR: {
                        numero_ut: {
                            equals: Number.parseInt(search)
                        }
                    },
                    AND: [
                        {
                            id_empresa: empresa?.id
                        },
                        {
                            upa: {
                                id: upa
                            }
                        }
                    ] 
                },
                take: perPage ? parseInt(perPage) : 10,
                skip: skip ? skip : 0,
                orderBy: {
                    ...orderByTerm
                },
                include: {
                    upa: true
                }
            }),
            prismaClient.ut.count()
        ])

        return {
            data: uts,
            perPage,
            page,
            skip,
            count: total,
        }
    }

    async deleteUts(uts: string[]): Promise<any> {
        await prismaClient.ut.deleteMany({
            where: {
                id: { in: uts}
            }
        })
        
    }

    async search(q: any) : Promise<Ut[]> {
        const uts = await prismaClient.ut.findMany({
            where: {
                numero_ut: {
                    equals: q
                }
            }
        })
        return uts
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