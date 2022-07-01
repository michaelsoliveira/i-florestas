import { useCallback, useContext, useEffect, useState } from "react"
import withAuthentication from "components/withAuthentication"
import { Pagination } from "components/Pagination"
import { UpaType } from "services/upa"
import { AuthContext } from "contexts/AuthContext"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { paginate } from "store/paginationSlice"
import { useRouter } from "next/router"
import { RootState } from "store"
import Index from "components/ut/Index"

const UtIndex = () => {
    const { client } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [totalItems, setTotalItems] = useState(0)
    const [currentUts, setCurrentUts] = useState<UpaType[]>([])
    const [orderBy, setOrderBy] = useState('descricao')
    const [order, setOrder] = useState('asc')
    const pagination = useAppSelector((state: RootState) => state.pagination)
    const umf = useAppSelector((state: RootState) => state.umf)
    const upa = useAppSelector((state: RootState) => state.upa)
    const dispatch = useAppDispatch()
    const router = useRouter()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loadUts = useCallback(async (itemsPerPage = 1, currentPage?: number) => {
        setLoading(true)
        const currentPagePagination = (pagination.name === router.pathname && pagination.currentPage) ? pagination.currentPage : itemsPerPage
        setCurrentPage(currentPagePagination)
        const url = `/ut?page=${currentPage ? currentPage : currentPagePagination}&perPage=${pagination.perPage}&orderBy=${orderBy}&order=${order}&upa=${upa.id}`
        
        const { data } = await client.get(url)
        
        setTotalItems(data?.count)
        setCurrentUts(data?.uts)
        setLoading(false)
    }, [client, order, orderBy, pagination.currentPage, pagination.name, pagination.perPage, router.pathname, upa.id])

    useEffect(() => {  
        loadUts(itemsPerPage)
    }, [itemsPerPage, loadUts])

    const onPageChanged = async (paginatedData: any) => {
        
        const {
            name,
            currentPage,
            perPage,
            totalPages,
            orderBy,
            order,
            upa,
            search
        } = paginatedData
        const url = `/ut?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}&upa=${upa}&search=${search}`

        if (search) {
            
            var { data } = await client.get(url)
        
            paginatedData = {
                name,
                ...paginatedData,
                totalPages: Math.ceil(data?.count / perPage),
                totalItems: data?.count
            }
        } else {
            var { data } = await client.get(`/ut?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}&upa=${upa}`)
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
        setCurrentUts(data?.uts)
    }

    const changeItemsPerPage = (value: number) => {
        onPageChanged({
            name: router.pathname,
            currentPage: 1,
            perPage: value,
            orderBy,
            order
        })
    }

    return (
    <div>
        <Index
            currentUts={currentUts}
            loading={loading}
            loadUts={loadUts}
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

export default withAuthentication(UtIndex)
