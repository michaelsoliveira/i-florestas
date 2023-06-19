import { prismaClient } from "../database/prismaClient";
import { Arvore } from "@prisma/client";
import { getProjeto } from "./ProjetoService";

const math = require('mathjs')

export interface ArvoreType {
    numero_arvore: number;
    id_projeto: string;
}

class ArvoreService {
    async create(data: any): Promise<Arvore> {
        try {
            const ut = await prismaClient.ut.findUnique({
                where: {
                    id: data?.ut
                }
            }) as any

            const upa = await prismaClient.upa.findUnique({
                where: {
                    id: data?.upa
                }
            })

            const arvoreExists = await prismaClient.arvore.findFirst({ 
                where: { 
                    AND: {
                        numero_arvore: parseInt(data.numero_arvore),
                        ut: {
                            id: data?.ut
                        }
                    }
                } 
            })
    
            if (arvoreExists) {
                throw new Error('Já existe uma árvore cadastrada com este número')
            }
    
            const especie = await prismaClient.especie.findUnique({
                where: {
                    id: data?.especie
                }
            })

            const eqVolume = await prismaClient.equacaoVolume.findFirst({
                where: {
                    upa: {
                        some: {
                            id: upa?.id
                        }
                    }
                }
            }) as any
    
            const dap = data?.cap ? parseFloat(data?.cap) / Math.PI : parseFloat(data?.dap)
    
            let scope = {
                DAP: dap,
                ALTURA: parseFloat(data?.altura)
            }
    
            const volume = math.evaluate(eqVolume?.expressao, scope)
    
            const preparedData = upa?.tipo === 1 ? {
                numero_arvore: parseInt(data?.numero_arvore),
                faixa: parseInt(data?.faixa),
                dap,
                altura: parseFloat(data?.altura),
                fuste: parseInt(data?.fuste),
                orient_x: data?.orient_x,
                lat_x: parseFloat(data?.lat_x),
                long_y: parseFloat(data?.long_y),
                volume,
                ut: {
                    connect: {
                        id: ut?.id
                    }
                },
                especie: {
                    connect: {
                        id: especie?.id
                    }
                }
            } : {
                numero_arvore: parseInt(data?.numero_arvore),
                dap: data?.cap ? parseFloat(data?.cap) / Math.PI : parseFloat(data?.dap),
                altura: parseFloat(data?.altura),
                fuste: parseInt(data?.fuste),
                ponto_gps: parseInt(data?.ponto_gps),
                volume,
                ut: {
                    connect: {
                        id: ut?.id
                    }
                },
                especie: {
                    connect: {
                        id: especie?.id
                    }
                }
            }
    
            const arvore = await prismaClient.arvore.create({
                data: preparedData
            })
    
            return arvore
        } catch(e) {
            return e
        }
        
    }

    async createByImport(dt: any, upa?: any) {
        try {
            const eqVolume = await prismaClient.equacaoVolume.findFirst({
                where: {
                    upa: {
                        some: {
                            id: upa?.id
                        }
                    }
                }
            }) as any
            
            const data = await Promise.all(dt.map(async (arv: any): Promise<any> => {
                const dap = arv?.cap ? parseFloat(arv?.cap) / Math.PI : parseFloat(arv?.dap)

                let scope = {
                    DAP: dap,
                    ALTURA: parseFloat(arv?.altura)
                }
        
                const volume = math.evaluate(eqVolume?.expressao, scope)
                const especie = await prismaClient.especie.findFirst({
                    where: {
                        nome_orgao: arv?.especie
                    }
                })

                const ut = arv?.ut && await prismaClient.ut.findFirst({
                    where: {
                        AND: [
                                { numero_ut: parseInt(arv?.ut) },
                                { id_upa: upa?.id }
                            ]
                    }
                })

                const preparedData = upa?.tipo === 1 ? {
                    faixa: parseInt(arv?.faixa),
                    orient_x: arv?.orient_x,
                } : {
                    ponto_gps: arv?.ponto_gps && parseInt(arv?.ponto_gps),
                    lat_x: parseFloat(arv?.latitude?.replace(",", ".")),
                    long_y: parseFloat(arv?.longitude?.replace(",", ".")),
                }

                return {
                    numero_arvore: arv?.numero_arvore && parseInt(arv?.numero_arvore),
                    dap: arv?.cap ? parseFloat(arv?.cap) / Math.PI : parseFloat(arv?.dap),
                    altura: parseFloat(arv?.altura),
                    fuste: arv?.qf && parseInt(arv?.qf),
                    volume,
                    ...preparedData,
                    id_ut: ut?.id,
                    id_especie: especie?.id
                }
            }))

            await prismaClient.arvore.createMany({
                data
            })

        } catch(error) {
            console.log(error?.message)
            return error
        }
        
    }

    async update(id: string, data: any): Promise<Arvore> {
        const ut = await prismaClient.ut.findUnique({
            where: {
                id: data?.id_ut
            }
        }) as any

        const upa = await prismaClient.upa.findUnique({
            where: {
                id: ut?.id_upa
            }
        })

        const especie = await prismaClient.especie.findUnique({
            where: {
                id: data?.id_especie
            }
        })

        const eqVolume = await prismaClient.equacaoVolume.findFirst({
            where: {
                upa: {
                    some: {
                        id: upa?.id
                    }
                }
            }
        }) as any

        const dap = data?.cap ? parseFloat(data?.cap) / Math.PI : parseFloat(data?.dap)

        let scope = {
            DAP: dap,
            ALTURA: parseFloat(data?.altura)
        }

        const volume = math.evaluate(eqVolume?.expressao, scope)

        const preparedData = upa?.tipo === 1 ? {
            numero_arvore: parseInt(data?.numero_arvore),
            faixa: parseInt(data?.faixa),
            dap,
            altura: parseFloat(data?.altura),
            fuste: parseInt(data?.fuste),
            orient_x: data?.orient_x,
            lat_x: parseFloat(data?.lat_x),
            long_y: parseFloat(data?.long_y),
            volume,
            ut: {
                connect: {
                    id: ut?.id
                }
            },
            especie: {
                connect: {
                    id: especie?.id
                }
            }
        } : {
            numero_arvore: parseInt(data?.numero_arvore),
            dap: data?.cap ? parseFloat(data?.cap) / Math.PI : parseFloat(data?.dap),
            altura: parseFloat(data?.altura),
            fuste: parseInt(data?.fuste),
            lat_x: parseFloat(data?.lat_x),
            long_y: parseFloat(data?.long_y),
            ponto_gps: parseInt(data?.ponto_gps),
            volume,
            ut: {
                connect: {
                    id: ut?.id
                }
            },
            especie: {
                connect: {
                    id: especie?.id
                }
            }
        }

        const arvore = await prismaClient.arvore.update({
            where: {
                id
            },
            data: preparedData
        })

        return arvore
    }

    async linkarGPS(data: any) {
        const preparedData = Promise.all([
            data.map((row: any) => {
                
            })
        ])
        // const result = await prismaClient.arvore.update({
        //     data: {

        //     }
        // })
    }


    async delete(id: string): Promise<void> {
        await prismaClient.arvore.delete({
            where: { id }
        })
            .then(response => {
                console.log(response)
            })
    }

    async getAll(userId: string, query?: any, utId?: string): Promise<any> {
        const projeto = await getProjeto(userId)
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
                AND: [
                    {numero_arvore: parseInt(search)},
                    {ut: { id: utId }}
                ]
            } : {
                ut: { id: utId }
            }
        const [data, total] = await prismaClient.$transaction([
            prismaClient.arvore.findMany({
                where,
                orderBy: orderByTerm,
                take: perPage ? parseInt(perPage) : 50,
                skip: skip ? skip : 0,
            }),
            prismaClient.arvore.count({ where })
        ])

        return {
            data,
            perPage,
            page,
            skip,
            count: total
        }
    }

    async deleteArvores(arvores: string[]) {
        
        await prismaClient.arvore.deleteMany({
            where: { id: { in: arvores} }
        })
         
    }

    async search(q: any, userId: string, utId?: string) {
        const data = await prismaClient.arvore.findMany({
            where: {
                AND: [
                    {numero_arvore: parseInt(q)},
                    {ut: { id: utId }}
                ]
            }
        })
        return data
    }

    async findById(id: string) : Promise<any> {
        const arvore = await prismaClient.arvore.findUnique({ 
            include: {
                observacao_arvore: true,
                especie: true
            },
            where: { id } 
        })

        return arvore
    }
}

export default new ArvoreService