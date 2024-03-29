'use client'

import { useContext, useEffect, useState } from "react"
import { Link } from "@/components/utils/Link"
import { Input } from "../atoms/input"
import { TrashIcon, PencilIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import alertService from '@/services/alert'
import { useAuthContext } from "@/context/AuthContext"
import { UserType } from "@/types/IUserType"
import { styles, stylesForm } from "../utils/styles"
import { useModalContext } from "@/context/ModalContext"
import { LinkBack } from "@/components/utils/LinkBack"
import { AddEdit } from "./AddEdit"
import React, { createRef } from 'react'
import { UserCircleIcon } from '@heroicons/react/24/solid'

const Users = ({ currentUsers, onPageChanged, orderBy, order, changeItemsPerPage, currentPage, perPage, loading, loadUsers, roles }: any) => {
    
    const [filteredUsers, setFilteredUsers] = useState<UserType[]>()
    const { client } = useAuthContext()
    const [sorted, setSorted] = useState(false)
    const [checkedUsers, setCheckedUsers] = useState<any>([])
    const { showModal, hideModal, store } = useModalContext()
    const formRef = createRef<any>()

    useEffect(() => {
        setFilteredUsers(currentUsers)
    }, [currentUsers])
    
    const userById = (id?: string) => {
        return currentUsers.find((user: UserType) => user.id === id)
    }

    const formSubmit = () => {
        formRef.current.handleSubmit()
    }

    const deleteSingleModal = (id?: string) => 
        showModal({ 
            size: 'max-w-lg',
            title: 'Deletar Usuário', 
            onConfirm: () => { deleteUser(id) }, 
            styleButton: styles.redButton, 
            iconType: 'warn', 
            confirmBtn: 'Deletar', 
            content: `Tem Certeza que deseja excluir o Usuário ${userById(id)?.username} ?` 
    })

    const updateUser = (id?: string) => {
            showModal({ size: 'sm:max-w-2xl', hookForm: 'hook-form', type: 'submit', title: 'Editar Usuário', onConfirm: formSubmit, styleButton: styles.greenButton, confirmBtn: 'Salvar',
            content: <AddEdit roles={roles} sendForm={() => { loadUsers(10) }} ref={formRef} userId={id} styles={stylesForm} redirect={false} />
        })    
    }

    const addUser = () => {
            showModal({ size: 'sm:max-w-2xl', hookForm: 'hook-form', type: 'submit', title: 'Novo Usuário', onConfirm: formSubmit, styleButton: styles.greenButton, confirmBtn: 'Salvar',
            content: <AddEdit roles={roles} sendForm={() => { loadUsers(10) }} ref={formRef} styles={stylesForm} redirect={false} />
        })    
    }
    
    const deleteMultModal = () => showModal({ title: 'Deletar Usuários', onConfirm: deleteUsers, styleButton: styles.redButton, iconType: 'warn', confirmBtn: 'Deletar', content: 'Tem certeza que deseja excluir os usuário(s) selecionado(s)' })

    const deleteUser = async (id?: string) => {
        try {
            await client.delete(`/users/${id}`)
                .then((response: any) => {
                    const { error, message } = response.data
                    if (!error) {
                        alertService.success(message)
                        loadUsers(10)
                        hideModal()
                    } else {
                        alertService.error(message)
                        hideModal()
                    }
                })
        } catch (error: any) {
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
            order: !sorted ? 'desc' : 'asc'
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
                    loadUsers(10)
                })
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <div>
            
            <div className="flex flex-row items-center justify-between p-6 text-custom-green">
                <div>
                    <LinkBack href="/projeto" className="flex flex-col relative left-0 ml-4" />
                </div>
                <h1 className="font-medium text-2xl font-roboto">Usuários</h1>
                
                <button
                // disabled={formState.isSubmitting}
                type="submit"
                className="flex flex-row justify-between group relative w-32 py-2 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-custom-green hover:bg-custom-green/75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={addUser}
              >
                <span className="flex items-center">
                  <UserCircleIcon className="h-5 w-5 text-white group-hover:text-gray-200" aria-hidden="true" />
                </span>
                <div>Novo</div>
              </button>
            </div>
            {loading ? (<div className="flex flex-row items-center justify-center h-56">Loading...</div>) : (
                <div className="flex flex-col p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-custom-green rounded-lg">
                        <div className="flex flex-row w-2/12 px-2 items-center justify-between">
                            <div className="w-full">
                                <label htmlFor="perPage" className="px-1 mb-2 text-sm text-white">por Página</label>
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
                        <div className="w-60 px-4 text-sm text-white">Pesquisar Usuário:</div>
                        <div className="w-full px-4">
                            <Input
                                label="Pesquisar Usuários"
                                id="search"
                                name="search"
                                // value={search}
                                onChange={(e: any) => handleSearch(e.target.value)}
                                className=
                                'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50'
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-between overflow-x-auto mt-2">
                        <div className="shadow overflow-y-auto border-b border-gray-200 w-full sm:rounded-lg">
                            {checkedUsers?.length > 0 && (
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
                    <thead className="bg-gray-light">
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
                            onClick={() => sortUsers('username')}
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
                            onClick={() => sortUsers('email')}
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
                        {filteredUsers?.map((user: any, index: number) => (
                            <tr key={index}>
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
                                <div className="text-sm text-gray-500">{user.roles && user.roles.map((role: any) => { return role ? role.name : '' }).join(', ')}</div>
                            </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center">
                            <Link href="#" onClick={() => updateUser(user.id)}>
                                <PencilIcon className="w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" />
                            </Link>
                            <Link href="#" onClick={() => deleteSingleModal(user.id)}>
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
        )}
            
    </div>
    )
}

export default Users
