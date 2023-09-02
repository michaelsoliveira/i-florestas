import ProjetoUsers from "./ProjetoUsers"

const getRoles = async () => {
    const { roles } = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/role`, {
        method: 'GET',
        //cache: 'no-store'
    }).then((result: any) => {
        return result.json()
    })

    return roles
}

const Users = async () => {
    const roles = getRoles()

    return (
        <>
            <ProjetoUsers roles={roles} />
        </>
    )
}

export default Users