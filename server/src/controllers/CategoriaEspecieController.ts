import { Request, Response } from "express";
import categoriaService from "../services/CategoriaService";

export class CategoriaEspecieController {
    async store(request : Request, response: Response) : Promise<Response> {
        try {    
            const categoria = await categoriaService.create(request.body)
            return response.json({
                error: false,
                categoria,
                message: `Categoria de espécie ${categoria.nome} cadastrada com SUCESSO!!!`
            })

        } catch (error: any) {
            return response.json({
                error: true,
                especie: null,
                message: error.message
            })
        }
    }

     async update(request : Request, response: Response) : Promise<Response> {
        const { id } = request.params
         try {    
            const categoria = await categoriaService.update(id, request.body)
            return response.json({
                error: false,
                categoria,
                message: `Categoria de espécie ${categoria.nome} atualizada com SUCESSO!!!`
            })

        } catch (error: any) {
            return response.json({
                error: true,
                categoria: null,
                message: error.message
            })
        }
     }
    
    async delete(request: Request, response: Response): Promise<any> {
        const { id } = request.params

        try {
            await categoriaService.delete(id)

            return response.status(200).json({
                error: false,
                message: 'Especie deletada com Sucesso!!!'
            })
        } catch (error: any) {
            return response.json({
                error: true,
                especie: null,
                message: error.message
            })
        }
    }

    async findAll(request: Request, response: Response) {
        try {
            const { data, perPage, page, skip, count } = await categoriaService.getAll(request.user?.id, request.query)

            return response.json({
                error: false,
                categorias: data,
                perPage,
                page,
                skip,
                count,
                message: null
            })
        } catch(error) {
            return response.json({
                error: false,
                categorias: [],
                message: null
            })
        }
    }

    async search(request: Request, response: Response) {
        const categorias = await categoriaService.getAll(request.user?.id, request.query)

        return response.json(categorias)
    }

    async getByPoa(request: Request, response: Response) {
        const { poaId }: any = request.query

        try {
            const categorias = await categoriaService.getByPoa(poaId, request.user?.id)

            return response.json({
                error: false,
                categorias
            })
        } catch (error: any) {
            return response.json({
                error: true,
                categorias: [],
                message: error.message
            })
        }
    }

    async getCategoriaGrupo(request: Request, response: Response) {
        try {
            const categorias = await categoriaService.categoriaGrupo(request.user?.id)

            return response.json({
                error: false,
                categorias
            })
        } catch (error: any) {
            return response.json({
                error: true,
                message: error.message
            })
        }
    }

    async findOne(request: Request, response: Response) {
        const { id } = request.params
        try {
            const categoria = await categoriaService.findById(id)

            return response.json(categoria)
        } catch(error) {
            return response.json(error.message)
        }
    }
}