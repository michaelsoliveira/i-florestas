import { createContext, ReactNode, useState } from "react"

type LoadingType = {
    loading: any;
    setLoading: (loading: any) => void
}

const initialState: LoadingType = {
  loading: false,
  setLoading: () => {}
}

type Props = {
    children: ReactNode
}

export const LoadingContext = createContext({} as LoadingType)

export function LoadingProvider({ children }: Props) {
    const [loading, setLoading] = useState<boolean>(false)
    
    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            { children }
        </LoadingContext.Provider>
    )
}