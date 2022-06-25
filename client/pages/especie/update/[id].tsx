import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Especie from "../../../components/Especie";


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    
    const session = await getSession(ctx)
    
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }  

    return {
        props: {
            localSession: session,
            id: ctx.params?.id
        }
    }
}

export default Especie;