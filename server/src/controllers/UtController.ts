// import { User } from "../entities/User"
import { Request, Response } from "express";
import utService from "../services/ut.service";

export class UtController {
    async store(request : Request, response: Response) : Promise<Response> {
        
        try {    
            const ut = await utService.create(request.body, request.user?.id)
            return response.json({
                error: false,
                ut,
                message: `A Ut de número ${ut.numero_ut} cadastrada com SUCESSO!!!`
            })

        } catch (error) {
            console.log(error.message)
            return response.json({
                error: true,
                ut: null,
                message: error.message
            })
        }
    }

     async update(request : Request, response: Response) : Promise<Response> {
        const { id } = request.params
        
         try {    
            const ut = await utService.update(id, request.body)
            return response.json({
                error: false,
                ut,
                message: `A UT ${ut.numero_ut} atualizada com SUCESSO!!!`
            })

        } catch (error) {
            console.log(error.message)
            return response.json({
                error: true,
                ut: null,
                message: error.message
            })
        }
     }
    
    async delete(request: Request, response: Response): Promise<any> {
        const { id } = request.params

        try {
            await utService.delete(id)

            return response.status(200).json({
                error: false,
                message: 'UT deletada com Sucesso!!!'
            })
        } catch (error) {
            return response.json({
                error: true,
                ut: null,
                message: error.message
            })
        }
    }

    async findAll(request: Request, response: Response) {
        try {
            const { data, perPage, page, orderBy, order, skip, count } = await utService.getAll( request.user?.id, request.query)
            
            return response.json({
                error: false,
                uts: data,
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
                data: [],
                message: error.message
            })
        }
    }

    async deleteUts(request: Request, response: Response) {
        const { ids } = request.body
        
        await utService.deleteUts(ids)

        return response.json({
            ids,
            message: 'Uts deletadas com sucesso',
            error: false
        })   
    }

    async search(request: Request, response: Response) : Promise<Response>{
        const { numero_ut } = request.query
        
        const data = numero_ut ? await utService.search(numero_ut) : await utService.getAll()

        return response.json({
            error: false,
            data,
            message: ""
        })
    }

    async findOne(request: Request, response: Response) : Promise<Response>{
        const { id } = request.params
        try {
            const upa = await utService.findById(id)
            return response.json(upa)
        } catch(error) {
            return response.json(error.message)
        }
    }
}