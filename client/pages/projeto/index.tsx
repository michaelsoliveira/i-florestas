import withAuthentication from "components/withAuthentication"
import Projetos from "@/components/projeto/Index"

const ProjetoIndex = () => {

    return (
    <div>
        <Projetos />
    </div>
    )
}

export default withAuthentication(ProjetoIndex)
