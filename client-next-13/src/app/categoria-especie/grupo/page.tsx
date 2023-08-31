'use client'

import GrupoCategoriaEspecie from "@/components/categoria-especie/GrupoCategoriaEspecie";
import withAuthentication from "@/components/withAuthentication";

export default function Page() {
    return withAuthentication(GrupoCategoriaEspecie)
}