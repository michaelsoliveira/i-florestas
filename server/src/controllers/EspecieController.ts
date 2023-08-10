// import { User } from "../entities/User"
import { Request, Response } from "express";
import especieService from "../services/EspecieService";
import { Readable } from 'stream'
import readline from "readline";
import { Especie, User } from '@prisma/client'
import { prismaClient } from "../database/prismaClient";

export class EspecieController {
    async store(request : Request, response: Response) : Promise<Response> {
        try {    
            const especie = await especieService.create({ data: request.body, userId: request.user?.id })

            return response.json({
                error: false,
                especie: especie,
                message: `Espécie ${especie?.nome} cadastrado com sucesso!`
            })
        } catch (error: any) {
            return response.json({
                error: true,
                especie: null,
                message: error.message
            })
        }
    }

     async update(request : Request, response: Response) : Promise<Response> {
        const { id } = request.params
         try {    
            const especie = await especieService.update(id, request.body)
            return response.json({
                error: false,
                especie,
                message: `Especie ${especie?.nome} atualizada com SUCESSO!!!`
            })

        } catch (error) {
            return response.json({
                error: true,
                especie: null,
                message: error.message
            })
        }
     }
    
    async delete(request: Request, response: Response): Promise<any> {
        const { id } = request.params

        try {
            await especieService.delete(id).then(data => {
                return response.status(200).json({
                    error: false,
                    message: 'A Espécie foi deletada com Sucesso!!!'
                })
            })

        } catch (error) {
            return response.json({
                error: true,
                especie: null,
                message: error.message
            })
        }
    }

    async deleteEspecies(request: Request, response: Response) {
        try {
            const { ids } = request.body
            await especieService.deleteEspecies(ids)

            return response.json({
                ids,
                message: 'Espécies deletadas com sucesso',
                error: false
            })
        } catch (error: any) {
            return response.json({
                error: true,
                message: error.message
            })
        }
        
    }

    async findAll(request: Request, response: Response) {
        try {
            const { data, perPage, orderBy, order, page, skip, count } = await especieService.getAll(request.query, request.user?.id)

            return response.json({
                error: false,
                especies: data,
                orderBy,
                order,
                perPage,
                page,
                skip,
                count,
                message: null
            })
        } catch(error) {
            return response.json({
                error: false,
                especies: [],
                message: null
            })
        }
    }

    async findByCategoria(request: Request, response: Response) {
        const { categoriaId }: any = request.query
        const user: any = await prismaClient.user.findUnique({
            where: {
                id: request.user?.id
            }
        })
        try {
            const especies = await especieService.findByCategoria(categoriaId, user)

            return response.json({
                error: false,
                especies
            })
        } catch(error) {
            return response.json({
                error: true,
                message: error.message
            })
        }
    }

    async setCategoriaEspecies(request: Request, response: Response) {
        try {
            const data = await especieService.setCategoriaEspecies(request.body)

            return response.json({
                error: false,
                data
            })
        } catch (error) {
            return response.json({
                error: true,
                message: error.message
            })
        }
    }

    async findOne(request: Request, response: Response) {
        const { id } = request.params
        const { poa } = request.query as any

        try {
            const especie = await especieService.findById(id, poa) as any

            return response.json(especie[0])
        } catch(error) {
            return response.json(error.message)
        }
    }

    async getErrors(request: Request, response: Response) {
        try {
            const { data } = request.body

            const errors = await especieService.getErrors(data, request.user?.id)

            return response.json({
                ...errors
            })
        } catch(error) {
            return response.json(error.message)
        }
    }

    async importEspecie(request: Request, response: Response) {
        try {
            const { data } = request.body

            const especies = data.map( (especie: any, index: number) => {
                const { nome, nome_vulgar, nome_vulgar_1, nome_vulgar_2, nome_orgao, ...rest } = especie;

                return { nome: nome_vulgar ? nome_vulgar : nome_vulgar_1 ? nome_vulgar_1 : nome, nome_orgao: nome_vulgar_2 ? nome_vulgar_2 : nome_orgao, ...rest }
               }
            )

            const importData = await especieService.importEspecies(especies, request.user?.id)

            return response.json({
                error: importData?.error,
                message: importData?.message
            })
            
        } catch (error) {

            return response.json({
                error: true,
                message: error.message
            })
        }
    }
}