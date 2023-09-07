import AddEdit from "@/components/umf/AddEdit";
import withAuthentication from "@/components/utils/withAuthentication";

interface pageProps {
    params: {
        id: string
    }
}

const pageUmf = ({ params }: pageProps) => {
    
    return (
            <AddEdit />
    )
}

export default pageUmf;