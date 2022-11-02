// import { User } from "../entities/User"
import { Request, Response } from "express";
import projetoService from "../services/ProjetoService";

export class ProjetoController {
    async store(request : Request, response: Response) : Promise<Response> {
        try {    
            console.log(request.body)
            const projeto = await projetoService.create(request.body, request.user?.id)
            return response.json({
                error: false,
                equacaoVolume: projeto,
                message: `Projeto ${projeto.nome} cadastrada com SUCESSO!!!`
            })

        } catch (error) {
            return response.json({
                error: true,
                equacaoVolume: null,
                message: error.message
            })
        }
    }

     async update(request : Request, response: Response) : Promise<Response> {
        const { id } = request.params
        console.log(id, request.body)
         try {    
            const projeto = await projetoService.update(id, request.body)
            return response.json({
                error: false,
                projeto,
                message: `Projeto ${projeto.nome} atualizada com SUCESSO!!!`
            })

        } catch (error) {
            return response.json({
                error: true,
                projeto: null,
                message: error.message
            })
        }
     }
    
    async delete(request: Request, response: Response): Promise<any> {
        const { id } = request.params

        try {
            await projetoService.delete(id)

            return response.status(200).json({
                error: false,
                message: 'Projeto deletada com Sucesso!!!'
            })
        } catch (error) {
            return response.json({
                error: true,
                projeto: null,
                message: error.message
            })
        }
    }

    async findAll(request: Request, response: Response) {
        try {
            const { data, perPage, page, orderBy, order, skip, count } = await projetoService.getAll(request.query)
            
            return response.json({
                error: false,
                projetos: data,
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
                projetos: [],
                message: error.message
            })
        }
    }

    async deleteProjetos(request: Request, response: Response) {
        const { ids } = request.body
        
        await projetoService.deleteProjetos(ids)

        return response.json({
            ids,
            message: 'Projetos deletadas com sucesso',
            error: false
        })   
    }

    async search(request: Request, response: Response) {
        const { nome } = request.query
        
        const projetos = nome ? await projetoService.search(nome) : await projetoService.getAll(request.query)
        
        return response.json(projetos)
    }

    async getActive(request: Request, response: Response) {
        const projeto = await projetoService.getActive()

        return response.json(projeto)
    }

    async findOne(request: Request, response: Response) {
        const { id } = request.params
        try {
            const projeto = await projetoService.findById(id)

            return response.json(projeto)
        } catch(error) {
            return response.json(error.message)
        }
    }
}