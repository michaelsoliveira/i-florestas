import Table from "@/components/Table"
import { useEffect } from "react"

const Errors = ({ dataErrors }: any) => {
    const { columns, data } = dataErrors
    useEffect(() => {
        console.log(dataErrors)
    }, [dataErrors])
    
    return (
        <div className="mt-6">
            
        </div>
    )
}

export default Errors