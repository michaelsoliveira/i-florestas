import { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from "react"
import { Link } from "../Link"
import { Loading } from "../Loading"
import { Input } from "../atoms/input"
import { TrashIcon, PencilAltIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import alertService from '../../services/alert'
import { AuthContext } from "../../contexts/AuthContext"
import { useModalContext } from "contexts/ModalContext"
import Modal from "../Modal"
import { LoadingContext } from "contexts/LoadingContext"
import { CsvDataService } from "services/create-csv"
import { useAppSelector } from "store/hooks"
import { RootState } from "store"
import { OptionType } from "../Select"
import { ProjetoContext } from "contexts/ProjetoContext"

const Index = ({ currentArvores, onPageChanged, orderBy, order, changeItemsPerPage, currentPage, perPage, loadArvores }: any) => {
    
    const [filteredArvores, setFilteredArvores] = useState<any[]>(currentArvores)
    const [selectedArvore, setSelectedArvore] = useState<any>()
    const [searchInput, setSearchInput] = useState("")
    const [uploading, setUploading] = useState<boolean>(false)
    const { client } = useContext(AuthContext)
    const fileRef = useRef(null) as any
    const [sorted, setSorted] = useState(false)
    const [checkedArvores, setCheckedArvores] = useState<any>([])
    const { showModal, hideModal, store } = useModalContext()
    const { visible } = store
    const { setLoading } = useContext(LoadingContext)
    const [umfs, setUmfs] = useState<any>()
    const [upas, setUpas] = useState<any>()
    const umf = useAppSelector((state: RootState) => state.umf)
    const upa = useAppSelector((state: RootState) => state.upa)
    const ut = useAppSelector((state: RootState) => state.ut)
    const [selectedUmf, setSelectedUmf] = useState<OptionType>()
    const [selectedUpa, setSelectedUpa] = useState<OptionType>()
    const [selectedUt, setSelectedUt] = useState<OptionType>()
    const { projeto } = useContext(ProjetoContext)

    const styleDelBtn = 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
    const arvoreById = useCallback((id?: string) => {
        return currentArvores.find((arvore: any) => arvore.id === id)
    }, [currentArvores])

    const deleteArvore = useCallback(async (id?: string) => {
        try {
            client.delete(`/arvore/single/${id}`)
                .then((response: any) => {
                    const { error, message } = response.data
                    if (!error) {
                        alertService.success(message)
                        loadArvores()
                        hideModal()
                    }
                })
        } catch (error) {
            console.log(error)
        }       
    }, [client, hideModal, loadArvores])
    
    const deleteSingleModal = useCallback((id?: string) => {
            const arvore = arvoreById(id)
            showModal({ title: 'Deletar Árvore', onConfirm: () => { deleteArvore(id) }, styleButton: styleDelBtn, iconType: 'warn', confirmBtn: 'Deletar', content: `Tem certeza que deseja excluir a Árvore de número ${arvore?.numero_arvore}?`})
        }, [arvoreById, showModal, deleteArvore])
        
    const deleteMultModal = () => showModal({ title: 'Deletar Árvores', onConfirm: deleteArvores, styleButton: styleDelBtn, iconType: 'warn', confirmBtn: 'Deletar', content: 'Tem certeza que deseja excluir Todas as Árvores Selecionadas?' })

    useEffect(() => {
        setFilteredArvores(currentArvores)
    }, [currentArvores, currentPage])

    const deleteArvores = async () => {
        setLoading(true)
        try {
            await client.delete('/arvore/multiples', { data: { ids: checkedArvores} })
                .then(() => {
                    setCheckedArvores([])
                    alertService.success('As espécies foram deletadas com SUCESSO!!!')
                    loadArvores()
                    hideModal()
                })
        setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleImportTemplate = async () => {
        const data = [
            { ut: '1', faixa: '1', numero_arvore: '1', especie: 'Abiu', dap: 10, altura: 20, qf: 1, orientacao_x: 'D', coordenada_x: 2, coordenada_y: 4 },
            { ut: '1', faixa: '1', numero_arvore: '2', especie: 'Abiu', dap: 15, altura: 17.3, qf: 1, orientacao_x: 'D', coordenada_x: 7, coordenada_y: 10 },
            { ut: '1', faixa: '1', numero_arvore: '3', especie: 'Especie Teste', dap: 13.5, altura: 15.4, qf: 1, orientacao_x: 'D', coordenada_x: 21, coordenada_y: 20 },
        ]
        
        CsvDataService.exportToCsv('template_inventario', data)
    }

    const handleImportArvores = async (e: any) => {
        try {
            window.removeEventListener('focus', handleFocusBack)
            if (e.target?.value.length) {
                const formData = new FormData()
                formData.append('file', e.target?.files[0])
                setLoading(true)
                await client.post('/arvore/import', formData)
                    .then((response: any) => {
                        console.log(response)
                        const { error, message } = response.data
                        
                        if (!error) {
                            alertService.success(message) 
                            loadArvores()
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

    const sortArvores = (sortBy: string) => {
        const sortedBy = sortBy.split(".")
        const nElements = sortedBy.length
        
        let sortedArvores: any = []        
        sortedArvores = filteredArvores.sort((a: any, b: any) => {
            return  sorted
                ? nElements > 1 
                    ? a[sortedBy[0]][sortedBy[1]].toLowerCase().localeCompare(b[sortedBy[0]][sortedBy[1]].toLowerCase()) 
                    : a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase())
                : nElements > 1 
                    ? b[sortedBy[0]][sortedBy[1]].toLowerCase().localeCompare(a[sortedBy[0]][sortedBy[1]].toLowerCase()) 
                    : b[sortBy].toLowerCase().localeCompare(a[sortBy].toLowerCase());
        })
        
        setSorted(!sorted)
        setFilteredArvores(sortedArvores)    
    }

    const handleSelectArvore = (evt: any) => {
        const arvoreId = evt.target.value

        if (!checkedArvores.includes(arvoreId)) {
            setCheckedArvores([...checkedArvores, arvoreId])
        } else {
            setCheckedArvores(checkedArvores.filter((checkedArvoreId: any) => {
                return checkedArvoreId !== arvoreId
            }))
        }
    }

    const handleSelectAllArvore = () => {
        if (checkedArvores.length < currentArvores.length) {
            setCheckedArvores(currentArvores.map(({ id }: any) => id));
        } else {
            setCheckedArvores([]);
        }
    };

    return (
        <div>
            {visible && (<Modal />)}
            <div className="flex flex-row items-center justify-between p-6 bg-gray-100">
                <h1 className="font-medium text-2xl font-roboto">Árvores</h1>
                <div className="flex flex-row">
       
                    <a
                        onClick={openFile}
                        className="bg-indigo hover:bg-indigo-dark text-green-700 font-bold py-2 px-4 w-full inline-flex items-center hover:cursor-pointer"
                    >
                        <svg className="fill-green-700 w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                        </svg>
                        <span className="ml-2">{uploading ? "Importando..." : "Importar"}</span>
                    </a>
                    <input
                        disabled={uploading} 
                        onChange={handleImportArvores}
                        ref={fileRef}
                        type="file"
                        className="cursor-pointer absolute block opacity-0 pin-r pin-t"  
                        name="fileRef"
                    />
            
                </div>
                <div>
                    <a
                        onClick={handleImportTemplate}
                        className="bg-indigo hover:bg-indigo-dark text-green-700 font-bold py-2 px-4 w-full inline-flex items-center hover:cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>

                    <span className="ml-2">Modelo</span>
                    </a>
                </div>
                <Link
                    href='/arvore/add'
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
                        <div className="w-60 px-4">Pesquisar Árvore:</div>
                        <div className="w-full px-4">
                            <Input
                                label="Pesquisar Árvore"
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
                            {checkedArvores?.length > 0 && (
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
                                checked={checkedArvores?.length === currentArvores?.length}
                                onChange={handleSelectAllArvore}                
                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"
                            />
                            </div>
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortArvores('numero_arvore')}
                        >
                            <div className="flex flex-row w-full justify-between">
                                Número
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </div>   
                        </th>
                        <th
                            scope="row"
                            className="justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortArvores('faixa')}
                        >
                            <div className="flex flex-row w-full justify-between">
                                Faixa
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </div>   
                        </th>
                        <th
                            scope="col"
                            className="justify-between items-center px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortArvores('orient_x')}
                        >
                            <div className="flex flex-row w-full justify-between">
                                Orientação X
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </div>                 
                        </th>
                        <th
                            scope="row"
                            className="justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortArvores('lat_x')}
                        >
                            <div className="flex flex-row w-full justify-between">
                                Coord. X
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </div>   
                        </th>
                        <th
                            scope="row"
                            className="justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortArvores('long_y')}
                        >
                            <div className="flex flex-row w-full justify-between">
                                Coord. Y
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </div>   
                        </th>
                        <th
                            scope="col"
                            className="flex flex-row items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortArvores('especie.nome')}
                        >
                            <div className="flex flex-row w-full justify-between">
                                Espécie
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
                        {filteredArvores?.map((arvore: any) => (
                            <tr key={arvore.id}>
                            <td className="flex justify-center">
                            <input                 
                                    value={arvore?.id}
                                    checked={checkedArvores.includes(arvore?.id)}
                                    onChange={handleSelectArvore}
                                    id="arvoreId"
                                    type="checkbox"
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                />    
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                            <div className="flex flex-col items-starter">
                                
                                <div className="text-sm font-medium text-gray-900">{arvore?.nome}</div>
                            </div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{arvore.nome_orgao}</div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                                <div className="text-sm text-gray-500">{arvore.nome_cientifico}</div>
                            </span>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                                <div className="text-sm text-gray-500">{arvore.categoria_arvore?.nome}</div>
                            </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center">
                            <Link href={`/arvore/update/${arvore.id}`}>
                                <PencilAltIcon className="w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" />
                            </Link>
                            <Link href="#" onClick={() => deleteSingleModal(arvore.id)}>
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

export default Index
