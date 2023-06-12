
import { prismaClient } from "../database/prismaClient";
import { ResponsavelTecnico, TipoPessoa } from "@prisma/client"

class ResponsavelService {
    async create(data: any): Promise<ResponsavelTecnico> {  
        const nome = data?.pessoaFisica?.nome
        const { pessoaFisica, endereco } = data

        const where = {
            pessoa: {
                AND: {
                    pessoaFisica: {
                        nome
                    },
                    projeto: {
                        id: data?.id_projeto
                    }
                }
            }
        }

        const respTecExists = await prismaClient.responsavelTecnico.findFirst({
            where
        })
        
        if (respTecExists) {
            throw new Error("Já existe um Técnico cadastrado com estas informações")
        }

        const uf = endereco?.id_estado ? {
            connect: {
                id: endereco?.id_estado
            }
        } : undefined

        const basicData = {
            crea: data?.crea,
            numero_art: Number.parseInt(data?.numero_art),
            tipo: data?.tipo,
            pessoa: {
                create: {
                    pessoaFisica: {
                        create: {
                            nome: pessoaFisica?.nome,
                            rg: pessoaFisica?.rg,
                            cpf: pessoaFisica?.cpf
                        }
                    },
                    tipo: TipoPessoa.F,
                    endereco: {
                        create:{
                            cep: endereco?.cep,
                            logradouro: endereco?.logradouro,
                            bairro: endereco?.bairro,
                            municipio: endereco?.municipio,
                            estado: uf
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

        const responsavel = await prismaClient.responsavelTecnico.create({
                    data: {  ...basicData }
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

    async getAll(projetoId: any, tipo: any): Promise<any[]> {
        const data = await prismaClient.responsavelTecnico.findMany({
            include: {
                pessoa: {
                    include: {
                        pessoaFisica: true
                    }
                }
            },
            where: {
                AND: [
                    {
                        projeto: {
                            id: projetoId
                        }
                    },
                    { tipo }
                ]
            }
        })

        return data;
    }

    async findOne(id: string): Promise<ResponsavelTecnico> {
        const responsavel = await prismaClient.responsavelTecnico.findFirst({
            include: {
                pessoa: {
                    include: {
                        pessoaFisica: true,
                        pessoaJuridica: true,
                        endereco: {
                            include: {
                                estado: true
                            }
                        },
                        telefone: true
                    }
                }
            },
            where: {
                id
            }
        })
        if (!responsavel) throw new Error("Responsável Técnico não encontrada"); 

        return responsavel
    }
}

export default new ResponsavelService()