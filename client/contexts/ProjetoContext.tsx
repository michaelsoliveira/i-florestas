import { createContext, ReactNode, useState } from "react"

type Props = {
    children: ReactNode
}

const ProjetoContext = createContext({})

export function ProjetoProvider({ children }: Props) {
    const [projeto, setProjeto] = useState()
    
    return (
        <ProjetoContext.Provider value={{ projeto, setProjeto }}>
            { children }
        </ProjetoContext.Provider>
    )
}