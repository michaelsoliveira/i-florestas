import AddEdit from "@/components/umf/AddEdit";
import withAuthentication from "@/components/utils/withAuthentication";

interface pageProps {
    params: {
        id: string
    }
}

const pageUmf = ({ params }: pageProps) => {
    
    return (
            <div>{params.id}</div>
    )
}

export default pageUmf;