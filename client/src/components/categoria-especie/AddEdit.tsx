'use client'

import { LinkBack } from '@/components/utils/LinkBack'
import CategoriaEspecie from './CategoriaEspecie'

import { useParams } from 'next/navigation'

const AddEdit = ({ params } : { params: { id: string } }) => {
    const { id } = params
    const isAddMode = !id

    return (
        <div>
            <div className="py-6 flex flex-col justify-center sm:py-12 bg-gray-50 text-sm">
                
                <div className="relative py-3 w-11/12 max-w-none lg:max-w-2xl mx-auto">
                    <div className='flex flex-row items-center justify-between bg-custom-green py-4 rounded-t-xl'>
                        
                        <div>
                            <LinkBack href="/categoria-especie" className="flex flex-col relative left-0 ml-4 text-white" />
                        </div>
                        <div>
                            {isAddMode ? (
                                <h1 className='text-xl text-white'>Cadastrar Categoria de Espécies</h1>
                            ): (
                                <h1 className='text-xl text-white'>Editar Categoria</h1>
                            )}
                        </div>
                        <div></div>
                    </div>
                    <CategoriaEspecie id={id} />
                </div>
            </div>
        </div>
    )
}

export default AddEdit