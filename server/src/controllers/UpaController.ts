// import { User } from "../entities/User"
import { Request, Response } from "express";
import upaService from "../services/upa.service";

export class UpaController {
    async store(request : Request, response: Response) : Promise<Response> {
        
        try {    
            const upa = await upaService.create(request.body, request.user?.id)
            return response.json({
                error: false,
                upa,
                message: `UPA ${upa.descricao} cadastrada com SUCESSO!!!`
            })

        } catch (error) {
            console.log(error.message)
            return response.json({
                error: true,
                upa: null,
                message: error.message
            })
        }
    }

     async update(request : Request, response: Response) : Promise<Response> {
        const { id } = request.params
        
         try {    
            const upa = await upaService.update(id, request.body)
            return response.json({
                error: false,
                upa,
                message: `UPA ${upa.descricao} atualizada com SUCESSO!!!`
            })

        } catch (error) {
            console.log(error.message)
            return response.json({
                error: true,
                upa: null,
                message: error.message
            })
        }
     }
    
    async delete(request: Request, response: Response): Promise<any> {
        const { id } = request.params

        try {
            await upaService.delete(id)

            return response.status(200).json({
                error: false,
                message: 'UPA deletada com Sucesso!!!'
            })
        } catch (error) {
            return response.json({
                error: true,
                upa: null,
                message: error.message
            })
        }
    }

    async findAll(request: Request, response: Response) {
        try {
            const { data, perPage, page, orderBy, order, skip, count } = await upaService.getAll(request.query)
            
            return response.json({
                error: false,
                upas: data,
                perPage,
                page,
                skip,
                orderBy,
                order,
                count,
                message: null
            })
        } catch(error) {
            return response.json({
                error: false,
                upas: [],
                message: error.message
            })
        }
    }

    async deleteUpas(request: Request, response: Response) {
        const { ids } = request.body
        
        await upaService.deleteUpas(ids)

        return response.json({
            ids,
            message: 'UPAs deletadas com sucesso',
            error: false
        })   
    }

    async search(request: Request, response: Response) : Promise<Response>{
        const { nome } = request.query
        
        const upas = nome ? await upaService.search(nome) : await upaService.getAll()

        return response.json(upas)
    }

    async findOne(request: Request, response: Response) : Promise<Response>{
        const { id } = request.params
        try {
            const upa = await upaService.findById(id)
            return response.json(upa)
        } catch(error) {
            return response.json(error.message)
        }
    }
}