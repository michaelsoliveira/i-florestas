import { Request, Response } from "express";
import { getProjeto } from "../services/ProjetoService";
import { Readable } from "stream";
import readline from "readline";
import arvoreService from "../services/ArvoreService";
import { prismaClient } from "../database/prismaClient";

export class ArvoreController {
    async store(request : Request, response: Response) : Promise<Response> { 
        try {    
            const data = request.body
            const arvore = await arvoreService.create(data)
            return response.json({
                error: false,
                arvore,
                message: `Árvore cadastrada com SUCESSO!!!`
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
            const arvore = await arvoreService.update(id, request.body)
            return response.json({
                error: false,
                arvore,
                message: `Árvore atualizada com SUCESSO!!!`
            })

        } catch (error) {
            return response.json({
                error: true,
                arvore: null,
                message: error.message
            })
        }
     }
    
    async delete(request: Request, response: Response): Promise<any> {
        const { id } = request.params

        try {
            await arvoreService.delete(id)

            return response.status(200).json({
                error: false,
                message: 'Árvore deletada com Sucesso!!!'
            })
        } catch (error) {
            return response.json({
                error: true,
                especie: null,
                message: error.message
            })
        }
    }

    async deleteArvores(request: Request, response: Response) {
        const { ids } = request.body
        arvoreService.deleteArvores(ids)

        return response.json({
            ids,
            message: 'Árvores deletadas com sucesso',
            error: false
        })
    }

    async findAll(request: Request, response: Response) {
        const { utId } = request.params
        try {
            const { data, perPage, page, skip, count } = await arvoreService.getAll(request.user?.id, request.query, utId)
            return response.json({
                error: false,
                arvores: data,
                perPage,
                page,
                skip,
                count,
                message: null
            })
        } catch(error) {
            return response.json({
                error: false,
                arvores: [],
                message: null
            })
        }
    }

    async search(request: Request, response: Response) {
        const { numero_arvore } = request.query
        const { utId } = request.params
        const arvores = numero_arvore ? await arvoreService.search(numero_arvore, request.user?.id, utId) : await arvoreService.getAll(request.user?.id, request.query, utId)

        return response.json(arvores)
    }

    async findOne(request: Request, response: Response) {
        const { id } = request.params
        try {
            const arvore = await arvoreService.findById(id)

            return response.json(arvore)
        } catch(error) {
            return response.json(error.message)
        }
    }

    async loadCSV(request: Request, response: Response) {
        const arvores: any[] = []

        const { upaId }: any = request.query

        const upa = await prismaClient.upa.findUnique({
            where: {
                id: upaId
            }
        })

        try {
            if (request?.file === undefined) {
                return response.status(400).send("Please upload a CSV file!");
            }

            const readableFile = new Readable().setEncoding('utf8')
            readableFile.push(request.file?.buffer)
            readableFile.push(null)

            const arvoresLine = readline.createInterface({
                input: readableFile
            })

            if (upa?.tipo === 0) {
                for await (const line of arvoresLine) {
                    const arvoreLineSplit = line.split(";")
                    arvores.push({
                        ut: arvoreLineSplit[0],
                        numero_arvore: arvoreLineSplit[1],
                        especie: arvoreLineSplit[2],
                        dap: arvoreLineSplit[3],
                        altura: arvoreLineSplit[4],
                        fuste: arvoreLineSplit[5],
                        ponto: arvoreLineSplit[6],
                        latitude: arvoreLineSplit[7],
                        longitude: arvoreLineSplit[8],
                        obs: arvoreLineSplit[9],
                        comentario: arvoreLineSplit[10],
                    })
                }
            } else {
                for await (const line of arvoresLine) {
                    const arvoreLineSplit = line.split(";")
                    
                    arvores.push({
                        ut: arvoreLineSplit[0],
                        faixa: arvoreLineSplit[1],
                        numero_arvore: arvoreLineSplit[2],
                        especie: arvoreLineSplit[3],
                        dap: arvoreLineSplit[4],
                        altura: arvoreLineSplit[5],
                        fuste: arvoreLineSplit[6],
                        orient_x: arvoreLineSplit[7],
                        coord_x: arvoreLineSplit[8],
                        coord_y: arvoreLineSplit[9],
                        obs: arvoreLineSplit[10],
                        comentario: arvoreLineSplit[11],
                    })
                }
            }
            return response.json({
                error: false,
                arvores,
                message: 'Árvores carregadas com sucesso!!!'
            })
            
        } catch (error) {
            return response.json(error.message)
        }
    }

    async importInventario(request: Request, response: Response) {
        const data = request.body
        const { upaId }: any = request.query

        const upa = await prismaClient.upa.findUnique({
            where: {
                id: upaId
            }
        })

        const checkData = Object.keys(data[0])

        try {

            if (checkData.includes('faixa') && upa?.tipo === 0) {
                return response.json({
                    error: true,
                    message: 'Inventário diferente do tipo da UPA'
                })
            }
        
            for (let arvore of data) {
                await arvoreService.createByImport(arvore, upaId)
            }

            return response.json({
                error: false,
                message: 'Árvores importadas com sucesso!!!'
            })
        } catch (error) {
            return response.json(error.message)
        }

    }
}