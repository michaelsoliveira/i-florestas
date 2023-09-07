import { LinkBack } from '@/components/utils/LinkBack'
import Form from './Form'

const AddEdit = ({ umf }: { umf? : any}) => {

    return (
        <>
             <div>
                <div className="py-6 flex flex-col justify-center sm:py-12 bg-gray-50">
                    
                    <div className="relative py-3 w-11/12 max-w-none lg:max-w-2xl mx-auto">
                        <div className='flex flex-row items-center justify-between border border-custom-green text-white shadow-lg bg-custom-green py-4 sm:rounded-t-xl'>
                            
                            <div>
                                <LinkBack href="/umf" className="flex flex-col relative left-0 ml-4" />
                            </div>
                            <div>
                                {!umf ? (
                                    <h1 className='text-xl'>Cadastrar UMF</h1>
                                ): (
                                    <h1 className='text-xl'>Editar UMF</h1>
                                )}
                            </div>
                            <div></div>
                        </div>
                        <div className="relative p-8 bg-white shadow-sm sm:rounded-b-xl border-x border-b border-custom-green">
                            <Form umf={umf} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddEdit