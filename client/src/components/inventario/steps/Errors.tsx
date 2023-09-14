import Table from "@/components/utils/Table"

const Errors = ( { errors }: any ) => {
    const { uts, especies }: any = errors

    return (
        <div className="border border-gray-200 p-4 rounded-md col-span-6 relative w-full mt-10">
            <span className="text-gray-700 absolute -top-3 bg-white px-2 text-sm">Errors</span>
            
            {
               uts.data?.length > 0 && (
                <>
                    <span className="flex py-2 px-2 font-medium text-lg w-full bg-indigo-100 mb-2 rounded-md">Duplicidades</span>
                    <div className="overflow-x-hidden w-full">
                        <Table columns={uts?.columns} data={uts?.data} />
                    </div>
                </>
               )
            }
            {
               especies.data?.length > 0 && (
                <div>
                    <span className="flex py-2 px-2 font-medium text-lg w-full bg-indigo-100 my-4 rounded-md">Valor Vazio</span>
                    <div className="overflow-x-hidden w-full">
                        <Table columns={especies?.columns} data={especies?.data} />
                    </div>
                </div>
               )
            }
        
        </div>
    )
}

export default Errors