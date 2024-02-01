import { Request, Response } from "express";
import detentorService from "../services/DetentorService";

export class DetentorController {
    async store(request : Request, response: Response) : Promise<Response> {
        try {    
            const detentor = await detentorService.create(request.body)
            return response.json({
                error: false,
                detentor: { ...detentor },
                message: null
            })

        } catch (error: any) {
            return response.json({
                error: true,
                detentor: null,
                message: error.message
            })
        }
    }

     async update(request : Request, response: Response) : Promise<Response> {
        const { id } = request.params
        
         try {    
             const detentor = await detentorService.update(id, request.body)
             
            return response.json({
                error: false,
                detentor,
                message: null
            })

        } catch (error: any) {
            return response.json({
                error: true,
                detentor: null,
                errorMessage: error.message
            })
        }
     }
    
    async delete(request: Request, response: Response): Promise<any> {
        const { id } = request.params

        try {
            await detentorService.delete(id)

            return response.status(200).json({
                error: false,
                message: 'detentor deletada com Sucesso!!!'
            })
        } catch (error: any) {
            return response.json({
                error: true,
                detentor: null,
                errorMessage: error.message
            })
        }
    }

    async findAll(request: Request, response: Response) {
        const { projetoId } = request.params
        try {
            const detentores = await detentorService.getAll(projetoId)

            return response.json({
                error: false,
                detentores,
                message: null
            })
        } catch(error) {
            return response.json({
                error: true,
                detentores: [],
                message: `Error: ${error.message}`
            })
        }
    }

    async findOne(request: Request, response: Response) {
        const { id } = request.params
        try {
            const detentor = await detentorService.findOne(id)
            if (detentor) {
                return response.json({
                    type: 'update',
                    detentor
                })
            }
            return response.json({
                type: 'add'
            })
        } catch(error) {
            return response.json(error.message)
        }
    }
}