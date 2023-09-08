'use client'

import AddEdit from "@/components/umf/AddEdit";
import withAuthentication from "@/components/utils/withAuthentication";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { ResolvingMetadata, Metadata } from 'next'
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
    const umf = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/umf/${id}`, { headers: { 'Authorization': `Bearer ${session?.accessToken}` } }).then((res) => res.json())
   
    return {
      title: umf.nome
    }
  }

const pageUmf = ({ params }: any) => {
    try {
        const { id } = params

        return (
          <AddEdit id={id} />
        )            
        
    } catch (error: any) {
        console.log(error?.message)
    }
    
}

export default pageUmf;