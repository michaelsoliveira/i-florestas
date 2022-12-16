import { Request, Response } from "express";
import { getProjeto } from "../services/ProjetoService";
import { Readable } from "stream";
import readline from "readline";
import arvoreService from "../services/ArvoreService";

export class ArvoreController {
    async store(request : Request, response: Response) : Promise<Response> {
        const projeto = await getProjeto(request.user?.id)
        try {    
            const arvore = await arvoreService.create(request.body, projeto?.id)
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
        try {
            const { data, perPage, page, skip, count } = await arvoreService.getAll(request.user?.id, request.query)

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
        
        const arvores = numero_arvore ? await arvoreService.search(numero_arvore, request.user?.id) : await arvoreService.getAll(request.user?.id, request.query)

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

    async importInventario(request: Request, response: Response) {
        const arvores: any[] = []
        const projeto = await getProjeto(request.user?.id)
        const projetoId = projeto ? projeto?.id : ''

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
                })
            }

            console.log(arvores)

            // for (let arvore of arvores) {
            //     if (arvores.indexOf(arvore) > 0) await arvoreService.create(arvore, projetoId)
            // }

            return response.json({
                error: false,
                arvores: arvores.slice(1),
                message: 'Árvores importadas com sucesso!!!'
            })
            
        } catch (error) {
            return response.json(error.message)
        }
    }
}