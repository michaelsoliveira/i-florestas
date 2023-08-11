// import { User } from "../entities/User"
import { Request, Response } from "express";
import utService from "../services/UtService";
import { Ut } from "@prisma/client";

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
            const { data, perPage, page, skip, count } = await utService.getAll(request.user?.id, request.query)
            
            return response.json({
                error: false,
                uts: data,
                perPage,
                page,
                skip,
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

    async getUtsByUpa(request: Request, response: Response) : Promise<Response<any, Record<string, any>> | undefined>{
        try {
            const { upaId }: any = request.query
            const uts = await utService.getUtsByUpa(upaId)

            return response.json({
                error: false,
                uts
            })
        } catch(error: any) {
            return response.json({
                error: true,
                message: error.message
            })
        }
    }

    async createAuto(request: Request, response: Response) : Promise<any> {
        try {
            const data = request.body
            const { upaId }: any = request.query

            const res = await utService.createAuto(data, upaId)

            return response.json({
                error: false,
                data: {...res}
            })
        } catch(e) {
            return response.json({
                error: true,
                message: e.message
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
        
        const uts = numero_ut ? await utService.search(request.user?.id, numero_ut) : await utService.getAll(request.user?.id)

        return response.json(uts)
    }

    async findOne(request: Request, response: Response) : Promise<Response>{
        const { id } = request.params
        try {
            const ut = await utService.findById(id)

            return response.json(ut)
        } catch(error) {
            return response.json(error.message)
        }
    }
}