'use client'

import { useCallback, useContext, useEffect, useState } from "react"
import withAuthentication from "src/components/withAuthentication"
import { Pagination } from "src/components/Pagination"
import { AuthContext } from "@/context/AuthContext"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { paginate, setCurrentPagePagination } from "@/redux/features/paginationSlice"
import { usePathname } from "next/navigation"
import { RootState } from "@/redux/store"
import Index from "src/components/umf/Index"
import { UmfType } from "@/types/IUMFType"
import { LoadingContext } from "@/context/LoadingContext"
import { ProjetoContext } from "@/context/ProjetoContext"

const UmfIndex = () => {
    const { client } = useContext(AuthContext)
    const { loading, setLoading } = useContext(LoadingContext)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [totalItems, setTotalItems] = useState(0)
    const [currentUmfs, setCurrentUmfs] = useState<UmfType[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [orderBy, setOrderBy] = useState('nome')
    const [order, setOrder] = useState('asc')
    const pagination = useAppSelector((state: RootState) => state.pagination)
    const dispatch = useAppDispatch()
    const pathname = usePathname()
    const { projeto } = useContext(ProjetoContext)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loadUmfs = useCallback(async (itemsPerPage?: number, currentPage?: number) => {
        setLoading(true)
        const currentPagePagination = (pagination.name === pathname && pagination.currentPage) ? pagination.currentPage : 1
        setCurrentPage(currentPagePagination)
        const url = `/umf/find-by-projeto/${projeto?.id}?page=${currentPage ? currentPage : currentPagePagination}&perPage=${pagination.perPage}&orderBy=${orderBy}&order=${order}`
        
        const { data } = await client.get(url)
        
        setTotalItems(data?.count)
        setCurrentUmfs(data?.umfs)
        setLoading(false)
    }, [client, order, orderBy, pagination.currentPage, pathname, pagination.name, pagination.perPage, projeto?.id, setLoading])

    useEffect(() => {  
        loadUmfs(itemsPerPage)
    }, [itemsPerPage, projeto, loadUmfs])

    const onPageChanged = async (paginatedData: any) => {
        
        const {
            name,
            currentPage,
            perPage,
            totalPages,
            orderBy,
            order,
            search
        } = paginatedData
        const url = `/umf/find-by-projeto/${projeto?.id}?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}&search=${search}`

        if (search) {
            
            var { data } = await client.get(url)
        
            paginatedData = {
                name,
                ...paginatedData,
                totalPages: Math.ceil(data?.count / perPage),
                totalItems: data?.count
            }
        } else {
            var { data } = await client.get(`/umf/find-by-projeto/${projeto?.id}?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}`)
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
        setCurrentUmfs(data?.umfs)
        setTotalPages(totalPages ? totalPages : Math.ceil(data?.count / perPage))
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
        <Index
            currentUmfs={currentUmfs}
            loading={loading}
            loadUmfs={loadUmfs}
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

export default withAuthentication(UmfIndex)
