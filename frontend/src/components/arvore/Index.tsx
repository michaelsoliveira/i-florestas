'use client'

import { ChangeEvent, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { Input } from "../atoms/input"
import alertService from '@/services/alert'
import { useAuthContext } from "@/context/AuthContext"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { RootState } from "@/redux/store"
import { OptionType, Select } from "@/components/ui/Select"
import { setUmf } from "@/redux/features/umfSlice"
import { setUpa } from "@/redux/features/upaSlice"
import { setUt } from "@/redux/features/utSlice"
import ListArvore from "./ListArvore"
import { useRouter, useSearchParams } from "next/navigation"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport, faPlus } from "@fortawesome/free-solid-svg-icons"
import { usePathname } from "next/navigation"
import { exportToCSV } from "@/components/utils/ExportData"
import { Pagination } from "@/components/utils/Pagination"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { fetchArvoreData } from "@/services/arvore"

const itemsPerPageList = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
    { label: '200', value: 200 },
    { label: '500', value: 500 },
]

const Index = () => {
    
    const { client } = useAuthContext()
    const [umfs, setUmfs] = useState<any>()
    const [upas, setUpas] = useState<any>()
    const [uts, setUts] = useState<any>()
    const umf = useAppSelector((state: RootState) => state.umf)
    const upa = useAppSelector((state: RootState) => state.upa)
    const ut = useAppSelector((state: RootState) => state.ut)

    const [selectedUmf, setSelectedUmf] = useState<OptionType>()
    const [selectedUpa, setSelectedUpa] = useState<OptionType>()
    //const dispatch = useAppDispatch()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const params = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams])
    const utId = searchParams.get('utId') ?? 'all'
    const page = searchParams.get('page') ?? '1'
    const perPage = searchParams.get('perPage') ?? '10'
    const searchBy = searchParams.get('searchBy') ?? 'numero_arvore'
    const orderBy = searchParams.get('orderBy') ?? 'numero_arvore'
    const order = searchParams.get('order') ?? 'asc'
    const search = searchParams.get('search') ?? ''
    const [arvoreFilter, setArvoreFilter] = useState<any>(search || '')
    const [itemsPerPage, setItemsPerPage] = useState<OptionType>({ label: String(perPage), value: Number(perPage) })
    const [search_by, setSearchBy] = useState<string>(String(searchBy || 'numero_arvore'))
    const [selectedUt, setSelectedUt] = useState<OptionType>()
    const [especies, setEspecies] = useState<any>()
    const [especie, setEspecie] = useState<OptionType>()

    const loadEspecieOptions = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const data = especies.filter((e: any) => e.nome.toLowerCase().includes(inputValue) || e.nome.includes(inputValue))

        callback(data?.map((especie: any) => ({
            value: especie.id,
            label: especie.nome
        })))
    }

    const { isPending, error, data } = useQuery({
        queryKey: [
            'arvores', 
            upa,
            utId,
            page,
            perPage,
            orderBy,
            searchBy,
            order,
            search
        ],
        queryFn: () => 
            fetchArvoreData({
                upaId: upa?.id,
                utId: utId === 'all' ? '0' : utId,
                page,
                perPage,
                orderBy,
                searchBy,
                order,
                search
            }),
        placeholderData: keepPreviousData
    })

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const updateQueryString = useCallback(
        (name: string, value: string) => {
            params.set(name, value)
        
            return params.toString()
        },
        [params]
    )
    
    const exportCsv = async () => {
        var { data: response } = await client.get(`/arvore/get-all?upaId=${upa?.id}&utId=${utId === 'all' ? '0' : utId}&order=asc&orderBy=numero_arvore`)
        
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

        data?.length > 0 
            ?
                exportToCSV(data, `inventario_${new Date(Date.now()).toLocaleString().replace(",", "_")}`, {
                    delimiter: ';'
                })
            :
                alertService.warn('Não existem árvores cadastradas')
    }

    const searchKey = (event: any) => {
        if (event.keyCode == 13) {
            handleSearch()
        }
    }

    const onPageChanged = async (paginatedData: any) => {
        const {
            currentPage,
        } = paginatedData
        
        router.push(`${pathname}?${updateQueryString('page', currentPage)}`, { scroll: false })
    }

    const changeItemsPerPage = (evt: any) => {
        setItemsPerPage(evt)
        updateQueryString('page', '1')
        router.push(`${pathname}?${updateQueryString('perPage', String(evt.value))}`)
    }

    const changeSearchBy = (evt: ChangeEvent<HTMLSelectElement>) => {
        setSearchBy(String(evt.target.value))
        updateQueryString('orderBy', evt.target.value === 'especie' ? 'especie.nome' : 'numero_arvore')
        updateQueryString('order', 'asc')
        updateQueryString('search', evt.target.value === 'numero_arvore' ? '' : typeof especie !== typeof undefined ? String(especie?.value) : '')
        updateQueryString('page', '1')
        router.push(`${pathname}?${updateQueryString('searchBy', String(evt.target.value))}`)
    }

    const dispatch = useAppDispatch()
    const router = useRouter()

    const loadUpas = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const data = upas.filter((upa: any) => upa?.descricao.toLowerCase().includes(inputValue.toLowerCase()))
        
        callback(data?.map((upa: any) => ({
            value: upa.id,
            label: upa.descricao
        })))
    }

    const loadUts = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const data = uts.filter((ut: any) => ut?.numero_ut.toString().includes(inputValue))
        
        callback(data?.map((ut: any) => ({
            value: ut.id,
            label: ut.numero_ut
        })))
    }

    const loadUmfs = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const data = umfs.filter((umf: any) => umf?.nome.toLowerCase().includes(inputValue.toLowerCase()))
        
        callback(data?.map((umf: any) => ({
            value: umf.id,
            label: umf.nome
        })))
    }

    const defaultUmfsOptions = useCallback(async() => {
        const response = await client.get(`/umf?orderBy=nome&order=asc`)
        
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
    }, [client, umf.id, umf?.nome])

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

        const utSel = utId !== 'all' ? uts.find((u: any) => u.id === utId) : null
        // const utSel = uts ? uts.find((u: any) => u.id === ut.id) : null

        if (utSel) {
            setSelectedUt({
                value: utSel?.id,
                label: utSel?.numero_ut.toString()
            })
        } else {
            setSelectedUt({
                value: '0',
                label: 'Todos'
            })
        }
    }, [client, upa?.id, utId])

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
            tipo: Number.parseInt(upaSelected.tipo),
            srid: Number.parseInt(upaSelected.srid)
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
        updateQueryString('page', '1')
        params.delete('search')
        router.push(`${pathname}?${updateQueryString('utId', ut.value === '0' ? 'all' : ut.value)}`)
    }

    const selectEspecie = (data: any) => {
        setEspecie(data)
        updateQueryString('page', '1')
        router.push(`${pathname}?${updateQueryString('search', data.value)}`)
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
        if (utId === 'all' || utId === undefined) {
            alertService.warn('Selecione uma UT para iniciar o cadastro de uma árvore')
        } else {
            router.push('/arvore/add')
        }
    }
    const defaultEspecieOptions = useCallback(async () => {
        const response = await client.get(`/especie?order=asc&orderBy=especie.nome`)
        const { especies } = response.data
        setEspecies(especies)
    }, [client])

    function getEspeciesDefaultOptions() {

        const data = especies?.map((especie: any) => {
            return {
                label: especie.nome,
                value: especie.id
            }
        })

        return [{ label: 'Todos', value: '' }].concat(data)
    }
        
    useEffect(() => {
        defaultUmfsOptions()
        defaultUpasOptions()
        defaultUtsOptions()
        defaultEspecieOptions()
    }, [defaultEspecieOptions, defaultUmfsOptions, defaultUpasOptions, defaultUtsOptions])

    const handleSearch = async () => {
        updateQueryString('page', '1')
        router.push(`${pathname}?${updateQueryString('search', arvoreFilter)}`)
    }    

    const sortArvores = (sortBy: string) => {
        updateQueryString('order', params.get('order') === 'asc' ? 'desc' : 'asc')
        router.push(`${pathname}?${updateQueryString('orderBy', sortBy)}`)
    }

    return (
        <div>
            <div className="flex flex-row justify-between p-6 items-center">
                <h1 className="font-medium text-2xl text-custom-green">Árvores</h1>
                <div className="flex md:flex-row flex-col space-y-2 md:space-y-0 space-x-2">
                    { data?.arvores && (
                        <div
                            onClick={exportCsv}
                            className="px-4 py-2 text-white bg-brown-normal hover:bg-brown-normal/75 rounded-md hover:cursor-pointer"
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
                    ) }
                    <div
                        onClick={goToAddForm}
                        className="px-6 py-2 text-white bg-custom-green hover:bg-custom-green/75 rounded-md hover:cursor-pointer"
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
            <div className="flex flex-col px-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-custom-green rounded-lg">
                    <div className="flex flex-col px-4 w-1/4">
                        <Select
                            styleLabel="text-white"
                            selectedValue={itemsPerPage}
                            defaultOptions={itemsPerPageList}
                            options={
                                (inputValue: string, callback: (options: OptionType[]) => void) => {
                                const items = itemsPerPageList.filter((item: any) => String(item.value) === inputValue)
                                callback(items.map((data) => ({
                                    label: data.label,
                                    value: data.value
                                })))}
                            }
                            label="por Página:"
                            callback={changeItemsPerPage}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4">
                        {/* <div className="w-3/12 flex items-center px-2">UMF: </div> */}
                        <div className="text-gray-900">
                            <Select
                                styleLabel="text-white"
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
                                styleLabel="text-white"
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
                                styleLabel="text-white"
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
                    <div className="flex flex-col px-4 pt-2 lg:px-0 lg:pr-4 lg:pt-0 w-2/5">
                        <div className="w-full">
                            <label htmlFor="searchBy" className="w-full px-1 block mb-1 text-sm font-medium w-24 text-white">Pesquisar por:</label>
                        </div>
                        <select
                            value={search_by}
                            onChange={(evt: any) => changeSearchBy(evt)}
                            id="search-by" 
                            className="text-gray-900 bg-gray-50 border border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="numero_arvore">Número Arvore</option>
                            <option value="especie">Espécie</option>
                        </select>
                    </div>
                    {search_by === 'especie' ? (
                        <>
                            <div className='w-full px-4 pt-2 lg:pt-0 lg:px-0 lg:pr-4'>
                                <Select
                                    styleLabel="text-white"
                                    initialData={
                                        {
                                            label: 'Selecione uma Espécie',
                                            value: ''
                                        }
                                    }
                                    selectedValue={especie}
                                    defaultOptions={getEspeciesDefaultOptions()}
                                    options={loadEspecieOptions}
                                    label="Espécie:"
                                    callback={selectEspecie}
                                />
                            </div>
                        </>
                    ): (
                        <>
                            <div className="w-full px-4 pt-4 text-sm lg:pt-0">
                                <label htmlFor="procurar_ut" className="text-white">Pesquisar:</label>
                                <div className="relative">
                                    <Input
                                        label="Pesquisar Arvore"
                                        id="search"
                                        name="search"
                                        value={arvoreFilter}
                                        onKeyUp={searchKey}
                                        onChange={(e) => setArvoreFilter(e.target.value)}
                                        className=
                                        'absolute flex items-center ps-3 transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50'
                                        
                                    />
                                    <button onClick={handleSearch} className="absolute end-0 w-10 pl-2.5 text-sm font-medium h-full text-white rounded-e-[4px] border bg-brown-normal hover:bg-brown-normal/75">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                        <span className="sr-only">Search</span>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                
                <ListArvore 
                    currentArvores={data?.arvores}
                    sortArvores={sortArvores}
                    sorted={order === 'asc' ? false : true} 
                />
                
                <Pagination
                    perPage={itemsPerPage.value}
                    totalItems={Number(data?.count)}
                    orderBy={orderBy}
                    order={order}
                    currentPage={Number(page)}
                    onPageChanged={onPageChanged}    
                    pageNeighbours={5}
                />
                
    </div>
            
    </div>
    )
}

export default Index
