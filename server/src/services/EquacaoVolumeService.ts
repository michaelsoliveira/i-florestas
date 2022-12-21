import { EquacaoModelo, EquacaoVolume, Prisma } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";

export interface EquacaoVolumeType {
    nome: string;
    expressao: string;
    observacao: string;
    id_projeto: string;
}

class EquacaoVolumeService {
    async create(data: EquacaoVolumeType, userId: string): Promise<EquacaoVolume> {
        console.log(data)
        const equacaoVolumeExists = await prismaClient.equacaoVolume.findFirst({
            where: {
                AND: {
                    OR: 
                    [
                        { nome: data.nome },
                        { expressao: data.expressao }
                    ],
                    projeto: {
                        id: data?.id_projeto
                    }
                }
            }
        })

        if (equacaoVolumeExists) {
            throw new Error('Já existe uma Equação Volume cadastrada com este nome ou expressão')
        }

        const eqVolume = await prismaClient.equacaoVolume.create({
            data: {
                nome: data.nome,
                expressao: data.expressao,
                observacao: data?.observacao,
                projeto: {
                    connect: {
                        id: data?.id_projeto
                    }
                }
            }
        })

        return eqVolume
    }

    async update(id: string, data: EquacaoVolumeType): Promise<EquacaoVolume> {
        const eqVolume = await prismaClient.equacaoVolume.update({
            where: {
                id
            },
            data: {
                nome: data?.nome,
                expressao: data?.expressao,
                observacao: data?.observacao
            }
        })

        return eqVolume
    }

    async delete(id: string): Promise<void> {
        await prismaClient.equacaoVolume.delete({
            where: {
                id
            }
        })
        .then(response => {
            console.log(response)
        })
    }

    async getEqModelos(): Promise<EquacaoModelo[]> {
        const eqModelos = await prismaClient.equacaoModelo.findMany()

        return eqModelos
    }

    async getAll(query?: any, projetoId?: string): Promise<any> {
        const { perPage, page, search, orderBy, order } = query
        const skip = (page - 1) * perPage
        let orderByTerm = {}
        const where = search
            ? {
                AND: {
                    OR: [
                        {nome: {mode: Prisma.QueryMode.insensitive, contains: search}}, 
                        {expressao: {mode: Prisma.QueryMode.insensitive, contains: search}}
                    ],
                    id_projeto: projetoId
                }
            }
            : {
                id_projeto: projetoId
            };
        
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
        
        const [eqVolumes, total] = await prismaClient.$transaction([
            prismaClient.equacaoVolume.findMany({
                where,
                take: perPage ? parseInt(perPage) : 50,
                skip: skip ? skip : 0,
                orderBy: {
                    ...orderByTerm
                },
            }),
            prismaClient.equacaoVolume.count({where})
        ])

        return {
            data: eqVolumes,
            perPage,
            page,
            skip,
            count: total,
        }
    }

    async deleteEqVolumes(eqVolumes: string[]): Promise<any> {
          
        await prismaClient.equacaoVolume.deleteMany({
            where: {
                id: { in: eqVolumes}
            }
        })
        
    }

    async search(text: any, projetoId?: string) {
        const eqVolumes = await prismaClient.equacaoVolume.findMany({
            where: {
                AND: {
                    OR: [
                        {nome: {mode: Prisma.QueryMode.insensitive, contains: text}}, 
                        {expressao: {mode: Prisma.QueryMode.insensitive, contains: text}}
                    ],
                    id_projeto: projetoId
                }
            },
            orderBy: {
                nome:   'asc'
            },
        })

        return eqVolumes
    }

    async findById(id: string) : Promise<any> {
        const eqVolume = await prismaClient.equacaoVolume.findUnique({ where: { id } })

        return eqVolume
    }
}

export default new EquacaoVolumeService