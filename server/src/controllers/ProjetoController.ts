import { Request, Response } from "express";
import equacaoVolumeService from "../services/equacaoVolume.service";
import projetoService from "../services/ProjetoService";

export class ProjetoController {
    async store(request : Request, response: Response) : Promise<Response> {

        try {    
            const projeto = await projetoService.create(request.body, request.user?.id)
            return response.json({
                error: false,
                projeto: projeto,
                message: `Projeto ${projeto.nome} cadastrada com SUCESSO!!!`
            })

        } catch (error) {
            return response.json({
                error: true,
                projeto: null,
                message: error.message
            })
        }
    }

     async update(request : Request, response: Response) : Promise<Response> {
        const { id } = request.params

         try {    
            const projeto = await projetoService.update(id, request.body, request.user?.id)
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
            const { data, perPage, page, orderBy, order, skip, count } = await projetoService.getAll(request.user?.id, request.query)
            
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
                error: true,
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

    async findEqVolumes(request: Request, response: Response) {
        try {
            const { projetoId } = request.params
            const { data, perPage, orderBy, order, page, skip, count } = await equacaoVolumeService.getAll(request.query, projetoId)

            return response.json({
                error: false,
                equacoes: data,
                orderBy,
                order,
                perPage,
                page,
                skip,
                count,
                message: 'Equações carregados com sucesso!'
            })
        } catch (error) {
            return response.json({
                error: true,
                equacoes: [],
                message: `Error: ${error.message}`
            })
        }
    }

    async findUsers(request: Request, response: Response) {
        try {
            const { projetoId } = request.params
            const { data, perPage, orderBy, order, page, skip, count } = await projetoService.getUsers(projetoId, request.query)

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

    async search(request: Request, response: Response) {
        const { nome } = request.query
        
        const projetos = nome ? await projetoService.search(nome) : await projetoService.getAll(request.user?.id, request.query)
        
        return response.json(projetos)
    }

    async getActive(request: Request, response: Response) {

        const projeto = await projetoService.getActive(request.user?.id)

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