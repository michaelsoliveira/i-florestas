import { Request, Response } from "express";
import responsavelService from "../services/ResponsavelService";

export class ResponsavelController {
    async store(request : Request, response: Response) : Promise<Response> {
        try {    
            const responsavel = await responsavelService.create(request.body)
            return response.json({
                error: false,
                responsavel,
                message: null
            })

        } catch (error) {
            return response.json({
                error: true,
                responsavel: null,
                message: error.message
            })
        }
    }

     async update(request : Request, response: Response) : Promise<Response> {
        const { id } = request.params
        
         try {    
             const responsavel = await responsavelService.update(id, request.body)
             
            return response.json({
                error: false,
                responsavel,
                message: null
            })

        } catch (error) {
            return response.json({
                error: true,
                responsavel: null,
                errorMessage: error.message
            })
        }
     }
    
    async delete(request: Request, response: Response): Promise<any> {
        const { id } = request.params

        try {
            await responsavelService.delete(id)

            return response.status(200).json({
                error: false,
                message: 'responsavel deletada com Sucesso!!!'
            })
        } catch (error) {
            return response.json({
                error: true,
                responsavel: null,
                errorMessage: error.message
            })
        }
    }

    async findAll(request: Request, response: Response) {
        const { projetoId } = request.params
        try {
            const responsaveis = await responsavelService.getAll(projetoId)

            return response.json({
                error: false,
                responsaveis,
                message: null
            })
        } catch(error) {
            return response.json({
                error: true,
                responsaveis: [],
                message: `Error: ${error.message}`
            })
        }
    }

    async findOne(request: Request, response: Response) {
        const { id } = request.params
        try {
            const responsavel = await responsavelService.findOne(id)

            return response.json(responsavel)
        } catch(error) {
            return response.json(error.message)
        }
    }
}