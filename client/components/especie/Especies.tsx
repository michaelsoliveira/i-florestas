import { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from "react"
import { Link } from "../../components/Link"
import { Loading } from "../../components/Loading"
import { Input } from "../../components/atoms/input"
import { TrashIcon, PencilAltIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import alertService from '../../services/alert'
import { AuthContext } from "../../contexts/AuthContext"
import { EspecieType } from "types/IEspecieType"
import { useModalContext } from "contexts/ModalContext"
import Modal from "../Modal"
import { LoadingContext } from "contexts/LoadingContext"

const Especies = ({ currentEspecies, onPageChanged, orderBy, order, changeItemsPerPage, currentPage, perPage, loadEspecies }: any) => {
    
    const [filteredEspecies, setFilteredEspecies] = useState<EspecieType[]>(currentEspecies)
    const [selectedEspecie, setSelectedEspecie] = useState<EspecieType>()
    const [searchInput, setSearchInput] = useState("")
    const [uploading, setUploading] = useState<boolean>(false)
    const { client } = useContext(AuthContext)
    const fileRef = useRef(null) as any
    const [sorted, setSorted] = useState(false)
    const [checkedEspecies, setCheckedEspecies] = useState<any>([])
    const { showModal, hideModal, store } = useModalContext()
    const { visible } = store
    const { setLoading } = useContext(LoadingContext)

    const styleDelBtn = 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
    const especieById = useCallback((id?: string) => {
        return currentEspecies.find((especie: EspecieType) => especie.id === id)
    }, [currentEspecies])

    const deleteEspecie = useCallback(async (id?: string) => {
        
        try {
            client.delete(`/especie/single/${id}`)
                .then((response: any) => {
                    const { data: error, message } = response
                    if (!error) {
                        alertService.success(message)
                        loadEspecies()
                        hideModal()
                    }
                })
        } catch (error) {
            console.log(error)
        }       
    }, [client, hideModal, loadEspecies])
    
    const deleteSingleModal = useCallback((id?: string) => {
            const especie = especieById(id)
            showModal({ title: 'Deletar Espécie', onConfirm: () => { deleteEspecie(id) }, styleButton: styleDelBtn, iconType: 'warn', confirmBtn: 'Deletar', content: `Tem certeza que deseja excluir a Espécie ${especie?.nome}?`})
        }, [especieById, showModal, deleteEspecie])
        
    const deleteMultModal = () => showModal({ title: 'Deletar Espécies', onConfirm: deleteEspecies, styleButton: styleDelBtn, iconType: 'warn', confirmBtn: 'Deletar', content: 'Tem certeza que deseja excluir Todas as Espécies Selecionadas?' })

    useEffect(() => {
        setFilteredEspecies(currentEspecies)
    }, [currentEspecies, currentPage])

    const deleteEspecies = async () => {
        setLoading(true)
        try {
            await client.delete('/especie/multiples', { data: { ids: checkedEspecies} })
                .then(() => {
                    setCheckedEspecies([])
                    alertService.success('As espécies foram deletadas com SUCESSO!!!')
                    loadEspecies()
                    hideModal()
                })
        setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleImportEspecies = async (e: any) => {
        try {
            window.removeEventListener('focus', handleFocusBack)
            if (e.target?.value.length) {
                const formData = new FormData()
                formData.append('file', e.target?.files[0])
                setLoading(true)
                await client.post('/especie/import', formData)
                    .then((response: any) => {
                        console.log(response)
                        const { error, message } = response.data
                        
                        if (!error) {
                            alertService.success(message) 
                            loadEspecies()
                            setLoading(false)
                        } else {
                            setLoading(false)
                            console.log(message)
                        }
                    }).catch(() => {
                        setLoading(false)
                    })
            }
        } catch(e) {
            setLoading(false)
        }
    }

    const handleFocusBack = () => {
        setUploading(false)
        window.removeEventListener('focus', handleFocusBack)
    }

    const openFile = () => {
        fileRef.current?.click()
        setUploading(true)
        window.addEventListener('focus', handleFocusBack)
    }

    const handleSearch = async (evt: ChangeEvent<HTMLInputElement>) => {
        const paginatedData = {
            currentPage: 1,
            perPage,
            orderBy,
            order,
            search: evt.target.value
        }
        
        setSearchInput(evt.target.value)
        onPageChanged(paginatedData)
    }

    const sortEspecies = (sortBy: string) => {
        const sortedBy = sortBy.split(".")
        const nElements = sortedBy.length
        
        let sortedEspecies: any = []        
        sortedEspecies = filteredEspecies.sort((a: any, b: any) => {
            return  sorted
                ? nElements > 1 
                    ? a[sortedBy[0]][sortedBy[1]].toLowerCase().localeCompare(b[sortedBy[0]][sortedBy[1]].toLowerCase()) 
                    : a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase())
                : nElements > 1 
                    ? b[sortedBy[0]][sortedBy[1]].toLowerCase().localeCompare(a[sortedBy[0]][sortedBy[1]].toLowerCase()) 
                    : b[sortBy].toLowerCase().localeCompare(a[sortBy].toLowerCase());
        })
        
        setSorted(!sorted)
        setFilteredEspecies(sortedEspecies)    
    }

    const handleSelectEspecie = (evt: any) => {
        const especieId = evt.target.value

        if (!checkedEspecies.includes(especieId)) {
            setCheckedEspecies([...checkedEspecies, especieId])
        } else {
            setCheckedEspecies(checkedEspecies.filter((checkedEspecieId: any) => {
                return checkedEspecieId !== especieId
            }))
        }
    }

    const handleSelectAllEspecies = () => {
        if (checkedEspecies.length < currentEspecies.length) {
            setCheckedEspecies(currentEspecies.map(({ id }: any) => id));
        } else {
            setCheckedEspecies([]);
        }
    };

    return (
        <div>
            {visible && (<Modal />)}
            <div className="flex flex-row items-center justify-between p-6 bg-gray-100">
                <h1 className="font-medium text-2xl font-roboto">Espécies</h1>
                <div className="relative w-64">
                    <button
                        onClick={openFile}
                        disabled={uploading}
                        className="bg-indigo hover:bg-indigo-dark text-green-700 font-bold py-2 px-4 w-full inline-flex items-center"
                    >
                        <svg className="fill-green-700" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                        </svg>
                        <span className="ml-2">{uploading ? "Importando..." : "Importar Espécies"}</span>
                    </button>
                    <input
                        disabled={uploading} 
                        onChange={handleImportEspecies}
                        ref={fileRef}
                        type="file"
                        className="cursor-pointer absolute block opacity-0 pin-r pin-t"  
                        name="fileRef"
                    />
                </div>
                <Link
                    href='/especie/add'
                    className="px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer"
                >
                    Adicionar
                </Link>
            </div>
                <div className="flex flex-col p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-gray-100 rounded-lg">
                        <div className="flex flex-row w-2/12 px-2 items-center justify-between">
                            <div className="w-full">
                                <label htmlFor="perPage" className="px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">por Página</label>
                            </div>
                            <select
                                value={perPage}
                                onChange={changeItemsPerPage}
                                id="perPage" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                        <div className="w-60 px-4">Pesquisar Espécie:</div>
                        <div className="w-full px-4">
                            <Input
                                label="Pesquisar Espécie"
                                id="search"
                                name="search"
                                value={searchInput}
                                onChange={handleSearch}
                                autoFocus
                                className=
                                'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50'
                                
                            />
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-between overflow-x-auto mt-2">
                        <div className="shadow overflow-y-auto border-b border-gray-200 w-full sm:rounded-lg">
                            {checkedEspecies?.length > 0 && (
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
                    <thead className="bg-gray-50 w-full">
                        <tr>
                        <th>
                            <div className="flex justify-center">
                            <input  
                                checked={checkedEspecies?.length === currentEspecies?.length}
                                onChange={handleSelectAllEspecies}                
                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"
                            />
                            </div>
                        </th>
                        <th
                            scope="col"
                            className="justify-between items-center px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortEspecies('nome')}
                        >
                            <div className="flex flex-row w-full justify-between">
                                Nome
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </div>                 
                        </th>
                        <th
                            scope="row"
                            className="justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortEspecies('nome_orgao')}
                        >
                            <div className="flex flex-row w-full justify-between">
                                Nome Vulgar
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </div>   
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortEspecies('nome_cientifico')}
                        >
                            <div className="flex flex-row w-full justify-between">
                                Nome Científico
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </div>   
                        </th>
                        <th
                            scope="col"
                            className="flex flex-row items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortEspecies('categoria_especie.nome')}
                        >
                            <div className="flex flex-row w-full justify-between">
                                Categoria
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </div>   
                        </th>
                        <th scope="col" className="relative w-1/12 px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredEspecies?.map((especie: any) => (
                            <tr key={especie.id}>
                            <td className="flex justify-center">
                            <input                 
                                    value={especie?.id}
                                    checked={checkedEspecies.includes(especie?.id)}
                                    onChange={handleSelectEspecie}
                                    id="especieId"
                                    type="checkbox"
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                />    
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                            <div className="flex flex-col items-starter">
                                
                                <div className="text-sm font-medium text-gray-900">{especie?.nome}</div>
                            </div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{especie.nome_orgao}</div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                                <div className="text-sm text-gray-500">{especie.nome_cientifico}</div>
                            </span>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                                <div className="text-sm text-gray-500">{especie.categoria_especie?.nome}</div>
                            </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center">
                            <Link href={`/especie/update/${especie.id}`}>
                                <PencilAltIcon className="w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" />
                            </Link>
                            <Link href="#" onClick={() => deleteSingleModal(especie.id)}>
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
            
    </div>
    )
}

export default Especies
