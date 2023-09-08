import { ReactNode } from 'react'

const AddEdit = ({ children }: { children? : ReactNode}) => {

    return (
        <>
             <div>
                <div className="py-6 flex flex-col justify-center sm:py-12 bg-gray-50">
                    { children }
                </div>
            </div>
        </>
    )
}

export default AddEdit