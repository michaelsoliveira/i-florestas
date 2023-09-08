'use client'

import { OptionType } from '@/components/utils/Select'
import { FormInput } from '@/components/utils/FormInput'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import alertService from '@/services/alert'
import { AuthContext } from '@/context/AuthContext'
import { useSession } from 'next-auth/react'
import { Link } from '@/components/utils/Link'
import { useAppDispatch } from '@/redux/hooks'
import { setUmf } from '@/redux/features/umfSlice'
import SelectEstado from '@/components/utils/SelectEstado'

const Form = ({ umf }: { umf? : any}) => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [estado, setEstado] = useState<OptionType>()
    const { client } = useContext(AuthContext)
    // const { data: session } = useSession()
    const router = useRouter()
    const isAddMode = !umf
    const dispatch = useAppDispatch()

    useEffect(() => {        
        async function loadUmf() {

            if (!isAddMode) {
                setEstado({
                    label: umf?.estado?.nome,
                    value: umf?.estado?.id
                })
               
                for (const [key, value] of Object.entries(umf)) {
                    if (key === 'estado') {
                        setValue('estado', umf.estado?.id)
                    } else {
                        setValue(key, value, {
                            shouldValidate: true,
                            shouldDirty: true
                        })
                    }
                }
            }
        }
        
        loadUmf()

    }, [isAddMode, client, setValue, setEstado, umf])

    const selectedEstado = (data: any) => {
        setEstado(data)
        setValue('estado', data?.value)
    }

    async function onSubmit(data: any) {
        try {
            return isAddMode
                ? createUmf(data)
                : updateUmf(umf?.id, data)
        } catch (error: any) {
            alertService.error(error.message);
        }
        
    }

    async function createUmf(data: any) {
        await client.post('umf', data)
            .then((response: any) => {
                const { error, message, umf } = response.data
                dispatch(setUmf({
                    id: umf.id,
                    nome: umf.nome
                }))

                if (!error) {
                    alertService.success(message);
                    router.push('/umf')
                } else {
                    alertService.error(message)
                }
            }) 
    }

    async function updateUmf(id: string, data: any) {
        
        await client.put(`/umf/${id}`, data)
            .then((response: any) => {
                const { error, message, umf } = response.data
                if (!error) {
                    alertService.success(message);
                    router.push('/umf')
                } else {
                    alertService.error(message)
                }
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='w-full'>
                    <FormInput
                        name="nome"
                        label="Nome"
                        register={register}
                        errors={errors}
                        rules={
                            {
                                required: 'O campo nome é obrigatório',
                                minLength: {
                                    value: 3,
                                    message: 'Por favor, preencha o campo com no mínimo 3 caracteres'
                                }
                            }
                        }
                        id="nome"
                        className="pb-4"
                    />
                </div>
                <div className='flex flex-col md:flex-row space-x-0 md:space-x-4'>
                    <div className='w-full'>
                        <FormInput
                            id="localizacao"
                            name="localizacao"
                            label="Localização"
                            type="text"
                            register={register}
                            errors={errors}
                            className="pb-4"
                        />
                    </div>
                    
                </div>  
                <div className='flex flex-col md:flex-row space-x-0 md:space-x-4'>
                <div className='w-8/12'>
                        <FormInput
                            id="municipio"
                            name="municipio"
                            label="Município"
                            type="text"
                            register={register}
                            errors={errors}
                            className="pb-4"
                        />
                    </div>
                    <div className='w-4/12 pt-1'>
                        <SelectEstado value={estado?.value && estado} callback={selectedEstado} />
                    </div>
                </div>
                <div className='flex items-center justify-between pt-4'>
                    <Link href="/umf" className="text-center w-2/5 bg-gray-light text-gray-700 p-3 rounded-md">Voltar</Link>
                    <button className="w-2/5 bg-custom-green text-white p-3 rounded-md">Salvar</button>
                </div>
            </form>
        </>
    )
    
}

export default Form