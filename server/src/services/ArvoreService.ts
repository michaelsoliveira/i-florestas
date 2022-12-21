import { prismaClient } from "../database/prismaClient";
import { Arvore } from "@prisma/client";
import { getProjeto } from "./ProjetoService";

export interface ArvoreType {
    numero_arvore: number;
    id_projeto: string;
}

class ArvoreService {
    async create(data: any): Promise<Arvore> {
        try {
            const ut = await prismaClient.ut.findUnique({
                where: {
                    id: data?.ut
                }
            }) as any

            const upa = await prismaClient.upa.findUnique({
                where: {
                    id: data?.upa
                }
            })

            const arvoreExists = await prismaClient.arvore.findFirst({ 
                where: { 
                    AND: {
                        numero_arvore: parseInt(data.numero_arvore),
                        ut: {
                            id: data?.ut
                        }
                    }
                } 
            })
    
            if (arvoreExists) {
                throw new Error('Já existe uma árvore cadastrada com este número')
            }
    
            const especie = await prismaClient.especie.findUnique({
                where: {
                    id: data?.especie
                }
            })
    
            const preparedData = upa?.tipo === 1 ? {
                numero_arvore: parseInt(data?.numero_arvore),
                faixa: parseInt(data?.faixa),
                dap: data?.cap ? parseFloat(data?.cap) / Math.PI : parseFloat(data?.dap),
                altura: parseFloat(data?.altura),
                fuste: parseInt(data?.fuste),
                orient_x: data?.orient_x,
                lat_x: parseFloat(data?.lat_x),
                long_y: parseFloat(data?.long_y),
                ut: {
                    connect: {
                        id: ut?.id
                    }
                },
                especie: {
                    connect: {
                        id: especie?.id
                    }
                }
            } : {
                numero_arvore: parseInt(data?.numero_arvore),
                dap: data?.cap ? parseFloat(data?.cap) / Math.PI : parseFloat(data?.dap),
                altura: parseFloat(data?.altura),
                fuste: parseInt(data?.fuste),
                ut: {
                    connect: {
                        id: ut?.id
                    }
                },
            }
    
            const arvore = await prismaClient.arvore.create({
                data: preparedData
            })
    
            return arvore
        } catch(e) {
            return e
        }
        
    }

    async createByImport(data: any): Promise<Arvore> {
        try {
            const ut = await prismaClient.ut.findFirst({
                where: {
                    numero_ut: parseInt(data?.ut)
                }
            }) as any

            const upa = await prismaClient.upa.findUnique({
                where: {
                    id: ut?.id_upa
                }
            })

            const especie = await prismaClient.especie.findFirst({
                where: {
                    nome_orgao: data?.especie
                }
            })

            const arvoreExists = await prismaClient.arvore.findFirst({ 
                where: { 
                    AND: {
                        numero_arvore: parseInt(data.numero_arvore),
                        ut: {
                            id: ut?.id
                        }
                    }
                } 
            })
    
            if (arvoreExists) {
                throw new Error('Já existe uma árvore cadastrada com este número')
            }
    
            const preparedData = upa?.tipo === 1 ? {
                numero_arvore: parseInt(data?.numero_arvore),
                faixa: parseInt(data?.faixa),
                dap: data?.cap ? parseFloat(data?.cap) / Math.PI : parseFloat(data?.dap),
                altura: parseFloat(data?.altura),
                fuste: parseInt(data?.fuste),
                orient_x: data?.orient_x,
                lat_x: parseFloat(data?.lat_x),
                long_y: parseFloat(data?.long_y),
                ut: {
                    connect: {
                        id: ut?.id
                    }
                },
                especie: {
                    connect: {
                        id: especie?.id
                    }
                }
            } : {
                numero_arvore: parseInt(data?.numero_arvore),
                dap: data?.cap ? parseFloat(data?.cap) / Math.PI : parseFloat(data?.dap),
                altura: parseFloat(data?.altura),
                fuste: parseInt(data?.fuste),
                latitude: parseFloat(data?.latitude),
                longitude: parseFloat(data?.longitude),
                ut: {
                    connect: {
                        id: ut?.id
                    }
                },
                especie: {
                    connect: {
                        id: especie?.id
                    }
                }
            }
    
            const arvore = await prismaClient.arvore.create({
                data: preparedData
            })
    
            return arvore
        } catch(error) {
            console.log(error?.message)
            return error
        }
        
    }

    async update(id: string, data: any): Promise<Arvore> {
        console.log(data)
        const ut = await prismaClient.ut.findUnique({
            where: {
                id: data?.id_ut
            }
        }) as any

        const upa = await prismaClient.upa.findUnique({
            where: {
                id: ut?.id_upa
            }
        })

        const especie = await prismaClient.especie.findFirst({
            where: {
                nome_orgao: data?.especie
            }
        })
        const preparedData = upa?.tipo === 1 ? {
            numero_arvore: parseInt(data?.numero_arvore),
            faixa: parseInt(data?.faixa),
            dap: data?.cap ? parseFloat(data?.cap) / Math.PI : parseFloat(data?.dap),
            altura: parseFloat(data?.altura),
            fuste: parseInt(data?.fuste),
            orient_x: data?.orient_x,
            lat_x: parseFloat(data?.lat_x),
            long_y: parseFloat(data?.long_y),
            ut: {
                connect: {
                    id: ut?.id
                }
            },
            especie: {
                connect: {
                    id: especie?.id
                }
            }
        } : {
            numero_arvore: parseInt(data?.numero_arvore),
            dap: data?.cap ? parseFloat(data?.cap) / Math.PI : parseFloat(data?.dap),
            altura: parseFloat(data?.altura),
            fuste: parseInt(data?.fuste),
            lat_x: parseFloat(data?.latitude),
            long_y: parseFloat(data?.longitude),
            ut: {
                connect: {
                    id: ut?.id
                }
            },
            especie: {
                connect: {
                    id: especie?.id
                }
            }
        }
        const arvore = await prismaClient.arvore.update({
            data: preparedData,
            where: {
                id
            }
        })

        return arvore
    }

    async delete(id: string): Promise<void> {
        await prismaClient.arvore.delete({
            where: { id }
        })
            .then(response => {
                console.log(response)
            })
    }

    async getAll(userId: string, query?: any): Promise<any> {
        const projeto = await getProjeto(userId)
        const { perPage, page, search, orderBy, order } = query
        const skip = (page - 1) * perPage
        let orderByTerm = {}
        
        const orderByElement = orderBy ? orderBy.split('.') : {}
        
        if (orderByElement.length == 2) {
            orderByTerm = {
                [orderByElement[1]]: order
            }
        } else {
            orderByTerm = {
                [orderByElement]: order
            }
        }
        const where = search ?
            {
                AND: {
                    numero_arvore: parseInt(search),
                    ut: {
                        upa: {
                            umf: {
                                projeto: {
                                    id: projeto?.id
                                }
                            }
                        }
                    }
                }
            } : {
                ut: {
                    upa: {
                        umf: {
                            projeto: {
                                id: projeto?.id
                            }
                        }
                    }
                }
            }
        const [data, total] = await prismaClient.$transaction([
            prismaClient.arvore.findMany({
                where,
                orderBy: orderByTerm,
                take: perPage ? parseInt(perPage) : 50,
                skip: skip ? skip : 0,
            }),
            prismaClient.arvore.count()
        ])

        return {
            data,
            perPage,
            page,
            skip,
            count: total
        }
    }

    async deleteArvores(arvores: string[]) {
        
        await prismaClient.arvore.deleteMany({
            where: { id: { in: arvores} }
        })
         
    }

    async search(q: any, userId: string) {
        const projeto = await getProjeto(userId)
        const data = await prismaClient.arvore.findMany({
            where: {
                AND: {
                    numero_arvore: parseInt(q),
                    ut: {
                        upa: {
                            umf: {
                                projeto: {
                                    id: projeto?.id
                                }
                            }
                        }
                    }
                }
            }
        })
        return data
    }

    async findById(id: string) : Promise<any> {
        const arvore = await prismaClient.arvore.findUnique({ 
            include: {
                observacao_arvore: true,
                especie: true
            },
            where: { id } 
        })

        return arvore
    }
}

export default new ArvoreService