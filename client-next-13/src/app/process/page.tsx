import { useCallback, useContext, useEffect, useState } from "react"
import withAuthentication from "src/components/withAuthentication"
import { AuthContext } from "@/context/AuthContext"
import Index from "src/components/process/Index"

const PoaIndex = () => {

    return (
    <div>
        <Index />
    </div>
    )
}

export default withAuthentication(PoaIndex)
