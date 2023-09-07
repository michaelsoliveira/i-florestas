// import AddEdit from "@/components/umf/AddEdit";
import withAuthentication from "@/components/utils/withAuthentication";
import dynamic from "next/dynamic";

interface pageProps {
    params: {
        id: string
    }
}

const AddEdit = dynamic(() => import('@/components/umf/AddEdit'), {ssr: false})

const pageUmf = ({ params }: pageProps) => {
    
    return (
            <AddEdit id={params.id} />
    )
}

export default pageUmf;