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

export const revalidate = 60
export const dynamic = 'auto'

export async function generateStaticParams() {
    // const session = await getServerSession(authOptions)
    
    // if (session?.accessToken) {
    //     const url = `${process.env.NEXT_PUBLIC_API_URL}/umf`

    //     const data = await fetch(url, {
    //         next: {
    //             revalidate: 0
    //         },
    //         method: 'GET',
    //         headers: {
    //             'Authorization': 'Bearer ' + session?.accessToken,
    //             'Content-Type': 'application/json'
    //         }
    //     }).then((response) => response.json())

    //     return data.map((umf: any) => ({
    //         id: umf.id
    //     }))
    // }

    return [
        {"id": "660092aa-6d2d-41e6-b6e5-8c632ce90cac"},
        {"id": "66d70d8a-e5d5-4e4e-b6df-ecc8552ec82d"},
        {"id": "fa817e96-8d4e-4a01-98b8-d86bd586550f"}
    ]
}

const pageUmf = async ({ params }: pageProps) => {
    const { id } = params

    try {

        return <AddEdit id={id} />

    } catch (error: any) {
        console.log(error?.message)
        throw new Error(error?.message)
    }
    
}

export default pageUmf;