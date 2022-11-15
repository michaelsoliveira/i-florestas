import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import withAuthentication from "components/withAuthentication"
import { useCallback, useContext, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { AuthContext } from "contexts/AuthContext"
import { paginate, setCurrentPagePagination } from "store/paginationSlice"
import { useRouter } from "next/router"
import { RootState } from "store"
import Users from "components/user/Users"
import { Pagination } from "components/Pagination"
import { UserType } from "types/IUserType"

type ProjetoUserType = {
    projetoId: string;
    roles: any
}

const EmpresaUsersIndex = ({ projetoId, roles }: ProjetoUserType) => {

    const { client } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [totalItems, setTotalItems] = useState(0)
    const [currentUsers, setCurrentUsers] = useState<UserType[]>([])
    const [orderBy, setOrderBy] = useState('user.username')
    const [order, setOrder] = useState('asc')
    const pagination = useAppSelector((state: RootState) => state.pagination)
    const dispatch = useAppDispatch()
    const router = useRouter()
    
    const loadUsers = useCallback(async (itemsPerPage?: number, currentPage?: number) => {
        setLoading(true)
        const currentPagePagination = (pagination.name === router.pathname && pagination.currentPage) ? pagination.currentPage : 1
        setCurrentPage(currentPagePagination)
        const { data } = await client.get(`/projeto/${projetoId}/users?page=${currentPage ? currentPage : currentPagePagination}&perPage=${itemsPerPage}&orderBy=${orderBy}&order=${order}`)
        setTotalItems(data?.count)
        setCurrentUsers(data?.users)
        setLoading(false)
    }, [client, order, orderBy, pagination.currentPage, pagination.name, projetoId, router.pathname])

    useEffect(() => {  
        loadUsers(itemsPerPage)
    }, [itemsPerPage, loadUsers])

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
            
            var { data } = await client.get(`/projeto/${projetoId}/users?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}&search=${search.toLowerCase()}`)
            
            paginatedData = {
                name,
                ...paginatedData,
                totalPages: Math.ceil(data?.count / perPage),
                totalItems: data?.count
            }
        } else {
            var { data } = await client.get(`/projeto/${projetoId}/users?page=${currentPage}&perPage=${perPage}&orderBy=${orderBy}&order=${order}`)
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
            name: router.pathname,
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
                projetoId={projetoId}
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

export const getServerSideProps: GetServerSideProps = async ({params, req, res}) => {
    const projetoId = params?.projeto

    const { roles } = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/role`, {
        method: 'GET',
    }).then((result: any) => {
        return result.json()
    })
  
    return {
        props: {
            projetoId,
            roles
        }
    }
}

export default withAuthentication(EmpresaUsersIndex)