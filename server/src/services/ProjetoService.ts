import { Projeto } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";

export interface ProjetoType {
    nome: string;
}

class ProjetoService {
    async create(data: ProjetoType, userId: string): Promise<Projeto> {
        
        const projetoExists = await prismaClient.projeto.findFirst({
            where: {
                nome: data.nome 
            }
        })

        if (projetoExists) {
            throw new Error('Já existe um Projeto cadastrada com este nome')
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

        const projeto = await prismaClient.projeto.create({
            data: {
                ...data,
                empresa: {
                    connect: {
                        id: empresa?.id
                    }
                }
            }
        })

        return projeto
    }

    async update(id: string, data: ProjetoType): Promise<Projeto> {
        await prismaClient.projeto.update({
            where: {
                id
            },
            data
        })

        return this.findById(id)
    }

    async delete(id: string): Promise<void> {
        await prismaClient.projeto.delete({
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
        
        const [projetos, total] = await prismaClient.$transaction([
            prismaClient.projeto.findMany({
                where: {
                    nome: { mode: 'insensitive', contains: search }
                },
                take: perPage ? parseInt(perPage) : 50,
                skip: skip ? skip : 0,
                orderBy: {
                    ...orderByTerm
                },
            }),
            prismaClient.projeto.count()
        ])

        return {
            data: projetos,
            perPage,
            page,
            skip,
            count: total,
        }
    }

    async deleteProjetos(projetos: string[]): Promise<void> {
          
        await prismaClient.projeto.deleteMany({
            where: {
                id: { in: projetos}
            }
        })
        
    }

    async search(text: any) {
        const projetos = await prismaClient.projeto.findMany({
            where: {
                nome: { mode: 'insensitive', contains: text }
            },
            orderBy: {
                nome:   'asc'
            },
        })

        return projetos
    }

    async findById(id: string) : Promise<any> {
        const projeto = await prismaClient.projeto.findUnique({ where: { id } })

        return projeto
    }

    async getActive(): Promise<Projeto | null> {
        const projeto = await prismaClient.projeto.findFirst({
            where: {
                active: true
            }
        })

        return projeto
    }
}

export default new ProjetoService