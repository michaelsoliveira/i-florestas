import { Request, Response } from "express";
import empresaService from "../services/empresa.service";

export class EmpresaController {
    async store(request : Request, response: Response) : Promise<Response> {
        try {    
            const empresa = await empresaService.create(request.body)
            return response.json({
                error: false,
                empresa,
                message: null
            })

        } catch (error) {
            return response.json({
                error: true,
                empresa: null,
                message: error.message
            })
        }
    }

     async update(request : Request, response: Response) : Promise<Response> {
        const { id } = request.params
         try {    
             const empresa = await empresaService.update(id, request.body)
             
            return response.json({
                error: false,
                empresa,
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
            await empresaService.delete(id)

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
            const empresas = await empresaService.getAll(projetoId)

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
            const empresa = await empresaService.findOne(id)

            return response.json(empresa)
        } catch(error) {
            return response.json(error.message)
        }
    }
}