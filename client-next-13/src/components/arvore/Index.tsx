'use client'

import { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from "react"
import { Link } from "../Link"
import { Input } from "../atoms/input"
import alertService from '@/services/alert'
import { AuthContext } from "../../context/AuthContext"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { RootState } from "@/redux/store"
import { OptionType, Select } from "../Select"
import { ProjetoContext } from "@/context/ProjetoContext"
import { setUmf, UmfType } from "@/redux/features/umfSlice"
import { setUpa } from "@/redux/features/upaSlice"
import { setUt } from "@/redux/features/utSlice"
import ListArvore from "./ListArvore"
import { useRouter } from "next/navigation"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport, faPlus } from "@fortawesome/free-solid-svg-icons"
import { LoadingContext } from "@/context/LoadingContext"
import { usePathname } from "next/navigation"
import { exportToCSV } from "@/components/Utils/ExportData"
import { paginate, setCurrentPagePagination } from "@/redux/features/paginationSlice"
import { Pagination } from "../Pagination"

const Index = () => {
    
    const [searchInput, setSearchInput] = useState("")
    const { client } = useContext(AuthContext)
    const [sorted, setSorted] = useState(false)
    const [umfs, setUmfs] = useState<any>()
    const [upas, setUpas] = useState<any>()
    const [uts, setUts] = useState<any>()
    const umf = useAppSelector((state: RootState) => state.umf)
    const upa = useAppSelector((state: RootState) => state.upa)

    const [selectedUmf, setSelectedUmf] = useState<OptionType>()
    const [selectedUpa, setSelectedUpa] = useState<OptionType>()
    const [selectedUt, setSelectedUt] = useState<OptionType>()
    const { projeto } = useContext(ProjetoContext)
    const { loading, setLoading } = useContext(LoadingContext)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [totalItems, setTotalItems] = useState(0)
    const [currentArvores, setCurrentArvores] = useState<any[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [orderBy, setOrderBy] = useState('numero_arvore')
    const [order, setOrder] = useState('asc')
    const pagination = useAppSelector((state: RootState) => state.pagination)
    const ut = useAppSelector((state: RootState) => state.ut)
    const poa = useAppSelector((state: RootState) => state.poa)
    //const dispatch = useAppDispatch()
    const pathname = usePathname()
    const [filteredArvores, setFilteredArvores] = useState<any[]>(currentArvores)
    
    const loadArvores = useCallback(async (itemsPerPage?: number, currentPage?: number) => {
        setLoading(true)
        const currentPagePagination = (pagination.name === pathname && pagination.currentPage) ? pagination.currentPage : 1
        const perPage = itemsPerPage ? itemsPerPage : pagination.perPage
        const url = `/arvore/get-all?utId=${ut?.id}&page=${currentPage ? currentPage : currentPagePagination}&perPage=${itemsPerPage? itemsPerPage : perPage}&orderBy=${orderBy}&order=${order}`

        setCurrentPage(currentPagePagination)

        const { data } = await client.get(url)
        setTotalItems(data?.count)
        setCurrentArvores(data?.arvores)

        setLoading(false)
        
    }, [client, order, orderBy, pagination.currentPage, pagination.name, pagination.perPage, setLoading, ut?.id])

    const exportCsv = async () => {
        var { data: response } = await client.get(`/arvore/get-all?utId=${ut?.id ? ut?.id : null}&order=asc&orderBy=numero_arvore`)
        const data = response?.arvores.map((arv: any) => {
            const { ut, numero_arvore, altura, dap, volume, fuste, area_basal, id_especie, id_situacao, especie, situacao_arvore } = arv
            return {
                'UT': ut?.numero_ut, 
                'Num Árvore': numero_arvore, 
                'Altura': altura.replace('.', ','), 
                'Dap': dap.replace('.', ','),
                'Volume': volume.replace('.', ','), 
                'Fuste': fuste, 
                'Área Basal': area_basal.toString().replace('.', ','), 
                //id_especie,
                'Espécie': especie?.nome, 
                //id_situacao,
                'Situação': situacao_arvore?.nome
            }
        })

        exportToCSV(data, `inventario_${new Date(Date.now()).toLocaleString().replace(",", "_")}`, {
            delimiter: ';'
        })
    }

    useEffect(() => {  
        loadArvores(itemsPerPage)
    }, [loadArvores, itemsPerPage, poa])

    const onPageChanged = async (paginatedData: any) => {
        
        const {
            name,
            currentPage,
            perPage,
            totalPages,
            orderBy,
            order,
            search,
            utId
        } = paginatedData

        if (search) {
            
            var { data } = await client.get(`/arvore/get-all?utId=${utId}&page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}&search=${search.toLowerCase()}`)
            
            paginatedData = {
                name,
                ...paginatedData,
                totalPages: Math.ceil(data?.count / perPage),
                totalItems: data?.count
            }
        } else {
            var { data } = await client.get(`/arvore/get-all?utId=${utId ? utId : ut?.id}&page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}`)
            paginatedData = {
                name,
                ...paginatedData,
                totalPages: Math.ceil(data?.count / perPage),
                totalItems: data?.count
            }
        }
        
        dispatch(paginate(paginatedData))

        setCurrentPage(currentPage)
        setItemsPerPage(perPage)
        setOrderBy(orderBy)
        setOrder(order)
        setTotalItems(data?.count)
        setCurrentArvores(data?.arvores)
        setTotalPages(totalPages ? totalPages : Math.ceil(data?.count / perPage))
    }

    const changeItemsPerPage = (evt: ChangeEvent<HTMLSelectElement>) => {
        onPageChanged({
            name: pathname,
            currentPage: 1,
            perPage: evt.target.value,
            orderBy,
            order
        })
    }

    const dispatch = useAppDispatch()
    const router = useRouter()

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
        } else {
            setSelectedUt({
                value: '0',
                label: 'Todos'
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
            numero_ut: uts[0]?.numero_ut
        }))
        
        setUts(uts)
        
    }

    const selectUt = async (ut: any) => {

        dispatch(setUt({
            id: ut.value,
            numero_ut: ut.label,
        }))
        
        setSelectedUt(ut)
        const paginatedData = {
            currentPage: 1,
            perPage: itemsPerPage,
            utId: ut?.value,
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
        const data = uts?.map((ut: any) => {
            return {
                label: ut.numero_ut,
                value: ut.id
            }
        })

        return [{ label: 'Todos', value: '0' }].concat(data)
    }

    const goToAddForm = () => {
        if (ut.numero_ut.toString() === 'Todos' || typeof ut === undefined) {
            alertService.warn('Selecione uma UT para iniciar o cadastro de uma árvore')
        } else {
            router.push('/arvore/add')
        }
    }
        
    useEffect(() => {
        defaultUmfsOptions()
        defaultUpasOptions()
        defaultUtsOptions()
        setFilteredArvores(currentArvores)
    }, [currentArvores, currentPage, defaultUmfsOptions, defaultUpasOptions, defaultUtsOptions])

    const handleSearch = async (evt: ChangeEvent<HTMLInputElement>) => {
        const paginatedData = {
            currentPage: 1,
            perPage: itemsPerPage,
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

        let sortedArvores: any = []        
        const tiposNumericos = ['numero_arvore', 'lat_y', 'long_x', 'lat', 'lng', 'cap', 'dap', 'ut.numero_ut']
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

    return (
        <div>
            <div className="flex flex-row items-center justify-between p-6 bg-gray-100 items-center">
                <h1 className="font-medium text-2xl font-roboto">Árvores</h1>
                <div className="flex flex-row space-x-2">
                    <div
                        onClick={exportCsv}
                        className="px-4 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer"
                    >
                        <div className="flex flex-row justify-around w-full space-x-2">
                            <div>
                                <FontAwesomeIcon icon={faFileExport} />
                            </div>
                            <span>
                                Exportar
                            </span>
                        </div>
                    </div>
                    <div
                        onClick={goToAddForm}
                        className="px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer"
                    >
                        <div className="flex flex-row justify-around w-full space-x-2">
                            <div>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                            <span>
                                Adicionar
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-gray-100 rounded-lg">
                    <div className="flex flex-col px-4 w-auto">
                        <div className="w-full">
                            <label htmlFor="perPage" className="px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">por Página</label>
                        </div>
                        <select
                            value={itemsPerPage}
                            onChange={(evt: any) => changeItemsPerPage(evt)}
                            id="perPage" 
                            className="w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="500">500</option>
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
                                callback={selectUt}
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
                <ListArvore 
                    currentArvores={filteredArvores}
                    sortArvores={sortArvores}
                    sorted={sorted} 
                    loadArvores={loadArvores}
                />

                <Pagination
                    perPage={itemsPerPage}
                    totalItems={totalItems}
                    orderBy={orderBy}
                    order={order}
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}    
                    pageNeighbours={5}
                />
    </div>
            
    </div>
    )
}

export default Index
