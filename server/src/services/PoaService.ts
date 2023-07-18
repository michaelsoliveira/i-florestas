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

    async utsByPoa(userId?: string) {
        const poa: any = await getPoa(userId)
        
        const uts = await prismaClient.$queryRaw`
            SELECT
                upa.ano,
                u.numero_ut,
                COALESCE(round(SUM(a.volume),0), 4) as volume_total,
                round(t1.volume_explorar, 4) as volume_explorar,
	            round(CAST((t1.volume_explorar/u.area_util) AS decimal),4) as volume_area_util
            FROM ut u, upa, arvore a, poa p, 
                (SELECT u.id, COALESCE(SUM(a.volume),0) as volume_explorar
                    FROM ut u
                    INNER JOIN arvore a ON a.id_ut =u.id
                        INNER JOIN poa p ON p.id = u.id_poa
                    WHERE a.id_situacao = 2
                    GROUP BY p.id, u.id
                ) AS t1,
                (SELECT u.id, (COALESCE(SUM(a.volume),0)/u.area_util) as volume_area_util
                FROM ut u
                INNER JOIN arvore a ON a.id_ut =u.id
                    INNER JOIN poa p on p.id = u.id_poa
                WHERE a.id_situacao = 2
                GROUP BY p.id, u.id, u.area_util
                ) AS t2
            WHERE p.id = ${poa?.id}
                AND a.id_ut = u.id
                AND t1.id = u.id
                AND t2.id = u.id
            GROUP BY p.id, u.id, upa.ano, t1.volume_explorar, t2.volume_area_util
            ORDER BY u.numero_ut
        `

        return uts
    }
}

export default new PoaService