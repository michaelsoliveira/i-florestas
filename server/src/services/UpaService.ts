import { prismaClient } from "../database/prismaClient";
import { Prisma, Upa } from "@prisma/client";
import { getProjeto } from "./ProjetoService";

export interface UpaType {
    descricao: string;
    ano: string;
    umf: string;
    equacao_volume: string;
    tipo: string;
    spatial_ref_sys: number;
}

const math = require('mathjs')

class UpaService {
    async create(data: UpaType, userId: string): Promise<Upa> {

        const projeto = await getProjeto(userId)
        
        const upaExists = await prismaClient.upa.findFirst({
            where: {
                AND: [
                        {
                            descricao: data.descricao
                        },
                        {
                            umf: {
                            projeto: {
                                id: projeto?.id
                            }
                        }
                    }
                ]
            }
        })
        
        if (upaExists) {
            throw new Error('Já existe uma UPA cadastrada com este nome')
        }
        
        const upa = await prismaClient.upa.create({
            data: {
                descricao: data.descricao,
                ano: Number.parseInt(data.ano),
                tipo: Number.parseInt(data.tipo),
                umf: {
                    connect: {
                        id: data.umf
                    }
                },
                equacao_volume: {
                    connect: {
                        id: data.equacao_volume
                    }
                },
                spatial_ref_sys: {
                    connect: {
                        srid: data.spatial_ref_sys
                    }
                }
                    
            }
        })

        return upa
    }

    async update(id: string, data: UpaType): Promise<Upa> {
        const upa = await prismaClient.upa.update({
            where: {
                id
            },
            data: {
                descricao: data.descricao,
                ano: Number.parseInt(data.ano),
                tipo: Number.parseInt(data.tipo),
                umf: {
                    connect: {
                        id: data.umf
                    }
                },
                equacao_volume: {
                    connect: {
                        id: data.equacao_volume
                    }
                },
                spatial_ref_sys: {
                    connect: {
                        srid: data.spatial_ref_sys
                    }
                }
                    
            }
        })

        const uts: any = await prismaClient.ut.findMany({
            where: {
                id_upa: id
            }
        })

        const utsId: any = uts.map((ut: any) => ut.id)

        const eqVolume: any = await prismaClient.equacaoVolume.findFirst({
            where: {
                upa: {
                    some: {
                        id
                    }
                }
            }
        })

        const areaBasal = `PI() * (DAP ^ 2) / 40000`

        const sqlUpdate = `UPDATE arvore SET area_basal = ${areaBasal}, volume = ${eqVolume.expressao} 
        WHERE id_ut IN (${uts.map((ut: any) => `'${ut.id}'`).join(",")})`

        //const sqlEqVolume = `
        //UPDATE arvore SET volume = ${eqVolume.expressao} 
        //WHERE id_ut IN (${uts.map((ut: any) => `'${ut.id}'`).join(",")})`

        await prismaClient.$queryRaw(Prisma.raw(sqlUpdate))
        //await prismaClient.$queryRaw(Prisma.raw(sqlEqVolume))

        return this.findById(id)
    }

    async delete(id: string): Promise<void> {
        await prismaClient.upa.delete({
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
                    id_umf: umf
                },
                    {
                        umf: {
                        projeto: {
                            id: projeto?.id
                        }
                    }
                }   
            ]
        }
        
        const [upas, total] = await prismaClient.$transaction([
            prismaClient.upa.findMany({
                where,
                take: perPage ? parseInt(perPage) : 10,
                skip: skip ? skip : 0,
                orderBy: {
                    ...orderByTerm
                },
                include: {
                    equacao_volume: true,
                    spatial_ref_sys: true,
                    umf: true
                }
            }),
            prismaClient.upa.count({ where })
        ])

        return {
            data: upas,
            perPage,
            page,
            skip,
            count: total,
        }
    }

    async deleteUpas(upas: string[]): Promise<any> {
        await prismaClient.upa.deleteMany({
            where: {
                id: { in: upas}
            }
        })
        
    }

    async search(userId: string, q: any) : Promise<Upa[]> {
        const projeto = await getProjeto(userId)
        const upas = await prismaClient.upa.findMany({
            where: {
                AND: [{
                    umf: {
                        projeto: {
                            id: projeto?.id
                        }
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
        const upa = await prismaClient.upa.findUnique({ 
            where: { id },
            include: {
                spatial_ref_sys: true,
                equacao_volume: true,
                umf: true
            }
        })

        return upa
    }
}

export default new UpaService