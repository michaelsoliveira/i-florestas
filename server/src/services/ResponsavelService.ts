
import { prismaClient } from "../database/prismaClient";
import { Pessoa, ResponsavelExecucao, TipoPessoa } from "@prisma/client"

class ResponsavelService {
    async create(data: any): Promise<ResponsavelExecucao> {  
        
        const nome = data?.tipoPessoa === 'F' ? data?.pessoaFisica?.nome : data?.pessoaJuridica?.nome_fantasia
        const { pessoaFisica, pessoaJuridica, endereco } = data

        const where = data?.tipoPessoa === 'F' ? {
            AND: {
                pessoaFisica: {
                    nome
                },
                projeto: {
                    id: data?.id_projeto
                }
            }
        } : {
            AND: {
                pessoaJuridica: {
                    nome_fantasia: nome
                },
                projeto: {
                    id: data?.id_projeto
                }
            }
        }

        const respTecExists = await prismaClient.responsavelTecnico.findFirst({
            where
        })
        
        if (respTecExists) {
            throw new Error("Já existe um Técnico cadastrado com estas informações")
        }

        const preparedData = data?.tipoPessoa === 'F' ? {
            pessoaFisica: {
                create: {
                    nome: pessoaFisica?.nome,
                    rg: pessoaFisica?.rg,
                    cpf: pessoaFisica?.cpf
                }
            }
        } : {
            pessoaJuridica: {
                create: {
                    nome_fantasia: pessoaJuridica?.nome_fantasia,
                    razao_social: pessoaJuridica?.razao_social,
                    cnpj: pessoaJuridica?.cnpj,
                    inscricao_estadual: pessoaJuridica?.inscricao_estadual,
                    inscricao_federal: pessoaJuridica?.inscricao_federal
                }
            }
        }

        const basicData = {
            crea: data?.crea,
            numero_art: data?.numero_art,
            pessoa: {
                create: {
                    ...preparedData,
                    tipo: data?.tipoPessoa === 'F' ? TipoPessoa.F : TipoPessoa.J,
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
                }
            },
            projeto: {
                connect: {
                    id: data?.id_projeto
                }
            }
        }

        const responsavel = data?.tipoTecnico === 'exec' 
                ? await prismaClient.responsavelExecucao.create({
                    data: {  resp_tecnico: {
                        create: { ...basicData }
                    } }
                }) 
                : await prismaClient.responsavelElaboracao.create({
                    data: {  resp_tecnico: {
                        create: { ...basicData }
                    } }
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