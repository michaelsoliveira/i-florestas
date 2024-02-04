import { Request, Response } from "express";
import observacaoService from "../services/ObservacaoArvoreService";

export class ObservacaoArvoreController {
    async store(request : Request, response: Response) : Promise<Response> {
        try {    
            const observacao = await observacaoService.create(request.body, request.user?.id)
            return response.json({
                error: false,
                observacao,
                message: `Observação ${observacao.nome} cadastrada com SUCESSO!!!`
            })

        } catch (error: any) {
            return response.json({
                error: true,
                observacao: null,
                message: error.message
            })
        }
    }

     async update(request : Request, response: Response) : Promise<Response> {
        const { id } = request.params
         try {    
            const observacao = await observacaoService.update(id, request.body)
            return response.json({
                error: false,
                observacao,
                message: `Observação ${observacao.nome} atualizada com SUCESSO!!!`
            })

        } catch (error: any) {
            return response.json({
                error: true,
                observacao: null,
                message: error.message
            })
        }
     }
    
    async delete(request: Request, response: Response): Promise<any> {
        const { id } = request.params

        try {
            await observacaoService.delete(id)

            return response.status(200).json({
                error: false,
                message: 'Observação deletada com Sucesso!!!'
            })
        } catch (error: any) {
            return response.json({
                error: true,
                message: error.message
            })
        }
    }

    async findAll(request: Request, response: Response) {
        try {
            const { data, perPage, page, skip, count } = await observacaoService.getAll(request.user?.id, request.query)

            return response.json({
                error: false,
                observacoes: data,
                perPage,
                page,
                skip,
                count,
                message: null
            })
        } catch(error) {
            return response.json({
                error: false,
                observacoes: [],
                message: null
            })
        }
    }

    async search(request: Request, response: Response) {
        const { nome } = request.query
        
        const observacoes = nome ? await observacaoService.search(nome) : await observacaoService.getAll(request.user?.id, request.query)

        return response.json(observacoes)
    }

    async findOne(request: Request, response: Response) {
        const { id } = request.params
        try {
            const observacao = await observacaoService.findById(id)

            return response.json(observacao)
        } catch(error) {
            return response.json(error.message)
        }
    }
}