import AddEdit from "@/components/umf/AddEdit";
import { Suspense } from "react";
//import withAuthentication from "@/components/utils/withAuthentication";

type Params = {
  params: {
    id: string
  }
}

export default async function UmfUpdatePage({ params: { id } } : Params) {
  return (
    <div>
      <Suspense fallback={<h2>Loading...</h2>}>
        {/* { JSON.stringify(umf, null, 2) } */}
        <AddEdit id={id} />
      </Suspense>
    </div>
  )
}