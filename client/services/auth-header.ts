import { parseCookies } from "nookies";
import { getSession, useSession } from "next-auth/react";


export default async function authHeader() : Promise<any> {
    return await getSession().then((response: any) => {
        const authorization = {
            headers: {
                Authorization: `Bearer ${response?.accessToken}`
            }
        };
        
        return new Promise(resolve => {
            resolve(authorization)
        })
    })
}