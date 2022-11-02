import { ChangeEvent, useCallback, useContext, useEffect, useState } from "react"
import withAuthentication from "components/withAuthentication"
import Projetos from "components/projeto/Index"
// import { Pagination } from "components/Pagination"
import { AuthContext } from "contexts/AuthContext"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { paginate, setCurrentPagePagination } from "store/paginationSlice"
import { useRouter } from "next/router"
import { RootState } from "store"
import { EspecieType } from "types/IEspecieType"

const EspecieIndex = () => {
    const { client } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [totalItems, setTotalItems] = useState(0)
    const [currentProjetos, setCurrentProjetos] = useState<EspecieType[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [orderBy, setOrderBy] = useState('projeto.nome')
    const [order, setOrder] = useState('ASC')
    const pagination = useAppSelector((state: RootState) => state.pagination)
    const dispatch = useAppDispatch()
    const router = useRouter()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loadProjetos = useCallback(async (itemsPerPage?: number, currentPage?: number) => {
        setLoading(true)
        const currentPagePagination = (pagination.name === router.pathname && pagination.currentPage) ? pagination.currentPage : 1
        const perPage = itemsPerPage ? itemsPerPage : pagination.perPage
        const url = `/projeto?page=${currentPage ? currentPage : currentPagePagination}&perPage=${perPage}&orderBy=${orderBy}&order=${order}`

        setCurrentPage(currentPagePagination)

        const { data } = await client.get(url)

        setTotalItems(data?.count)
        setCurrentProjetos(data?.especies)
        setLoading(false)
    }, [client, order, orderBy, pagination.currentPage, pagination.name, pagination.perPage, router.pathname])

    useEffect(() => {  
        loadProjetos(itemsPerPage)
    }, [itemsPerPage, loadProjetos])

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
            
            var { data } = await client.get(`/projeto/search/q?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}&nome=${search.toLowerCase()}`)
            
            paginatedData = {
                name,
                ...paginatedData,
                totalPages: Math.ceil(data?.count / perPage),
                totalItems: data?.count
            }
        } else {
            var { data } = await client.get(`/projeto?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}`)
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
        setCurrentProjetos(data?.especies)
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
        <Projetos />
        {/* <Pagination
            perPage={itemsPerPage}
            totalItems={totalItems}
            orderBy={orderBy}
            order={order}
            currentPage={currentPage}
            onPageChanged={onPageChanged}    
            pageNeighbours={3}
        /> */}
    </div>
    )
}

export default withAuthentication(EspecieIndex)
