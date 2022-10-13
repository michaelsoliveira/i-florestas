import { useContext, useEffect, useState, useCallback } from "react"
import { Link } from "components/Link"
import { TrashIcon as TrashIconOut, PencilAltIcon as PencilAltIconOut
} from '@heroicons/react/outline'
import { TrashIcon, PencilAltIcon, UsersIcon } from '@heroicons/react/solid'
import AlertService from 'services/alert'
import Modal from "components/Modal"
import withAuthentication from "components/withAuthentication"
import { AuthContext } from "contexts/AuthContext"
import { EmpresaType } from "types/IEmpresa"

const EmpresaIndex = () => {
    const [empresas, setEmpresas] = useState<EmpresaType[]>([])
    const [selectedEmpresa, setSelectedEmpresa] = useState<EmpresaType>()
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { client } = useContext(AuthContext)

    const loadEmpresas = useCallback(async() => {
        try {
            setIsLoading(true)
            const { data: { empresas } } = await client.get('empresa')
            setEmpresas(empresas)    
            setIsLoading(false)
        } catch (error:any) {
            AlertService.error(error?.message)
        }
    }, [client])

    useEffect(() => {
        loadEmpresas()
    }, [loadEmpresas])

    function toogleDeleteModal(id: string) {
        const empresa = empresas.filter((empresa: EmpresaType) => empresa.id === id)
        setSelectedEmpresa(empresa[0])
        setOpenModal(true)
    }

    async function deleteEmpresa(id?: string) {
        try {
            await client.delete(`/empresa/${id}`)
                .then(() => {
                    AlertService.success('A empresa foi deletada com SUCESSO!!!')
                    loadEmpresas()
                    setOpenModal(false)
                })
            // setEmpresas(empresas.filter((empresa: EmpresaType) => empresa.id !== id))
            
        } catch (error) {
            console.log(error)
        }       
    }
    function hideModal() {
        setOpenModal(false)
    }

    return (
        <div>
            <div className="flex flex-row items-center justify-between p-6 bg-gray-100">
                <h1 className="font-medium text-2xl font-roboto">Empresas</h1>
                <Link
                    href='/empresa/add'
                    className="px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer"
                >
                    Adicionar
                </Link>
            </div>
            {isLoading ? (
                <div className="flex flex-row items-center justify-center h-56">Loading...</div>
            ): (
                <div className="flex flex-col p-6">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        {empresas.length ? (
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Razão Social / Nome Fantasia
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Responsável / CREA
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Registro Ambiental
                                    </th>
                                    
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        CNPJ
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {empresas.map((empresa: any) => (
                                    <tr key={empresa.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col items-starter">
                                            
                                            <div className="text-sm font-medium text-gray-900">{empresa.razaoSocial}</div>
                                            <div className="text-sm text-gray-500">{empresa.nomeFantasia}</div>
                                            
                                        </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{empresa.respTecnico}</div>
                                        <div className="text-sm text-gray-500">{empresa.creaResp}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-gray-900">
                                            <div className="text-sm text-gray-500">{empresa.cnpj}</div>
                                        </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-gray-900">
                                            <div className="text-sm text-gray-500">{empresa.regAmbiental}</div>
                                        </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center">
                                        <Link href={`/empresa/update/${empresa.id}`}>
                                            <PencilAltIcon className="w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" />
                                        </Link>
                                        <Link href={`/empresa/${empresa.id}/users`}>
                                            <UsersIcon className="w-5 h-5 ml-4 -mr-1 text-indigo-600 hover:text-indigo-700" />
                                        </Link>
                                        <Link href="#" onClick={() => toogleDeleteModal(empresa.id)}>
                                            <TrashIcon className="w-5 h-5 ml-4 -mr-1 text-red-600 hover:text-red-700" />
                                        </Link>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                            </div>    
                        ): (
                            <div className="flex flex-col items-center justify-center h-64">
                                <h1 className="font-roboto text-2xl font-medium">Nenhuma Empresa Cadastrada</h1>
                            </div>   
                        )}
                </div>
                {openModal &&
                    <Modal
                        styleButton="bg-red-600 hover:bg-red-700 focus:ring-red-500"
                        title="Deletar Empresar"
                        buttonText="Deletar"
                        bodyText={`Tem certeza que seja excluir a empresa ${selectedEmpresa?.razaoSocial}?`}
                        data={selectedEmpresa}
                        parentFunction={deleteEmpresa}
                        hideModal={() => setOpenModal(false)}
                        open={openModal}
                    />}
            </div>        
            )}
    </div>
    )
}

export default withAuthentication(EmpresaIndex)
