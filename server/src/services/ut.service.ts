import { prismaClient } from "../database/prismaClient";
import { Query } from "typeorm/driver/Query";
import { Console } from "console";
import { Ut } from "@prisma/client";
import { getProjeto } from "./ProjetoService";

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

class UtService {
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

        const projeto = await getProjeto(userId)
        
        const utExists = await prismaClient.ut.findFirst({
            where: {
                AND: {
                    numero_ut: parseInt(numero_ut),
                    upa: {
                        umf: {
                            projeto: {
                                id: projeto?.id
                            }
                        }
                    }
                }
                
            }
        })

        if (utExists) {
            throw new Error('Já existe uma Ut cadastrada com este número')
        }
        
        const ut = await prismaClient.ut.create({
            data: {
                numero_ut: parseInt(numero_ut), 
                area_util: parseFloat(area_util), 
                area_total: parseFloat(area_total), 
                quantidade_faixas: parseInt(quantidade_faixas), 
                comprimento_faixas: parseInt(comprimento_faixas), 
                largura_faixas: parseInt(largura_faixas), 
                latitude: parseFloat(latitude), 
                longitude: parseFloat(longitude),
                upa: {
                    connect: {
                        id: id_upa
                    }
                }
            }
        })

        return ut
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

    async getAll(userId: string, query?: any): Promise<any> {

        const projeto = await getProjeto(userId)

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

        const where = search ? 
                {
                    AND: {
                        upa: {
                            umf: {
                                projeto: {
                                    id: projeto?.id
                                }
                            }
                        },
                        id_upa: upa,
                        numero_ut: parseInt(search)
                    }
            } : {
                AND: {
                    upa: {
                        umf: {
                            projeto: {
                                id: projeto?.id
                            }
                        }
                    },
                    id_upa: upa
                }
            }
                    
        const [uts, total] = await prismaClient.$transaction([
            prismaClient.ut.findMany({
                where,
                take: perPage ? parseInt(perPage) : 10,
                skip: skip ? skip : 0,
                orderBy: {
                    ...orderByTerm
                },
                include: {
                    upa: false
                }
            }),
            prismaClient.ut.count({ where })
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
                numero_ut: parseInt(q)
            }
        })
        return uts
    }

    async findById(id: string) : Promise<any> {
        const ut = await prismaClient.ut.findUnique({ 
            where: { id },
            include: {
                upa: true
            }
        })

        return ut
    }
}

export default new UtService