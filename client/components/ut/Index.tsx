import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { Link } from "../Link"
import { Input } from "../atoms/input"
import { TrashIcon, PencilAltIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import alertService from '../../services/alert'
import Modal from "../Modal"
import { AuthContext } from "../../contexts/AuthContext"
import { OptionType, Select } from '../Select'
import { setUmf, UmfType } from "../../store/umfSlice"
import { setUpa } from "../../store/upaSlice"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { RootState } from "../../store"
import { UtType } from "types/IUtType"

const Index = ({ currentUts, onPageChanged, changeItemsPerPage, orderBy, order, currentPage, perPage, loading, loadUts }: any) => {
    
    const [filteredUts, setFilteredUts] = useState<UtType[]>(currentUts)
    const [selectedUt, setSelectedUt] = useState<UtType>()
    const [uploading, setUploading] = useState<boolean>(false)
    const [removeSingleModal, setOpenSingleModal] = useState<boolean>(false)
    const [removeMultipleModal, setOpenMultipleModal] = useState<boolean>(false)
    const { client } = useContext(AuthContext)
    const [checkedUts, setCheckedUts] = useState<any>([])
    const [sorted, setSorted] = useState(false)
    const [umfs, setUmfs] = useState<any>()
    const [upas, setUpas] = useState<any>()
    const umf = useAppSelector((state: RootState) => state.umf)
    const upa = useAppSelector((state: RootState) => state.upa)
    const [selectedUmf, setSelectedUmf] = useState<OptionType>()
    
    const [selectedUpa, setSelectedUpa] = useState<OptionType>()

    const dispatch = useAppDispatch()
    

    const loadUpas = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const response = await client.get(`/upa/search/q?descricao=${inputValue}`)
        const data = response.data

        console.log(data)
        
        callback(data?.map((upa: any) => ({
            value: upa.id,
            label: upa.descricao
        })))
    }

    const defaultUpasOptions = useCallback(async() => {
        const umfId = umf.id
        const response = umf ? await client.get(`/upa?orderBy=nome&order=asc&umf=${umfId}`) : await client.get(`/upa?orderBy=nome&order=asc`)
        const { upas } = response.data

        setUpas(upas)
    }, [client, umf])

    const loadUmfs = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const response = await client.get(`/umf/search/q?nome=${inputValue}`)
        const data = response.data
        
        callback(data?.map((umf: any) => ({
            value: umf.id,
            label: umf.nome
        })))
    }

    useEffect(() => {

        async function defaultUmfsOptions() {
            const response = await client.get(`/umf?orderBy=nome&order=asc`)
                const { umfs } = response.data
                setUmfs(umfs)
        }

        async function defaultUpasOptions() {
            const response = await client.get(`/upa?orderBy=descricao&order=asc&umf=${umf.id}`)
                const { upas } = response.data
                setUpas(upas)
                if (upas.length == 0) {
                    setSelectedUpa({
                        value: '0',
                        label: 'Nenhuma UPA Cadastrada'
                    })
                } 
        }

        if (umf) setSelectedUmf({
            value: umf.id,
            label: umf.nome
        })

        if (upa) setSelectedUpa({
            value: upa.id,
            label: upa.descricao
        })
        
        
        defaultUmfsOptions()
        defaultUpasOptions()
        setFilteredUts(currentUts)
    }, [currentUts, currentPage, client, umf, upa])

    const selectUmf = async (umf: any) => {
        dispatch(setUmf({
            id: umf.value,
            nome: umf.label
        }))
        setSelectedUmf(umf)

        const response = await client.get(`/upa?orderBy=descricao&order=asc&umf=${umf.value}`)
        const { upas } = response.data
        
        setUpas(upas)
        // setFilteredUts(upas)
    }

    const selectUpa = async (upa: any) => {
        const upaSelected = upas.find((u: any) => u.id === upa.value)
        
        dispatch(setUpa({
            id: upa.value,
            descricao: upa.label,
            tipo: Number.parseInt(upaSelected.tipo)
        }))
        setSelectedUpa(upa)
        
        const response = await client.get(`/ut?orderBy=nome&order=asc&upa=${upa.value}`)
        const { uts } = response.data
        
        setFilteredUts(uts)
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

    function toogleDeleteModal(id?: string) {
        if (id) {
            const ut = currentUts.find((ut: UtType) => ut.id === id)
            setSelectedUt(ut)
        }
        setOpenSingleModal(true)
    }

    async function deleteUmf(id?: string) {
        try {
            client.delete(`/ut/single/${id}`)
                .then(() => {
                    alertService.success('A UT foi deletada com SUCESSO!!!')
                    loadUts()
                    setOpenSingleModal(false)
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
            upa: upa.id,
            ...paginatedData
        })
    }

    const sortUpas = () => {
        let sortedUpas: any = []        
        sortedUpas = filteredUts.sort((a: any, b: any) => {
            return sorted
                ? a.numero_ut.localeCompare(b.numero_ut)
                : b.numero_ut.localeCompare(a.numero_ut);
        })
        
        setSorted(!sorted)
        setFilteredUts(sortedUpas)    
    }

    const handleSelectUt = (evt: any) => {
        const UtId = evt.target.value

        if (!checkedUts.includes(UtId)) {
            setCheckedUts([...checkedUts, UtId])
        } else {
            setCheckedUts(checkedUts.filter((checkedUtId: any) => {
                return checkedUtId !== UtId
            }))
        }
    }

    const handleSelectAllUts = () => {
        if (checkedUts?.length < currentUts?.length) {
            setCheckedUts(currentUts.map(({ id }: any) => id));
        } else {
            setCheckedUts([]);
        }
    };

    const deleteUts = async () => {
        try {
            await client.delete('/ut/multiples', { data: { ids: checkedUts} })
                .then((response: any) => {
                    setCheckedUts([])
                    alertService.success('As Uts foram deletadas com SUCESSO!!!')
                    loadUts()  
                    setOpenMultipleModal(false)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="flex flex-row items-center bg-gradient-to-r from-green-600 to-green-400  border-b-2 border-green-600 justify-between p-6 bg-gray-100">
                <h1 className="font-medium text-2xl font-roboto text-white">Unidades de Trabalho</h1>
                <Link
                    href='/ut/add'
                    className="px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer"
                >
                    Adicionar
                </Link>
            </div>
            {loading ? (<div className="flex flex-row items-center justify-center h-56">Loading...</div>) : (
                <div className="flex flex-col p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-gray-100 rounded-lg">
                        <div className="flex flex-row w-2/12 px-2 items-center justify-between">
                            <div className="w-full">
                                <label htmlFor="perPage" className="px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">por Página</label>
                            </div>
                            <select
                                value={perPage}
                                onChange={(evt: any) => changeItemsPerPage(evt.target.value)}
                                id="perPage" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                        <div className="lg:flex lg:flex-col lg:w-8/12 px-4 space-y-4">
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
                                    callback={selectUpa}
                                />
                            </div>
                        </div>
                        <div className="w-72 px-4 lg:mt-0 mt-4">Pesquisar UT:</div>
                        <div className="w-full px-4">
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
                            {checkedUts.length > 0 && (
                                <div className="py-4">
                                    <button
                                        className="px-4 py-2 bg-red-600 text-white rounded-md"
                                        onClick={() => setOpenMultipleModal(true)}
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
                                    checked={checkedUts?.length === currentUts?.length}
                                    onChange={handleSelectAllUts}                
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"
                                />
                                </div>
                            </th>
                            <th
                                className="w-1/12"
                                onClick={() => sortUpas()}
                            >
                                <div className="flex flex-row items-center px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                    Número UT
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
                                Coordenadas
                            </th>
                            <th
                                scope="col"
                                className="w-3/12 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Área Útil
                            </th>
                            <th
                                scope="col"
                                className="w-3/12 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Área Total
                            </th>           
                            <th scope="col" className="relative w-1/12 px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUts?.map((ut: UtType) => (
                        <tr key={ut.id}>
                            <td className="flex justify-center">
                                <input                 
                                    value={ut?.id}
                                    checked={checkedUts.includes(ut?.id)}
                                    onChange={handleSelectUt}
                                    id="utId"
                                    type="checkbox"
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                />    
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <div className="flex flex-col items-starter">
                                    <div className="text-sm font-medium text-gray-900">{ut?.numero_ut}</div>
                                </div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <div className="text-sm text-gray-900">[{ ut?.latitude }, { ut?.longitude }]</div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                    <div className="text-sm text-gray-500">{ ut?.area_util }</div>
                                </span>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                    <div className="text-sm text-gray-500">{ ut?.area_total }</div>
                                </span>
                            </td>   
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center">
                                <Link href={`/ut/update/${ut.id}`}>
                                    <PencilAltIcon className="w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" />
                                </Link>
                                <Link href="#" onClick={() => toogleDeleteModal(ut.id)}>
                                    <TrashIcon className="w-5 h-5 ml-4 -mr-1 text-red-600 hover:text-red-700" />
                                </Link>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
            
            {removeSingleModal &&
                <Modal
                    className="w-full"
                    styleButton="bg-red-600 hover:bg-red-700 focus:ring-red-500"
                    title="Deletar UT"
                    buttonText="Deletar"
                    bodyText={`Tem certeza que seja excluir a UT ${selectedUt?.numero_ut}?`}
                    data={selectedUt}
                    parentFunction={deleteUmf}
                    hideModal={() => setOpenSingleModal(false)}
                    open={removeSingleModal}
                />}

            {removeMultipleModal &&
                <Modal
                    className="w-full"
                    styleButton="bg-red-600 hover:bg-red-700 focus:ring-red-500"
                    title="Deletar UTs"
                    buttonText="Deletar"
                    bodyText={`Tem certeza que seja excluir as ${checkedUts?.length} UTs selecionados?`}
                    data={checkedUts}
                    parentFunction={deleteUts}
                    hideModal={() => setOpenMultipleModal(false)}
                    open={removeMultipleModal}
                />}
            </div>
        )}
            
    </div>
    )
}

export default Index
