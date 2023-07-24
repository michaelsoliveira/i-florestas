import { Request, Response } from "express";
import poaService from "../services/PoaService";
import UserService from "src/services/UserService";

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

    async getActive(request: Request, response: Response) {
        try {
            const poa = await poaService.getActive(request.user?.id)

            return response.json({
                error: false,
                poa
            })
        } catch (error: any) {
            return response.json({
                error: true,
                message: error.message
            })
        }
    }

    async getVolumePorEspecie(request: Request, response: Response) {
        try {
            const { ut }: any = request.query

            const data = await poaService.getVolumePorEspecie(request.user?.id, ut)

            return response.json({
                error: false,
                data
            })
        } catch (error: any) {
            return response.json({
                error: true,
                message: 'Error ao carregar as espécies!'
            })
        }
    }

    async getArvorePorEspecie(request: Request, response: Response) {
        try {

            const { data, count } = await poaService.getArvorePorEspecie(request.user?.id, request.query)
            
            return response.json({
                error: false,
                data,
                total: count
            })
        } catch (error: any) {
            return response.json({
                error: true,
                message: 'Error ao carregar as árvores!'
            })
        }
    }

    async handleAjusteInventario(request: Request, response: Response): Promise<Response> {
        const { arvores } = request.body
        
        const data = await poaService.ajustarInventario(arvores)
        return response.json(data)
    }

    async changeActive(request: Request, response: Response) : Promise<Response> {
        const { poaId }: any = request.body
        try {
            const poa = await poaService.changeActive(poaId, request.user?.id)
            return response.json({
                error: false,
                poa,
                message: 'Poa ativo definido com sucesso!'
            })
        } catch (error) {
            return response.json({
                error: true,
                poa: null,
                message: error.message
            })
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