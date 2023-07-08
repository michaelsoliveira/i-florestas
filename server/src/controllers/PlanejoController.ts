import { Request, Response } from "express";
import { PlanejoService } from "../services/PlanejoService";
import { prismaClient } from "../database/prismaClient";

export class PlanejoController {
    async execute(request : Request, response: Response) : Promise<Response> {
        const { poa }: any = request.body
        
        try {    
            const uts = await prismaClient.ut.findMany({
                where: {
                    id_poa: poa
                }
            })
    
            for (const ut of uts) {
                const planejoService = new PlanejoService(poa, ut?.id)
            
                await planejoService.explorar()
                await planejoService.preservar()
                await planejoService.criterioDMin(3, 2)
                await planejoService.criterioDMax(1, 3)
                await planejoService.criterioFuste(1, 1)
                await planejoService.criterioObs(1, 5)
                await planejoService.criterioAltura(1, 6)
                await planejoService.criterioVolume(1, 7)
                await planejoService.percentualUmf()
                
            }

            const situacaoPoa = await prismaClient.situacaoPoa.findFirst({
                where: {
                    nome: {
                        contains: 'Processado'
                    }
                }
            })
            
            await prismaClient.poa.update({
                where: {
                    id: poa
                },
                data: {
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
}