'use client'

import { ChangeEvent, useCallback, useContext, useEffect, useState } from "react"
import withAuthentication from "src/components/withAuthentication"
import Index from "src/components/especie/Index"
import { Pagination } from "src/components/Pagination"
import { AuthContext } from "@/context/AuthContext"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { paginate, setCurrentPagePagination } from "@/redux/features/paginationSlice"
import { usePathname } from "next/navigation"
import { RootState } from "@/redux/store"
import { EspecieType } from "@/types/IEspecieType"
import { LoadingContext } from "@/context/LoadingContext"
import { ProjetoContext } from "@/context/ProjetoContext"

const EspecieIndex = () => {
    const { client } = useContext(AuthContext)
    const { loading, setLoading } = useContext(LoadingContext)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [totalItems, setTotalItems] = useState(0)
    const [currentEspecies, setCurrentEspecies] = useState<EspecieType[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [orderBy, setOrderBy] = useState('especie.nome')
    const [order, setOrder] = useState('asc')
    const pagination = useAppSelector((state: RootState) => state.pagination)
    const dispatch = useAppDispatch()
    const { projeto } = useContext(ProjetoContext)
    const poa = useAppSelector((state: RootState) => state.poa)
    const pathname = usePathname()
    
    const loadEspecies = useCallback(async (itemsPerPage?: number, currentPage?: number) => {
        setLoading(true)
        const currentPagePagination = (pagination.name === pathname && pagination.currentPage) ? pagination.currentPage : 1
        const perPage = itemsPerPage ? itemsPerPage : pagination.perPage
        const url = `/especie?poa=${poa?.id}&page=${currentPage ? currentPage : currentPagePagination}&perPage=${itemsPerPage? itemsPerPage : perPage}&orderBy=${orderBy}&order=${order}`
        setCurrentPage(currentPagePagination)

        const { data } = await client.get(url)

        setTotalItems(data?.count)
        setCurrentEspecies(data?.especies)

        setLoading(false)

        
    }, [client, order, orderBy, pagination.currentPage, pagination.name, pagination.perPage, pathname, setLoading, poa])

    useEffect(() => {  
        
        loadEspecies(itemsPerPage)

    }, [loadEspecies, itemsPerPage])

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

        if (search) {
            
            var { data } = await client.get(`/especie?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}&poa=${poa?.id}&projetoId=${projeto?.id}&search=${search.toLowerCase()}`)
            
            paginatedData = {
                name,
                ...paginatedData,
                totalPages: Math.ceil(data?.count / perPage),
                totalItems: data?.count
            }
        } else {
            var { data } = await client.get(`/especie?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}&poa=${poa?.id}&projetoId=${projeto?.id}`)
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
        setCurrentEspecies(data?.especies)
        setTotalPages(totalPages ? totalPages : Math.ceil(data?.count / perPage))
    }

    const changeItemsPerPage = (evt: ChangeEvent<HTMLSelectElement>) => {
        onPageChanged({
            name: pathname,
            currentPage: 1,
            perPage: evt.target.value,
            orderBy,
            order
        })
    }

    return (
        <div>
            <Index
                currentEspecies={currentEspecies}
                loadEspecies={loadEspecies}
                currentPage={currentPage}
                orderBy={orderBy}
                order={order}
                onPageChanged={onPageChanged}
                perPage={itemsPerPage}
                changeItemsPerPage={changeItemsPerPage}
            />
            { currentEspecies && (
                <Pagination
                    perPage={itemsPerPage}
                    totalItems={totalItems}
                    orderBy={orderBy}
                    order={order}
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}    
                    pageNeighbours={3}
                />
            ) }
    </div>
    )
}

export default withAuthentication(EspecieIndex)
