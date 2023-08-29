import { GetServerSideProps } from "next";
import AddEdit from "src/components/ut/AddEdit";


import withAuthentication from "src/components/withAuthentication";


export const getServerSideProps: GetServerSideProps = async (ctx) => {

    return {
        props: {
            id: ctx.params?.id
        }
    }
}

export default withAuthentication(AddEdit);