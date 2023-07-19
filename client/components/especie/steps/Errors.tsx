import Table from "@/components/Table"
import { StepContext } from "contexts/StepContext"
import { useContext, useEffect } from "react"

const Errors = () => {
    const { step, nextStep, prevStep, data: dataStep, updateData } = useContext(StepContext)
    const { errors } = dataStep
    const { duplicates, nomes_vazio } = errors
    useEffect(() => {
        console.log(errors)
    }, [errors])
    
    return (
        <div className="border border-gray-200 p-4 rounded-md col-span-6 relative w-full mt-10">
            <span className="text-gray-700 absolute -top-3 bg-white px-2 text-sm">Duplicidades</span>

            {
               duplicates && (
                <Table columns={duplicates?.columns} data={duplicates?.data} />
               )
            }
        
        </div>
    )
}

export default Errors