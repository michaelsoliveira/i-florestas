import { ChangeEvent, useCallback, useContext, useEffect, useState } from "react"
import withAuthentication from "components/withAuthentication"
import Especies from "components/especie/Especies"
import { Pagination } from "components/Pagination"
import { AuthContext } from "contexts/AuthContext"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { paginate, setCurrentPagePagination } from "store/paginationSlice"
import { useRouter } from "next/router"
import { RootState } from "store"
import { EspecieType } from "types/IEspecieType"
import { LoadingContext } from "contexts/LoadingContext"
import { Loading } from "@/components/Loading"

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
    const router = useRouter()
    
    const loadEspecies = useCallback(async (itemsPerPage?: number, currentPage?: number) => {
        setLoading(true)
        const currentPagePagination = (pagination.name === router.pathname && pagination.currentPage) ? pagination.currentPage : 1
        const perPage = itemsPerPage ? itemsPerPage : pagination.perPage
        const url = `/especie?page=${currentPage ? currentPage : currentPagePagination}&perPage=${itemsPerPage? itemsPerPage : perPage}&orderBy=${orderBy}&order=${order}`

        setCurrentPage(currentPagePagination)

        const { data } = await client.get(url)
        setTotalItems(data?.count)
        setCurrentEspecies(data?.especies)

        setTimeout(() => {
            setLoading(false)
        }, 500)
        //setLoading(false)
        
    }, [client, order, orderBy, pagination.currentPage, pagination.name, pagination.perPage, router.pathname, setLoading])

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
            
            var { data } = await client.get(`/especie?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}&search=${search.toLowerCase()}`)
            
            paginatedData = {
                name,
                ...paginatedData,
                totalPages: Math.ceil(data?.count / perPage),
                totalItems: data?.count
            }
        } else {
            var { data } = await client.get(`/especie?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}`)
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
            name: router.pathname,
            currentPage: 1,
            perPage: evt.target.value,
            orderBy,
            order
        })
    }

    return (
        <div>
            <Especies
                currentEspecies={currentEspecies}
                loadEspecies={loadEspecies}
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

export default withAuthentication(EspecieIndex)
