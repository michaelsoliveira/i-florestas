'use client'

import Users from "@/components/projeto/Users"

import withAuthentication from "@/components/utils/withAuthentication"

const IndexUsers = () => {

    return (
        <Users />
    )
}

export default withAuthentication(IndexUsers)