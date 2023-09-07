// import { OptionType } from '@/components/utils/Select'
// import { FormInput } from '@/components/utils/FormInput'
// import { useContext, useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { useForm } from 'react-hook-form'
// import alertService from '@/services/alert'
// import { AuthContext } from '@/context/AuthContext'
// import { useSession } from 'next-auth/react'
import { LinkBack } from '@/components/utils/LinkBack'
import { ReactNode } from 'react'
// import { Link } from '@/components/utils/Link'
// import { useAppDispatch } from '@/redux/hooks'
// import { setUmf } from '@/redux/features/umfSlice'
// import SelectEstado from '@/components/utils/SelectEstado'

const AddEdit = ({ umf, children }: { umf? : any, children?: ReactNode}) => {

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
                            { children }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddEdit