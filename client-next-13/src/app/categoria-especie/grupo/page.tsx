'use client'

import GrupoCategoriaEspecie from "@/components/categoria-especie/GrupoCategoriaEspecie";
import withAuthentication from "@/components/utils/withAuthentication";

function CategoriaGrupoPage() {
    
    return (
        <GrupoCategoriaEspecie />
    )
}

export default withAuthentication(CategoriaGrupoPage)