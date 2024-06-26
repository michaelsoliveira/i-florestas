'use client'

import { useCallback, useContext, useEffect, useState } from "react"
import { Link } from "@/components/utils/Link"
import { Input } from "../atoms/input"
import { TrashIcon, PencilIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import alertService from '@/services/alert'
import { AuthContext } from "@/context/AuthContext"
import { CategoriaEspecieType } from "@/types/ICategoriaEspecieType"
import { styles } from "@/components/utils/styles"

import { useModalContext } from "@/context/ModalContext"
import { OptionType, Select } from "@/components/ui/Select"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { RootState } from "@/redux/store"
import { PoaContext } from "@/context/PoaContext"

const Index = ({ currentCategorias, onPageChanged, changeItemsPerPage, currentPage, perPage, loading, loadCategorias }: any) => {
    
    const [filteredCategorias, setFilteredCategorias] = useState<CategoriaEspecieType[]>(currentCategorias)
    const { client } = useContext(AuthContext)
    const [checkedCategorias, setCheckedCategorias] = useState<any>([])
    const [sorted, setSorted] = useState(false)
    const [poas, setPoas] = useState<any>()
    const { poa } = useContext(PoaContext)
    const [selectedPoa, setSelectedPoa] = useState<OptionType>()

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

    const defaultOptions = useCallback(async () => {
        const response = await client.get(`/poa?orderBy=descricao&order=asc`)
            const { poas } = response.data
            setPoas([{ descricao: 'Padrão', id: '' }, ...poas])
    },[client])

    useEffect(() => {
        loadPoa()
        defaultOptions()
        setFilteredCategorias(currentCategorias)
    }, [loadPoa, defaultOptions, currentCategorias])

    const selectPoa = async (poa: any) => {

        setSelectedPoa(poa)

        const response = await client.get(`/categoria?orderBy=nome&order=asc&poa=${poa.value}`)
        const { categorias } = response.data
        
        setFilteredCategorias(categorias)
    }

    function getPoasDefaultOptions() {
        const data = poas && poas?.map((p: any) => {
            return {
                label: p.descricao,
                value: p.id
            }
        })

        return data           
    }

    const getFuste = (fuste: number) => {
        switch(fuste) {
            case 1: return '1';            
            case 2: return '1, 2';            
            case 3: return '1, 2 e 3';            
            default:
        }
    }

    const { hideModal, showModal, store } = useModalContext()

    const categoriaById = useCallback((id?: string) => {
        return currentCategorias.find((categoria: CategoriaEspecieType) => categoria.id === id)
    }, [currentCategorias])
    
    const deleteCategoria = useCallback(async  (id?: string) => {
        try {
            client.delete(`/categoria/${id}`)
                .then(() => {
                    alertService.success('A categoria de espécie foi deletada com SUCESSO!!!')
                    loadCategorias()
                    hideModal()
                })
        } catch (error: any) {
            console.log(error)
        }       
    }, [client, hideModal, loadCategorias])
    
    const deleteSingleModal = useCallback((id?: string) => {
            showModal({ title: 'Deletar Categoria', onConfirm: () => { deleteCategoria(id) }, 
            styleButton: styles.redButton, iconType: 'warn', confirmBtn: 'Deletar', 
            content: `Tem certeza que deseja excluir a categoria ${categoriaById(id)?.nome}?`})
        }, [categoriaById, deleteCategoria, showModal])
        
    const deleteMultModal = () => showModal({ title: 'Deletar Categorias', onConfirm: deleteCategorias, styleButton: styles.redButton, iconType: 'warn', confirmBtn: 'Deletar', content: 'Tem certeza que deseja excluir Todas as Categorias Selecionadas?' })

    const handleSearch = async (query: string) => {
        const paginatedData = {
            currentPage: 1,
            perPage,
            search: query
        }
        onPageChanged(paginatedData)
    }

    const sortCategorias = () => {
        let sortedCategorias: any = []        
        sortedCategorias = currentCategorias.sort((a: any, b: any) => {
            return sorted
                ? a.nome.toLowerCase().localeCompare(b.nome.toLowerCase())
                : b.nome.toLowerCase().localeCompare(a.nome.toLowerCase());
        })
        
        setSorted(!sorted)
        setFilteredCategorias(sortedCategorias)    
    }

    const handleSelectCategoria = (evt: any) => {
        const categoriaId = evt.target.value

        if (!checkedCategorias.includes(categoriaId)) {
            setCheckedCategorias([...checkedCategorias, categoriaId])
        } else {
            setCheckedCategorias(checkedCategorias.filter((checkedCategoriaId: any) => {
                return checkedCategoriaId !== categoriaId
            }))
        }
    }

    const handleSelectAllCategorias = () => {
        if (checkedCategorias?.length < currentCategorias?.length) {
            setCheckedCategorias(currentCategorias.map(({ id }: any) => id));
        } else {
            setCheckedCategorias([]);
        }
    };

    const deleteCategorias = async () => {
        try {
            await client.delete('/categoria/multiples', { data: { ids: checkedCategorias} })
                .then(() => {
                    setCheckedCategorias([])
                    alertService.success('As espécies foram deletadas com SUCESSO!!!')
                    loadCategorias()
                    hideModal()
                })
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="flex flex-row items-center justify-between p-6">
                <h1 className="font-bold text-2xl font-roboto text-custom-green">Categoria de Espécies</h1>
                <Link
                    href='/categoria-especie/add'
                    className="px-6 py-2 text-white bg-custom-green hover:bg-custom-green/75 rounded-md hover:cursor-pointer"
                >
                    Adicionar
                </Link>
            </div>
            {loading ? (<div className="flex flex-row items-center justify-center h-56">Loading...</div>) : (
                <div className="flex flex-col p-6 text-sm">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-custom-green rounded-lg">
                        <div className="flex flex-row w-2/5 md:w-2/6 lg:w-1/6 px-2 items-center justify-between">
                    
                            <label htmlFor="perPage" className="px-1 block mb-2 font-medium text-white">por Página</label>
                       
                            <select
                                value={perPage}
                                onChange={(evt: any) => changeItemsPerPage(evt.target.value)}
                                id="perPage" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>

                        <div className="flex flex-row w-4/12 lg:flex-col lg:items-center lg:justify-items-center py-4 px-4">
                        
                            <div className="lg:flex lg:flex-wrap">
                                <div className="flex items-center pr-4 text-white">POA: </div>
                                <div className="w-60">
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
                        <div className="w-72 px-4 text-white">Pesquisar Categoria:</div>
                        <div className="w-full px-4">
                            <Input
                                label="Pesquisar Espécie"
                                id="search"
                                name="search"
                                onChange={(e: any) => handleSearch(e.target.value)}
                                className=
                                'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50'
                                
                            />
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-between overflow-x-auto mt-2">
                        <div className="shadow overflow-y-auto border-b border-gray-200 w-full sm:rounded-lg">
                            {checkedCategorias.length > 0 && (
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
                    <thead className="bg-gray-light">
                        <tr>
                            <th>
                                <div className="flex justify-center">
                                <input  
                                    checked={checkedCategorias?.length === currentCategorias?.length}
                                    onChange={handleSelectAllCategorias}                
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"
                                />
                                </div>
                            </th>
                            <th
                                className="w-4/12"
                                onClick={() => sortCategorias()}
                            >
                                <div className="flex flex-row items-center px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer">
                                    Nome
                                    {sorted
                                        ? (<ChevronUpIcon className="w-5 h-5" />)
                                        : (<ChevronDownIcon className="w-5 h-5" />)
                                    }
                                </div>        
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                            >
                                Fuste
                            </th>
                            <th
                                scope="col"
                                className="w-1/12 px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                            >
                                Diametro Mínimo
                            </th>
                            <th
                                scope="col"
                                className="w-1/12 px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                            >
                                Diametro Máximo
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer"
                            >
                                Altura
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer"
                            >
                                Volume
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer"
                            >
                                Preservada
                            </th>            
                            <th scope="col" className="relative w-1/12 px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredCategorias?.map((categoria: CategoriaEspecieType) => (
                        <tr key={categoria.id}>
                            <td className="flex justify-center">
                                <input                 
                                    value={categoria?.id}
                                    checked={checkedCategorias.includes(categoria?.id)}
                                    onChange={handleSelectCategoria}
                                    id="categoriaId"
                                    type="checkbox"
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                />    
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <div className="flex flex-col items-starter">
                                    <div className="text-sm font-medium text-gray-900">{categoria?.nome}</div>
                                </div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{getFuste(Number(categoria?.criterio_fuste))}</div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                    <div className="text-sm text-gray-500">{categoria?.criterio_dminc}</div>
                                </span>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                    <div className="text-sm text-gray-500">{categoria?.criterio_dmaxc}</div>
                                </span>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                    <div className="text-sm text-gray-500">{categoria?.criterio_altura}</div>
                                </span>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                    <div className="text-sm text-gray-500">{categoria?.criterio_volume}</div>
                                </span>
                            </td> 
                            <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                    <div className="text-sm text-gray-500">
                                        {
                                            categoria?.preservar
                                                ? (<div>Sim</div>)
                                                : (<div>Não</div>)
                                        }
                                    </div>
                                </span>
                            </td>     
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center">
                                <Link href={`/categoria-especie/update/${categoria.id}`}>
                                    <PencilIcon className="w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" />
                                </Link>
                                <Link href="#" onClick={() => deleteSingleModal(categoria.id)}>
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
