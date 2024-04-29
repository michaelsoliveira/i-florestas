import { AuthContext } from "@/context/AuthContext"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useContext, useEffect, useRef, useState } from "react"

const ml_url = process.env.NEXT_PUBLIC_ML_URL
const api_url = process.env.NEXT_PUBLIC_API_URL

const MLIndex = () => {
    const { data: session } = useSession()
    const searchParams = useSearchParams()
    const [height, setHeight] = useState<number>(600)
    
    useEffect(() => {
        const handleMessage = (event: any) => {
            if (event.origin === ml_url) {
                if (event.data.type === 'resize') {
                    setHeight(event.data.height)
                }
            } else {
                return;
            } 
        }

        window.addEventListener('message', handleMessage);
    
        return () => {
            window.removeEventListener('message', handleMessage);
        }
    }, []);   
    
    const createQueryString = useCallback(
        (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)
    
        return params.toString()
        },
        [searchParams]
    )
   
    const { client } = useContext(AuthContext)
    const { isPending, error, data } = useQuery({
        queryKey: ['get-data'],
        queryFn: async () => 
            {
                const response = await client.get('/upa').then((data: any) => data)
                return response
            },
            placeholderData: keepPreviousData
            
      })
    return (
        <>
            { session && (
                <div className="w-full max-w-6xl mx-auto">
                    <iframe
                        src={`${ml_url}?session=${session?.accessToken}`} 
                        width="100%"
                        height={`${height}px`}
                    />
                </div>
            )}
        </>
    )
}

export default MLIndex