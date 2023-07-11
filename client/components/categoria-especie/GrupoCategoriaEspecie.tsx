import { useCallback, useContext, useEffect, useState } from "react"
import { LinkBack } from "../LinkBack"
import SelectableRowList from "../Utils/SelectableRowList"
import { useAppSelector } from "store/hooks"
import { RootState } from "store"
import { OptionType, Select } from "../Select"
import { ProjetoContext } from "contexts/ProjetoContext"
import { AuthContext } from "contexts/AuthContext"

const GrupoCategoriaEspecie = ({ data }: any) => {
    const [especies, setEspecies] = useState<any>()
    const [categorias, setCategorias] = useState<any>()
    const poa = useAppSelector((state: RootState) => state.poa)
    const [selectedCategoria, setSelectedCategoria] = useState<OptionType>()
    const { projeto } = useContext(ProjetoContext)
    const catDisponiveis = categorias?.filter((cat: any) => cat.id !== selectedCategoria?.value)
    const { client } = useContext(AuthContext)

    const loadEspecies = useCallback(async () => {
        const { especies } = await client.get(`/especie?poa=${poa?.id}&projetoId=${projeto?.id}&order=asc&orderBy=nome`)
        setEspecies(especies)
    }, [client, poa?.id, projeto?.id])

    const loadCategorias = useCallback(async () => {
        const { data } = await client.get(`/categoria/grupo`)
        const { categorias } = data
        setCategorias(categorias)
        
    }, [client])

    useEffect(() => {
        loadCategorias()
        loadEspecies()
    }, [loadCategorias, loadEspecies])
    
    function getCategoriasDefaultOptions() {

        const data = categorias?.map((categoria: any, idx: any) => {
            return {
                label: categoria.nome,
                value: categoria.id
            }
        })

        return data
    }

    const loadCategoriasOptions = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const response = await client.get(`/categoria?nome=${inputValue}&order=asc&orderBy=nome`)
        const data = response.data
        
        callback(data?.map((categoria: any) => ({
            value: categoria.id,
            label: categoria.nome
        })))
    }

    const selectCategoria = async (categoria: any) => {

        setSelectedCategoria(categoria)
        const response = await client.get(`/especie/find-by-categoria?categoriaId=${categoria?.value}`)
        const { especies } = response.data
        setEspecies(especies)
    }
    
    return (
        <div className="py-6 flex flex-col justify-center sm:py-4 bg-gray-50 px-4">
            <div className="relative py-3 w-full max-w-none lg:max-w-5xl mx-auto">
                <div className='flex flex-row border-x-2 border-t-2 border-green-600 text-white items-center justify-between shadow-lg bg-gradient-to-r from-green-700 to-green-500 py-4 sm:rounded-t-xl '>
                    <div className="px-4">
                        Grupo de Categoria de Espécies
                    </div>
                </div>
                <div className="grid grid-cols-8 lg:grid-cols-2 w-full px-4 py-2 bg-white shadow-sm sm:rounded-b-xl border-x-2 border-b-2 border-green-600">
                    <div className="col-span-4 lg:col-span-2">
                        <label className="flex items-center ">Categoria atual das Espécies: </label>
                        <div className="col-span-4 lg:col-span-4">
                            <Select

                                placeholder='Selecione uma Categoria'
                                selectedValue={selectedCategoria}
                                defaultOptions={getCategoriasDefaultOptions()}
                                options={loadCategoriasOptions}
                                callback={selectCategoria}
                                initialData={{
                                    label: 'Entre com as iniciais da Categoria ...', value: ''
                                }}
                            />
                        </div>
                      
                        <div className="relative py-4">
                            <SelectableRowList data={especies ? especies.map((especie: any) => { return { id: especie.id, label: especie.nome } }) : []} />
                        </div>
                     
                    </div>
                    
                    </div>
            </div>
        </div>
    )
}

export default GrupoCategoriaEspecie