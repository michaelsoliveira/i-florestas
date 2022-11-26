
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
    async create(data: any): Promise<Pessoa> {        
        const nome = data?.tipo === 0 ? data?.pessoaFisica.nome : data?.pessoaJuridica.nome
        const { pessoaFisica, pessoaJuridica, endereco } = data
        const detentorExists = await prismaClient.pessoa.findFirst({
            where: {
                AND: {
                    nome,
                    projeto: {
                        id: data?.id_projeto
                    }
                }
            }
        })
        
        if (detentorExists) {
            throw new Error("Já existe uma empresa cadastrado com estas informações")
        }

        const basicData = {
            nome,
            tipo: data?.tipo === 0 ? TipoPessoa.F : TipoPessoa.J,
            // telefone: {
            //     create: {
            //         numero: data?.telefone
            //     }                    
            // },
            endereco: {
                create:{
                    cep: endereco?.cep,
                    logradouro: endereco?.logradouro,
                    bairro: endereco?.bairro,
                    municipio: endereco?.municipio,
                    estado: {
                        connect: {
                            id: endereco?.id_estado
                        }
                    }
                }
            },
            projeto: {
                connect: {
                    id: data?.id_projeto
                }
            }
        }

        const preparedData = data?.tipo === 0 ? {
            pessoaFisica: {
                create: {
                    rg: pessoaFisica?.rg,
                    cpf: pessoaFisica?.cpf
                }
            }
        } : {
            pessoaJuridica: {
                create: {
                    razao_social: pessoaJuridica?.razao_social,
                    cnpj: pessoaJuridica?.cnpj,
                    inscricao_estadual: pessoaJuridica?.inscricao_estadual,
                    inscricao_federal: pessoaJuridica?.inscricao_federal
                }
            }
        }
        
        const detentor = await prismaClient.pessoa.create({
            data: {
                ...basicData,
                ...preparedData
            },
        })
        
        return detentor
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