import { GetServerSideProps } from "next"
import withAuthentication from "components/withAuthentication"
import { useCallback, useContext, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { AuthContext } from "contexts/AuthContext"
import { paginate, setCurrentPagePagination } from "store/paginationSlice"
import { useRouter } from "next/router"
import { RootState } from "store"
import Equacoes from "components/equacao/Equacoes"
import { Pagination } from "components/Pagination"
import { LoadingContext } from "contexts/LoadingContext"

type ProjetoEquacaoType = {
    projetoId: string;
}

const ProjetoEquacoesIndex = ({ projetoId }: ProjetoEquacaoType) => {

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
    const router = useRouter()
    
    const loadEquacoes = useCallback(async (itemsPerPage?: number, currentPage?: number) => {
        setLoading(true)
        const currentPagePagination = (pagination.name === router.pathname && pagination.currentPage) ? pagination.currentPage : 1
        setCurrentPage(currentPagePagination)
        const { data } = await client.get(`/projeto/${projetoId}/eq-volume?page=${currentPage ? currentPage : currentPagePagination}&perPage=${itemsPerPage}&orderBy=${orderBy}&order=${order}`)
        console.log(data)
        setTotalItems(data?.count)
        setCurrentEquacoes(data?.equacoes)
        setLoading(false)
    }, [client, order, orderBy, pagination.currentPage, pagination.name, projetoId, router.pathname, setLoading])

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
            
            var { data } = await client.get(`/projeto/${projetoId}/eq-volume?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}&search=${search.toLowerCase()}`)
            
            paginatedData = {
                name,
                ...paginatedData,
                totalPages: Math.ceil(data?.count / perPage),
                totalItems: data?.count
            }
        } else {
            var { data } = await client.get(`/projeto/${projetoId}/eq-volume?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}`)
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
            name: router.pathname,
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
                projetoId={projetoId}
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

export const getServerSideProps: GetServerSideProps = async ({params, req, res}) => {
    const projetoId = params?.projeto
  
    return {
        props: {
            projetoId
        }
    }
}

export default withAuthentication(ProjetoEquacoesIndex)