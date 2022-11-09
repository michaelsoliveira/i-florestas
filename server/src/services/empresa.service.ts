import { Empresa } from "../entities/Empresa";
import { getRepository, ILike } from "typeorm";
import { User } from "../entities/User";
import { prismaClient } from "../database/prismaClient";
import { Empresa as EmpresaPrisma } from "@prisma/client"

interface EmpresaRequest {
    razao_social: string,
    nome_fantasia: string,
    cnpj: string,
    resp_tecnico: string,
    crea_resp: string,
    cep: string,
    endereco: string,
    complemento: string,
    municipio: string,
    estado: string,
    telefone: string,
    reg_ambiental: string
}

class EmpresaService {
    async create(data: EmpresaRequest, userId: string): Promise<any> {        

        const empresaExists = await prismaClient.empresa.findFirst({
            where: {
                AND: {
                    razao_social: data?.razao_social,
                    projeto: {
                        some: {
                            projeto_users: {
                                some: {
                                    active: true
                                }
                            }
                        }
                    }
                }
            }
        })
        
        if (empresaExists) {
            throw new Error("Já existe uma empresa cadastrado com estas informações")
        }
        
        const empresa = await prismaClient.empresa.create({
            data: {
                ...data
            }
        })
        
        return empresa
    }

    async getUser(id: string): Promise<User> {
        const user = await getRepository(User).findOne(id)
        if (!user) throw new Error("Usuário não encontrada"); 

        return user
    }

    async update(id: string, data: any, userId: any): Promise<any> {
        
        const empresa = await prismaClient.empresa.update({
            data: {
                ...data
            },
            where: {
                id
            }
        })
        return empresa
    }

    async delete(id: string): Promise<void> {
        await prismaClient.empresa.delete({
            where: {
                id
            }
        })
    }

    async getAll(userId: any): Promise<any[]> {
        const empresas = await prismaClient.empresa.findMany({
            where: {
                projeto: {
                    some: {
                        projeto_users: {
                            some: {
                                id_user: userId
                            }
                        }
                    }
                }
            }
        })

        return empresas;
    }

    async getUsers(empresaId: string, query?: any): Promise<any> {
        const { perPage, page, order, search, orderBy } = query
        const skip = (page - 1) * perPage

        const [data, total] = await getRepository(User).createQueryBuilder('user')
            // .select(['user.id AS user_id', 'user.username', 'user.email'])
            .innerJoin('user.empresas', 'empresa')
            .skip(skip)
            .take(perPage)
            .where({
                username: search ? ILike(`%${search}%`) : ILike('%%')
            })
            .andWhere('empresa.id = :empresaId', { empresaId })
            .orderBy(orderBy, order ? order : 'ASC')
            .getManyAndCount()
                
        // const users = await query.getManyAndCount()

        // if(!users) throw new Error('Nenhum usuário cadastrado')

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

    async findOne(id: string): Promise<Empresa> {
        const empresa = await getRepository(Empresa).findOne({ where: { id } });
        if (!empresa) throw new Error("Empresa não encontrada"); 

        return empresa
    }
}

export default new EmpresaService()