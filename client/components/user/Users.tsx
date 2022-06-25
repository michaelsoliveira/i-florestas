import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { Link } from "../../components/Link"
import { Input } from "../../components/atoms/input"
import { TrashIcon, PencilAltIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import alertService from '../../services/alert'
import Modal from "../../components/Modal"
import { AuthContext } from "../../contexts/AuthContext"
import { User } from "../../services/auth"

const Users = ({ currentUsers, empresaId, onPageChanged, orderBy, order, changeItemsPerPage, currentPage, perPage, loading, loadUsers }: any) => {
    
    const [filteredUsers, setFilteredUsers] = useState<User[]>(currentUsers)
    const [selectedUser, setSelectedUser] = useState<User>()
    const [uploading, setUploading] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const { client } = useContext(AuthContext)
    const [sorted, setSorted] = useState(false)
    const [checkedUsers, setCheckedUsers] = useState<any>([])

    useEffect(() => {
        setFilteredUsers(currentUsers)
    }, [currentUsers, currentPage])

    function selectToModal(id: string) {
        const user = currentUsers.find((user: User) => user.id === id)
        setSelectedUser(user)
        setOpenModal(true)
    }

    async function deleteUser(id: string) {
        try {
            client.delete(`/users/${id}`)
                .then(() => {
                    alertService.success('O usuário foi deletada com SUCESSO!!!')
                    loadUsers()
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
            orderBy,
            order,
            search: query
        }
        onPageChanged(paginatedData)
    }

    const sortUsers = async (orderBy?: string) => {
        const paginatedData = {
            currentPage,
            perPage,
            orderBy,
            order: !sorted ? 'DESC' : 'ASC'
        }

        onPageChanged(paginatedData)
        setSorted(!sorted)
    }

    const handleSelectUsers = (evt: any) => {
        const userId = evt.target.value

        if (!checkedUsers.includes(userId)) {
            setCheckedUsers([...checkedUsers, userId])
        } else {
            setCheckedUsers(checkedUsers.filter((checkedUserId: any) => {
                return checkedUserId !== userId
            }))
        }
    }

    const handleSelectAllUsers = () => {
        if (checkedUsers.length < currentUsers.length) {
            setCheckedUsers(currentUsers.map(({ id }: any) => id));
        } else {
            setCheckedUsers([]);
        }
    };

    const deleteUsers = () => {
        try {
            client.delete('/users/multiples', { data: { ids: checkedUsers} })
                .then(() => {
                    alertService.success('Os usuários foram deletadas com SUCESSO!!!')
                    loadUsers()
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="flex flex-row items-center justify-between p-6 bg-gray-100">
                <h1 className="font-medium text-2xl font-roboto">Usuários</h1>
                <Link
                    href={`/empresa/${empresaId}/users/add`}
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
                        <div className="w-60 px-4">Pesquisar Usuário:</div>
                        <div className="w-full px-4">
                            <Input
                                label="Pesquisar Usuários"
                                id="search"
                                name="search"
                                // value={search}
                                onChange={(e: any) => handleSearch(e.target.value)}
                                className=
                                'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50'
                                
                            />
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-between overflow-x-auto mt-2">
                        <div className="shadow overflow-y-auto border-b border-gray-200 w-full sm:rounded-lg">
                            {checkedUsers?.length > 0 && (
                                <div className="py-4">
                                    <button
                                        className="px-4 py-2 bg-red-600 text-white rounded-md"
                                        onClick={deleteUsers}
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
                                checked={checkedUsers?.length === currentUsers?.length}
                                onChange={handleSelectAllUsers}                
                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"
                            />
                            </div>
                        </th>
                        <th
                            scope="col"
                            className="w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortUsers('user.username')}
                        >
                            <div className="flex flex-row items-center">
                                Nome
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </div>
                        </th>
                        <th
                            scope="col"
                            className="items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => sortUsers('user.email')}
                        >
                            <div className="flex flex-row items-center">
                                Email
                                {sorted
                                    ? (<ChevronUpIcon className="w-5 h-5" />)
                                    : (<ChevronDownIcon className="w-5 h-5" />)
                                }
                            </div>                    
                        </th>
                        <th
                            scope="col"
                            className="w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                        Perfil
                        </th>
                        <th scope="col" className="relative w-1/12 px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers?.map((user: any) => (
                            <tr key={user.id}>
                            <td className="flex justify-center">
                            <input                 
                                    value={user?.id}
                                    checked={checkedUsers.includes(user?.id)}
                                    onChange={handleSelectUsers}
                                    id="userId"
                                    type="checkbox"
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                />    
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                            <div className="flex flex-col items-starter">
                                
                                <div className="text-sm font-medium text-gray-900">{user?.username}</div>
                            </div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user?.email}</div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                                <div className="text-sm text-gray-500">ADMIN OR USER</div>
                            </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center">
                            <Link href={`/empresa/${empresaId}/users/update/${user.id}`}>
                                <PencilAltIcon className="w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" />
                            </Link>
                            <Link href="#" onClick={() => selectToModal(user.id)}>
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
                    title="Deletar usuário"
                    buttonText="Deletar"
                    bodyText={`Tem certeza que seja excluir o usuário ${selectedUser?.username}?`}
                    data={selectedUser}
                    parentReturnData={selectToModal}
                    parentFunction={deleteUser}
                    hideModal={() => setOpenModal(false)}
                    open={openModal}
                />}
            </div>
        )}
            
    </div>
    )
}

export default Users
