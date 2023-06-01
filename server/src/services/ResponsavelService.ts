
import { prismaClient } from "../database/prismaClient";
import { Pessoa, ResponsavelExecucao, TipoPessoa } from "@prisma/client"

class ResponsavelService {
    async create(data: any): Promise<ResponsavelExecucao> {  
        
        const where = {
            AND: [
                {
                    resp_tecnico: {
                        pessoa: {
                            nome: data?.nome
                        }
                    }
                }
            ]
        }
        
        const respTecExists = await prismaClient.responsavelExecucao.findFirst({
            where
        })
           
        
        
        const { pessoaFisica, pessoaJuridica, endereco } = data

        
        if (respTecExists) {
            throw new Error("Já existe um Técnico cadastrado com estas informações")
        }

        const basicData = {
            resp_tecnico: {
                create: {
                    crea: data?.crea,
                    numero_art: data?.numero_art,
                    pessoa: {
                        create: {
                            nome: pessoaFisica?.nome,
                            rg: pessoaFisica?.rg,
                            cpf: pessoaFisica?.cpf,
                        },
                        
                    },
                    projeto: {
                        connect: {
                            id: data?.id_projeto
                        }
                    }
                }
            }
        }
        
        const responsavel = data?.tipo === 'exec' 
                ? await prismaClient.responsavelExecucao.create({
                    data: {  resp_tecnico: {
                        create: {
                            crea: data?.crea,
                            numero_art: data?.numero_art,
                            pessoa: {
                                create: {
                                    nome: pessoaFisica?.nome,
                                    rg: pessoaFisica?.rg,
                                    cpf: pessoaFisica?.cpf,
                                },
                            },
                            projeto: {
                                connect: {
                                    id: data?.id_projeto
                                }
                            }
                        }
                    } }
                }) 
                : await prismaClient.responsavelElaboracao.create({
                    data: { ...basicData }
                }) 
        
        return responsavel
    }

    async update(id: string, data: any): Promise<any> {
        const { pessoaFisica, pessoaJuridica, endereco } = data
        const basicData = {
            tipo: data?.tipo,
            // telefone: {
            //     update: {
            //         numero: data?.telefone
            //     }                    
            // },
            endereco: {
                update:{
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

        const preparedData = data?.tipo === 'F' ? {
            pessoaFisica: {
                upsert: {
                    update: {
                        nome: pessoaFisica?.nome,
                        rg: pessoaFisica?.rg,
                        cpf: pessoaFisica?.cpf
                    },
                    create: {
                        nome: pessoaFisica?.nome,
                        rg: pessoaFisica?.rg,
                        cpf: pessoaFisica?.cpf
                    }
                }
            }
        } : {
            pessoaJuridica: {
                upsert: {
                    update: {
                        nome_fantasia: pessoaJuridica?.nome_fantasia,
                        razao_social: pessoaJuridica?.razao_social,
                        cnpj: pessoaJuridica?.cnpj,
                        inscricao_estadual: pessoaJuridica?.inscricao_estadual,
                        inscricao_federal: pessoaJuridica?.inscricao_federal
                    },
                    create: {
                        nome_fantasia: pessoaJuridica?.nome_fantasia,
                        razao_social: pessoaJuridica?.razao_social,
                        cnpj: pessoaJuridica?.cnpj,
                        inscricao_estadual: pessoaJuridica?.inscricao_estadual,
                        inscricao_federal: pessoaJuridica?.inscricao_federal
                    }
                }
                
            }
        }
        
        const detentor = await prismaClient.pessoa.update({
            data: {
                ...basicData,
                ...preparedData
            },
            where: {
                id
            }
        })
        return detentor
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
                pessoaJuridica: true,
                endereco: {
                    include: {
                        estado: true
                    }
                },
                telefone: true
            },
            where: {
                id_projeto: id
            }
        })
        if (!detentor) throw new Error("Detentor não encontrada"); 

        return detentor
    }
}

export default new ResponsavelService()