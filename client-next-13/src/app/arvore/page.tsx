'use client'

import withAuthentication from "@/components/withAuthentication"
import ArvoreIndex from "@/components/arvore/Index"
const Page = () => {
    return (
        <div>
            <ArvoreIndex />
        </div>
    )
}

export default withAuthentication(Page)
