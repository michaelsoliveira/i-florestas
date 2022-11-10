import { GetServerSideProps } from "next";
import AddEdit from "components/empresa/AddEdit";
import withAuthentication from "components/withAuthentication";


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {
            projetoId: ctx.params?.projeto,
            id: ctx.params?.id
        }
    }
}

export default withAuthentication(AddEdit);