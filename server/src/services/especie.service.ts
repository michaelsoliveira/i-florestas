import { CategoriaEspecie } from "src/entities/CategoriaEspecie";
import { Especie } from "../entities/Especie";
import { getRepository, ILike } from "typeorm";
import { prismaClient } from "../database/prismaClient";

export interface EspecieType {
    nome: string;
    nomeOrgao: string;
    nomeCientifico: string;
    categoria?: CategoriaEspecie
}

class EspecieService {
    async create(data: any): Promise<any> {
        const especieExists = await prismaClient.especie.findFirst({ where: { nome: data.nome } })
        const { nome, nome_cientifico, nome_orgao } = data
        if (especieExists) {
            throw new Error('Já existe uma espécie cadastrada com este nome')
        }

        const especie = prismaClient.especie.create({
            data: {
                nome,
                nome_cientifico,
                nome_orgao
            }
        })

        return especie
    }

    async update(id: string, data: EspecieType): Promise<Especie> {
        await getRepository(Especie).update(id, data)

        return this.findById(id)
    }

    async delete(id: string): Promise<void> {
        await getRepository(Especie).delete(id)
            .then(response => {
                return response.affected
            })
    }

    async deleteEspecies(ids: string[]) {
        ids.forEach(id => {
            getRepository(Especie).delete(id)
        })   
    }

    async getAll(query?: any): Promise<any> {
        const { perPage, page, order, search, orderBy } = query
        const skip = (page - 1) * perPage

        const [data, total] = await getRepository(Especie).createQueryBuilder('especie')
            // .select(['especie.id', 'especie.nome', 'especie.nomeOrgao', 'especie.nomeCientifico', 'categoria.id as categoriaId', 'categoria.nome'])
            .leftJoinAndSelect('especie.categoria', 'categoria')
            .skip(skip)
            .take(perPage)
            .where({
                nome: search ? ILike(`%${search}%`) : ILike('%%')
            })
            .orderBy(orderBy, order ? order : 'ASC')
            .getManyAndCount()
                        
        return {
            orderBy,
            order,
            data,
            perPage,
            page,
            skip,
            count: total
        }
    }

    async getAllWithCategory(): Promise<Especie[]> {
        const query = getRepository(Especie).createQueryBuilder('especie')
        const especies = query.leftJoinAndSelect('especie.categoria', 'categoria').getMany()

        return especies
    }

    async findById(id: string) : Promise<any> {
        const especie = await getRepository(Especie).createQueryBuilder('especie')
            .leftJoinAndSelect('especie.categoria', 'categoria').where({ id }).getOne()

        return especie
    }
}

export default new EspecieService