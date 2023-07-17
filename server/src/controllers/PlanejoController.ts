import { Request, Response } from "express";
import { PlanejoService } from "../services/PlanejoService";
import { prismaClient } from "../database/prismaClient";
import poaService from "../services/PoaService";

export class PlanejoController {
    async execute(request : Request, response: Response) : Promise<Response> {
        const user: any = await prismaClient.user.findUnique({
            where: {
                id: request.user?.id
            }
        })
        try {    
            const uts = await prismaClient.ut.findMany({
                where: {
                    id_poa: user?.id_poa_ativo
                }
            })
    
            for (const ut of uts) {
                const planejoService = new PlanejoService(user?.id_poa_ativo, ut?.id)
            
                await planejoService.explorar()
                await planejoService.preservar()
                await planejoService.criterioEspecieNDef()
                await planejoService.criterioDMin(3, 2, user?.id)
                await planejoService.criterioDMax(1, 3, user?.id)
                await planejoService.criterioFuste(1, 1, user?.id)
                await planejoService.criterioObs(1, 5, user?.id)
                await planejoService.criterioAltura(1, 6, user?.id)
                await planejoService.criterioVolume(1, 7, user?.id)
                await planejoService.percentualUmf(user?.id)
            }

            const situacaoPoa = await prismaClient.situacaoPoa.findFirst({
                where: {
                    nome: {
                        contains: 'Processado'
                    }
                }
            })
            
            user?.id_poa_ativo && await prismaClient.poa.update({
                where: {
                    id: user?.id_poa_ativo
                },
                data: {
                    data_ultimo_plan: new Date(),
                    situacao_poa: {
                        connect: {
                            id: situacaoPoa?.id
                        }
                    }
                }
            })

            return response.json({
                error: false,
                message: 'Planejamento do POA realizado com Sucesso!',
            })
        } catch (error) {
            console.log(error.message)
            return response.json({
                error: true,
                planejo: null,
                message: error.message
            })
        }
    }

    async utsByPoa(request: Request, response: Response) {
        const uts = await poaService.utsByPoa(request.user?.id)

        console.log(uts)

        return response.json({
            error: false,
            uts
        })
    }
}