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
        const especieExists = await prismaClient.especie.findFirst({ 
            where: { 
                AND: {
                    nome: requestData.nome,
                    id_projeto: projetoId ? projetoId : id_projeto
                }
            } 
        })

        const user: User = await prismaClient.user.findFirst({
            where: {
                id: userId
            }
        }) as User
        
        if (especieExists) {
            throw new Error(`Já existe uma espécie cadastrada com o nome ${especieExists?.nome} neste projeto`)
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

    async importEspecies(data: any, userId: any) {
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
    
            const especies = await prismaClient.especie.findMany({
                where: {
                    id_projeto: user?.id_projeto_ativo
                }
            }) 
    
            const nomes = especies.map((especie: any) => especie.nome)
            const duplicates = data.map((d: any) => d.nome).filter((d: any) => nomes.includes(d))
            
            if (duplicates.length > 0) {
                return {
                    error: true,
                    type: 'duplicates',
                    duplicates
                }
            } else {
                for (const [index, especie] of Object.entries(data) as any) {
                    
                    if (index < data.length) {
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
                }
                return {
                    error: false,
                    message: 'Importação Realizada com Sucesso!'
                }
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
    
            const especies = await prismaClient.especie.findMany({
                where: {
                    id_projeto: user?.id_projeto_ativo
                }
            }) 
    
            const nomes = especies.map((especie: any) => especie.nome)
            const nomesNaoDefinidos = data.filter((especie: any) => especie.nome === '')
            const duplicates = data.map((d: any, idx: number) => { 
                const { nome, nome_orgao, nome_cientifico } = d
                return {  linha: idx, nome, nome_orgao, nome_cientifico } }).filter((d: any) => nomes.includes(d.nome)).map((duplicado: any) => {
                
                return {
                    linha: duplicado?.linha + 1,
                    nome: duplicado?.nome,
                    nome_orgao: duplicado?.nome_orgao,
                    nome_cientifico: duplicado?.nome_cientifico
                }
                
            })
            
            return {
                error: true,
                type: 'duplicates',
                duplicates,
                nomes_vazios: nomesNaoDefinidos
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
        const projeto = await getProjeto(userId) as any
        const { perPage, page, order, search, orderBy, poa } = query
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
                AND: {
                        nome: { mode: Prisma.QueryMode.insensitive, contains: search },
                        projeto: {
                            id: projeto?.id
                        },
                        categoria_especie: {
                            some: {
                                categoria: {
                                    id_poa: poa ? poa : null
                                }
                            }
                        }
                    }
                } : {
                    AND: 
                    [
                        {
                        projeto: {
                            id: projeto?.id
                        },
                        categoria_especie: {
                            some: {
                                categoria: {
                                    id_poa: poa ? poa : null
                                }
                            }
                        }
                    }]
            }

        const [data, total] = await prismaClient.$transaction([
            prismaClient.especie.findMany({
                include: {
                    categoria_especie: {
                        include: {
                            categoria: {
                                select: {
                                    id: true,
                                    nome: true
                                }
                            }
                        } 
                    }
                },
                where,
                take: perPage ? parseInt(perPage) : 50,
                skip: skip ? skip : 0,
                orderBy: {
                    ...orderByTerm
                }
            }),
            prismaClient.especie.count({where})
        ])
                
        return {
            orderBy,
            order,
            data,
            perPage,
            page,
            skip,
            count: total
        }
    }

    async findByCategoria(id: string) : Promise<any> {
        const especies = await prismaClient.$queryRaw<Especie|undefined>`
            SELECT e.*, ce.id as id_categoria, ce.nome as nome_categoria 
                FROM especie e
                INNER JOIN categoria_especie_poa cep on cep.id_especie = e.id
                INNER JOIN categoria_especie ce on ce.id = cep.id_categoria
            WHERE
                ce.id = ${id}
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
                e.id = ${id}
                ${
                    poaId ? Prisma.sql`AND ce.id_poa = ${poaId}` : Prisma.sql`AND ce.id_poa ISNULL`
                }
        `

        return especie
    }
}

export default new EspecieService