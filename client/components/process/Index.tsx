import { useCallback, useContext, useEffect, useRef, useState } from "react"
import alertService from '../../services/alert'
import { AuthContext } from "../../contexts/AuthContext"
import { OptionType, Select } from '../Select'
import { setPoa } from "../../store/poaSlice"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { RootState } from "../../store"

import { LoadingContext } from "contexts/LoadingContext"
import { ProjetoContext } from "contexts/ProjetoContext"
import { CriterioPoa } from "../categoria-especie/CriterioPoa"
import classNames from "classnames"
import { PencilAltIcon } from "@heroicons/react/solid"

const Index = () => {
    
    const { client } = useContext(AuthContext)
    const [poas, setPoas] = useState<any>()
    const [categorias, setCategorias] = useState<any>()
    const poa = useAppSelector((state: RootState) => state.poa)
    const [selectedPoa, setSelectedPoa] = useState<OptionType>()
    const dispatch = useAppDispatch()
    const { projeto } = useContext(ProjetoContext)
    const { setLoading } = useContext(LoadingContext)
    const [uts, setUts] = useState<any[]>([])

    const loadPoas = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const response = await client.get(`/poa/search/q?nome=${inputValue}`)
        const data = response.data
        
        callback(data?.map((poa: any) => ({
            value: poa.id,
            label: poa.nome
        })))
    }

    const loadUts = useCallback(async () => {
        const { data } = await client.get('/planejo/uts')
        setUts(data?.uts)
    }, [client])

    const poaExists = poas?.length

    const loadPoa = useCallback(() => {
        
        if (poa && poaExists > 0) {
            setSelectedPoa({
                value: poa?.id,
                label: poa?.descricao
            })
        } else {
            setSelectedPoa({} as any)
        }
        
    }, [poa, poaExists])

    const loadCategorias = useCallback(async () => {
        const response = await client.get(`/categoria?poa=${poa?.id}&projetoId=${projeto?.id}&order=asc&orderBy=nome`)
        const { categorias } = response.data
        setCategorias(categorias)   
    }, [client, poa?.id, projeto?.id])

    useEffect(() => {
        async function defaultOptions() {
            const response = await client.get(`/poa?orderBy=descricao&order=asc`)
            const { poas } = response.data
            setPoas([{ descricao: 'Padrão', id: '' }, ...poas])
            
        }

        loadPoa()
        loadUts()
        loadCategorias()
        defaultOptions()

    }, [client, loadUts, loadCategorias, loadPoa])

    const selectPoa = async (poa: any) => {
        dispatch(setPoa({
            id: poa.value,
            descricao: poa.label,
            data_ultimo_plan: new Date(),
            pmfs: ''
        }))
        setSelectedPoa(poa)
        const response = await client.get(`/categoria/get-by-poa?poaId=${poa.value}`)
        const { categorias } = response.data
        setCategorias(categorias)
    }

    function getPoasDefaultOptions() {
        const data = poas?.map((poa: any, idx: any) => {
            return {
                label: poa.descricao,
                value: poa.id
            }
        })

        return data
    }

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

    return (
        <>
            <div className="flex flex-row items-center bg-gradient-to-r from-green-600 to-green-400  border-b-2 border-green-600 justify-between p-6 bg-gray-100">
                <h1 className="font-medium text-2xl font-roboto text-white">Processamento do POA</h1>
            </div>
            
                <div className="flex flex-col p-6 mx-auto">
                    
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-gray-100 bg-opacity-25 my-2">
                        <div className="lg:flex lg:flex-wrap lg:w-6/12 px-4">
                            <span className="w-3/12 flex items-center">POA: </span>
                            <div className="w-3/4">
                                <Select

                                    placeholder='Selecione o POA...'
                                    selectedValue={selectedPoa}
                                    defaultOptions={getPoasDefaultOptions()}
                                    options={loadPoas}
                                    callback={selectPoa}
                                    initialData={{
                                        label: 'Entre com as iniciais do POA ...', value: ''
                                    }}
                                />
                            </div>
                        </div>
                    </div>     
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
                                className={classNames("px-6 py-2 bg-green-700 hover:bg-green-800 hover:cursor-pointer text-white items-center text-center w-2/6 lg:w-1/6",
                                    !poa?.id && ("hover:cursor-not-allowed opacity-50")
                                )}
                            >
                                Planejar POA
                            </button>
                        </div>
                    </div>
                    <div className="border border-gray-300 p-4 rounded-md col-span-6 relative w-full mt-6">
                        <span className="text-gray-700 absolute -top-3 bg-white px-2 text-sm">Definir ajustes</span>
                        <div className='flex flex-col md:flex-row space-x-2 items-center w-full'>
                        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                            <thead className="bg-gray-50 w-full">
                                <tr>
                                    <th 
                                    scope="col"
                                    className="w-4"></th>
                                    <th
                                        scope="col"
                                        className="justify-between items-center px-2 py-2 text-left text-xs font-medium text-gray-500"
                                    >
                                        <div className="flex flex-row w-full justify-between">
                                            UPA
                                        </div>                 
                                    </th>
                                    <th
                                        scope="col"
                                        className="justify-between px-2 py-2 text-left text-xs font-medium text-gray-500"
                                    >
                                        <div className="flex flex-row w-full justify-between">
                                            UT
                                        </div>   
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3 text-left text-xs font-medium text-gray-500"
                                    >
                                        <div className="flex flex-row w-full justify-between">
                                            Volume Total
                                        </div>   
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3 text-left text-xs font-medium text-gray-500"
                                    >
                                        <div className="flex flex-row w-full justify-between">
                                            Volume Explorar
                                        </div>   
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3 text-left text-xs font-medium text-gray-500"
                                    >
                                        <div className="flex flex-row w-full justify-between">Volume Explorar/Area Util</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-300">
                                {uts?.map((ut: any) => (
                                    <tr key={ut.numero_ut}
                                    >
                                        <td className="px-6 py-2 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center">
                                        <button>
                                            <PencilAltIcon className={
                                                classNames("w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700",
                                                )
                                            } />
                                        </button>
                                        </td>
                                        <td className="px-3 whitespace-nowrap">
                                            <div className="text-sm font-medium">{ut?.ano}</div>
                                    
                                        </td>
                                        <td className="px-3 whitespace-nowrap">
                                            <div className="text-sm font-medium">{ut?.numero_ut}</div>
                                        </td>
                                        <td className="px-3 whitespace-nowrap">
                                        <span className="text-sm">
                                            <div className="text-sm font-medium">{ut?.volume_total}</div>
                                        </span>
                                        </td>
                                        <td className="px-3 whitespace-nowrap">
                                            <span className="text-sm">
                                                <div className="text-sm font-medium">{ut?.volume_explorar}</div>
                                            </span>
                                        </td>
                                        <td className="px-3 whitespace-nowrap">
                                            <span className="text-sm">
                                                <div className={classNames("text-sm font-medium", 
                                                ut?.volume_area_util > 30 && "text-red-700"
                                                )}>{ut?.volume_area_util}</div>
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
