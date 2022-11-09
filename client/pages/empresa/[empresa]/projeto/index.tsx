import withAuthentication from "components/withAuthentication"
import Projetos from "components/projeto/index"
import { GetServerSideProps } from "next"

const ProjetoIndex = ({ empresaId } : any) => {

    return (
    <div>
        <Projetos empresaId={empresaId} />
    </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({params, req, res}) => {
    const empresaId = params?.empresa

    return {
        props: {
            empresaId
        }
    }
}

export default withAuthentication(ProjetoIndex)
