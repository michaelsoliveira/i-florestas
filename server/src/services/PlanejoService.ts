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

    async criterioDMin(situacaoId: number, motivoPreservacaoId: number) : Promise<any> {

        const updateArvores = await prismaClient.$queryRaw`
            UPDATE 
                arvore as a
            SET 
                id_situacao = ${situacaoId},
                id_motivo_preservacao = ${motivoPreservacaoId}
            FROM 
                ut u, categoria_especie cat, especie e, categoria_especie_poa cep
            WHERE 
                u.id = ${this.ut}
                AND u.id_poa = ${this.poa}
                AND u.id = a.id_ut
                AND a.id_situacao = 2
                AND e.id = a.id_especie
                AND cep.id_especie = e.id
                AND cat.id = cep.id_categoria
                AND cat.preservar = false
                AND a.dap < cat.criterio_dminc
        `;
          
        return updateArvores; 
    }

    async criterioFuste(situacaoId: number, motivoPreservacaoId: number) : Promise<any> {

        const updateArvores = await prismaClient.$queryRaw`
            UPDATE 
                arvore as a
            SET 
                id_situacao = ${situacaoId},
                id_motivo_preservacao = ${motivoPreservacaoId}
            FROM 
                ut u, categoria_especie cat, especie e, categoria_especie_poa cep
            WHERE 
                u.id = ${this.ut}
                AND u.id_poa = ${this.poa}
                AND u.id = a.id_ut
                AND a.id_situacao = 2
                AND e.id = a.id_especie
                AND cep.id_especie = e.id
                AND cat.id = cep.id_categoria
                AND cat.preservar = false
                AND a.fuste > cat.criterio_fuste; 
        `;

        return updateArvores; 
    }

    async criterioDMax(situacaoId: number, motivoPreservacaoId: number) : Promise<any> {

        const updateArvores = await prismaClient.$queryRaw`
            UPDATE 
                arvore as a
            SET 
                id_situacao = ${situacaoId},
                id_motivo_preservacao = ${motivoPreservacaoId}
            FROM 
                ut u, categoria_especie cat, especie e, categoria_especie_poa cep
            WHERE 
                u.id = ${this.ut}
                AND u.id_poa = ${this.poa}
                AND u.id = a.id_ut
                AND a.id_situacao = 2
                AND e.id = a.id_especie
                AND cep.id_especie = e.id
                AND cat.id = cep.id_categoria
                AND cat.preservar = false
                AND a.dap > cat.criterio_dmaxc
        `;
          
        return updateArvores; 
    }

    async criterioAltura(situacaoId: number, motivoPreservacaoId: number) : Promise<any> {

        const updateArvores = await prismaClient.$queryRaw`
            UPDATE 
                arvore as a
            SET 
                id_situacao = ${situacaoId},
                id_motivo_preservacao = ${motivoPreservacaoId}
            FROM 
                ut u, categoria_especie cat, especie e, categoria_especie_poa cep
            WHERE 
                u.id = ${this.ut}
                AND u.id_poa = ${this.poa}
                AND u.id = a.id_ut
                AND a.id_situacao = 2
                AND e.id = a.id_especie
                AND cep.id_especie = e.id
                AND cat.id = cep.id_categoria
                AND cat.preservar = false
                AND a.altura > cat.criterio_altura
        `;
          
        return updateArvores; 
    }

    async criterioVolume(situacaoId: number, motivoPreservacaoId: number) : Promise<any> {

        const updateArvores = await prismaClient.$queryRaw`
            UPDATE 
                arvore as a
            SET 
                id_situacao = ${situacaoId},
                id_motivo_preservacao = ${motivoPreservacaoId}
            FROM 
                ut u, categoria_especie cat, especie e, categoria_especie_poa cep
            WHERE 
                u.id = ${this.ut}
                AND u.id_poa = ${this.poa}
                AND u.id = a.id_ut
                AND a.id_situacao = 2
                AND e.id = a.id_especie
                AND cep.id_especie = e.id
                AND cat.id = cep.id_categoria
                AND cat.preservar = false
                AND a.volume > cat.criterio_volume
        `;
          
        return updateArvores; 
    }

    async criterioObs(situacaoId: number, motivoPreservacaoId: number) : Promise<any> {

        const updateArvores = await prismaClient.$queryRaw`
            UPDATE 
                arvore as a
            SET 
                id_situacao = ${situacaoId},
                id_motivo_preservacao = ${motivoPreservacaoId}
            FROM 
                ut u, observacao_arvore obs, especie e 
            WHERE 
                u.id = ${this.ut}
                AND u.id_poa = ${this.poa}
                AND u.id = a.id_ut
                AND a.id_situacao = 2
                AND e.id = a.id_especie
                AND obs.id = a.id_observacao
                AND obs.preservar = true;  
        `;
          
        return updateArvores; 
    }

    async percentualUmf() : Promise<any> {
        const percenteMin = await prismaClient.$queryRaw<any>`
            select 
                a.id_ut, u.id_poa, 
                a.id_especie, 
                count(a.id_especie) as tot_explorar, 
                percente(count(a.id_especie), cat.criterio_perc_min) as percentual, 
                percente(u.area_util, cat.criterio_n_min) as n_minimo
            from 
                arvore a, especie e, ut u, categoria_especie cat, categoria_especie_poa cep
            where 
                u.id = ${this.ut}
                and u.id_poa = ${this.poa}
                and a.id_ut = u.id
                and e.id = a.id_especie
                and cat.id_poa = u.id_poa
                AND cep.id_especie = e.id
                AND cat.id = cep.id_categoria
                and a.id_situacao = 2
            group by u.id_upa, a.id_especie, a.id_ut, cat.criterio_perc_min, cat.criterio_n_min, u.id_poa, u.area_util;
        `

        for (const percente of percenteMin) {
            if (percente.n_minimo >= percente.percentual) {
                if ((percente.n_minimo) > 0) {
                    const percentuais_umf = await prismaClient.$queryRaw<any>`
                        select 
                            a.id as id_arvore
                        from 
                            arvore a, ut u
                        where a.id_ut = u.id
                            and   u.id = ${percente.id_ut}
                            and   u.id_poa = ${percente.id_poa}
                            and   a.id_especie = ${percente.id_especie}
                            and   a.id_situacao = 2
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
                            arvore a, ut u
                        where a.id_ut = u.id
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