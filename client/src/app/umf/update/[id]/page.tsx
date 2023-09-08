import AddEdit from "@/components/umf/AddEdit";
import { authOptions } from "@/lib/authOptions";
import getAllUmfs from "@/lib/getAllUmfs";
import getUmf from "@/lib/getUmf";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import { cookies, headers } from "next/headers";
//import withAuthentication from "@/components/utils/withAuthentication";

type Params = {
  params: {
    id: string
  }
}


// export async function getStaticPaths() {
//   const session = await getServerSession(authOptions)
//   const umfs: Promise<Umf[]> = await getAllUmfs(session?.accessToken)
//   const paths = (await umfs).map((umf) => ({
//     id: umf.id
//   }))
//   return {
//       paths,
//       fallback: true
//   }
// }

export async function getStaticProps ({ params }: Params) {
  const session = await getServerSession(authOptions)
    const { id } = params
    const umf: Promise<Umf> = await getUmf(id, session?.accessToken)
    return {
        props: {
            umf
        },
        revalidate: 60
    }
  }

export default async function UmfUpdatePage({ params: { id } } : Params) {

  const session = await getServerSession(authOptions)

  const umf = await getUmf(id, session?.accessToken)
  // console.log(umf)
  return (
    <div>
      <Suspense fallback={<h2>Loading...</h2>}>
        {/* { JSON.stringify(umf, null, 2) } */}
        <AddEdit umf={umf} />
      </Suspense>
    </div>
  )
}