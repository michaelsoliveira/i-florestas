import { prismaClient } from "../database/prismaClient";
import { Arvore } from "@prisma/client";
import { getProjeto } from "./ProjetoService";
import { getPoa } from "./PoaService";

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
    
            const dap = data?.cap ? (parseFloat(data?.cap?.replace(",",".")) / Math.PI) : parseFloat(data?.dap?.replace(",","."))
    
            let scope = {
                dap,
                altura: parseFloat(data?.altura)
            }
    
            const volume = math.evaluate(eqVolume?.expressao.toLowerCase().replace("ln(", "log("), scope)
            const areaBasal = math.evaluate('PI * (DAP ^ 2) / 40000', { DAP: dap })
            console.log(volume, areaBasal)
            const preparedData = upa?.tipo === 1 ? {
                numero_arvore: parseInt(data?.numero_arvore),
                faixa: parseInt(data?.faixa),
                dap,
                altura: parseFloat(data?.altura),
                fuste: parseInt(data?.fuste),
                orient_x: data?.orient_x,
                lat_y: parseFloat(data?.lat_y),
                long_x: parseFloat(data?.long_x),
                volume,
                area_basal: areaBasal,
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
                area_basal: areaBasal,
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

            console.log(preparedData)

            const dataObs = data?.id_observacao ? 
            { 
                ...preparedData, 
                observacao_arvore: {
                    connect: {
                        id: data?.id_observacao
                    }
                } 
            } : preparedData
    
            const arvore = await prismaClient.arvore.create({
                data: dataObs
            })
    
            return arvore
        } catch(e) {
            return e
        }
        
    }

    async createByImport(dt: any, upa?: any): Promise<any> {
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
            
            const totalArvores = dt?.importedData.length

            dt?.importedData?.forEach(async (arv: any, idx: any) : Promise<any> =>  {
                if (idx < totalArvores - 1) {
                    const dap = arv?.cap ? (Number(arv?.cap?.replace(",","."))/ Math.PI) : Number(arv?.dap?.replace(",","."))

                    let scope = {
                        dap,
                        altura: parseFloat(arv?.altura)
                    }
            
                    const volume = math.evaluate(eqVolume?.expressao.toLowerCase().replace("ln(", "log("), scope)
                    const areaBasal = math.evaluate('PI * (DAP ^ 2) / 40000', { DAP: dap })

                    const especie = await prismaClient.especie.findFirst({
                        where: {
                            nome_orgao: arv?.especie ? arv?.especie : arv?.especie_nome_vulgar
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
                        lat_y: parseFloat(arv?.latitude?.replace(",", ".")),
                        long_x: parseFloat(arv?.longitude?.replace(",", ".")),
                    }

                    const data = {
                        numero_arvore: arv?.numero_arvore && parseInt(arv?.numero_arvore),
                        dap,
                        altura: parseFloat(arv?.altura),
                        fuste: arv?.qf && parseInt(arv?.qf),
                        volume,
                        area_basal: areaBasal,
                        ...preparedData,
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
                    await prismaClient.arvore.create({
                        data
                    })
                }
            })

            // await prismaClient.arvore.createMany({
            //     data
            // })

        } catch(error) {
            console.log(error?.message)
            return {
                error: true,
                message: error.message
            }
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

        const dap = data?.cap ? (parseFloat(data?.cap?.replace(",",".")) / Math.PI) : parseFloat(data?.dap?.replace(",","."))

        let scope = {
            dap,
            altura: parseFloat(data?.altura)
        }

        const volume = math.evaluate(eqVolume?.expressao.toLowerCase().replace("ln(", "log("), scope)
        const areaBasal = math.evaluate('PI * (DAP ^ 2) / 40000', { DAP: dap })

        const preparedData = upa?.tipo === 1 ? {
            numero_arvore: parseInt(data?.numero_arvore),
            faixa: parseInt(data?.faixa),
            dap,
            altura: parseFloat(data?.altura),
            fuste: parseInt(data?.fuste),
            orient_x: data?.orient_x,
            lat_y: parseFloat(data?.lat_y),
            long_x: parseFloat(data?.long_x),
            volume,
            area_basal: areaBasal,
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
            lat_y: parseFloat(data?.lat_y),
            long_x: parseFloat(data?.long_x),
            ponto_gps: parseInt(data?.ponto_gps),
            volume,
            area_basal: areaBasal,
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

        const dataObs = data?.id_observacao ? 
            { 
                ...preparedData, 
                observacao_arvore: {
                    connect: {
                        id: data?.id_observacao
                    }
                } 
            } : preparedData

        const arvore = await prismaClient.arvore.update({
            where: {
                id
            },
            data: dataObs
        })

        return arvore
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
        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })
        const { perPage, page, search, orderBy, order } = query
        const skip = perPage && (page - 1) * perPage
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

        const withUt = utId === "0" || (typeof utId === undefined) 
            ? {} 
            : {
            ut: { 
                AND: 
                    [
                        {id: utId},
                        {id_poa: user?.id_poa_ativo ? user?.id_poa_ativo : null}
                    ]
             }
        }

        const where = search ?
            {
                AND: 
                    { numero_arvore: parseInt(search) },
                    ...withUt,
                    especie: {
                        AND: [
                            { id_projeto: user?.id_projeto_ativo ? user?.id_projeto_ativo : null },
                            { categoria_especie: {
                                some: {
                                    categoria: {
                                        id_poa: user?.id_poa_ativo ? user?.id_poa_ativo : null
                                    }
                                }
                            } }
                        ]
                    }
            } : {
                AND: 
                    {
                        ...withUt,
                        especie: {
                            AND: [
                                { id_projeto: user?.id_projeto_ativo ? user?.id_projeto_ativo : null },
                                { categoria_especie: {
                                    some: {
                                        categoria: {
                                            id_poa: user?.id_poa_ativo ? user?.id_poa_ativo : null
                                        }
                                    }
                                } }
                            ]
                        }
                    }
            }

        const [data, total] = await prismaClient.$transaction([
            prismaClient.arvore.findMany({
                include: {
                    especie: true,
                    situacao_arvore: true
                },
                where,
                orderBy: orderByTerm,
                take: perPage && parseInt(perPage),
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