import { prismaClient } from "../database/prismaClient";
import { Prisma, Ut } from "@prisma/client";
import { getProjeto } from "./ProjetoService";

export interface UtType {
    numero_ut: number;
    area_util: number;
    area_total: number;
    quantidade_faixas: number;
    largura_faixas: number;
    azimute: number;
    quadrante: number;
    latitude: number;
    longitude: number;
    comprimento_faixas: number;
    upa: string;
}

class UtService {
    async create(dataRequest: any, userId: string): Promise<Ut> {
        
        const { 
            numero_ut, 
            area_util, 
            area_total, 
            quantidade_faixas, 
            comprimento_faixas, 
            largura_faixas, 
            azimute,
            quadrante,
            latitude, 
            longitude,
            id_upa,
            polygon_path
        } = dataRequest

        const upa = await prismaClient.upa.findUnique({where: { id: id_upa }})
        
        const utExists = await prismaClient.ut.findFirst({
            where: {
                AND: {
                    numero_ut: parseInt(numero_ut),
                    upa: {
                        id: id_upa
                    }
                }
                
            }
        })

        if (utExists) {
            throw new Error('Já existe uma Ut cadastrada com este número')
        }

        const preparedData = 
            {
                numero_ut: parseFloat(numero_ut), 
                area_util: parseFloat(area_util), 
                area_total: parseFloat(area_total), 
                latitude: parseFloat(latitude), 
                longitude: parseFloat(longitude),
                polygon_path,
                id_upa,
            }
        

        const data: any = upa?.tipo === 1 ? { 
            ...preparedData, 
            quantidade_faixas: parseInt(quantidade_faixas), 
            comprimento_faixas: parseInt(comprimento_faixas), 
            largura_faixas: parseInt(largura_faixas),
            azimute: parseFloat(azimute),
            quadrante: parseInt(quadrante), 
        } : preparedData

        console.log(data)

        const fieldsUt = 'numero_ut, area_util, area_total, latitude, longitude, id_upa'
        const withPolygon = polygon_path ? `${fieldsUt}, polygon_path` : fieldsUt
        const fields = upa?.tipo === 1 ? `${fieldsUt}, quantidade_faixas, largura_faixas, azimute, quadrante, polygon_path` : withPolygon

        let values: any = []
        for (const [key, value] of Object.entries(data))  {
            if (key !== 'polygon_path') {
                values.push(value?.toString())
            }
        };

        const polygonString = polygon_path.reduce((acc: any, curr: any, idx: any) => {
            const point = idx < polygon_path.length - 1? curr.lng.toString().concat(' ', curr.lat, ', ') : curr.lng.toString().concat(' ', curr.lat, ', ', polygon_path[0].lng.toString().concat(' ', polygon_path[0].lat))
            return acc + point
        }, '')

        values.push(`POLYGON((${polygonString}))`)
        
        const query: any = `
            INSERT INTO ut(${fields})
                VALUES('${values.join(`', '` )}')
        `

        console.log('QUERY: ', query)
        
        const ut: Ut = await prismaClient.$queryRawUnsafe(query)

        return ut
    }

    async update(id: string, dataRequest: any): Promise<Ut> {

        const { 
            numero_ut, 
            area_util, 
            area_total, 
            quantidade_faixas, 
            comprimento_faixas, 
            largura_faixas, 
            azimute,
            quadrante,
            latitude, 
            longitude,
            id_upa
        } = dataRequest

        const preparedData = 
        {
            numero_ut: parseInt(numero_ut), 
            area_util: parseFloat(area_util), 
            area_total: parseFloat(area_total), 
            latitude: parseFloat(latitude), 
            longitude: parseFloat(longitude),
            upa: {
                connect: {
                    id: id_upa
                }
            }
        }
    
        const upa = await prismaClient.upa.findUnique({where: { id: id_upa }})

        const data = upa?.tipo === 1 ? { 
            ...preparedData, 
            quantidade_faixas: parseInt(quantidade_faixas), 
            comprimento_faixas: parseInt(comprimento_faixas), 
            largura_faixas: parseInt(largura_faixas)  ,
            azimute: parseFloat(azimute),
            quadrante: parseInt(quadrante)
        } : preparedData
        
        const ut = await prismaClient.ut.update({
            where: {
                id
            },
            data
        })

        return ut
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

        const { perPage, page, search, upa } = query
        const skip = (page - 1) * perPage

        const where = search ? 
                {
                    AND: [{
                        upa: {
                            umf: {
                                projeto: {
                                    id: projeto?.id
                                }
                            }
                        }
                    },
                    {   id_upa: upa },
                    { numero_ut: parseInt(search)
                    }]
            } : {
                AND: [{
                    upa: {
                        umf: {
                            projeto: {
                                id: projeto?.id
                            }
                        }
                    }
                },
                {    id_upa: upa}
            ]
            }
                    
        const [uts, total] = await prismaClient.$transaction([
            prismaClient.ut.findMany({
                where,
                take: perPage ? parseInt(perPage) : 10,
                skip: skip ? skip : 0,
                orderBy: {
                    numero_ut: 'asc'
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

    async search(userId: string, q: any) : Promise<Ut[]> {
        const projeto = await getProjeto(userId)
        const uts = await prismaClient.ut.findMany({
            where: {
                AND: {
                    upa: {
                        umf: {
                            projeto: {
                                id: projeto?.id
                            }
                        }
                    },
                    numero_ut: parseInt(q)
                }
            }
        })
        return uts
    }

    async findById(id: string) : Promise<any> {
        const ut = await prismaClient.$queryRaw<any>`
            SELECT 
                a.id, 
                a.numero_ut, 
                a.area_util, 
                a.area_total,
                a.latitude,
                a.longitude,
                ST_AsGeoJSON(a.polygon_path) as polygon_path , 
                a.id_upa
            FROM ut a
            WHERE a.id = ${id}
        `

        return ut[0]
    }
}

export default new UtService