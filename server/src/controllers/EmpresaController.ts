// import { User } from "../entities/User"
import { Request, Response } from "express";
import userService from "src/services/user.service";
import empresaService from "../services/empresa.service";

export class EmpresaController {
    async store(request : Request, response: Response) : Promise<Response> {
        try {    
            const empresa = await empresaService.create(request.body, request.user?.id)
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
             const empresa = await empresaService.update(id, request.body, request.user?.id)
             
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
        try {
            const empresas = await empresaService.getAll(request.user?.id)

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

    async findUsers(request: Request, response: Response) {
        try {
            const { empresaId } = request.params
            const { data, perPage, orderBy, order, page, skip, count } = await empresaService.getUsers(empresaId, request.query)

            return response.json({
                error: false,
                users: data,
                orderBy,
                order,
                perPage,
                page,
                skip,
                count,
                message: 'Usuários carregados com sucesso!'
            })
        } catch (error) {
            return response.json({
                error: true,
                users: [],
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