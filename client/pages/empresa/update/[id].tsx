import { GetServerSideProps } from "next";
import Empresa from "../../../components/empresa";
import withAuthentication from "../../../components/withAuthentication";


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {
            id: ctx.params?.id
        }
    }
}

export default withAuthentication(Empresa);