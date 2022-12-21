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
import { useAppDispatch, useAppSelector } from "store/hooks"
import { RootState } from "store"
import { OptionType, Select } from "../Select"
import { ProjetoContext } from "contexts/ProjetoContext"
import { setUmf, UmfType } from "../../store/umfSlice"
import { setUpa } from "../../store/upaSlice"
import { setUt } from "../../store/utSlice"
import CSVTable from "../csv-table"

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
    const [inventario, setInventario] = useState<any>()

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
        // setFilteredArvores(currentArvores)
    }, [currentArvores, currentPage, defaultUmfsOptions, defaultUpasOptions])

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
        const data = upa.tipo === 0 ? [
            { ut: 1, numero_arvore: 1, especie: 'Abiu', dap: 10, altura: 20.0, qf: 1, ponto_gps: 1, latitude: 2.565, longitude: 0.56, obs: '', comentario: '' },
            { ut: 1, numero_arvore: 2, especie: 'Abiu', dap: 15, altura: 17.3, qf: 1, ponto_gps: 2, latitude: 7.544, longitude: 1.24, obs: '', comentario: '' },
            { ut: 1, numero_arvore: 3, especie: 'Especie Teste', dap: 13.5, altura: 15.4, qf: 1, ponto_gps: 3, latitude: 14.224, longitude: 4.67, obs: '', comentario: ''},
        ] : [
            { ut: 1, faixa: 1, numero_arvore: 1, especie: 'Abiu', dap: 10, altura: 20.0, qf: 1, orient_x: 'D', coord_x: 7.5, coord_y: 10, obs: '', comentario: '' },
            { ut: 1, faixa: 1, numero_arvore: 2, especie: 'Abiu', dap: 15, altura: 17.3, qf: 1, orient_x: 'D', coord_x: 12.5, coord_y: 10, obs: '', comentario: '' },
            { ut: 1, faixa: 1, numero_arvore: 3, especie: 'Especie Teste', dap: 13.5, altura: 15.4, qf: 1, orient_x: 'D', coord_x: 22.4, coord_y: 10, obs: '', comentario: ''},
        ]
        
        CsvDataService.exportToCsv(upa.tipo === 0 ? 'template_inventario_gps' : 'template_inventario_xy', data)
    }

    const handleImportInventario = async () => {
        try {
            setLoading(true)
            if (filteredArvores.length === 0) {
                alertService.error('Por favor, carregue primeiramente a planilha!')
                setLoading(false)
            } else {
                await client.post(`/arvore/import-inventario?upaId=${upa?.id}`, filteredArvores)
                .then((response: any) => {
                    const { error, message } = response.data
                    if (!error) {
                        alertService.success(message)
                    } else {
                        alertService.error(message)
                    }
                    setLoading(false)
                    console.log(response)
                })
            }

            
        } catch(e) {

        }
    }

    const handleLoadInventario = async (e: any) => {
        try {
            window.removeEventListener('focus', handleFocusBack)
            if (e.target?.value.length) {
                const formData = new FormData()
                formData.append('file', e.target?.files[0])
                setLoading(true)
                await client.post(`/arvore/load-csv?upaId=${upa?.id}`, formData)
                    .then((response: any) => {
                        const { error, message, arvores } = response.data
                        if (!error) {
                            alertService.success(message) 
                            setFilteredArvores(arvores.slice(1))
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
                        <span className="ml-2">{uploading ? "Abrindo..." : "Abrir Planilha"}</span>
                    </a>
                    <input
                        disabled={uploading} 
                        onChange={handleLoadInventario}
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
                <a
                    onClick={handleImportInventario}
                    className="px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer"
                >
                    Importar
                </a>
            </div>
                <div className="flex flex-col p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-gray-100 rounded-lg">
                        <div className="flex flex-col px-4 w-auto">
                            <div className="w-full">
                                <label htmlFor="perPage" className="px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">por Página</label>
                            </div>
                            <select
                                value={perPage}
                                onChange={(evt: any) => changeItemsPerPage(evt.target.value)}
                                id="perPage" 
                                className="w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4">
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
                                    callback={selectUmf}
                                />
                            </div>
                            {/* <div className="w-3/12 flex items-center px-2">UPA: </div> */}
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
                        </div>
                        <div className="w-full px-4">
                            <label htmlFor="procurar_ut">Pesquisar UT:</label>
                            <Input
                                label="Pesquisar UT"
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
                        <thead className="bg-gray-50">
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
                                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer"
                                    onClick={() => sortArvores('ut')}
                                >
                                    <div className="flex flex-row w-full justify-between">
                                        UT
                                        {sorted
                                            ? (<ChevronUpIcon className="w-5 h-5" />)
                                            : (<ChevronDownIcon className="w-5 h-5" />)
                                        }
                                    </div>   
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer"
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
                                
                                {(upa.tipo === 1) ? (
                                    <>
                                        <th
                                            scope="col"
                                            className="justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer"
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
                                            className="justify-between items-center px-2 py-2 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer"
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
                                            scope="col"
                                            className="justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer"
                                            onClick={() => sortArvores('coord_x')}
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
                                            scope="col"
                                            className="justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer"
                                            onClick={() => sortArvores('coord_y')}
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
                                            scope="col"
                                            className="justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer"
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
                                            scope="col"
                                            className="justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer"
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
                                    className="justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer"
                                    onClick={() => sortArvores('especie')}
                                >
                                    <div className="flex flex-row w-full justify-between">
                                        Espécie
                                        {sorted
                                            ? (<ChevronUpIcon className="w-5 h-5" />)
                                            : (<ChevronDownIcon className="w-5 h-5" />)
                                        }
                                    </div>   
                                </th>
                                <th
                                    scope="col"
                                    className="justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer"
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
                                    className="justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer"
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
                                <th scope="col" className="relative w-1/8 px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredArvores?.map((arvore: any, key: any) => (
                                <tr key={key}>
                                <td className="flex justify-center">
                                <input                 
                                        value={arvore?.ut}
                                        checked={checkedArvores.includes(arvore?.id)}
                                        onChange={handleSelectArvore}
                                        id="arvoreId"
                                        type="checkbox"
                                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                    />    
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{arvore.ut}</div>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{arvore.numero_arvore}</div>
                                </td>
                                {(upa.tipo === 1) ? (
                                    <>
                                        <td className="px-3 py-2 whitespace-nowrap">
                                            <div className="flex flex-col items-starter">
                                                
                                                <div className="text-gray-900">{arvore?.faixa}</div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap">
                                        <span className="text-gray-900">
                                            <div className="text-sm text-gray-500">{arvore.orient_x}</div>
                                        </span>
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap">
                                        <span className="text-gray-900">
                                            <div className="text-sm text-gray-500">{arvore.coord_x}</div>
                                        </span>
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap">
                                        <span className="text-gray-900">
                                            <div className="text-sm text-gray-500">{arvore.coord_y}</div>
                                        </span>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="px-3 py-2 whitespace-nowrap">
                                        <span className="text-gray-900">
                                            <div className="text-sm text-gray-500">{arvore.lat_x}</div>
                                        </span>
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap">
                                        <span className="text-gray-900">
                                            <div className="text-sm text-gray-500">{arvore.long_y}</div>
                                        </span>
                                        </td>
                                    </>
                                )}
                                
                                <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-xs text-gray-900">
                                    <div className="text-sm text-gray-500">{arvore.especie}</div>
                                </span>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-gray-900">
                                    <div className="text-sm text-gray-500">{arvore.dap}</div>
                                </span>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-gray-900">
                                    <div className="text-sm text-gray-500">{arvore.altura}</div>
                                </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right flex flex-row items-center">
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
