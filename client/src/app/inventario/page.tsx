'use client'

import withAuthentication from "@/components/utils/withAuthentication"
import Inventario from "src/components/inventario/Index"

const InventarioIndex = () => {


    return (
        <>
            <Inventario />
        </>
    )
}

export default withAuthentication(InventarioIndex)
