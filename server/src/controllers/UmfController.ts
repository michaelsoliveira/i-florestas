// import { User } from "../entities/User"
import { Request, Response } from "express";
import umfService from "../services/UmfService";

export class UmfController {
    async store(request : Request, response: Response) : Promise<Response> {
        try {    
            const umf = await umfService.create(request.body, request.user?.id)
            return response.json({
                error: false,
                umf,
                message: `UMF ${umf.nome} cadastrada com SUCESSO!!!`
            })

        } catch (error: any) {
            return response.json({
                error: true,
                umf: null,
                message: error.message
            })
        }
    }

     async update(request : Request, response: Response) : Promise<Response> {
        const { id } = request.params
         try {    
            const umf = await umfService.update(id, request.body)
            return response.json({
                error: false,
                umf,
                message: `UMF ${umf.nome} atualizada com SUCESSO!!!`
            })

        } catch (error: any) {
            return response.json({
                error: true,
                umf: null,
                message: error.message
            })
        }
     }
    
    async delete(request: Request, response: Response): Promise<any> {
        const { id } = request.params

        try {
            await umfService.delete(id)

            return response.status(200).json({
                error: false,
                message: 'UMF deletada com Sucesso!!!'
            })
        } catch (error: any) {
            return response.json({
                error: true,
                umf: null,
                message: error.message
            })
        }
    }

    async findAll(request: Request, response: Response) {

        try {
            const { data, perPage, page, orderBy, order, skip, count } = await umfService.getAll(request.user?.id, request.query)
            
            return response.json({
                error: false,
                umfs: data,
                perPage,
                page,
                skip,
                orderBy,
                order,
                count,
                message: null
            })
        } catch(error: any) {
            return response.json({
                error: false,
                umfs: [],
                message: error.message
            })
        }
    }

    async deleteUmfs(request: Request, response: Response) {
        const { ids } = request.body
        
        await umfService.deleteUmfs(ids)

        return response.json({
            ids,
            message: 'UMFs deletadas com sucesso',
            error: false
        })   
    }

    async search(request: Request, response: Response) {
        const { nome } = request.query
        
        const umfs = nome ? await umfService.search(request.user?.id, nome) : await umfService.getAll(request.user?.id)

        return response.json(umfs)
    }

    async getUmf(request: Request, response: Response) {
        const umf = await umfService.getUmf(request.user?.id)
        return response.json(umf)
    }

    async findOne(request: Request, response: Response) {
        const { id } = request.params
        try {
            const umf = await umfService.findById(id)

            return response.json(umf)
        } catch(error: any) {
            return response.json(error.message)
        }
    }
}