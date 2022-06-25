import { EquacaoVolume } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";

export interface EquacaoVolumeType {
    nome: string;
    expressao: string;
    observacao: string;
}

class EquacaoVolumeService {
    async create(data: EquacaoVolumeType, userId: string): Promise<EquacaoVolume> {
        
        const equacaoVolumeExists = await prismaClient.equacaoVolume.findFirst({
            where: {
                OR: 
                [
                    { nome: data.nome },
                    { expressao: data.expressao }
                ]
            }
        })

        if (equacaoVolumeExists) {
            throw new Error('Já existe uma Equação Volume cadastrada com este nome ou expressão')
        }

        const empresa = await prismaClient.empresa.findFirst({
            where: {
                empresa_users: {
                    some: {
                        users: {
                            id: userId
                        }
                    }
                }
            }
        })

        const eqVolume = await prismaClient.equacaoVolume.create({
            data: {
                nome: data.nome,
                expressao: data.expressao,
                observacao: data?.observacao,
                empresa: {
                    connect: {
                        id: empresa?.id
                    }
                }
            }
        })

        return eqVolume
    }

    async update(id: string, data: EquacaoVolumeType): Promise<EquacaoVolume> {
        await prismaClient.equacaoVolume.update({
            where: {
                id
            },
            data
        })

        return this.findById(id)
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

    async getAll(query?: any): Promise<any> {
        const { perPage, page, search, orderBy, order } = query
        const skip = (page - 1) * perPage
        let orderByTerm = {}
        const searchTermFilter = search
            // ? {OR: [{nome: {contains: search}}, {email: {contains: search}}]}
            ? {OR: [{nome: {contains: search}}, {expressao: {contains: search}}]}
            : {};
        
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
                where: {
                    // OR: [{nome: {mode: 'insensitive', contains: search}}, {uf: {mode: 'insensitive', contains: search}}]
                    ...searchTermFilter
                },
                take: perPage ? parseInt(perPage) : 50,
                skip: skip ? skip : 0,
                orderBy: {
                    ...orderByTerm
                },
            }),
            prismaClient.equacaoVolume.count()
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

    async search(text: any) {
        const eqVolumes = await prismaClient.equacaoVolume.findMany({
            where: {
                OR: [{nome: {mode: 'insensitive', contains: text}}, {expressao: {mode: 'insensitive', contains: text}}]
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