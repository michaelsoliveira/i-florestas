import withAuthentication from "components/withAuthentication"
import Projetos from "components/projeto/index"
import { GetServerSideProps } from "next"

const ProjetoIndex = () => {

    return (
    <div>
        <Projetos />
    </div>
    )
}

export default withAuthentication(ProjetoIndex)
