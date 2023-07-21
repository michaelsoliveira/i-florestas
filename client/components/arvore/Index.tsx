import { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from "react"
import { Link } from "../Link"
import { Loading } from "../Loading"
import { Input } from "../atoms/input"
import { TrashIcon, PencilAltIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import alertService from '../../services/alert'
import { AuthContext } from "../../contexts/AuthContext"
import { useModalContext } from "contexts/ModalContext"
import { LoadingContext } from "contexts/LoadingContext"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { RootState } from "store"
import { OptionType, Select } from "../Select"
import { ProjetoContext } from "contexts/ProjetoContext"
import { setUmf, UmfType } from "../../store/umfSlice"
import { setUpa } from "../../store/upaSlice"
import { setUt } from "../../store/utSlice"

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
    const [uts, setUts] = useState<any>()
    const umf = useAppSelector((state: RootState) => state.umf)
    const upa = useAppSelector((state: RootState) => state.upa)
    const ut = useAppSelector((state: RootState) => state.ut)
    const [selectedUmf, setSelectedUmf] = useState<OptionType>()
    const [selectedUpa, setSelectedUpa] = useState<OptionType>()
    const [selectedUt, setSelectedUt] = useState<OptionType>()
    const { projeto } = useContext(ProjetoContext)

    const dispatch = useAppDispatch()

    const styleDelBtn = 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
    const arvoreById = useCallback((id?: string) => {
        return currentArvores.find((arvore: any) => arvore.id === id)
    }, [currentArvores])

    const loadUpas = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const response = await client.get(`/upa/search/q?descricao=${inputValue}`)
        const data = response.data
        
        callback(data?.map((upa: any) => ({
            value: upa.id,
            label: upa.descricao
        })))
    }

    const loadUts = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const response = await client.get(`/ut/search/q?numero_ut=${inputValue}`)
        const data = response.data
        
        callback(data?.map((ut: any) => ({
            value: ut.id,
            label: ut.numero_ut
        })))
    }

    const loadUmfs = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const response = await client.get(`/umf/search/q?nome=${inputValue}`)
        const data = response.data
        
        callback(data?.map((umf: any) => ({
            value: umf.id,
            label: umf.nome
        })))
    }

    const defaultUmfsOptions = useCallback(async() => {
        const response = await client.get(`/umf/find-by-projeto/${projeto?.id}?orderBy=nome&order=asc`)
        
            const { umfs } = response.data
            setUmfs(umfs)

            const compareUmf = umfs ? umfs.find((u: any) => u.id === umf.id) : null
            
            if (compareUmf) {
                setSelectedUmf({
                    value: umf?.id,
                    label: umf?.nome
                })
            }

            if (umfs.length === 0) {
                setSelectedUmf({
                    value: '0',
                    label: 'Nenhuma UMF Cadastrada'
                })
            } 
    }, [client, projeto?.id, umf.id, umf?.nome])

    const defaultUpasOptions = useCallback(async () => {
        const response = await client.get(`/upa?orderBy=descricao&order=asc&umf=${umf?.id}`)
            const { upas } = response.data
            setUpas(upas)
            if (upas.length === 0) {
                setSelectedUpa({
                    value: '0',
                    label: 'Nenhuma UPA Cadastrada'
                })
            }

            const compareUpa = upas ? upas.find((u: any) => u.id === upa.id) : null

            if (compareUpa) {
                setSelectedUpa({
                    value: upa?.id,
                    label: upa?.descricao
                })
            }
    }, [client, umf?.id, upa?.descricao, upa.id])

    const defaultUtsOptions = useCallback(async () => {
        const response = await client.get(`/ut?orderBy=nome&order=asc&upa=${upa?.id}`)
        const { uts } = response.data
            setUts(uts)
            if (uts && uts.length === 0) {
                setSelectedUt({
                    value: '0',
                    label: 'Nenhuma UT Cadastrada'
                })
            }

            const compareUt = uts ? uts.find((u: any) => u.id === ut.id) : null

            if (compareUt) {
                setSelectedUt({
                    value: ut?.id,
                    label: ut?.numero_ut.toString()
                })
            }
    }, [client, upa?.id, ut.id, ut?.numero_ut])

    const selectUmf = async (umf: any) => {
        dispatch(setUmf({
            id: umf.value,
            nome: umf.label
        }))
        setSelectedUmf(umf)
        const response = await client.get(`/upa?orderBy=descricao&order=asc&umf=${umf.value}`)
        const { upas } = response.data
        
        setUpas(upas)
    }

    const selectUpa = async (upa: any) => {
        const upaSelected = upas.find((u: any) => u.id === upa.value)
        
        dispatch(setUpa({
            id: upaSelected.id,
            descricao: upaSelected.descricao,
            tipo: Number.parseInt(upaSelected.tipo)
        }))
        setSelectedUpa(upa)

        const response = await client.get(`/ut?orderBy=nome&order=asc&upa=${upaSelected.id}`)
        const { uts } = response.data

        dispatch(setUt({
            id: uts[0]?.id,
            numero_ut: uts[0].numero_ut
        }))
        
        setUts(uts)
        
    }

    const selectUt = async (ut: any) => {
        
        const utSelected = uts.find((u: any) => u.id === ut.value)

        dispatch(setUt({
            id: utSelected.id,
            numero_ut: utSelected.numero_ut,
        }))
        
        setSelectedUt(ut)
        const paginatedData = {
            currentPage: 1,
            perPage,
            orderBy,
            order,
            totalItems: filteredArvores ? filteredArvores.length : 0
        }
        
        onPageChanged(paginatedData)
    }

    function getUmfsDefaultOptions() {
        return umfs?.map((umf: any) => {
            return {
                label: umf.nome,
                value: umf.id
            }
        })
    }

    function getUpasDefaultOptions() {
        return upas?.map((upa: any) => {
            return {
                label: upa.descricao,
                value: upa.id
            }
        })
    }

    function getUtsDefaultOptions() {
        return uts?.map((ut: any) => {
            return {
                label: ut.numero_ut,
                value: ut.id
            }
        })
    }

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
        defaultUmfsOptions()
        defaultUpasOptions()
        defaultUtsOptions()
        setFilteredArvores(currentArvores)
    }, [currentArvores, currentPage, defaultUmfsOptions, defaultUpasOptions, defaultUtsOptions])

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

    const handleSearch = async (evt: ChangeEvent<HTMLInputElement>) => {
        const paginatedData = {
            currentPage: 1,
            perPage,
            orderBy,
            order,
            search: evt.target?.value
        }
        setSearchInput(evt.target?.value)
        onPageChanged(paginatedData)
    }

    const sortArvores = (sortBy: string) => {
        const sortedBy = sortBy.split(".")
        const nElements = sortedBy.length
        console.log(sortBy)
        let sortedArvores: any = []        
        const tiposNumericos = ['numero_arvore', 'lat_x', 'long_y', 'lat', 'lng']
        sortedArvores = filteredArvores.sort((a: any, b: any) => {
            if (!tiposNumericos.includes(sortBy)) {
                return sorted ?
                nElements > 1
                ? a[sortedBy[0]][sortedBy[1]].toLowerCase().localeCompare(b[sortedBy[0]][sortedBy[1]].toLowerCase()) 
                : a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase())
            : nElements > 1 
                ? b[sortedBy[0]][sortedBy[1]].toLowerCase().localeCompare(a[sortedBy[0]][sortedBy[1]].toLowerCase()) 
                : b[sortBy].toLowerCase().localeCompare(a[sortBy].toLowerCase());
            } else {
                return sorted ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
            }
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
            <div className="flex flex-row items-center justify-between p-6 bg-gray-100">
                <h1 className="font-medium text-2xl font-roboto">Árvores</h1>
                <Link
                    href='/arvore/add'
                    className="px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer"
                >
                    Adicionar
                </Link>
            </div>
                <div className="flex flex-col p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-gray-100 rounded-lg">
                        <div className="flex flex-col px-4 w-auto">
                            <div className="w-full">
                                <label htmlFor="perPage" className="px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">por Página</label>
                            </div>
                            <select
                                value={perPage}
                                onChange={(evt: any) => changeItemsPerPage(evt)}
                                id="perPage" 
                                className="w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4">
                            {/* <div className="w-3/12 flex items-center px-2">UMF: </div> */}
                            <div>
                                <Select
                                    initialData={
                                        {
                                            label: 'Selecione UMF...',
                                            value: ''
                                        }
                                    }
                                    selectedValue={selectedUmf}
                                    defaultOptions={getUmfsDefaultOptions()}
                                    options={loadUmfs}
                                    label="UMF:"
                                    callback={(e) => {selectUmf(e)}}
                                />
                            </div>
                            <div>
                                <Select
                                    initialData={
                                        {
                                            label: 'Selecione UPA...',
                                            value: ''
                                        }
                                    }
                                    selectedValue={selectedUpa}
                                    defaultOptions={getUpasDefaultOptions()}
                                    options={loadUpas}
                                    label="UPA:"
                                    callback={(e) => {selectUpa(e)}}
                                />
                            </div>
                            <div>
                                <Select
                                    initialData={
                                        {
                                            label: 'Selecione UT...',
                                            value: ''
                                        }
                                    }
                                    selectedValue={selectedUt}
                                    defaultOptions={getUtsDefaultOptions()}
                                    options={loadUts}
                                    label="UT:"
                                    callback={(e) => {selectUt(e)}}
                                />
                            </div>
                        </div>
                        <div className="w-full px-4 pt-4 lg:pt-0">
                            <label htmlFor="procurar_ut">Pesquisar Árvore:</label>
                            <Input
                                label="Pesquisar UT"
                                id="search"
                                name="search"
                                value={searchInput}
                                onChange={handleSearch}
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
                        {upa?.tipo === 1 ? (
                            <>
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
                            </>
                        ) : (
                            <>
                                <th
                                scope="row"
                                className="justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => sortArvores('lat_x')}
                            >
                                <div className="flex flex-row w-full justify-between">
                                    Latitude
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
                                    Longitude
                                    {sorted
                                        ? (<ChevronUpIcon className="w-5 h-5" />)
                                        : (<ChevronDownIcon className="w-5 h-5" />)
                                    }
                                </div>   
                            </th>
                            </>
                        )}
                        
                        <th
                            scope="col"
                            className="items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortArvores('dap')}
                        >
                            <div className="flex flex-row w-full justify-between">
                                DAP
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </div>   
                        </th>
                        <th
                            scope="col"
                            className="items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortArvores('altura')}
                        >
                            <div className="flex flex-row w-full justify-between">
                                Altura
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </div>   
                        </th>
                        <th
                            scope="col"
                            className="items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortArvores('volume')}
                        >
                            <div className="flex flex-row w-full justify-between">
                                Volume
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
                                
                                <div className="text-sm font-medium text-gray-900">{arvore?.numero_arvore}</div>
                            </div>
                            </td>
                            {(upa?.tipo === 1) ? (
                                <>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{arvore?.faixa}</div>
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                    <span className="text-sm font-medium text-gray-900">
                                        <div className="text-sm text-gray-500">{arvore?.orient_x}</div>
                                    </span>
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                    <span className="text-sm font-medium text-gray-900">
                                        <div className="text-sm text-gray-500">{arvore.lat_x}</div>
                                    </span>
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                    <span className="text-sm font-medium text-gray-900">
                                        <div className="text-sm text-gray-500">{arvore?.long_y}</div>
                                    </span>
                                    </td>
                                </>
                            ) : (
                                <>
                                <td className="px-3 py-2 whitespace-nowrap">
                                    <span className="text-sm font-medium text-gray-900">
                                        <div className="text-sm text-gray-500">{arvore?.lat ? arvore?.lat : arvore?.lat_x}</div>
                                    </span>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                    <span className="text-sm font-medium text-gray-900">
                                        <div className="text-sm text-gray-500">{arvore?.lng ? arvore?.lng : arvore?.long_y}</div>
                                    </span>
                                </td>
                                </>
                            )}
                            <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                    <div className="text-sm text-gray-500">{arvore?.dap}</div>
                                </span>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                    <div className="text-sm text-gray-500">{arvore?.altura}</div>
                                </span>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                    <div className="text-sm text-gray-500">{arvore?.volume}</div>
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
