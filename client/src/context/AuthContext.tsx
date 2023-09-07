'use client'

import React, { createContext, ReactNode, useContext } from "react";
import useClient from "@/services/client";

type AuthContextType = {
    client: any;
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {

    const client = useClient()

    return (
        
        <AuthContext.Provider value={{ client }}>
            { children }
        </AuthContext.Provider>
        
    )    
}

export const useAuthContext = () => useContext(AuthContext);