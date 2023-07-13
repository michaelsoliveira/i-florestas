// import { User } from "../entities/User"
import { Request, Response } from "express";
import especieService from "../services/EspecieService";
import { Readable } from 'stream'
import readline from "readline";
import { Especie } from '@prisma/client'

export class EspecieController {
    async store(request : Request, response: Response) : Promise<Response> {
        try {    
            const especie = await especieService.create({ data: request.body, userId: request.user?.id })
            return response.json({
                error: false,
                especie,
                message: `Espécie ${especie.nome} cadastrada com SUCESSO!!!`
            })

        } catch (error) {
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
        const { ids } = request.body
        especieService.deleteEspecies(ids)

        return response.json({
            ids,
            message: 'Espécies deletadas com sucesso',
            error: false
        })
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

        try {
            const especies = await especieService.findByCategoria(categoriaId)

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

    async importEspecie(request: Request, response: Response) {
        const { projetoId } = request.query as any

        try {
            /*
            if (request?.file === undefined) {
                return response.status(400).send("Please upload a CSV file!");
            }

            const readableFile = new Readable().setEncoding('utf8')
            readableFile.push(request.file?.buffer)
            readableFile.push(null)

            const especiesLine = readline.createInterface({
                input: readableFile
            })

            for await (const line of especiesLine) {
                const especieLineSplit = line.split(";")
                
                especies.push({
                    nome: especieLineSplit[0],
                    nome_orgao: especieLineSplit[1],
                    nome_cientifico: especieLineSplit[2]
                })
            }

            for await (let especie of especies) {
                if (especies.indexOf(especie) > 0) await especieService.create({ data: especie, userId: request.user?.id }, projetoId)
            }
            */
           const { data } = request.body

            const especies = data.map((especie: any) => {
                return {
                    nome: especie.nome_vulgar_1,
                    nome_orgao: especie.nome_vulgar_2,
                    nome_cientifico: especie['nome_científico'] ? especie['nome_científico'] : especie.nome_cientifico
                }
            })

            for await (let especie of especies) {
                if (especies.indexOf(especie) > 0) await especieService.create({ data: especie, userId: request.user?.id }, projetoId)
            }

            return response.json({
                error: false,
                especies,
                message: 'Espécies importadas com sucesso!!!'
            })
            
        } catch (error) {
            return response.json(error.message)
        }
    }
}