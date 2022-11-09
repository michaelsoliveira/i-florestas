import { GetServerSideProps } from "next"
import withAuthentication from "components/withAuthentication"

const EmpresaUpdateUser = ({ projetoId, userId } : any) => {
    return (
        <div>
            UPDATE EMPRESA
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({params, req, res}) => {
    const projetoId = params?.projeto
    const userId = params?.id
    
    return {
        props: {
            projetoId,
            userId
        }
    }
}

export default withAuthentication(EmpresaUpdateUser)