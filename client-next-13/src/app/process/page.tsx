'use client'

import withAuthentication from "src/components/withAuthentication"
import Index from "src/components/process/Index"

const PoaIndex = () => {

    return (
    <div>
        <Index />
    </div>
    )
}

export default withAuthentication(PoaIndex)
