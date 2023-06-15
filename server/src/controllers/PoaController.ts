// import { User } from "../entities/User"
import { Request, Response } from "express";
import poaService from "../services/PoaService";

export class PoaController {
    async store(request : Request, response: Response) : Promise<Response> {
        
        try {    
            const poa = await poaService.create(request.body, request.user?.id)
            return response.json({
                error: false,
                poa,
                message: `POA ${poa.descricao} cadastrada com SUCESSO!!!`
            })

        } catch (error) {
            console.log(error.message)
            return response.json({
                error: true,
                poa: null,
                message: error.message
            })
        }
    }

     async update(request : Request, response: Response) : Promise<Response> {
        const { id } = request.params
        
         try {    
            const poa = await poaService.update(id, request.body)
            return response.json({
                error: false,
                poa,
                message: `POA ${poa.descricao} atualizada com SUCESSO!!!`
            })

        } catch (error) {
            console.log(error.message)
            return response.json({
                error: true,
                poa: null,
                message: error.message
            })
        }
     }
    
    async delete(request: Request, response: Response): Promise<any> {
        const { id } = request.params

        try {
            await poaService.delete(id)

            return response.status(200).json({
                error: false,
                message: 'POA deletado com Sucesso!!!'
            })
        } catch (error) {
            return response.json({
                error: true,
                poa: null,
                message: error.message
            })
        }
    }

    async getRespTecElab(request: Request, response: Response) {
        try {

        } catch(e) {

        }
    }

    async findAll(request: Request, response: Response) {
        try {
            const { data, perPage, page, orderBy, order, skip, count } = await poaService.getAll(request.user?.id, request.query)
            
            return response.json({
                error: false,
                poas: data,
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
                poas: [],
                message: error.message
            })
        }
    }

    async deletePoas(request: Request, response: Response) {
        const { ids } = request.body
        
        await poaService.deletePoas(ids)

        return response.json({
            ids,
            message: 'POAs deletadas com sucesso',
            error: false
        })   
    }

    async search(request: Request, response: Response) : Promise<Response>{
        const { descricao } = request.query
        
        const poas = descricao ? await poaService.search(request.user?.id, descricao) : await poaService.getAll(request.user?.id)

        return response.json(poas)
    }

    async findOne(request: Request, response: Response) : Promise<Response>{
        const { id } = request.params
        try {
            const poa = await poaService.findById(id)
            return response.json(poa)
        } catch(error) {
            return response.json(error.message)
        }
    }
}