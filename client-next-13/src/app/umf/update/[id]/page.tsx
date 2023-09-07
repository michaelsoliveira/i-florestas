import AddEdit from "@/components/umf/AddEdit";
import withAuthentication from "@/components/utils/withAuthentication";
import { authOptions } from "@/lib/authOptions";
import axios from "axios";
import { getServerSession } from "next-auth";
// import Form from "@/components/umf/Form"

interface pageProps {
    params: {
        id: string
    }
}

async function getData(id: string) {
    const session = await getServerSession(authOptions);
    
    const url = `${process.env.NEXT_PUBLIC_API_URL}/umf/${id}`

    const { data } = await axios.get(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${session?.accessToken}`
        }
    })

    return data
}

const pageUmf = async ({ params }: pageProps) => {
    const { id } = params
    const umf = await getData(id)

    try {

        return <AddEdit umf={umf} />

    } catch (error: any) {
        console.log(error?.message)
        throw new Error(error?.message)
    }
    
}

export default pageUmf;