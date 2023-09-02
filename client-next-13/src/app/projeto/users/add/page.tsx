'use client'

import { AddEdit } from "src/components/user/AddEdit"
import withAuthentication from "src/components/withAuthentication"
import { AuthContext } from '@/context/AuthContext';
import { use, useCallback, useContext, useEffect, useState } from "react";

const AddUserToProjeto = () => {
  const { client } = useContext(AuthContext)

  const [roles, setRoles] = useState<any[]>()

        const loadRoles = useCallback(async () => {
            const response = await client.get('role')
            const { roles } = response.data
            setRoles(roles)
        }, [client])
    
        useEffect(() => {
            loadRoles()
        }, [loadRoles])
    return (
        <main className="bg-white shadow-lg rounded-xl px-4 py-2 w-1/3 mx-auto my-6">
            <AddEdit roles={roles} redirect={false} />
        </main>
    )
}

export default withAuthentication(AddUserToProjeto)