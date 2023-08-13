
import { prismaClient } from "../database/prismaClient";
import { Pessoa, TipoPessoa, User } from "@prisma/client"

class DetentorService {
    async create(data: any): Promise<Pessoa> {     
        const nome = data?.tipo === 'F' ? data?.pessoaFisica?.nome : data?.pessoaJuridica?.nome_fantasia
        const { pessoaFisica, pessoaJuridica, endereco } = data

        const where = data?.tipo === 'F' ? {
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

        const detentorExists = await prismaClient.pessoa.findFirst({
            where
        })
        
        if (detentorExists) {
            throw new Error("Já existe uma empresa cadastrado com estas informações")
        }

        const basicData = {
            tipo: data?.tipo === 'F' ? TipoPessoa.F : TipoPessoa.J,
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
                    id_estado: endereco?.id_estado
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
        
        const detentor = await prismaClient.pessoa.create({
            data: {
                ...basicData,
                ...preparedData
            },
        })
        
        return detentor
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
                    id_estado: endereco?.id_estado
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

export default new DetentorService()