import AddEdit from "@/components/umf/AddEdit";
import withAuthentication from "@/components/utils/withAuthentication";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { ResolvingMetadata, Metadata } from 'next'
import { redirect } from 'next/navigation'
// import Form from "@/components/umf/Form"


  type Props = {
    params: { id: string }
  }
   
  export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata | void> {
    try {
      // read route params
      const id = params.id
      const session = await getServerSession(authOptions)
      if (session) {
        const umf = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/umf/${id}`, { headers: { 'Authorization': `Bearer ${session?.accessToken}` } }).then((res) => res.json())
    
        return {
          title: umf.nome,
          description: 'Informações da UMF'
        }
      } else {
        return redirect('/login')
      }
    } catch (error) {
      console.log(error)
    }        
  }

// const pageUmf = () => {
//     try {
      
//         return (
//           <AddEdit />
//         )            
        
//     } catch (error: any) {
//         console.log(error?.message)
//     }
    
// }

export default AddEdit;