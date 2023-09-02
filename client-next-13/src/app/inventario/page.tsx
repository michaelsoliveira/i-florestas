'use client'

import withAuthentication from "src/components/withAuthentication"
import Inventario from "src/components/inventario/Index"

const InventarioIndex = () => {


    return (
        <>
            <Inventario />
        </>
    )
}

export default withAuthentication(InventarioIndex)
