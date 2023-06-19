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

const Index = ({ currentPoas, onPageChanged, changeItemsPerPage, orderBy, order, currentPage, perPage, loading }: any) => {
    
    const [filteredPoas, setFilteredPoas] = useState<any[]>(currentPoas)
    const { client } = useContext(AuthContext)
    const [checkedPoas, setCheckedPoas] = useState<any>([])
    const [sorted, setSorted] = useState(false)
    const [poas, setPoas] = useState<any>()
    const poa = useAppSelector((state: RootState) => state.poa)
    const [selectedPoa, setSelectedPoa] = useState<OptionType>()
    const dispatch = useAppDispatch()
    const { projeto } = useContext(ProjetoContext)

    const { showModal, hideModal, store } = useModalContext()
    const { visible } = store

    const poaById = (id?: string) => {
        return currentPoas.find((poa: any) => poa.id === id)
    }

    const deleteSingleModal = (id?: string) => showModal({ title: 'Deletar POA', onConfirm: () => { deletePoa(id) }, styleButton: styles.redButton, iconType: 'warn', confirmBtn: 'Deletar', content: `Tem Certeza que deseja excluir o POA ${poaById(id)?.descricao} ?` })
    const deleteMultModal = () => showModal({ title: 'Deletar POAs', onConfirm: deletePoas, styleButton: styles.redButton, iconType: 'warn', confirmBtn: 'Deletar', content: 'Tem certeza que deseja excluir os POAs selecionados' })
    

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

    useEffect(() => {
        async function defaultOptions() {
            const response = await client.get(`/poa?orderBy=descricao&order=asc`)
                const { poas } = response.data
                setPoas(poas)
                if (poas.length === 0) {
                    setSelectedPoa({
                        value: '0',
                        label: 'Nenhum POA Cadastrada'
                    })
                }
        }

        loadPoa()
        
        defaultOptions()
        setFilteredPoas(currentPoas)
    }, [currentPoas, currentPage, client, poa, loadPoa, projeto?.id])

    const selectPoa = async (poa: any) => {
        dispatch(setPoa({
            id: poa.value,
            descricao: poa.label,
            data_ultimo_plan: new Date(0),
            pmfs: ''
        }))
        setSelectedPoa(poa)
        const response = await client.get(`/poa?orderBy=nome&order=asc&umf=${poa.value}`)
        const { poas } = response.data
        
        setFilteredPoas(poas)
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

    async function deletePoa(id?: string) {
        try {
            await client.delete(`/poa/single/${id}`)
                .then(() => {
                    alertService.success('O POA foi deletada com SUCESSO!!!')
                    
                    hideModal()
                })
        } catch (error) {
            console.log(error)
        }       
    }

    const handleSearch = async (query: string) => {
        const paginatedData = {
            currentPage: 1,
            perPage,
            orderBy,
            order,
            search: query
        }
        onPageChanged({
            poa: poa.id,
            ...paginatedData
        })
    }

    const sortPoas = () => {
        let poas: any = []        
        poas = filteredPoas.sort((a: any, b: any) => {
            return sorted
                ? a.descricao.toLowerCase().localeCompare(b.descricao.toLowerCase())
                : b.descricao.toLowerCase().localeCompare(a.descricao.toLowerCase());
        })
        
        setSorted(!sorted)
        setFilteredPoas(poas)    
    }

    const handleSelectPoa = (evt: any) => {
        const poaId = evt.target.value

        if (!checkedPoas.includes(poaId)) {
            setCheckedPoas([...checkedPoas, poaId])
        } else {
            setCheckedPoas(checkedPoas.filter((checkedPoaId: any) => {
                return checkedPoaId !== poaId
            }))
        }
    }

    const handleSelectAllPoas = () => {
        if (checkedPoas?.length < currentPoas?.length) {
            setCheckedPoas(currentPoas.map(({ id }: any) => id));
        } else {
            setCheckedPoas([]);
        }
    };

    const deletePoas = async () => {
        try {
            await client.delete('/poa/multiples', { data: { ids: checkedPoas} })
                .then((response: any) => {
                    setCheckedPoas([])
                    alertService.success('As POAs foram deletadas com SUCESSO!!!')
                    
                    hideModal()
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="flex flex-row items-center bg-gradient-to-r from-green-600 to-green-400  border-b-2 border-green-600 justify-between p-6 bg-gray-100">
                <h1 className="font-medium text-2xl font-roboto text-white">Processamento do POA</h1>
            </div>
            {loading ? (<div className="flex flex-row items-center justify-center h-56">Loading...</div>) : (
                <div className="flex flex-col p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-gray-100 rounded-lg">
                        
                        <div className="lg:flex lg:flex-wrap lg:w-5/12 px-4">
                            <div className="w-3/12 flex items-center">POA: </div>
                            <div className="w-9/12">
                                <Select

                                    placeholder='Selecione o POA...'
                                    selectedValue={selectedPoa}
                                    defaultOptions={getPoasDefaultOptions()}
                                    options={loadPoas}
                                    callback={selectPoa}
                                    initialData={{
                                        label: 'Entre com as iniciais da UMF...', value: 'Entre com as iniciais da UMF...'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-between overflow-x-auto mt-2">
                        <div className="shadow overflow-y-auto border-b border-gray-200 w-full sm:rounded-lg">
                            {checkedPoas.length > 0 && (
                                <div className="py-4">
                                    <button
                                        className="px-4 py-2 bg-red-600 text-white rounded-md"
                                        onClick={deleteMultModal}
                                    >
                                        Deletar
                                    </button>
                                </div>
                            )}
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="w-1/12">
                                <div className="flex justify-center">
                                <input  
                                    checked={checkedPoas?.length === currentPoas?.length}
                                    onChange={handleSelectAllPoas}                
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"
                                />
                                </div>
                            </th>
                            <th
                                className="w-4/12"
                                onClick={() => sortPoas()}
                            >
                                <div className="flex flex-row items-center px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                    Descricao
                                    {sorted
                                        ? (<ChevronUpIcon className="w-5 h-5" />)
                                        : (<ChevronDownIcon className="w-5 h-5" />)
                                    }
                                </div>        
                            </th>
                            <th
                                scope="col"
                                className="w-2/12 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Situação
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </th>   
                            <th
                                scope="col"
                                className="w-2/12 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Data Último Planejamento
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </th>  
                            <th scope="col" className="relative w-1/12 px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredPoas?.map((poa: any) => (
                        <tr key={poa.id}>
                            <td className="flex justify-center">
                                <input                 
                                    value={poa?.id}
                                    checked={checkedPoas.includes(poa?.id)}
                                    onChange={handleSelectPoa}
                                    id="poaId"
                                    type="checkbox"
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                />    
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <div className="flex flex-col items-starter">
                                    <div className="text-sm font-medium text-gray-900">{poa?.situacao_poa?.nome}</div>
                                </div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{poa?.data_ultimo_plan?.toString()}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center">
                                <Link href={`/poa/update/${poa.id}`}>
                                    <PencilAltIcon className="w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" />
                                </Link>
                                <Link href="#" onClick={() => deleteSingleModal(poa.id)}>
                                    <TrashIcon className="w-5 h-5 ml-4 -mr-1 text-red-600 hover:text-red-700" />
                                </Link>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
            </div>
        )}
            
    </div>
    )
}

export default Index
