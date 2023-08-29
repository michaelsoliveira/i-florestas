'use client'

import GrupoCategoriaEspecie from "src/components/categoria-especie/GrupoCategoriaEspecie";
import withAuthentication from "src/components/withAuthentication";

const GrupoCategoriaIndex = () => {

    return (
        <div>
            <GrupoCategoriaEspecie />
        </div>
    )
}

export default withAuthentication(GrupoCategoriaIndex)