import AddEdit from "@/components/umf/AddEdit";
import withAuthentication from "@/components/utils/withAuthentication";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { InferGetStaticPropsType, GetStaticPaths, GetStaticProps, ResolvingMetadata, Metadata } from 'next'
import { redirect  } from "next/navigation";
// import Form from "@/components/umf/Form"


  type Props = {
    params: { id: string }
  }
   
  export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    // read route params
    const id = params.id
   
    // fetch data
    const umf = await fetch(`http://localhost:3333/umf/${id}`).then((res) => res.json())
   
    return {
      title: umf.nome
    }
  }
   
//   export const getStaticPaths: GetStaticPaths = async () => {
//     return {
//       paths: [
//         {
//           params: {
//             id: 'next.js',
//           },
//         }, // See the "paths" section below
//       ],
//       fallback: true, // false or "blocking"
//     }
//   }
   
//   export const getStaticProps: GetStaticProps<{
//     repo: Umf
//   }> = async () => {
//     const res = await fetch('https://api.github.com/repos/vercel/next.js')
//     const repo = await res.json()
//     return { props: { repo } }
//   }
   
//   export default function Page({
//     repo,
//   }: InferGetStaticPropsType<typeof getStaticProps>) {
//     return repo.stargazers_count
//   }

// interface pageProps {
//     params: {
//         umf: any
//     }
// }

// type Umf = {
//     id: string,
//     nome: string
// }

// export const dynamic = 'auto'

// This function gets called at build time
// export const getStaticPaths: GetStaticPaths = async () => {
//     const session = await getServerSession(authOptions)
//     const headers = { 'Authorization': `Bearer ${session?.accessToken}` };
//     // Call an external API endpoint to get posts
//     const res = await fetch('http://localhost:3333/umf', { headers })
//     const umfs = await res.json()
   
//     // Get the paths we want to pre-render based on posts
//     const paths = umfs.map((umf: any) => ({
//       params: { id: umf.id },
//     }))
   
//     // We'll pre-render only these paths at build time.
//     // { fallback: false } means other routes should 404.
//     return { paths, fallback: true }
//   }
   
  // This also gets called at build time
//   export const getStaticProps: GetStaticProps<{ umf: any }> = async ({ params }: any) => {
//     // params contains the post `id`.
//     // If the route is like /posts/1, then params.id is 1
//     const res = await fetch(`http://localhost:3333/umf/${params?.umf?.id}`)
//     const umf = await res.json()
   
//     // Pass post data to the page via props
//     return { props: { umf } }
//   }

// export const revalidate = 60
// export const dynamic = 'auto'

// export async function generateStaticParams() {
//     const session = await getServerSession(authOptions)

//     if (session && session?.accessToken) {
//         const url = `${process.env.NEXT_PUBLIC_API_URL}/umf`

//         const data = await fetch(url, {
//             next: {
//                 revalidate: 0
//             },
//             method: 'GET',
//             headers: {
//                 'Authorization': 'Bearer ' + session?.accessToken,
//                 'Content-Type': 'application/json'
//             }
//         }).then((response) => response.json())

//         return data.map((umf: any) => ({
//             id: umf.id
//         }))
//     } else {
//         return []
//     }

// }

// // getStaticPaths
// export async function getStaticPaths() {
//     const response = await fetch("https://jsonplaceholder.typicode.com/users")
//     const userData = await response.json()
  
//    // Getting the unique key of the user from the response
//    // with the map method of JavaScript.
//     const uniqueId = userData.map((data: any) => {
//       return data.id
//     })
  
//     return {
//       paths: {
//         [{
//           params: {
//             uniqueId: uniqueId.toString()
//           }
//         }],
//         fallback: false
//       }
//     }
//   }

const pageUmf = async ({ params }: any) => {
    try {
        const { id } = params
        const session = await getServerSession(authOptions)

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

            return <AddEdit umf={umf} />            
        } else {
          redirect('/login')
        }
    } catch (error: any) {
        console.log(error?.message)
        throw new Error(error?.message)
    }
    
}

export default pageUmf;