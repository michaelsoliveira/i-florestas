import { Request, Response } from "express";
import arvoreService from "../services/ArvoreService";
import { prismaClient } from "../database/prismaClient";
import path from "path";

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
                message: error?.message
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

    async importInventario(request: Request, response: Response) {
        const data = request.body
        const { data: importedData, columns } = data
        const { upaId }: any = request.query
        
        const upa = await prismaClient.upa.findUnique({
            where: {
                id: upaId
            }
        })
        console.log(columns)
        const checkData = Object.keys(data.columns)

        try {

            if (checkData.includes('faixa') && upa?.tipo === 0) {
                return response.json({
                    error: true,
                    message: 'Inventário diferente do tipo da UPA'
                })
            }

            await arvoreService.createByImport(importedData, upa)
            

            return response.json({
                error: false,
                message: 'Árvores importadas com sucesso!!!'
            })
        } catch (error) {
            return response.json(error.message)
        }

    }
}