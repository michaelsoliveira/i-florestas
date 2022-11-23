
import { getRepository, ILike } from "typeorm";
import { prismaClient } from "../database/prismaClient";
import { Pessoa, TipoPessoa, User } from "@prisma/client"

interface EmpresaRequest {
    razao_social: string,
    nome: string,
    cpf_cnpj: string,
    rg_inscricao: string,
    inscricao_federal: string,
    resp_tecnico: string,
    crea_resp: string,
    cep: string,
    logradouro: string,
    complemento: string,
    municipio: string,
    estado: string,
    telefone: string,
    reg_ambiental: string;
    tipo: TipoPessoa;
    id_projeto: string;
}

class DetentorService {
    async create(data: EmpresaRequest): Promise<Pessoa> {        

        const empresaExists = await prismaClient.pessoa.findFirst({
            where: {
                AND: {
                    nome: data?.nome,
                    projeto: {
                        id: data?.id_projeto
                    }
                }
            }
        })
        
        if (empresaExists) {
            throw new Error("Já existe uma empresa cadastrado com estas informações")
        }

        const basicData = {
            nome: data?.nome,
            telefone: {
                create: {
                    numero: data?.telefone
                }                    
            },
            endereco: {
                create:{
                    logradouro: data?.logradouro,
                    municipio: data?.municipio,
                    bairro: data?.complemento,
                    estado: data?.estado,
                    cep: data?.cep
                }
            },
            projeto: {
                connect: {
                    id: data?.id_projeto
                }
            }
        }

        const preparedData = data?.tipo === 'F' ? {
            pessoaFisica: {
                create: {
                    rg: data?.rg_inscricao,
                    cpf: data?.cpf_cnpj
                }
            }
        } : {
            pessoaJuridica: {
                create: {
                    razao_social: data?.razao_social,
                    inscricao_estadual: data?.rg_inscricao,
                    cnpj: data?.cpf_cnpj,
                    inscricao_federal: data?.inscricao_federal
                }
            }
        }
        
        const empresa = await prismaClient.pessoa.create({
            data: {
                ...basicData,
                ...preparedData
            },
        })
        
        return empresa
    }

    async update(id: string, data: any): Promise<any> {
        const basicData = {
            nome: data?.nome,
            telefone: {
                update: {
                    numero: data?.telefone
                }                    
            },
            endereco: {
                update:{
                    logradouro: data?.logradouro,
                    municipio: data?.municipio,
                    bairro: data?.complemento,
                    estado: data?.estado,
                    cep: data?.cep
                }
            },
            projeto: {
                connect: {
                    id: data?.id_projeto
                }
            }
        }

        const preparedData = data?.tipo === 'F' ? {
            pessoaFisica: {
                update: {
                    rg: data?.rg_inscricao,
                    cpf: data?.cpf_cnpj
                }
            }
        } : {
            pessoaJuridica: {
                update: {
                    razao_social: data?.razao_social,
                    inscricao_estadual: data?.rg_inscricao,
                    cnpj: data?.cpf_cnpj,
                    inscricao_federal: data?.inscricao_federal
                }
            }
        }
        
        const empresa = await prismaClient.pessoa.update({
            data: {
                ...basicData,
                ...preparedData
            },
            where: {
                id
            }
        })
        return empresa
    }

    async delete(id: string): Promise<void> {
        await prismaClient.pessoa.delete({
            where: {
                id
            }
        })
    }

    async getAll(projetoId: any): Promise<any[]> {
        const data = await prismaClient.pessoa.findMany({
            include: {
                pessoaFisica: true,
                pessoaJuridica: true
            },
            where: {
                projeto: {
                    id: projetoId
                }
            }
        })

        return data;
    }

    async findOne(id: string): Promise<Pessoa> {
        const detentor = await prismaClient.pessoa.findFirst({
            include: {
                pessoaFisica: true,
                pessoaJuridica: true
            },
            where: {
                id_projeto: id
            }
        })
        if (!detentor) throw new Error("Detentor não encontrada"); 

        return detentor
    }
}

export default new DetentorService()