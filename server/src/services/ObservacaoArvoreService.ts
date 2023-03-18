// import { CategoriaEspecie } from "../entities/CategoriaEspecie";
import { prismaClient } from "../database/prismaClient";
import { Prisma, PrismaClient } from "@prisma/client";
import { ObservacaoArvore } from "@prisma/client";

export interface ObservacaoType {
    nome: string;
}

class ObservacaoArvoreService {
    async create(data: ObservacaoType): Promise<ObservacaoArvore> {
        const observacaoExists = await prismaClient.observacaoArvore.findFirst({ 
            where: { 
                AND: {
                    nome: data.nome,
                }
            } 
        })

        if (observacaoExists) {
            throw new Error('Já existe uma observação cadastrada com este nome')
        }

        const observacao = await prismaClient.observacaoArvore.create({
            data
        })

        return observacao
    }

    async update(id: string, data: ObservacaoType): Promise<ObservacaoArvore> {
        const observacao = await prismaClient.observacaoArvore.update({
            data,
            where: {
                id
            }
        })

        return observacao
    }

    async delete(id: string): Promise<void> {
        await prismaClient.observacaoArvore.delete({
            where: { id }
        })
            .then(response => {
                console.log(response)
            })
    }

    async getAll(userId: string, query?: any): Promise<any> {
        const { perPage, page, search, orderBy, order } = query
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
        const where = 
                {
                    nome: { mode: Prisma.QueryMode.insensitive, contains: search }
                }
           
        const [data, total] = await prismaClient.$transaction([
            prismaClient.observacaoArvore.findMany({
                where,
                orderBy: orderByTerm,
                take: perPage ? parseInt(perPage) : 50,
                skip: skip ? skip : 0,
            }),
            prismaClient.observacaoArvore.count({ where })
        ])

        return {
            data,
            perPage,
            page,
            skip,
            count: total
        }
    }

    async deleteCategorias(observacoes: string[]) {
        
        await prismaClient.observacaoArvore.deleteMany({
            where: { id: { in: observacoes} }
        })
         
    }

    async search(q: any, userId?: string) {
        const data = await prismaClient.observacaoArvore.findMany({
            where: {
                AND: {
                    nome: { mode: Prisma.QueryMode.insensitive, contains: q },
                }
            }
        })
        return data
    }

    async findById(id: string) : Promise<any> {
        const observacao = await prismaClient.observacaoArvore.findUnique({ where: { id } })

        return observacao
    }
}

export default new ObservacaoArvoreService