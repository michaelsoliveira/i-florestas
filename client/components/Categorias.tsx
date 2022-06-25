import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { Link } from "./Link"
import { Input } from "./atoms/input"
import { TrashIcon, PencilAltIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import alertService from '../services/alert'
import Modal from "./Modal"
import { AuthContext } from "../contexts/AuthContext"

export type CategoriaEspecieType = {
    id: string;
    nome: string,
    criterioFuste?: number;
    criterioDminc?: number;
    criterioDmaxc?: number;
    criterioNMin?: number;
    criterioPercMin?: number;
    criterioAltura?: number;
    criterioVolume?: number;
    preservar: boolean;
}

const Categorias = ({ currentCategorias, onPageChanged, changeItemsPerPage, currentPage, perPage, loading, loadCategorias }: any) => {
    
    const [filteredCategorias, setFilteredCategorias] = useState<CategoriaEspecieType[]>(currentCategorias)
    const [selectedCategoria, setSelectedCategoria] = useState<CategoriaEspecieType>()
    const [uploading, setUploading] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const { client } = useContext(AuthContext)
    const [checkedCategorias, setCheckedCategorias] = useState<any>([])
    const [sorted, setSorted] = useState(false)

    useEffect(() => {
        setFilteredCategorias(currentCategorias)
    }, [currentCategorias, currentPage])

    function toogleDeleteModal(id: string) {
        const categoria = currentCategorias.find((categoria: CategoriaEspecieType) => categoria.id === id)
        setSelectedCategoria(categoria)
        setOpenModal(true)
    }

    async function deleteCategoria(id?: string) {
        try {
            client.delete(`/categoria/${id}`)
                .then(() => {
                    alertService.success('A categoria de espécie foi deletada com SUCESSO!!!')
                    loadCategorias()
                    setOpenModal(false)
                })
        } catch (error) {
            console.log(error)
        }       
    }

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
        sortedCategorias = filteredCategorias.sort((a: any, b: any) => {
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

    const deleteCategorias = () => {
        
    }

    return (
        <div>
            <div className="flex flex-row items-center justify-between p-6 bg-gray-100">
                <h1 className="font-medium text-2xl font-roboto">Categoria de Espécies</h1>
                <Link
                    href='/categoria-especie/add'
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
                        <div className="w-60 px-4">Pesquisar Categoria:</div>
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
                                        onClick={deleteCategorias}
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
                                <div className="flex flex-row items-center px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                    Nome
                                    {sorted
                                        ? (<ChevronUpIcon className="w-5 h-5" />)
                                        : (<ChevronDownIcon className="w-5 h-5" />)
                                    }
                                </div>        
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Fuste
                            </th>
                            <th
                                scope="col"
                                className="w-1/12 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Diametro Mínimo
                            </th>
                            <th
                                scope="col"
                                className="w-1/12 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Diametro Máximo
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            >
                                Altura
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            >
                                Volume
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
                                <div className="text-sm text-gray-900">{categoria?.criterioFuste}</div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                    <div className="text-sm text-gray-500">{categoria?.criterioDminc}</div>
                                </span>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                    <div className="text-sm text-gray-500">{categoria?.criterioDmaxc}</div>
                                </span>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                    <div className="text-sm text-gray-500">{categoria?.criterioAltura}</div>
                                </span>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-900">
                                    <div className="text-sm text-gray-500">{categoria?.criterioVolume}</div>
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
                                    <PencilAltIcon className="w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" />
                                </Link>
                                <Link href="#" onClick={() => toogleDeleteModal(categoria.id)}>
                                    <TrashIcon className="w-5 h-5 ml-4 -mr-1 text-red-600 hover:text-red-700" />
                                </Link>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
            
            {openModal &&
                <Modal
                    className="w-full"
                    styleButton="bg-red-600 hover:bg-red-700 focus:ring-red-500"
                    title="Deletar espécie"
                    buttonText="Deletar"
                    bodyText={`Tem certeza que seja excluir a Categoria ${selectedCategoria?.nome}?`}
                    data={selectedCategoria}
                    parentFunction={deleteCategoria}
                    hideModal={() => setOpenModal(false)}
                    open={openModal}
                />}
            </div>
        )}
            
    </div>
    )
}

export default Categorias
