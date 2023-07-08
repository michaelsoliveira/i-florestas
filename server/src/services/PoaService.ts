import { prismaClient } from "../database/prismaClient";
import { Prisma, Poa, prisma, CategoriaEspecie } from "@prisma/client";
import { getProjeto } from "./ProjetoService";

export interface PoaType {
    descricao: string;
    pmfs: string;
    corte_maximo: number;
    resp_elab: string;
    resp_exec: string;
    situacao: string;
    uts: any;
    categorias: any;
}

class PoaService {
    async create(data: PoaType, userId: string): Promise<Poa> {

        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })
        const projeto = await getProjeto(userId)
        
        const poaExists = await prismaClient.poa.findFirst({
            where: {
                AND: [
                        { descricao: data.descricao },
                        {    
                            projeto: {
                                id: projeto?.id
                            }
                        }
                ]
            }
        })
        
        if (poaExists) {
            throw new Error('Já existe uma Poa cadastrada com este nome')
        }

        const situacaoPoa = await prismaClient.situacaoPoa.findFirst({
            where: {
                nome: { contains: 'Novo' }
            }
        })
        
        const poa = await prismaClient.poa.create({
            data: {
                descricao: data.descricao,
                corte_maximo: data.corte_maximo,
                pmfs: data.pmfs,
                situacao_poa: {
                    connect: {
                        id: situacaoPoa?.id
                    }
                },
                resp_elab: {
                    connect: {
                        id: data?.resp_elab
                    } 
                },
                resp_exec: {
                    connect: {
                        id: data?.resp_exec
                    }
                },
                projeto: {
                    connect: {
                        id: projeto?.id
                    }
                },
                user: {
                    connect: {
                        id: user?.id
                    }
                }
            }
        })
        const naoDefinida = await prismaClient.categoriaEspecie.findFirst({
            where: {
                AND: [
                    { id_projeto: projeto?.id },
                    { nome: {
                        mode: Prisma.QueryMode.insensitive,
                        contains: 'Não definida'
                    } }
                ]
            }
        })
        //Criterios padrão
        const criterios = await prismaClient.categoriaEspecie.findMany({
            where: {
                id: {
                    in: [...data?.categorias, naoDefinida?.id]
                }
            }
        })

        const especies = await prismaClient.especie.findMany({
            where: {
                projeto: {
                    id: projeto?.id
                }
            }
        })

        //for (const especie of especies) {
        //    const categorias = await prismaClient.categoriaEspeciePoa.findMany({
//
//            })
//        }

        await prismaClient.categoriaEspecie.createMany({
            data: criterios.map((criterio: any) => {
                return {
                    nome: criterio?.nome,
                    criterio_fuste: criterio?.criterio_fuste,
                    criterio_dminc: criterio?.criterio_dminc,
                    criterio_dmaxc: criterio?.criterio_dmaxc,
                    criterio_n_min: criterio?.criterio_n_min,
                    criterio_perc_min: criterio?.criterio_perc_min,
                    preservar: criterio?.preservar,
                    criterio_altura: criterio?.criterio_altura,
                    criterio_volume: criterio?.criterio_volume,
                    id_projeto: projeto?.id,
                    id_poa: poa?.id
                }
            })
        })

        const newCriterios = await prismaClient.categoriaEspecie.findMany({
            where: {
                id_poa: poa?.id
            }
        })

        const criteriosIds = newCriterios.map((criterio: any) => { return `'${criterio.id}'` }).join(', ') as any
        console.log(criteriosIds)
        const preparedData = especies.map((especie: any) => {

            return {
                id_especie: especie.id
            }
        })

        const categoriaEspeciePoa = await prismaClient.$queryRaw`
            SELECT e.id, t1.id_categoria from
                (SELECT c.id as id_categoria, c.nome from categoria_especie c INNER JOIN poa p on p.id = c.id_poa
                    WHERE c.id = ${poa.id}) as t1
                INNER JOIN categoria_especie ce on t1.nome = ce.nome INNER JOIN categoria_especie_poa cep
                ON cep.id_categoria = ce.id INNER JOIN especie e ON e.id = cep.id_especie where ce.id in (${criteriosIds})
        `

        console.log(categoriaEspeciePoa)
        //await prismaClient.categoriaEspeciePoa.createMany({
        //    data: preparedData
        //})

        //await prismaClient.$queryRawUnsafe(`
        //        INSERT INTO categoria_especie_poa(id_especie, id_categoria)
        //        SELECT e.id, t1.id_categoria from
        //            (SELECT c.id as id_categoria, c.nome from categoria_especie c INNER JOIN poa p on p.id = $1
        //                WHERE c.id in ($2)) as t1
        //            INNER JOIN categoria_especie ce on t1.nome = ce.nome INNER JOIN categoria_especie_poa cep
        //            ON cep.id_categoria = ce.id INNER JOIN especie e ON e.id = cep.id_especie
        //    `, poa.id, Prisma.join(criteriosIds))

        data?.uts && await prismaClient.ut.updateMany({
            where: {
                id: {
                    in: data?.uts
                }
            },
            data: {
                id_poa: poa.id
            }
        })

        return poa
    }

    async update(id: string, data: any): Promise<Poa> {

            await prismaClient.ut.updateMany({
                where: {
                    id_poa: id
                },
                data: {
                    id_poa: null
                }
            })

            data?.uts && await prismaClient.ut.updateMany({
                where: {
                    id: {
                        in: data?.uts
                    }
                },
                data: {
                    id_poa: id
                }
            })

        const poa = await 
            prismaClient.poa.update({
                where: {
                    id
                },
                data: {
                    resp_exec: { connect: { id: data?.resp_exec } },
                    resp_elab: { connect: { id: data?.resp_elab } },
                    descricao: data.descricao,
                    corte_maximo: data.corte_maximo,
                    pmfs: data?.pmfs,
                }
            })

        return poa
    }

    async delete(id: string): Promise<void> {
        const poa = prismaClient.poa.findFirst({
            include: {
                ut: true
            },
            where: {
                id
            }
        }) as any

        await prismaClient.ut.updateMany({
            where: {
                id: {
                    in: poa.ut
                }
            },
            data: {
                id_poa: poa.id
            }
        })

        await prismaClient.poa.delete({
            where: {
                id
            }
        })
        .then(response => {
            console.log(response)
        })
    }

    async getAll(userId: string, query?: any): Promise<any> {
        const { perPage, page, search, orderBy, order, umf } = query
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

        const projeto = await getProjeto(userId)

        const where = {
                descricao: {
                    mode: Prisma.QueryMode.insensitive,
                    contains: search ? search : ''
                },
                AND: [
                {    
                    projeto: {
                        id: projeto?.id
                    }
                    
                }   
            ]
        }
        
        const [poas, total] = await prismaClient.$transaction([
            prismaClient.poa.findMany({
                include: {
                    situacao_poa: true,
                    ut: true
                },
                where,
                take: perPage ? parseInt(perPage) : 10,
                skip: skip ? skip : 0,
                orderBy: {
                    ...orderByTerm
                }
            }),
            prismaClient.poa.count({ where })
        ])

        return {
            data: poas,
            perPage,
            page,
            skip,
            count: total,
        }
    }

    async deletePoas(poas: string[]): Promise<any> {
        await prismaClient.poa.deleteMany({
            where: {
                id: { in: poas}
            }
        })
        
    }

    async search(userId: string, q: any) : Promise<Poa[]> {
        const projeto = await getProjeto(userId)
        const upas = await prismaClient.poa.findMany({
            where: {
                AND: [{
                        projeto: {
                            id: projeto?.id 
                    },
                    descricao: {
                        mode: Prisma.QueryMode.insensitive,
                        contains: q
                    }
                }]
            }
        })
        return upas
    }

    async findById(id: string) : Promise<any> {
        const poa = await prismaClient.poa.findUnique({ 
            where: { id },
            include: {
                resp_elab: {
                    include: {
                        pessoa: {
                            include: {
                                pessoaFisica: {
                                    select: {
                                        nome: true
                                    }
                                }
                            }
                        }
                    }
                },
                resp_exec: {
                    include: {
                        pessoa: {
                            include: {
                                pessoaFisica: {
                                    select: {
                                        nome: true
                                    }
                                }
                            }
                        }
                    }
                },
                situacao_poa: true,
                ut: true
            }
        })

        return poa
    }
}

export default new PoaService