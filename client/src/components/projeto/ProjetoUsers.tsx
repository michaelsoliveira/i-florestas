'use client'

import { useCallback, useContext, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useAuthContext } from "@/context/AuthContext"
import { paginate, setCurrentPagePagination } from "@/redux/features/paginationSlice"
import { usePathname } from "next/navigation"
import { RootState } from "@/redux/store"
import Users from "@/components/user/Users"
import { Pagination } from "@/components/utils/Pagination"
import { UserType } from "@/types/IUserType"
import { LoadingContext } from "@/context/LoadingContext"
import { ProjetoContext } from "@/context/ProjetoContext"

const ProjetoUsers = () => {

    const { client } = useAuthContext()
    const { loading, setLoading } = useContext(LoadingContext)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [totalItems, setTotalItems] = useState(0)
    const [currentUsers, setCurrentUsers] = useState<UserType[]>([])
    const [orderBy, setOrderBy] = useState('username')
    const [order, setOrder] = useState('asc')
    const pagination = useAppSelector((state: RootState) => state.pagination)
    const dispatch = useAppDispatch()
    const { projeto } = useContext(ProjetoContext)
    const pathname = usePathname()
    const [roles, setRoles] = useState<any>()

    const getRoles = useCallback(async () => {
        const { roles } = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/role`, {
            method: 'GET',
            //cache: 'no-store'
        }).then((result: any) => {
            return result.json()
        })
    
        setRoles(roles)
    }, [])
    
    const loadUsers = useCallback(async (itemsPerPage?: number, currentPage?: number) => {
        setLoading(true)
        const currentPagePagination = (pagination.name === pathname && pagination.currentPage) ? pagination.currentPage : 1
        setCurrentPage(currentPagePagination)
        const url = `/projeto/${projeto?.id}/users?page=${currentPage ? currentPage : currentPagePagination}&perPage=${itemsPerPage}&orderBy=${orderBy}&order=${order}`

        const { data } = await client.get(url)
        setTotalItems(data?.count)
        setCurrentUsers(data?.users)
        setLoading(false)
    }, [client, order, orderBy, pagination.currentPage, pagination.name, pathname, projeto?.id, setLoading])

    useEffect(() => {  
        let isLoaded = false
        if (!isLoaded) {
            loadUsers(itemsPerPage)
            getRoles()
        }

        return () => {
            isLoaded = true
        }
    }, [itemsPerPage, loadUsers, getRoles])

    const onPageChanged = async (paginatedData: any) => {
        
        const {
            name,
            currentPage,
            perPage,
            orderBy,
            order,
            search
        } = paginatedData

        if (search) {
            
            var { data } = await client.get(`/projeto/${projeto?.id}/users?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}&search=${search.toLowerCase()}`)
            
            paginatedData = {
                name,
                ...paginatedData,
                totalPages: Math.ceil(data?.count / perPage),
                totalItems: data?.count
            }
        } else {
            var { data } = await client.get(`/projeto/${projeto?.id}/users?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}`)
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
        setCurrentUsers(data?.users)
    }

    const changeItemsPerPage = (value: number) => {
        onPageChanged({
            name: pathname,
            currentPage: 1,
            perPage: value,
            orderBy,
            order
        })
    }

    return (
        <div>
            <Users
                currentUsers={currentUsers}
                loading={loading}
                loadUsers={loadUsers}
                currentPage={currentPage}
                orderBy={orderBy}
                order={order}
                onPageChanged={onPageChanged}
                perPage={itemsPerPage}
                changeItemsPerPage={changeItemsPerPage}
                roles={roles}
            />
            <Pagination
                perPage={itemsPerPage}
                totalItems={totalItems}
                orderBy={orderBy}
                order={order}
                currentPage={currentPage}
                onPageChanged={onPageChanged}    
                pageNeighbours={3}
            />
        </div>
    )
}

export default ProjetoUsers