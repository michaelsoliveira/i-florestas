// import { User } from "../entities/User"
import { Request, Response } from "express";
import categoriaService from "../services/categoria.service";

export class CategoriaEspecieController {
    async store(request : Request, response: Response) : Promise<Response> {
        try {    
            const categoria = await categoriaService.create(request.body)
            return response.json({
                error: false,
                categoria,
                message: `Categoria de espécie ${categoria.nome} cadastrada com SUCESSO!!!`
            })

        } catch (error) {
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

        } catch (error) {
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
        } catch (error) {
            return response.json({
                error: true,
                especie: null,
                message: error.message
            })
        }
    }

    async findAll(request: Request, response: Response) {
        try {
            const { data, perPage, page, skip, count } = await categoriaService.getAll(request.query)

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
        const { nome } = request.query
        
        const categorias = nome ? await categoriaService.search(nome) : await categoriaService.getAll()

        return response.json(categorias)
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