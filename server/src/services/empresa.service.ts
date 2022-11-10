
import { getRepository, ILike } from "typeorm";
import { prismaClient } from "../database/prismaClient";
import { Empresa, User } from "@prisma/client"

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
    reg_ambiental: string;
    id_projeto: string;
}

class EmpresaService {
    async create(data: EmpresaRequest): Promise<Empresa> {        

        const empresaExists = await prismaClient.empresa.findFirst({
            where: {
                AND: {
                    razao_social: data?.razao_social,
                    projeto: {
                        id: data?.id_projeto
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
            },
        })
        
        return empresa
    }

    async update(id: string, data: any): Promise<any> {
        
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

    async getAll(projetoId: any): Promise<any[]> {
        const empresas = await prismaClient.empresa.findMany({
            where: {
                projeto: {
                    id: projetoId
                }
            }
        })

        return empresas;
    }

    async findOne(id: string): Promise<Empresa> {
        const empresa = await prismaClient.empresa.findUnique({
            where: {
                id
            }
        })
        if (!empresa) throw new Error("Empresa não encontrada"); 

        return empresa
    }
}

export default new EmpresaService()