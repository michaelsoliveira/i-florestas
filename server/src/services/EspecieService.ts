import { prismaClient } from "../database/prismaClient";
import { Prisma, Especie, User } from "@prisma/client";
import { getProjeto } from "./ProjetoService";

export interface EspecieType {
    nome: string;
    nome_orgao: string;
    nome_cientifico: string;
    id_categoria?: string;
}

class EspecieService {

    async create({ data: requestData, userId }: any, projetoId?: string): Promise<Especie> {
        const { nome, nome_cientifico, nome_orgao, id_projeto, id_categoria } = requestData
        const user: User = await prismaClient.user.findFirst({
            where: {
                id: userId
            }
        }) as User
        
        const especieNotExists= await prismaClient.$queryRaw<any|undefined>`
            SELECT e.nome, e.id as id_especie, ce.id as id_categoria
            FROM especie e 
                INNER JOIN categoria_especie_poa cep ON cep.id_especie = e.id
                INNER JOIN categoria_especie ce ON ce.id = cep.id_categoria
            WHERE ce.id_poa = ${user?.id_poa_ativo}::uuid
        `
        
        if (!especieNotExists) {
            throw new Error(`Já existe uma espécie cadastrada com o nome ${especieNotExists?.nome} neste projeto`)
        }

        const categoriaNaoDefinida = user?.id_poa_ativo ? await prismaClient.categoriaEspecie.findFirst({
            where: {
                AND: {
                    id_poa: user?.id_poa_ativo,
                    id_projeto: user?.id_projeto_ativo,
                    nome: {
                        mode: Prisma.QueryMode.insensitive,
                        contains: 'Não definida'
                    }
                }
            }
        }) : await prismaClient.categoriaEspecie.findFirst({
            where: {
                AND: {
                    id_projeto: user?.id_projeto_ativo,
                    id_poa: null,
                    nome: {
                        mode: Prisma.QueryMode.insensitive,
                        contains: 'Não definida'
                    }
                }
            }
        })

        if (!categoriaNaoDefinida) {
            throw new Error('Não foi possível localizar uma categoria padrão \n necessário para importação da Lista de Espécies')
        }

        const data = {
            nome,
            nome_orgao,
            nome_cientifico,
            id_projeto: projetoId ? projetoId : id_projeto
        }

        const especie = await prismaClient.especie.create({ data }) as any
        
        await prismaClient.categoriaEspeciePoa.create({
            data: {
                id_especie: especie?.id,
                id_categoria: id_categoria ? id_categoria : categoriaNaoDefinida?.id
            }
        })
        
        
        return especie
    }

    async importEspecies(data: any, userId: any) : Promise<any> {
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    id: userId
                }
            })
            const categoriaNaoDefinida: any = user?.id_poa_ativo ? await prismaClient.categoriaEspecie.findFirst({
                where: {
                    AND: {
                        id_poa: user?.id_poa_ativo,
                        id_projeto: user?.id_projeto_ativo,
                        nome: {
                            mode: Prisma.QueryMode.insensitive,
                            contains: 'Não definida'
                        }
                    }
                }
            }) : await prismaClient.categoriaEspecie.findFirst({
                where: {
                    AND: {
                        id_projeto: user?.id_projeto_ativo,
                        id_poa: null,
                        nome: {
                            mode: Prisma.QueryMode.insensitive,
                            contains: 'Não definida'
                        }
                    }
                }
            })

            for (const [index, especie] of Object.entries(data) as any) {                              
                await prismaClient.especie.create({
                    data: {
                        nome: especie?.nome,
                        nome_orgao: especie?.nome_orgao,
                        nome_cientifico: especie?.nome_cientifico,
                        id_projeto: user?.id_projeto_ativo,
                        categoria_especie: {
                            create: {
                                id_categoria: categoriaNaoDefinida?.id
                            }
                        }
                    }
                })                                                
            }
            return {
                error: false,
                message: 'Importação Realizada com Sucesso!'
            }
        } catch(error: any) {
            console.log(error.message)
            return {
                error: true,
                message: error.message
            }
        }
    }

    async getErrors(data: any, userId: any) {
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    id: userId
                }
            })
    
            const especies = await prismaClient.categoriaEspeciePoa.findMany({
                include: {
                    especie: true
                },
                where: {
                    AND: 
                    [
                        {
                            especie: {
                                projeto: {
                                    id: user?.id_projeto_ativo
                                }
                            } 
                        },
                        {
                            categoria: {
                                id_poa: user?.id_poa_ativo
                            }
                        }
                    ]
                }
            }) 
    
            const nomes = especies.map(({ especie }: any) => {
                return { ...especie }
            }).map((especie: any) => especie.nome)

            const nomesNaoDefinidos = data.map((d: any, idx: number) => { 
                const { nome, nome_vulgar, nome_vulgar_1, nome_vulgar_2, nome_orgao, ...rest } = d
                return {  
                    linha: idx + 1, 
                    nome: nome_vulgar ? nome_vulgar : nome_vulgar_1 ? nome_vulgar_1 : nome, 
                    nome_orgao: nome_vulgar_2 ? nome_vulgar_2 : nome_orgao, 
                    ...rest 
                } 
            }).filter((especie: any) => especie.nome === undefined || especie.nome_orgao === undefined || especie.nome_cientifico === undefined)

            const duplicates = data
                .map((d: any, idx: number) => { 
                    const { nome, nome_vulgar, nome_vulgar_1, nome_vulgar_2, nome_orgao, ...rest } = d
                    return {  
                        linha: idx, 
                        nome: nome_vulgar ? nome_vulgar : nome_vulgar_1 ? nome_vulgar_1 : nome, 
                        nome_orgao: nome_vulgar_2 ? nome_vulgar_2 : nome_orgao, 
                        ...rest 
                    } 
                })
                .filter((d: any) => nomes.includes(d.nome)).map((duplicado: any) => {
                    return {
                        linha: duplicado?.linha + 1,
                        nome: duplicado?.nome,
                        nome_orgao: duplicado?.nome_orgao,
                        nome_cientifico: duplicado?.nome_cientifico
                    }
                    
                })
                const nomes_vazios = nomesNaoDefinidos.map(({ ...rest }: any) => { return { ...rest } })
            
            return {
                error: duplicates.length > 0 || nomes_vazios.length > 0,
                duplicates,
                nomes_vazios
            }
             
        } catch(error: any) {
            console.log(error.message)
            return {
                error: true,
                message: error.message
            }
        }
    }

    async update(id: string, dataRequest: EspecieType): Promise<Especie | undefined> {
        const { nome, nome_cientifico, nome_orgao, id_categoria, poa } = dataRequest as any

        const data = {
                nome,
                nome_cientifico,
                nome_orgao
            }

        await prismaClient.especie.update({
            where: {
                id
            },
            data
        })

        await prismaClient.categoriaEspeciePoa.deleteMany({
            where: {
                AND: [
                    { id_especie: id },
                    { 
                        categoria: {
                            poa: {
                                id: poa
                            }
                        }
                     }
                ]
            }
        })

        await prismaClient.categoriaEspeciePoa.create({
            data: {
                id_especie: id,
                id_categoria: id_categoria
            }
        })

        return this.findById(id, poa)
    }

    async delete(id: string): Promise<void> {
        await prismaClient.especie.delete({
            where: {
                id
            }
        })
    }

    async deleteEspecies(ids: string[]) {
        
        ids.forEach(async (id: any) => {
            await prismaClient.especie.delete({
                where: { id }
            })
        })   
    }

    async getAll(query?: any, userId?: string): Promise<any> {
        const user: any = await prismaClient.user.findUnique({
            where: { id: userId }
        })

        const { perPage, page, order, search, orderBy, poa } = query
        const skip = (page - 1) * perPage
        let orderByTerm = {}

        const orderByElement = orderBy ? orderBy.split('.') : {}
        
        if (orderByElement.length == 2) {
            orderByTerm = {
                [orderByElement[0]]: {
                    [orderByElement[1]]: order
                }
            }
        } else {
            orderByTerm = {
                [orderByElement]: order
            }
        }

        const where = search ?
            {
                AND: [
                        
                        {
                            especie: {
                                nome: { mode: Prisma.QueryMode.insensitive, contains: search } ,
                                projeto: {
                                    id: user?.id_projeto_ativo
                                }
                            } 
                        },
                        {
                            categoria: {
                                id_poa: user?.id_poa_ativo
                            }
                        }
                    ]
                } : {
                    AND: 
                    [
                        {
                            especie: {
                                projeto: {
                                    id: user?.id_projeto_ativo
                                }
                            } 
                        },
                        {
                            categoria: {
                                id_poa: user?.id_poa_ativo
                            }
                        }
                    ]
            }

        const [data, total] = await prismaClient.$transaction([
            prismaClient.categoriaEspeciePoa.findMany({
                distinct: ['id_especie'],
                include: {
                    especie: true,
                    categoria: {
                        select: {
                            id: true,
                            nome: true
                        }
                    }
                },
                where,
                take: perPage ? parseInt(perPage) : 1000,
                skip: skip ? skip : 0,
                orderBy: { ...orderByTerm }
            }),
            prismaClient.categoriaEspeciePoa.count({where})
        ])

        const especies = data.map(({ especie, categoria }: any) => {
            return {
                ...especie,
                categoria: {
                    id: categoria.id,
                    nome: categoria.nome
                }
            }
        })
                
        return {
            orderBy,
            order,
            data: especies,
            perPage,
            page,
            skip,
            count: total
        }
    }

    async findByCategoria(id: string, user?: User) : Promise<any> {
        const especies = await prismaClient.$queryRaw<Especie|undefined>`
            SELECT DISTINCT e.*, cat.id as id_categoria, cat.nome as nome_categoria 
                FROM especie e
                INNER JOIN categoria_especie_poa cep on cep.id_especie = e.id
                INNER JOIN categoria_especie cat on cat.id = cep.id_categoria
            WHERE
                cep.id_categoria = ${id}::uuid
                and cat.id_poa = ${user?.id_poa_ativo}::uuid
                and e.id_projeto = ${user?.id_projeto_ativo}::uuid
                and cat.id_projeto = e.id_projeto
                and cep.id_especie = e.id
                and cep.id_categoria = cat.id
            ORDER BY e.nome
        `

        return especies
    }

    async setCategoriaEspecies(data: any) {

        const result = await prismaClient.categoriaEspeciePoa.updateMany({
            where: {
                AND: {
                    id_especie: {
                        in: data?.especies                       
                    },
                    id_categoria: data?.oldCategory
                }
            },
            data: {
                id_categoria: data?.newCategory                
            }
        })

        return result
    }

    async findById(id: string, poaId: string) : Promise<Especie | undefined> {
        const especie = await prismaClient.$queryRaw<Especie|undefined>`
            SELECT e.*, ce.id as id_categoria, ce.nome as nome_categoria 
                FROM especie e
                INNER JOIN categoria_especie_poa cep on cep.id_especie = e.id
                INNER JOIN categoria_especie ce on ce.id = cep.id_categoria
            WHERE
                e.id = ${id}::uuid
                ${
                    poaId ? Prisma.sql`AND ce.id_poa = ${poaId}::uuid` : Prisma.sql`AND ce.id_poa ISNULL`
                }
        `

        return especie
    }
}

export default new EspecieService