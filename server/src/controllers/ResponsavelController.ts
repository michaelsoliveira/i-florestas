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

        } catch (error: any) {
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

        } catch (error: any) {
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
        } catch (error: any) {
            return response.json({
                error: true,
                responsavel: null,
                errorMessage: error.message
            })
        }
    }

    async findAll(request: Request, response: Response) {
        try {
            const { data } = await responsavelService.getAll(request.query, request.user?.id)

            return response.json({
                error: false,
                data,
                message: null
            })
        } catch(error: any) {
            return response.json({
                error: true,
                data: [],
                message: `Error: ${error.message}`
            })
        }
    }

    async findOne(request: Request, response: Response) {
        const { id } = request.params
        try {
            const responsavel = await responsavelService.findOne(id)

            return response.json(responsavel)
        } catch(error: any) {
            return response.json(error.message)
        }
    }
}