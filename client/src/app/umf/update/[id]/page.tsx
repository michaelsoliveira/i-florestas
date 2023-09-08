import AddEdit from "@/components/umf/AddEdit";
import Form from '@/components/umf/Form'
import withAuthentication from "@/components/utils/withAuthentication";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { InferGetStaticPropsType, GetStaticPaths, GetStaticProps, ResolvingMetadata, Metadata } from 'next'
// import Form from "@/components/umf/Form"


  type Props = {
    params: { id: string }
  }

  const getSession: any = async () => {
    return await getServerSession(authOptions)
  }
   
  export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    // read route params
    const id = params.id
    const session = await getSession()
    // fetch data
    const umf = await fetch(`http://localhost:3333/umf/${id}`, { headers: { 'Authorization': `Bearer ${session?.accessToken}` } }).then((res) => res.json())
   
    return {
      title: umf.nome
    }
  }

const pageUmf = async ({ params }: any) => {
    try {
        const { id } = params
        const session = await getSession()

        if (session && session?.accessToken) {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/umf/${id}`

            const umf = await fetch(url, {
                next: {
                    revalidate: 0
                },
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + session?.accessToken,
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json())

            return (
              <AddEdit>
                <Form umf={umf} />
              </AddEdit>
            )            
        }
    } catch (error: any) {
        console.log(error?.message)
        throw new Error(error?.message)
    }
    
}

export default pageUmf;