'use client'

import { useCallback, useContext, useEffect, useState } from "react"
import alertService from '@/services/alert'
import { AuthContext } from "@/context/AuthContext"
import { useAppSelector } from "@/redux/hooks"
import { RootState } from "@/redux/store"

import { LoadingContext } from "@/context/LoadingContext"
import { ProjetoContext } from "@/context/ProjetoContext"
import classNames from "classnames"
import { PencilIcon } from "@heroicons/react/24/solid"
import { useModalContext } from "@/context/ModalContext"
import { styles } from "@/components/utils/styles"
import Exploracao from "../poa/exploracao/Index"
import CriterioPoa from "../categoria-especie/CriterioPoa"

const Index = () => {
    
    const { client } = useContext(AuthContext)
    const [categorias, setCategorias] = useState<any>()
    const poa = useAppSelector((state: RootState) => state.poa)
    const { projeto } = useContext(ProjetoContext)
    const { setLoading } = useContext(LoadingContext)
    const [uts, setUts] = useState<any[]>([])
    const { showModal } = useModalContext()

    const loadUts = useCallback(async () => {
        const { data } = await client.get('/planejo/uts')
        setUts(data?.uts)
    }, [client, setUts])

    const loadCategorias = useCallback(async () => {
        const response = await client.get(`/categoria?poa=${poa?.id}&projetoId=${projeto?.id}&order=asc&orderBy=nome`)
        const { categorias } = response.data
        setCategorias(categorias)   
    }, [client, poa?.id, projeto?.id])

    useEffect(() => {
        loadUts()
        loadCategorias()
    }, [client, loadUts, loadCategorias])

    async function PlanejarPOA(event: any): Promise<any> {
        setLoading(true)
        await client.post('/planejo', { poa: poa?.id }).then(({ data }: any) => {
            const { error, message } = data
            
            if (!error) {
                alertService.success(message)
                loadUts()
            } else {
                alertService.error(message)
            }
        }).catch((error: any) => {
            setLoading(false)
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }

    function ajusteExploracao(utId: any): void {
        const selectedUt = uts.find((ut: any) => ut?.id_ut === utId)

        showModal({
            title: `Ajustar Exploração de Espécies na UT: ${selectedUt?.numero_ut}`,
            size: 'max-w-5xl',
            type: 'submit', hookForm: 'hook-form', styleButton: styles.greenButton,
            cancelName: 'Fechar',
            content: <div><Exploracao ut={selectedUt} loadUts={loadUts} /></div>
        })
    }

    return (
        <>
            <div className="flex flex-row items-center bg-gradient-to-r from-custom-green to-custom-green/50 justify-between p-6 bg-gray-100">
                <h1 className="font-medium text-2xl font-roboto text-white">Processamento do POA</h1>
            </div>
            
                <div className="flex flex-col p-6 mx-auto">
                    {categorias && (
                        <div className="overflow-x-auto border border-gray-300 rounded-md">
                            <CriterioPoa 
                                categorias={categorias} 
                                loadCategorias={loadCategorias}
                            />
                        </div>
                    )}
                    <div className="border border-gray-300 p-4 rounded-md col-span-6 relative w-full mt-6">
                        <span className="text-gray-700 absolute -top-3 bg-white px-2 text-sm">Processamento do POA</span>
                        <div className='flex flex-col md:flex-row space-x-2 items-center w-full'>
                            <button
                                disabled={!poa?.id}
                                id='btn-resp'
                                onClick={PlanejarPOA}
                                className={classNames("px-6 py-2 bg-custom-green hover:bg-custom-green/75 transition trasition-all duration-500 ease-in-out rounded-md hover:cursor-pointer text-white items-center text-center w-1/2 lg:w-56",
                                    !poa?.id && ("hover:cursor-not-allowed opacity-50")
                                )}
                            >
                                Planejar POA
                            </button>
                        </div>
                    </div>
                    <div className="border border-gray-300 p-4 rounded-md col-span-6 relative w-full mt-6">
                        <span className="text-gray-700 absolute -top-3 bg-white px-2 text-sm">Definir ajustes</span>
                        <div className='flex flex-col md:flex-row space-x-2 w-full overflow-x-auto'>
                        <table className="min-w-full divide-y divide-gray-200 w-full">
                            <thead className="bg-gray-light w-full">
                                <tr>
                                    <th 
                                    scope="col"></th>
                                    <th
                                        scope="col"
                                        className="justify-between items-center px-2 py-2 text-left text-xs font-medium text-gray-500"
                                    >
                                        <div className="flex flex-row justify-between font-bold">
                                            UPA
                                        </div>                 
                                    </th>
                                    <th
                                        scope="col"
                                        className="justify-between px-2 py-2 text-left text-xs font-medium text-gray-500"
                                    >
                                        <div className="flex flex-row justify-between font-bold">
                                            UT
                                        </div>   
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3 text-left text-xs font-medium text-gray-500"
                                    >
                                        <div className="flex flex-row justify-between font-bold">
                                            Volume Total
                                        </div>   
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3 text-left text-xs font-medium text-gray-500"
                                    >
                                        <div className="flex flex-row justify-between font-bold">
                                            Volume Explorar
                                        </div>   
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3 text-left text-xs font-medium text-gray-500"
                                    >
                                        <div className="flex flex-row w-full justify-between font-bold">Volume Explorar/Area Util</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-300">
                                {uts?.map((ut: any) => (
                                    <tr key={ut.numero_ut}
                                    >
                                        <td className="w-full py-2 whitespace-nowrap text-sm flex flex-row items-center justify-center">
                                        <button onClick={() => ajusteExploracao(ut?.id_ut)}>
                                            <PencilIcon className={
                                                classNames("w-5 h-5 text-green-600 hover:text-green-700",
                                                )
                                            } />
                                        </button>
                                        </td>
                                        <td className="px-3 whitespace-nowrap">
                                            <div className="text-sm">{ut?.ano}</div>
                                    
                                        </td>
                                        <td className="px-3 whitespace-nowrap">
                                            <div className="text-sm">{ut?.numero_ut}</div>
                                        </td>
                                        <td className="px-3 whitespace-nowrap">
                                        <span className="text-sm">
                                            <div className="text-sm">{ut?.volume_total.toFixed(2)}</div>
                                        </span>
                                        </td>
                                        <td className="px-3 whitespace-nowrap">
                                            <span className="text-sm">
                                                <div className="text-sm">{ut?.volume_explorar.toFixed(4)}</div>
                                            </span>
                                        </td>
                                        <td className="px-3 whitespace-nowrap">
                                            <span className="text-sm">
                                                <div className={classNames("text-sm", 
                                                ut?.volume_area_util > 30 && "text-red-700"
                                                )}>{ut?.volume_area_util.toFixed(4)}</div>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Index