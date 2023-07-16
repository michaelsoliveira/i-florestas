import { prismaClient } from "../database/prismaClient";
import { CategoriaEspecie } from '@prisma/client'

export class PlanejoService {
    poa: string;
    ut: string;

    constructor(xpoa: string, xut:string) {
        this.poa = xpoa
        this.ut = xut
    }
    async explorar() : Promise<void> {
        await prismaClient.arvore.updateMany({
            where: {
                ut: {
                    id: this.ut
                }
            },
            data: {
                id_situacao: 2, 
                id_motivo_preservacao: null, 
                derrubada: false, 
                motivo_nao_derrubada: null, 
                secoes: null,
                id_substituta: null
            }
        })
    }

    async preservar() : Promise<void> {
        await prismaClient.arvore.updateMany({
            where: {
                AND: [
                    { 
                        ut: {
                            id: this.ut
                        } 
                    },
                    { 
                        ut: {
                            poa: {
                                id: this.poa
                            }
                        } 
                    },
                    { 
                        especie: {
                            categoria_especie: {
                                some: {
                                    categoria: {
                                        preservar: true
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            data: {
                id_situacao: 1,
                id_motivo_preservacao: 4
            }
        })
    }

    async criterioEspecieNDef() {
        const updateArvores = await prismaClient.arvore.updateMany({
            where: {
                id_especie: null,
                id_ut: this.ut,
                ut: {
                    id_poa: this.poa
                },
                id_situacao: 2
            },
            data: {
                id_situacao: 8
            }
        })

        return updateArvores
    }

    async criterioDMin(situacaoId: number, motivoPreservacaoId: number, userId: string) : Promise<any> {       
        const updateArvores = await prismaClient.$queryRaw`
            UPDATE 
                arvore as a
            SET 
                id_situacao = ${situacaoId},
                id_motivo_preservacao = ${motivoPreservacaoId}
            FROM ut u, especie e, categoria_especie_poa cep, categoria_especie cat, poa p, users us
            WHERE
                u.id = a.id_ut 
                AND us.id = ${userId}
                AND u.id = ${this.ut}
                AND u.id_poa = ${this.poa}
                AND e.id = a.id_especie
                AND cep.id_especie = e.id
                AND cat.id = cep.id_categoria
                AND p.id = cat.id_poa
                AND us.id_poa_ativo = p.id
                AND a.id_situacao = 2
                AND cat.preservar = false
                AND a.dap < cat.criterio_dminc
        `;
          
        return updateArvores; 
    }

    async criterioFuste(situacaoId: number, motivoPreservacaoId: number, userId: string) : Promise<any> {

        const updateArvores = await prismaClient.$queryRaw`
            UPDATE 
                arvore as a
            SET 
                id_situacao = ${situacaoId},
                id_motivo_preservacao = ${motivoPreservacaoId}
            FROM ut u, especie e, categoria_especie_poa cep, categoria_especie cat, poa p, users us
            WHERE 
                u.id = a.id_ut
                AND us.id = ${userId}
                AND u.id = ${this.ut}
                AND u.id_poa = ${this.poa}
                AND e.id = a.id_especie
                AND cep.id_especie = e.id
                AND cat.id = cep.id_categoria
                AND p.id = cat.id_poa
                AND us.id_poa_ativo = p.id
                AND a.id_situacao = 2
                AND cat.preservar = false
                AND a.fuste > cat.criterio_fuste; 
        `;

        return updateArvores; 
    }

    async criterioDMax(situacaoId: number, motivoPreservacaoId: number, userId: string) : Promise<any> {

        const updateArvores = await prismaClient.$queryRaw`
            UPDATE 
                arvore as a
            SET 
                id_situacao = ${situacaoId},
                id_motivo_preservacao = ${motivoPreservacaoId}
            FROM ut u, especie e, categoria_especie_poa cep, categoria_especie cat, poa p, users us
            WHERE
                u.id = a.id_ut 
                AND us.id = ${userId}
                AND u.id = ${this.ut}
                AND u.id_poa = ${this.poa}
                AND e.id = a.id_especie
                AND cep.id_especie = e.id
                AND cat.id = cep.id_categoria
                AND p.id = cat.id_poa
                AND us.id_poa_ativo = p.id
                AND a.id_situacao = 2
                AND cat.preservar = false
                AND a.dap > cat.criterio_dmaxc
        `;
          
        return updateArvores; 
    }

    async criterioAltura(situacaoId: number, motivoPreservacaoId: number, userId: string) : Promise<any> {

        const updateArvores = await prismaClient.$queryRaw`
            UPDATE 
                arvore as a
            SET 
                id_situacao = ${situacaoId},
                id_motivo_preservacao = ${motivoPreservacaoId}
            FROM ut u, especie e, categoria_especie_poa cep, categoria_especie cat, poa p, users us
            WHERE 
                u.id = a.id_ut
                AND us.id = ${userId}
                AND u.id = ${this.ut}
                AND u.id_poa = ${this.poa}
                AND e.id = a.id_especie
                AND cep.id_especie = e.id
                AND cat.id = cep.id_categoria
                AND p.id = cat.id_poa
                AND us.id_poa_ativo = p.id
                AND a.id_situacao = 2
                AND cat.preservar = false
                AND a.altura > cat.criterio_altura
        `;
          
        return updateArvores; 
    }

    async criterioVolume(situacaoId: number, motivoPreservacaoId: number, userId: string) : Promise<any> {

        const updateArvores = await prismaClient.$queryRaw`
            UPDATE 
                arvore as a
            SET 
                id_situacao = ${situacaoId},
                id_motivo_preservacao = ${motivoPreservacaoId}
            FROM ut u, especie e, categoria_especie_poa cep, categoria_especie cat, poa p, users us
            WHERE
                u.id = a.id_ut
                AND us.id = ${userId} 
                AND u.id = ${this.ut}
                AND u.id_poa = ${this.poa}
                AND e.id = a.id_especie
                AND cep.id_especie = e.id
                AND cat.id = cep.id_categoria
                AND p.id = cat.id_poa
                AND us.id_poa_ativo = p.id
                AND a.id_situacao = 2
                AND cat.preservar = false
                AND a.volume > cat.criterio_volume
        `;
          
        return updateArvores; 
    }

    async criterioObs(situacaoId: number, motivoPreservacaoId: number, userId: string) : Promise<any> {

        const updateArvores = await prismaClient.$queryRaw`
            UPDATE 
                arvore as a
            SET 
                id_situacao = ${situacaoId},
                id_motivo_preservacao = ${motivoPreservacaoId}
            FROM 
                ut u, observacao_arvore obs, especie e, poa p, users us 
            WHERE 
                us.id = ${userId}
                AND u.id = ${this.ut}
                AND u.id_poa = ${this.poa}
                AND p.id = us.id_poa_ativo
                AND u.id = a.id_ut
                AND a.id_situacao = 2
                AND e.id = a.id_especie
                AND obs.id = a.id_observacao
                AND obs.preservar = true;  
        `;
          
        return updateArvores; 
    }

    async percentualUmf(userId: string) : Promise<any> {
        const percenteMin = await prismaClient.$queryRaw<any>`
            SELECT 
                a.id_ut, 
                u.id_poa, 
                a.id_especie, 
                count(a.id_especie) as tot_explorar, 
                percente(count(a.id_especie), cat.criterio_perc_min) as percentual, 
                percente(u.area_util, cat.criterio_n_min) as n_minimo
            FROM arvore a
                INNER JOIN especie e ON e.id = a.id_especie
                INNER JOIN ut u ON u.id = a.id_ut
                INNER JOIN categoria_especie_poa cep ON cep.id_especie = e.id
                INNER JOIN categoria_especie cat ON cat.id = cep.id_categoria
                INNER JOIN poa p ON p.id = cat.id_poa
                INNER JOIN users us ON us.id_poa_ativo = p.id
                INNER JOIN projeto pr on pr.id = us.id_projeto_ativo
            WHERE
                us.id = ${userId}  
                AND u.id = ${this.ut}
                AND u.id_poa = ${this.poa}
                AND a.id_situacao = 2
            GROUP BY u.id_upa, a.id_especie, a.id_ut, cat.criterio_perc_min, cat.criterio_n_min, u.id_poa, u.area_util;
        `

        for (const percente of percenteMin) {
            if (percente.n_minimo >= percente.percentual) {
                if ((percente.n_minimo) > 0) {
                    const percentuais_umf = await prismaClient.$queryRaw<any>`
                        select 
                            a.id as id_arvore
                        from 
                            arvore a, ut u, poa p, users us, projeto pr
                        where 
                            us.id = ${userId}
                            and u.id = a.id_ut
                            and p.id = u.id_poa
                            and us.id_poa_ativo = p.id
                            and pr.id = us.id_projeto_ativo
                            and u.id = ${percente.id_ut}
                            and u.id_poa = ${percente.id_poa}
                            and a.id_especie = ${percente.id_especie}
                            and a.id_situacao = 2
                            order by a.volume asc, a.dap asc, a.altura asc
                            limit ${percente.n_minimo}
                    `

                    for (const percentual of percentuais_umf) {
                        await prismaClient.arvore.updateMany({
                            where: {
                                id: percentual.id_arvore
                            },
                            data: {
                                id_situacao: 5,
                                id_motivo_preservacao: 9
                            }
                        })
                    }
                } 
            } else if (percente.percentual > percente.n_minimo) {
    
                if ((percente.n_minimo) > 0) {
                    const percentuais_umf = await prismaClient.$queryRaw<any>`
                        select 
                            a.id as id_arvore
                        from 
                            arvore a, ut u, poa p, users us, projeto pr
                        where 
                            us.id = ${userId}
                            and u.id = a.id_ut
                            and p.id = u.id_poa
                            and us.id_poa_ativo = p.id
                            and   u.id = ${percente.id_ut}
                            and   u.id_poa = ${percente.id_poa}
                            and   a.id_especie = ${percente.id_especie}
                            and   a.id_situacao = 2
                            order by a.volume asc, a.dap asc, a.altura asc
                            limit ${percente.percentual}
                    `

                    for (const percentual of percentuais_umf) {
                        await prismaClient.arvore.updateMany({
                            where: {
                                id: percentual.id_arvore
                            },
                            data: {
                                id_situacao: 5,
                                id_motivo_preservacao: 8
                            }
                        })
                    }
                }         
            }
        }
    }
}