import { Umf } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";

export interface UmfType {
    nome: string;
    uf: string;
    ddd?: number;
}

class EstadoService {
    async create(data: UmfType): Promise<any> {
        
        const estadoExists = await prismaClient.estado.findFirst({
            where: {
                OR: 
                [
                    { nome: data.nome },
                    { uf: data.nome }
                ]
            }
        })

        if (estadoExists) {
            throw new Error('Já existe um Estado cadastrada com este nome ou UF')
        }

        const estado = await prismaClient.estado.create({
            data: {
                nome: data.nome,
                uf: data.uf,
                ddd: data.ddd,
                    
            }
        })

        return estado
    }

    async update(id: string, data: UmfType): Promise<Umf> {
        await prismaClient.estado.update({
            where: {
                id
            },
            data
        })

        return this.findById(id)
    }

    async delete(id: string): Promise<void> {
        await prismaClient.estado.delete({
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
            ? {OR: [{nome: {contains: search}}, {uf: {contains: search}}]}
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
        
        const [estados, total] = await prismaClient.$transaction([
            prismaClient.estado.findMany({
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
            prismaClient.estado.count()
        ])

        return {
            data: estados,
            perPage,
            page,
            skip,
            count: total,
        }
    }

    async deleteEstados(estados: string[]): Promise<any> {
          
        await prismaClient.umf.deleteMany({
            where: {
                id: { in: estados}
            }
        })
        
    }

    async search(text: any) {
        const estados = await prismaClient.estado.findMany({
            where: {
                OR: [{nome: {mode: 'insensitive', contains: text}}, {uf: {mode: 'insensitive', contains: text}}]
            },
            orderBy: {
                nome:   'asc'
            },
        })

        return estados
    }

    async findById(id: string) : Promise<any> {
        const umf = await prismaClient.umf.findUnique({ where: { id } })

        return umf
    }
}

export default new EstadoService