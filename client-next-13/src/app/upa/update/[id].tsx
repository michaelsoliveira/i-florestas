import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import AddEdit from "src/components/upa/AddEdit";


import withAuthentication from "src/components/withAuthentication";


export const getServerSideProps: GetServerSideProps = async (ctx) => {

    return {
        props: {
            id: ctx.params?.id
        }
    }
}

export default withAuthentication(AddEdit);