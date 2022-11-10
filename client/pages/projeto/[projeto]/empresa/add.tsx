import AddEdit from "components/empresa/AddEdit";
import withAuthentication from "components/withAuthentication";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {
            projetoId: ctx.params?.projeto
        }
    }
}

export default withAuthentication(AddEdit)