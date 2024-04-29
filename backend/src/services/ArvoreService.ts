import { prismaClient } from "../database/prismaClient";
import { Arvore, Prisma, User } from "@prisma/client";

const math = require('mathjs')

export interface ArvoreType {
    numero_arvore: number;
    id_projeto: string;
}

const NUM_WRITES = process.env.IMPORT_SIZE ?? 1500;

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

            const dap = data?.cap ? (parseFloat(data?.cap?.replace(",", ".")) / Math.PI) : parseFloat(data?.dap?.replace(",", "."))

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

            const arvore = await prismaClient.arvore.create({
                data: dataObs
            })

            return arvore
        } catch (e) {
            return e
        }
    }

    // Função para inserir um lote de dados usando Prisma
    async inserirLoteDeDados(dados: any, userId: string, upa: any) {
        try {
            const user: any = await prismaClient.user.findUnique({
                where: {
                    id: userId
                }
            })

            const eqVolume: any = await prismaClient.equacaoVolume.findFirst({
                where: {
                    upa: {
                        some: {
                            id: upa?.id
                        }
                    }
                }
            }) as any

            const especies = await prismaClient.especie.findMany({
                where: {
                    id_projeto: user.id_projeto_ativo
                }
            })

            const uts = await prismaClient.ut.findMany({
                where: {
                    id_upa: upa?.id
                }
            })

            const observacoes = await prismaClient.observacaoArvore.findMany({
                where: {
                    id_projeto: user?.id_projeto_ativo
                }
            })

            const getData: any = async () => {
                return await Promise.all(dados?.map(async (arv: any) => {
                    const dap = arv?.cap ? (Number(arv?.cap?.replace(",", ".")) / Math.PI) : Number(arv?.dap?.replace(",", "."))
                    const altura = Number(arv?.altura?.replace(",", "."))
                    let scope = {
                        dap,
                        altura
                    }

                    const nome_especie = arv?.especie ? arv?.especie : arv?.especie_nome_vulgar
                    const expressao = eqVolume?.expressao.toLowerCase().replaceAll("ln(", "log(")
                    const volume = math.evaluate(expressao, scope)

                    const areaBasal = math.evaluate('PI * (DAP ^ 2) / 40000', { DAP: dap })

                    const especie: any = nome_especie && especies.find((especie: any) => especie.nome.toLowerCase() === nome_especie.toLowerCase())

                    const ut: any = arv?.ut && uts.find((ut: any) => ut.numero_ut === parseInt(arv?.ut))

                    const observacao: any = arv?.obs && observacoes.find((obs: any) => obs.nome.toLowerCase === arv.obs)

                    const preparedData = upa?.tipo === 1 ? {
                        faixa: parseInt(arv?.faixa),
                        orient_x: arv?.orient_x,
                        long_x: arv?.coord_x ? Number(arv?.coord_x?.replace(",", ".")) : Number(arv?.x?.replace(",", ".")),
                        lat_y: arv?.coord_y ? Number(arv?.coord_y.replace(",", ".")) : Number(arv?.y?.replace(",", "."))
                    } : {
                        ponto_gps: arv?.ponto_gps && parseInt(arv?.ponto_gps),
                        lat_y: parseFloat(arv?.latitude?.replace(",", ".")),
                        long_x: parseFloat(arv?.longitude?.replace(",", ".")),
                    }

                    const data = arv?.numero_arvore !== '' && {
                        numero_arvore: parseInt(arv?.numero_arvore),
                        dap,
                        altura: parseFloat(arv?.altura),
                        fuste: arv?.qf && parseInt(arv?.qf),
                        volume,
                        area_basal: areaBasal,
                        ...preparedData,
                        id_ut: ut?.id,
                        id_especie: especie?.id
                    }

                    const withObs = arv?.obs ? { ...data, id_observacao: observacao?.id } : data
                    return withObs
                }))
            }
            getData().then(async (data: any) => {
                await prismaClient.arvore.createMany({
                    data
                })
            }).catch((error: any) => {
                throw error
            })


        } catch (error: any) {
            //console.error('Erro ao inserir lote de dados:', error);
            throw error;
        }
    }

    // Função para inserir todos os dados em paralelo usando Promise.all
    async inserirDadosEmParalelo(dados: any, userId: string, upa: any, size: any) {
        let lotes = [];
        for (let i = 0; i < dados.length; i += size) {
            lotes.push(dados.slice(i, i + size));
        }
        try {
            lotes?.map(async (lote: any) => await this.inserirLoteDeDados(lote, userId, upa))
        } catch (error: any) {
            console.log(error.message)
            throw error
        }
    }

    async createByImport(dt: any, userId: string, upa?: any): Promise<any> {
        try {
            const data = await this.inserirDadosEmParalelo(dt, userId, upa, NUM_WRITES).then((data: any) => {
                return {
                    ...data
                }
            })

            return {
                error: false,
                message: 'Importação Realizada com Sucesso!!!',
                ...data
            }
        } catch (error) {
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

        const dap = data?.cap ? (parseFloat(data?.cap?.replace(",", ".")) / Math.PI) : parseFloat(data?.dap?.replace(",", "."))

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

    async getAll(userId: string, query?: any): Promise<any> {
        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })
        const { perPage, page, searchBy, search, orderBy, order, utId, upaId } = query
        const skip = perPage && (page - 1) * perPage
        let orderByTerm = {}

        const orderByElement = orderBy ? orderBy.split('.') : {}

        if (orderByElement.length == 1) {
            orderByTerm = {
                [orderByElement]: order
            }
        } else {
            orderByTerm = orderByElement.reduce((ordered: any, curr: any) => {
                return {
                    [ordered]: {
                        [curr]: order
                    }
                }
            })
        }

        const withUt = utId === "0" || (typeof utId === undefined)
            ? {
                ut: {
                    id_upa: upaId
                },
            }
            : {
                ut: { id: utId }
            }

        const where = search ? searchBy === 'especie' ?
            {
                AND:
                {
                    especie: {
                        AND: [
                            {
                                id: search
                            },
                            { id_projeto: user?.id_projeto_ativo ? user?.id_projeto_ativo : null },
                            {
                                categoria_especie: {
                                    some: {
                                        categoria: {
                                            id_poa: user?.id_poa_ativo ? user?.id_poa_ativo : null
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    ...withUt
                }
            } :
            {
                AND:
                {
                    numero_arvore: parseInt(search),
                    ...withUt,
                    especie: {
                        AND: [
                            { id_projeto: user?.id_projeto_ativo ? user?.id_projeto_ativo : null },
                            {
                                categoria_especie: {
                                    some: {
                                        categoria: {
                                            id_poa: user?.id_poa_ativo ? user?.id_poa_ativo : null
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }
            }
            : {
                AND:
                {
                    ...withUt,
                    especie: {
                        AND: [
                            { id_projeto: user?.id_projeto_ativo ? user?.id_projeto_ativo : null },
                            {
                                categoria_especie: {
                                    some: {
                                        categoria: {
                                            id_poa: user?.id_poa_ativo ? user?.id_poa_ativo : null
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }
            }

        const [data, total] = await prismaClient.$transaction([
            prismaClient.arvore.findMany({
                include: {
                    especie: true,
                    situacao_arvore: true,
                    ut: true
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
            where: { id: { in: arvores } }
        })

    }

    async search(q: any, userId: string, utId?: string) {
        const data = await prismaClient.arvore.findMany({
            where: {
                AND: [
                    { numero_arvore: parseInt(q) },
                    { ut: { id: utId } }
                ]
            }
        })
        return data
    }

    async findById(id: string): Promise<any> {
        const arvore = await prismaClient.arvore.findUnique({
            include: {
                observacao_arvore: true,
                especie: true
            },
            where: { id }
        })

        return arvore
    }

    async getGeoJson(upaId?: string, ut?: any): Promise<any> {
        const query = ut && typeof ut !== typeof undefined
            ? `SELECT geo_json_arvore('by-ut', '${ut}')`
            : `SELECT geo_json_arvore('all', '${upaId}')`

        const result: any = await prismaClient.$queryRawUnsafe(query)

        return result[0]
    }
}

export default new ArvoreService