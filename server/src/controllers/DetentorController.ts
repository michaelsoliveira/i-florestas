import { Request, Response } from "express";
import detentorService from "../services/DetentorService";

export class DetentorController {
    async store(request : Request, response: Response) : Promise<Response> {
        try {    
            const detentor = await detentorService.create(request.body)
            return response.json({
                error: false,
                detentor,
                message: null
            })

        } catch (error) {
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

        } catch (error) {
            return response.json({
                error: true,
                empresa: null,
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
                message: 'Empresa deletada com Sucesso!!!'
            })
        } catch (error) {
            return response.json({
                error: true,
                empresa: null,
                errorMessage: error.message
            })
        }
    }

    async findAll(request: Request, response: Response) {
        const { projetoId } = request.params
        try {
            const empresas = await detentorService.getAll(projetoId)

            return response.json({
                error: false,
                empresas,
                message: null
            })
        } catch(error) {
            return response.json({
                error: true,
                empresas: [],
                message: `Error: ${error.message}`
            })
        }
    }

    async findOne(request: Request, response: Response) {
        const { id } = request.params
        try {
            const empresa = await detentorService.findOne(id)

            return response.json(empresa)
        } catch(error) {
            return response.json(error.message)
        }
    }
}