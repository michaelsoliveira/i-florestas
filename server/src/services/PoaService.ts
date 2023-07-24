import { prismaClient } from "../database/prismaClient";
import { Prisma, Poa, prisma, CategoriaEspecie, User } from "@prisma/client";
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

export const getPoa = async (userId?: string) => {
    const user: any = await prismaClient.user.findUnique({
        include: {
            poa_ativo: true
        },
        where: {
            id: userId
        }
    })
    
    return user?.poa_ativo
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

        await prismaClient.user.update({
            where: { 
                id: userId
            },
            data: {
                id_poa_ativo: poa?.id
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

        const categoriaEspeciePoa = await prismaClient.$queryRaw`
            SELECT DISTINCT t1.id_categoria, e.id as id_especie from
                (SELECT c.id as id_categoria, c.nome from categoria_especie c INNER JOIN poa p on p.id = c.id_poa
                    WHERE c.id_poa = ${poa.id}) as t1
                INNER JOIN categoria_especie ce on t1.nome = ce.nome 
                INNER JOIN categoria_especie_poa cep on cep.id_categoria = ce.id 
                INNER JOIN especie e on e.id = cep.id_especie
        ` as any

        await prismaClient.categoriaEspeciePoa.createMany({
            data: categoriaEspeciePoa
        })

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

    async ajustarInventario(arvores: any) {
        try {
            await prismaClient.arvore.updateMany({
                where: {
                    id: {
                        in: arvores
                    }
                },
                data: {
                    id_situacao: 5,
                    id_motivo_preservacao: 10
                }
            })

            return {
                error: false,
                message: 'Inventário Atualizado com Sucesso!'
            }
        } catch(e: any) {
            return {
                error: true,
                message: e.message
            }
        }
        
    }

    async getArvorePorEspecie(userId: string, query: any) {
        const { orderBy, order, ut, especie } = query
        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })
        
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

        const byEspecie = especie ? {
            id_especie: especie
        } : {}

        const where = {
            AND: [
                { id_ut: ut },
                { id_situacao: 2 },
                byEspecie
            ]
        }

        const [data, total] = await prismaClient.$transaction([
            prismaClient.arvore.findMany({
                select: {
                    id: true,
                    id_especie: true,
                    numero_arvore: true,
                    dap: true,
                    altura: true,
                    fuste: true,
                    area_basal: true,
                    volume: true,
                    especie: {
                        select: {
                            nome: true
                        }
                    },
                    observacao_arvore: {
                        select: {
                            nome: true
                        }
                    },
                    comentario: true
                },
                where: {
                    AND: [
                        { id_ut: ut },
                        { id_situacao: 2 },
                        byEspecie,
                        {
                            especie: {
                                categoria_especie: {
                                    some: {
                                        categoria: {
                                            id_poa: user?.id_poa_ativo
                                        }
                                    }
                                }
                            }
                        }
                    ]
                },
                orderBy: {
                    ...orderByTerm
                }
            }),
            prismaClient.arvore.count({where})
        ])
        

        return {
            data,
            count: total
        }
    }

    async getVolumePorEspecie(userId: string, ut: string) {
        const user: any = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })

        const data = await prismaClient.$queryRaw`
            SELECT
                e.id as id_especie,
                e.nome as especie, 
                t1.total_especie, 
                t2.volume_corte,
                trunc(CAST(t2.volume_corte/100 AS numeric), 4) as volume_corte_ha
            FROM
                especie e, poa p, categoria_especie_poa cep, categoria_especie cat, arvore a, ut u,
                (SELECT cat.id_poa, u.id as id_ut, e.id as id_especie, count(a.id_especie) as total_especie 
                FROM especie e
                INNER JOIN arvore a ON a.id_especie = e.id
                INNER JOIN ut u on u.id = a.id_ut
                INNER JOIN categoria_especie_poa cep on cep.id_especie = e.id
                INNER JOIN categoria_especie cat on cat.id = cep.id_categoria
                WHERE 
                a.id_especie = e.id
                AND a.id_ut = u.id
                AND a.id_situacao = 2
                GROUP BY e.id, u.id, cat.id_poa) as t1,
                (SELECT cat.id_poa, e.id as id_especie, u.id as id_ut, sum(a.volume) as volume_corte
                FROM especie e
                INNER JOIN arvore a ON a.id_especie = e.id
                INNER JOIN ut u on u.id = a.id_ut
                INNER JOIN categoria_especie_poa cep on cep.id_especie = e.id
                INNER JOIN categoria_especie cat on cat.id = cep.id_categoria
                WHERE 
                    a.id_especie = e.id
                    AND a.id_ut = u.id
                    AND a.id_situacao = 2
                    GROUP BY e.id, u.id, cat.id_poa) as t2
            WHERE 
                cep.id_especie = e.id
                AND a.id_especie = e.id
                AND u.id = a.id_ut
                AND cat.id = cep.id_categoria
                AND t1.id_especie = e.id
                AND t2.id_especie = e.id
                AND t1.id_poa = p.id
                AND t2.id_poa = p.id
                AND t1.id_ut = u.id
                AND t2.id_ut = u.id
                AND cat.id_poa = ${user?.id_poa_ativo}
                AND e.id_projeto = ${user?.id_projeto_ativo}
                AND u.id = ${ut}
            GROUP BY e.id, e.nome, t1.total_especie, t2.volume_corte
            ORDER BY e.nome
        `

        return data
    }

    async deletePoas(poas: string[]): Promise<any> {
        await prismaClient.poa.deleteMany({
            where: {
                id: { in: poas}
            }
        })
        
    }

    async changeActive(poaAtivo: string, userId: string): Promise<Poa | null> {
        const user = await prismaClient.user.update({
            include: {
                poa_ativo: true
            },
            data: {
                id_poa_ativo: poaAtivo ? poaAtivo : null
            },
            where: {
                id: userId
            }
        })

        return user.poa_ativo
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

    async getActive(id: string): Promise<any> {
        const user: any = await prismaClient.user.findUnique({
            include: {
                poa_ativo: true
            },
            where: { id }
        })

        return user?.poa_ativo
    }

    async utsByPoa(userId?: string, poa?: string) {
        const user: any = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })
        
        const uts = await prismaClient.$queryRaw`
            WITH dados AS (
                SELECT e.id_projeto, u.id as id_ut, up.ano, p.id as id_poa, u.numero_ut, t1.volume_explorar, 
                trunc(CAST((t1.volume_explorar / u.area_util) AS numeric),4) as volume_area_util,
                COALESCE(SUM(a.volume),0) as volume_total
                    FROM ut u, arvore a, poa p, upa up, especie e,
                        (SELECT u.id_poa, u.id as id_ut, COALESCE(SUM(a.volume),0) as volume_explorar
                            FROM ut u 
                                INNER JOIN arvore a on a.id_ut = u.id
                                INNER JOIN poa p on p.id = u.id_poa
                                INNER JOIN especie e on e.id = a.id_especie
                                INNER JOIN categoria_especie_poa cep on cep.id_especie = e.id
                                INNER JOIN categoria_especie cat on cat.id = cep.id_categoria
                            WHERE a.id_situacao = 2
                                AND cat.id_poa = p.id
                            GROUP BY u.id_poa, u.id
                        ) as t1
                    WHERE u.id = a.id_ut
                        AND p.id = u.id_poa
                        AND t1.id_poa = u.id_poa
                        AND t1.id_ut = u.id
                        AND up.id = u.id_upa
                        AND e.id = a.id_especie
                GROUP BY e.id_projeto, up.ano, p.id, u.id, t1.volume_explorar
            )
            SELECT id_ut, ano, numero_ut, volume_total, volume_explorar, volume_area_util FROM dados
            WHERE id_poa = ${user?.id_poa_ativo}
                AND dados.id_projeto = ${user?.id_projeto_ativo}
            ORDER BY numero_ut
        `

        return uts
    }
}

export default new PoaService