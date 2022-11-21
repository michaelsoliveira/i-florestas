
import { getRepository, ILike } from "typeorm";
import { prismaClient } from "../database/prismaClient";
import { Pessoa, TipoPessoa, User } from "@prisma/client"

interface DetentorType {
    razao_social: string,
    nome: string,
    cpf_cnpj: string,
    rg_inscricao: string;
    inscricao_federal: string;
    resp_tecnico: string,
    crea_resp: string,
    cep: string,
    logradouro: string,
    complemento: string,
    municipio: string,
    estado: string,
    telefone: string,
    reg_ambiental: string;
    id_projeto: string;
    tipo: TipoPessoa;
}

class EmpresaService {
    async create(data: DetentorType): Promise<Pessoa> {        

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
            throw new Error("Já existe um Detentor cadastrado com estas informações")
        }

        const dataBasic = { nome: data?.nome, tipo: data?.tipo }

        const preparedData = data?.tipo === 'F' ? {
            ...dataBasic,
            pessoaFisica: {
                create: {
                    rg: data?.rg_inscricao,
                    cpf: data?.cpf_cnpj
                }
            }
        } : {
            ...dataBasic,
            pessoaJuridica: {
                create: {
                    razao_social: data?.razao_social,
                    inscricao_estadual: data?.rg_inscricao,
                    inscricao_federal: data?.inscricao_federal,
                    cnpj: data?.cpf_cnpj
                }
            }
        }
        
        const detentor = await prismaClient.pessoa.create({
            data: {
                ...dataBasic,
                endereco: {
                    create: {
                        cep: data?.cep,
                        logradouro: data?.logradouro,
                        municipio: data?.municipio,
                        bairro: data?.complemento,
                        estado: data?.estado
                    }
                }
            }
        })
        
        return detentor
    }

    async update(id: string, data: any): Promise<any> {
        const dataBasic = { nome: data?.nome, tipo: data?.tipo }

        const preparedData = data?.tipo === 'F' ? {
            ...dataBasic,
            pessoaFisica: {
                update: {
                    rg: data?.rg_inscricao,
                    cpf: data?.cpf_cnpj
                }
            }
        } : {
            ...dataBasic,
            pessoaJuridica: {
                update: {
                    razao_social: data?.razao_social,
                    inscricao_estadual: data?.rg_inscricao,
                    inscricao_federal: data?.inscricao_federal,
                    cnpj: data?.cpf_cnpj
                }
            }
        }
        const empresa = await prismaClient.pessoa.update({
            data: {
                ...dataBasic,
                pessoaFisica: {
                    update: {
                        data: {
                            rg: data?.rg_inscricao,
                            cpf: data?.cpf_cnpj
                        },
                        where: {
                            id
                        }
                    }
                }
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
        const empresas = await prismaClient.pessoa.findMany({
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

        return empresas;
    }

    async findOne(id: string): Promise<Pessoa> {
        const detentor = await prismaClient.pessoa.findUnique({
            where: {
                id
            }
        })
        if (!detentor) throw new Error("Detentor não encontrada"); 

        return detentor
    }
}

export default new EmpresaService()