'use client'

import ProjetoUsers from "@/components/projeto/ProjetoUsers"

import withAuthentication from "@/components/utils/withAuthentication"

const IndexUsers = () => {

    return (
        <ProjetoUsers />
    )
}

export default withAuthentication(IndexUsers)