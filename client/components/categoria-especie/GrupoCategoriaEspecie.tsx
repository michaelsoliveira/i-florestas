import { LinkBack } from "../LinkBack"
import SelectableRowList from "../Utils/SelectableRowList"

const GrupoCategoriaEspecie = ({ data }: any) => {
    
    return (
        <div className="py-6 flex flex-col justify-center sm:py-4 bg-gray-50">
            <div className="relative py-3 w-full max-w-none lg:max-w-5xl mx-auto">
                <div className='flex flex-row border-x-2 border-t-2 border-green-600 text-white items-center justify-between shadow-lg bg-gradient-to-r from-green-700 to-green-500 py-4 sm:rounded-t-xl'>
                    <div className="px-4">
                        Grupo de Categoria de Espécies
                    </div>
                </div>
                <div className="relative p-8 bg-white shadow-sm sm:rounded-b-xl border-x-2 border-b-2 border-green-600">
                    <SelectableRowList data={data} />
                </div>
            </div>
        </div>
    )
}

export default GrupoCategoriaEspecie