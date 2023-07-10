import GrupoCategoriaEspecie from "@/components/categoria-especie/GrupoCategoriaEspecie";
import withAuthentication from "@/components/withAuthentication";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next/types";
import { useContext, useEffect } from "react";
import { RootState } from "store";
import { useAppSelector } from "store/hooks";
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { useSelector } from "react-redux";

const GrupoCategoriaIndex = ({ data }: any) => {
    const poa = useAppSelector((state: RootState) => state.poa)
    const cookies = parseCookies()

    console.log(data)
    const preparedData = data?.map((data: any) => {
        return {
            id: data?.id,
            label: data?.nome
        }
    })

    useEffect(() => {
        cookies['poaId'] = poa?.id
        console.log(poa)
    }, [cookies, poa])

    return (
        <GrupoCategoriaEspecie data={preparedData} />
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
    
    const session = await getSession(ctx)
    const token = session?.accessToken

    const headers = {
        Authorization: `Bearer ${token}`
    }
    
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    } 

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categoria?order=asc&orderBy=nome`, { headers })
    const { categorias } = await response.json()  

    return {
        props: {
            data: categorias ? categorias : []
        }
    }
}

export default withAuthentication(GrupoCategoriaIndex)