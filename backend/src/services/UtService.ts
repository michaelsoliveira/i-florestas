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

export type geoType = {
    srid: number;
    latitude: number;
    longitude: number;
}

export type utmType = {
    srid: number;
    norte: number;
    este: number;
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
            norte,
            este,
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
                id_upa
            }
        
        const coordsFields = Number(upa?.srid) > 5000 ? { 
            norte: Number(norte),
            este: Number(este)
         } : {
            latitude: Number(latitude), 
            longitude: Number(longitude)
         }
        const data: any = upa?.tipo === 1 ? { 
            ...preparedData, 
            ...coordsFields,
            quantidade_faixas: parseInt(quantidade_faixas), 
            comprimento_faixas: parseInt(comprimento_faixas), 
            largura_faixas: parseInt(largura_faixas),
            azimute: parseFloat(azimute),
            quadrante: parseInt(quadrante), 
        } : preparedData

        const fieldsBase = 'numero_ut, area_util, area_total, id_upa'
        const fieldsUtm = ', norte, este, quantidade_faixas, comprimento_faixas, largura_faixas, azimute, quadrante'
        const fieldsWGS84 = ', latitude, longitude, quantidade_faixas, comprimento_faixas, largura_faixas, azimute, quadrante'
        const fieldsUt = upa?.tipo === 1 
            ? 
                Number(upa?.srid) > 5000 ? 
                fieldsBase.concat(fieldsUtm) :
                fieldsBase.concat(fieldsWGS84)
            : fieldsBase

        const fields = polygon_path.length > 0 ? `${fieldsUt}, polygon_path` : fieldsUt

        let values: any = []
        for (const [key, value] of Object.entries(data) as any)  {
            if (key !== 'polygon_path') {
                values.push(value?.toString())
            }
        };

        const polygonString = polygon_path.reduce((acc: any, curr: any, idx: any) => {
            const point = idx < polygon_path.length - 1 
                ? curr.lng.toString().concat(' ', curr.lat, ', ') 
                : curr.lng.toString().concat(' ', curr.lat, ', ', polygon_path[0].lng.toString().concat(' ', polygon_path[0].lat))
            return acc + point
        }, '')

        polygon_path.length > 0 && values.push(`POLYGON((${polygonString}))`)

        const query: string = `
            INSERT INTO ut(${fields})
                VALUES('${values.join(`', '` )}')
        `
        
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
            norte,
            este,
            id_upa,
            polygon_path
        } = dataRequest

        const preparedData = 
        {
            numero_ut: parseInt(numero_ut), 
            area_util: parseFloat(area_util), 
            area_total: parseFloat(area_total), 
            latitude: parseFloat(latitude), 
            longitude: parseFloat(longitude),
            norte: parseFloat(norte),
            este: parseFloat(este),
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

        const polygonString = polygon_path.reduce((acc: any, curr: any, idx: any) => {
            const point = idx < polygon_path.length - 1? curr.lng.toString().concat(' ', curr.lat, ', ') : curr.lng.toString().concat(' ', curr.lat, ', ', polygon_path[0].lng.toString().concat(' ', polygon_path[0].lat.toString()))
            return acc + point
        }, '')

        const query = `UPDATE ut SET polygon_path = \'POLYGON((${polygonString}))\' WHERE id = '${id}'`

        polygon_path && polygon_path.length > 0 && await prismaClient.$executeRawUnsafe(query)

        return ut
    }

    async delete(id: string): Promise<void> {
        await Promise.all([
            prismaClient.arvore.deleteMany({ where: { id_ut: id } }),
            prismaClient.ut.delete({
                where: {
                    id
                }
            })
        ])
    }

    async getUtsByUpa(upaId: string): Promise<Ut[] | undefined> {
        try {
            const uts = await prismaClient.ut.findMany({
                where: {
                    id_upa: upaId
                }
            })

            return uts
        } catch(error: any) {
            return []
        }
    }

    async createAuto(data: any, upaId: string): Promise<any> {        
        try {
            const preparedData = data?.map(({ numero_ut, area_util, area_total }: any) => {
                return {
                    numero_ut: Number(numero_ut), 
                    area_util: Number(area_util), 
                    area_total: Number(area_total), 
                    id_upa: upaId
                }
            })
            
            const result = await prismaClient.ut.createMany({
                data: preparedData
            })

            return {
                error: false,
                message: 'UTs cadastradas com sucesso!',
                result
            }
        } catch(e: any) {
            return {
                error: true,
                message: e.message
            }
        }        
    }

    async getAll(userId: string, query?: any): Promise<any> {

        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })

        const { perPage, page, search, upa } = query
        const skip = (page - 1) * perPage

        const where = search ? 
                {
                    AND: [{
                        upa: {
                            umf: {
                                projeto: {
                                    id: user?.id_projeto_ativo
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
                                id: user?.id_projeto_ativo
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
                take: perPage ? parseInt(perPage) : 100,
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
        await Promise.all([
            prismaClient.arvore.deleteMany({ where: { id_ut: { in: uts } } }),
            prismaClient.ut.deleteMany({
                where: {
                    id: { in: uts}
                }
            })
        ])
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
                a.quantidade_faixas,
                a.largura_faixas,
                a.comprimento_faixas,
                a.azimute,
                a.quadrante,
                a.norte,
                a.este,
                ST_AsGeoJSON(a.polygon_path) as polygon_path , 
                a.id_upa
            FROM ut a
            WHERE a.id = ${id}::uuid
        `

        return ut[0]
    }

    async utmToGeo(data: utmType ) {
        const { norte, este, srid } = data
        
        const query = `
            SELECT ST_X(ST_AsText(ST_Transform(ST_SetSRID(ST_Point(${este}, ${norte}),${srid}),4326))) AS longitude,
            ST_Y(ST_AsText(ST_Transform(ST_SetSRID(ST_Point(${este}, ${norte}),${srid}),4326))) AS latitude
        `

        const coords: any = await prismaClient.$queryRawUnsafe(query)

        return coords[0]
    }

    async geoToUtm(data: geoType) {
        const { latitude, longitude, srid } = data
        
        const query = `
        SELECT ST_X(ST_Transform(ST_geomfromtext('POINT(' || ${longitude} || ' ' || ${latitude}  || ')',4326),${srid})) AS este,
            ST_Y(ST_Transform(ST_geomfromtext('POINT(' || ${longitude} || ' ' || ${latitude}  || ')',4326),${srid})) AS norte
        `

        const coords: any = await prismaClient.$queryRawUnsafe(query)

        return coords[0]
    }

    async getGeoJsonShape(userId: string, type?: string, id?: string) : Promise<any> {
        const data = await prismaClient.user.findUnique({ where: { id: userId } })
        const query = `SELECT geo_json_shape_ut('${type}', '${type === 'all' ? data?.id_projeto_ativo: id}')`
        
        const result: any = await prismaClient.$queryRawUnsafe(query)
        
        return result[0]
    }
}

export default new UtService