'use client'

import { useCallback, useContext, useEffect, useState } from "react"
import withAuthentication from "@/components/withAuthentication"
import { Pagination } from "@/components/Pagination"
import { AuthContext } from "@/context/AuthContext"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { paginate } from "@/redux/features/paginationSlice"
import { usePathname } from "next/navigation"
import { RootState } from "@/redux/store"
import Index from "src/components/upa/Index"
import { UpaType } from "@/types/IUpaType"

const UpaIndex = () => {
    const { client } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [totalItems, setTotalItems] = useState(0)
    const [currentUpas, setCurrentUpas] = useState<UpaType[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [orderBy, setOrderBy] = useState('descricao')
    const [order, setOrder] = useState('asc')
    const pagination = useAppSelector((state: RootState) => state.pagination)
    const umf = useAppSelector((state: RootState) => state.umf)
    const dispatch = useAppDispatch()
    const pathname = usePathname()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loadUpas = useCallback(async (itemsPerPage?: number, currentPage?: number) => {
        setLoading(true)
        const currentPagePagination = (pagination.name === pathname && pagination.currentPage) ? pagination.currentPage : 1
        setCurrentPage(currentPagePagination)
        const url = `/upa?page=${currentPage ? currentPage : currentPagePagination}&perPage=${itemsPerPage? itemsPerPage : pagination.perPage}&orderBy=${orderBy}&order=${order}&umf=${umf.id}`
        
        const { data } = await client.get(url)
        
        setTotalItems(data?.count)
        setCurrentUpas(data?.upas)
        setLoading(false)
    }, [client, order, orderBy, pagination.currentPage, pathname, pagination.name, pagination.perPage, umf.id])

    useEffect(() => {  
        loadUpas(itemsPerPage)
    }, [itemsPerPage, loadUpas])

    const onPageChanged = async (paginatedData: any) => {
        
        const {
            name,
            currentPage,
            perPage,
            totalPages,
            orderBy,
            order,
            umf,
            search
        } = paginatedData
        const url = `/upa?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}&umf=${umf}&search=${search}`

        if (search) {
            
            var { data } = await client.get(url)
        
            paginatedData = {
                name,
                ...paginatedData,
                totalPages: Math.ceil(data?.count / perPage),
                totalItems: data?.count
            }
        } else {
            var { data } = await client.get(`/upa?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}&umf=${umf}`)
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
        setCurrentUpas(data?.upas)
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
    <div className="h-[40.8em] overflow-y-auto">
        <Index
            currentUpas={currentUpas}
            loading={loading}
            loadUpas={loadUpas}
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

export default withAuthentication(UpaIndex)
