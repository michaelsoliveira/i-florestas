import AddEdit from "@/components/umf/AddEdit";
import withAuthentication from "@/components/utils/withAuthentication";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
// import Form from "@/components/umf/Form"

interface pageProps {
    params: {
        id: string
    }
}


const getData = async (id: string) => {
    const session = await getServerSession(authOptions);
    
    const url = `${process.env.NEXT_PUBLIC_API_URL}/umf/${id}`

    const data = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${session?.accessToken}`
        }
    }).then(response => response.json())

    return data
}

const pageUmf = async ({ params }: pageProps) => {
    try {
        const umf = await getData(params.id)

        return (<AddEdit umf={umf} />)

    } catch (error: any) {
        console.log(error?.message)
        throw new Error(error?.message)
    }
    
}

export default pageUmf;