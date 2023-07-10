import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { Link } from "../Link"
import { Input } from "../atoms/input"
import { TrashIcon, PencilAltIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import alertService from '../../services/alert'
import { AuthContext } from "../../contexts/AuthContext"
import { OptionType, Select } from '../Select'
import { setPoa } from "../../store/poaSlice"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { RootState } from "../../store"

import { useModalContext } from "contexts/ModalContext"
import { styles } from "../Utils/styles"
import { ProjetoContext } from "contexts/ProjetoContext"
import { CriterioPoa } from "../categoria-especie/CriterioPoa"

const Index = ({ currentPoas, loading }: any) => {
    
    const { client } = useContext(AuthContext)
    const [poas, setPoas] = useState<any>()
    const [categorias, setCategorias] = useState<any>()
    const poa = useAppSelector((state: RootState) => state.poa)
    const [selectedPoa, setSelectedPoa] = useState<OptionType>()
    const dispatch = useAppDispatch()
    const { projeto } = useContext(ProjetoContext)

    const loadPoas = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const response = await client.get(`/poa/search/q?nome=${inputValue}`)
        const data = response.data
        
        callback(data?.map((poa: any) => ({
            value: poa.id,
            label: poa.nome
        })))
    }

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
        loadCategorias()
        defaultOptions()

    }, [currentPoas, client, loadCategorias, loadPoa])

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
        await client.post('/planejo', { poa: poa?.id }).then(({ data }: any) => {
            const { error, message } = data
            console.log(error)
            if (!error) {
                alertService.success(message)
            } else {
                alertService.error(message)
            }
        }).catch((error: any) => {
            console.log(error)
        })
    }

    return (
        <div>
            <div className="flex flex-row items-center bg-gradient-to-r from-green-600 to-green-400  border-b-2 border-green-600 justify-between p-6 bg-gray-100">
                <h1 className="font-medium text-2xl font-roboto text-white">Processamento do POA</h1>
            </div>
            {loading ? (<div className="flex flex-row items-center justify-center h-56">Loading...</div>) : (
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

                    <div className="border border-gray-200 p-4 rounded-md col-span-6 relative w-full mt-6">
                        <span className="text-gray-700 absolute -top-3 bg-white px-2 text-sm">Processamento do POA</span>
                            <div className='flex flex-col md:flex-row space-x-2 items-center w-full'>
                                <div
                                    id='btn-resp'
                                    onClick={PlanejarPOA}
                                    className="px-6 py-2 text-white bg-green-700 hover:bg-green-800 hover:cursor-pointer items-center text-center w-2/6 lg:w-1/6"
                                >
                                    Planejar POA
                                </div>
                            </div>
                        </div>
                    </div>
            )}
                
        </div>
    )
}

export default Index
