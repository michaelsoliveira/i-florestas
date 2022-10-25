import { createContext, ReactNode } from "react";
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import useClient from "../services/client";
import { Axios } from "axios";

type AuthContextType = {
    client: any
}

type Props = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: Props) {

    const client = useClient()

    return (
        
        <AuthContext.Provider value={{ client }}>
            { children }
        </AuthContext.Provider>
        
    )    
}