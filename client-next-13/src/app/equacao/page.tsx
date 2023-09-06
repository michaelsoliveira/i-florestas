'use client'

import withAuthentication from "src/components/withAuthentication"
import { useCallback, useContext, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { AuthContext } from "@/context/AuthContext"
import { paginate, setCurrentPagePagination } from "@/redux/features/paginationSlice"
import { usePathname } from "next/navigation"
import { RootState } from "@/redux/store"
import Equacoes from "src/components/equacao/Index"
import { Pagination } from "src/components/Pagination"
import { LoadingContext } from "@/context/LoadingContext"
import { ProjetoContext } from "@/context/ProjetoContext"

const ProjetoEquacoesIndex = () => {

    const { client } = useContext(AuthContext)
    const { loading, setLoading } = useContext(LoadingContext)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [totalItems, setTotalItems] = useState(0)
    const [currentEquacoes, setCurrentEquacoes] = useState<any[]>([])
    const [orderBy, setOrderBy] = useState('nome')
    const [order, setOrder] = useState('asc')
    const pagination = useAppSelector((state: RootState) => state.pagination)
    const dispatch = useAppDispatch()
    const pathname = usePathname()
    const { projeto } = useContext(ProjetoContext)
    
    const loadEquacoes = useCallback(async (itemsPerPage?: number, currentPage?: number) => {
        setLoading(true)
        const currentPagePagination = (pagination.name === pathname && pagination.currentPage) ? pagination.currentPage : 1
        setCurrentPage(currentPagePagination)
        const { data } = await client.get(`/projeto/${projeto?.id}/eq-volume?page=${currentPage ? currentPage : currentPagePagination}&perPage=${itemsPerPage}&orderBy=${orderBy}&order=${order}`)
        
        setTotalItems(data?.count)
        setCurrentEquacoes(data?.equacoes)
        setLoading(false)
    }, [client, order, orderBy, pagination.currentPage, pagination.name, projeto?.id, pathname, setLoading])

    useEffect(() => {  
        loadEquacoes(itemsPerPage)
    }, [itemsPerPage, loadEquacoes])

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
            
            var { data } = await client.get(`/projeto/${projeto?.id}/eq-volume?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}&search=${search.toLowerCase()}`)
            
            paginatedData = {
                name,
                ...paginatedData,
                totalPages: Math.ceil(data?.count / perPage),
                totalItems: data?.count
            }
        } else {
            var { data } = await client.get(`/projeto/${projeto?.id}/eq-volume?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}`)
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
        setCurrentEquacoes(data?.users)
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
            <Equacoes
                currentEquacoes={currentEquacoes}
                loading={loading}
                loadEquacoes={loadEquacoes}
                currentPage={currentPage}
                orderBy={orderBy}
                order={order}
                onPageChanged={onPageChanged}
                perPage={itemsPerPage}
                changeItemsPerPage={changeItemsPerPage}
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

export default withAuthentication(ProjetoEquacoesIndex)