import { useCallback, useContext, useEffect, useState } from "react"
import withAuthentication from "../../components/withAuthentication"
import Especies from "../../components/Especies"
import { Pagination } from "../../components/Pagination"
import { EspecieType } from "../../services/especie"
import { AuthContext } from "../../contexts/AuthContext"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { paginate, setCurrentPagePagination } from "../../store/paginationSlice"
import { useRouter } from "next/router"
import { RootState } from "../../store"

const EspecieIndex = () => {
    const { client } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [totalItems, setTotalItems] = useState(0)
    const [currentEspecies, setCurrentEspecies] = useState<EspecieType[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [orderBy, setOrderBy] = useState('especie.nome')
    const [order, setOrder] = useState('ASC')
    const pagination = useAppSelector((state: RootState) => state.pagination)
    const dispatch = useAppDispatch()
    const router = useRouter()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loadEspecies = useCallback(async (itemsPerPage?: number, currentPage?: number) => {
        setLoading(true)
        const currentPagePagination = (pagination.name === router.pathname && pagination.currentPage) ? pagination.currentPage : 1
        const perPage = itemsPerPage ? itemsPerPage : pagination.perPage
        const url = `/especie?page=${currentPage ? currentPage : currentPagePagination}&perPage=${perPage}&orderBy=${orderBy}&order=${order}`

        setCurrentPage(currentPagePagination)
        const { data } = await client.get(url)

        setTotalItems(data?.count)
        setCurrentEspecies(data?.especies)
        setLoading(false)
    }, [client, order, orderBy, pagination.currentPage, pagination.name, router.pathname])

    useEffect(() => {  
        loadEspecies(itemsPerPage)
    }, [itemsPerPage])

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
        <Especies
            currentEspecies={currentEspecies}
            loading={loading}
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
