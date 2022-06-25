import { CategoriaEspecie } from "../entities/CategoriaEspecie";
import { getRepository, ILike } from "typeorm";

export interface CategoriaType {
    nome: string;
    criterioFuste?: number;
    criterioDminc?: number;
    criterioDmaxc?: number;
    criterioNMin?: number;
    criterioPercMin?: number;
    preservar?: boolean;
    criterioAltura?: number;
    criterioVolume?: number;
}

class CategoriaService {
    async create(data: CategoriaType): Promise<CategoriaEspecie> {
        const repositoryCategoria = getRepository(CategoriaEspecie)
        const categoriaExists = await repositoryCategoria.findOne({ where: { nome: data.nome } })

        if (categoriaExists) {
            throw new Error('Já existe uma categoria cadastrada com este nome')
        }

        const categoria = repositoryCategoria.create(data)
        await categoria.save()

        return categoria
    }

    async update(id: string, data: CategoriaType): Promise<CategoriaEspecie> {
        await getRepository(CategoriaEspecie).update(id, data)

        return this.findById(id)
    }

    async delete(id: string): Promise<void> {
        await getRepository(CategoriaEspecie).delete(id)
            .then(response => {
                console.log(response)
            })
    }

    async getAll(query?: any): Promise<any> {
        const { perPage, page, search } = query
        const skip = (page - 1) * perPage
        const [data, total] = await getRepository(CategoriaEspecie).findAndCount({
            where: {
                nome: search ? ILike(`%${search}%`) : ILike('%%')
            },
            order: { nome: 'ASC' },
            take: perPage,
            skip
        })
                        
        return {
            data,
            perPage,
            page,
            skip,
            count: total
        }
    }

    async deleteCategorias(categorias: string[]) {
        categorias.forEach(id => {
            getRepository(CategoriaEspecie).delete(id)
        })   
    }

    async search(q: any) {
        const query = await getRepository(CategoriaEspecie)
                .createQueryBuilder("CategoriaEspecie")
                .where("CategoriaEspecie.nome ILIKE :q", { q: `%${q}%` })
                .getMany()
        return query
    }

    async findById(id: string) : Promise<any> {
        const categoria = await getRepository(CategoriaEspecie).findOne({ where: { id } })

        return categoria
    }
}

export default new CategoriaService