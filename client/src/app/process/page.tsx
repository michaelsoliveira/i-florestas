'use client'

import withAuthentication from "@/components/utils/withAuthentication"
import Index from "src/components/process/Index"

const PoaIndex = () => {

    return (
    <div>
        <Index />
    </div>
    )
}

export default withAuthentication(PoaIndex)
