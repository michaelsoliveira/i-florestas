export default async function getAllUmfs(token?: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/umf`, 
        { 
            headers: {
                'Authorization': `Bearer ${token}`
        } 
    })

    if (!res.ok) throw new Error('failed to fetch data UMF')

    return res.json()
}