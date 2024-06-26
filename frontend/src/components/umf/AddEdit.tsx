"use client"

import { OptionType } from '@/components/ui/Select'
import { FormInput } from '@/components/ui/FormInput'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import alertService from '@/services/alert'
import { AuthContext } from '@/context/AuthContext'
import { Link } from '@/components/utils/Link'
import { useAppDispatch } from '@/redux/hooks'
import { setUmf } from '@/redux/features/umfSlice'
import SelectEstado from '@/components/utils/SelectEstado'
import { LinkBack } from '../utils/LinkBack'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

const AddEdit = ({ id }: {  id: string }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [estado, setEstado] = useState<OptionType>()
    const { client } = useContext(AuthContext)
    const router = useRouter()
    const isAddMode = !id
    const dispatch = useAppDispatch()

    useEffect(() => {     
        async function loadUmf() {
            if (!isAddMode) {
                const { data: umf } = await client.get(`/umf/${id}`)
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

    }, [isAddMode, client, setValue, setEstado, id])

    const selectedEstado = (data: any) => {
        setEstado(data)
        setValue('estado', data?.value)
    }

    async function onSubmit(data: any) {
        try {
            return isAddMode
                ? createUmf(data)
                : updateUmf(id, data)
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
            <div className="py-6 flex flex-col justify-center sm:py-12 bg-gray-50">
                <div className="relative py-3 w-11/12 max-w-none lg:max-w-2xl mx-auto">
                    <div className='flex flex-row items-center justify-between border border-custom-green text-white shadow-lg bg-custom-green py-4 sm:rounded-t-xl'>
                        
                        <div>
                            <LinkBack href="/umf" className="flex flex-col relative left-0 ml-4" />
                        </div>
                        <div>
                            {isAddMode ? (
                                <h1 className='text-xl'>Cadastrar UMF</h1>
                            ): (
                                <h1 className='text-xl'>Editar UMF</h1>
                            )}
                        </div>
                        <div></div>
                    </div>
                    <div className="relative p-8 bg-white shadow-sm sm:rounded-b-xl border-x border-b border-custom-green">
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
                            <div className='md:w-8/12'>
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
                                <div className='md:w-4/12 mt-1'>
                                    <SelectEstado value={estado?.value && estado} callback={selectedEstado} />
                                </div>
                            </div>
                            <div className='flex items-center justify-between pt-4'>
                                <Link href="/umf" className="text-center w-2/5 bg-gray-light text-gray-700 p-3 rounded-md">Voltar</Link>
                                <button className="w-2/5 bg-custom-green text-white p-3 rounded-md">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    )
}

export default AddEdit