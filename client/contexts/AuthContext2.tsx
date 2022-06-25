import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { getUser, signInRequest } from "../services/auth";
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { api } from "../services/api";
import Router from "next/router";
import { apiClient } from "../services/axios";
import { SessionProvider } from 'next-auth/react'

type AuthContextType = {
    loggedUser: User | null;
    setLoggedUser: Dispatch<SetStateAction<User | null>>
    isAuthenticated: boolean;
    signIn: (data: SignInData) => Promise<User | null>;
    signOut: any
}

type User = {
    id: string;
    email: string;
    username: string;
}

type SignInData = {
    email: string;
    password: string;
}

type Props = {
    children: ReactNode,
    session: any
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children, session }: Props) {
    
    const [loggedUser, setLoggedUser] = useState<User | null>(null)
    const isAuthenticated = !!loggedUser;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        
        async function fetchData() {
            const { 'x-access-token': token } = parseCookies()
            try {
                if (token) {
                    await apiClient(AuthContext).get('/auth/me')
                        .then(result => {
                        const user = result.data
                        setLoggedUser(user)
                    }).catch((error: any) => {
                    throw error.errorMessage    
                        // Router.push('/login')
                    }) 
                }    
            } catch (data: any) {
                // setLoggedUser(null)
                // console.log(data)
                throw data.errorMessage
            }
        }

        fetchData()
        
    }, [])

    async function signIn({ email, password }: SignInData) : Promise<User | null>{
        await signInRequest({
            email,
            password
        })
            .then((response: any) => {
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token.accessToken}`

                setCookie(undefined, 'x-access-token', response.data.token.accessToken, {
                    maxAge: response.data.token.expiresIn
                })

                setLoggedUser(response.data.user)
                
                Router.push('/')
            }).catch(({ data }: any) => {
                throw data.errorMessage
            }) 
        
        return loggedUser
    }

    async function signOut() {
        destroyCookie(null, 'x-access-token')
        setLoggedUser(null)
        Router.push('/')
    }

    return (
        <SessionProvider session={session}>
            <AuthContext.Provider value={{ loggedUser, setLoggedUser, isAuthenticated, signIn, signOut }}>
                { children }
            </AuthContext.Provider>
        </SessionProvider>
    )    
}