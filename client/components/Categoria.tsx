import { OptionType, Select } from './Select'
import { FormInput } from './FormInput'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import alertService from '../services/alert'
import { AuthContext } from '../contexts/AuthContext'
import { useSession } from 'next-auth/react'
import { LinkBack } from './LinkBack'
import { Link } from './Link'

const Especie = ({ id }: any) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [categoria, setCategoria] = useState<OptionType>()
    const [categorias, setCategorias] = useState<any>()
    const { client } = useContext(AuthContext)
    const { data: session } = useSession()
    const router = useRouter()
    const isAddMode = !id

    useEffect(() => {        
        async function loadCategoria() {
        
            if (!isAddMode && typeof session !== typeof undefined) {
                
                const { data: categoria } = await client.get(`/categoria/${id}`)
               
                for (const [key, value] of Object.entries(categoria)) {
                    setValue(key, value, {
                        shouldValidate: true,
                        shouldDirty: true
                    })
                }
            }
        }
        
        loadCategoria()

    }, [session, isAddMode, client, id, setValue])

    async function onSubmit(data: any) {
        try {
            return isAddMode
                ? createCategoria(data)
                : updateCategoria(id, data)
        } catch (error: any) {
            alertService.error(error.message);
        }
        
    }

    async function createCategoria(data: any) {
        client.post('categoria', data)
            .then((response: any) => {
                const { error, message } = response.data
                if (!error) {
                    alertService.success(message);
                    router.push('/categoria-especie')
                } else {
                    alertService.error(message)
                }
            }) 
    }

    async function updateCategoria(id: string, data: any) {
        
        client.put(`/categoria/${id}`, data)
            .then((response: any) => {
                const { error, message } = response.data
                if (!error) {
                    alertService.success(message);
                    router.push('/categoria-especie')
                } else {
                    alertService.error(message)
                }
            })
    }

    return (
        <div>
            <div className="py-6 flex flex-col justify-center sm:py-12 bg-gray-50">
                
                <div className="relative py-3 w-11/12 max-w-none lg:max-w-2xl mx-auto">
                    <div className='flex flex-row items-center justify-between shadow-lg bg-gray-100 py-4 sm:rounded-t-xl'>
                        
                        <div>
                            <LinkBack href="/categoria-especie" className="flex flex-col relative left-0 ml-4" />
                        </div>
                        <div>
                            {isAddMode ? (
                                <h1 className='text-xl text-gray-800'>Cadastrar Categoria de Espécies</h1>
                            ): (
                                <h1 className='text-xl text-gray-800'>Editar Categoria</h1>
                            )}
                        </div>
                        <div></div>
                    </div>
                    <div className="relative p-8 bg-white shadow-sm sm:rounded-b-xl">
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
                                <div>
                                    <FormInput
                                        id="criterioFuste"
                                        name="criterioFuste"
                                        label="Fuste"
                                        type="number"
                                        register={register}
                                        errors={errors}
                                        rules={
                                            {
                                                valueAsNumber: true,
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: 'Por favor entre com um valor numérico'
                                                }
                                            }}
                                        className="pb-4"
                                    />
                                </div>
                                <div>
                                    <FormInput
                                        id="criterioDminc"
                                        name="criterioDminc"
                                        label="Diâmetro Minímo"
                                        type="number"
                                        register={register}
                                        errors={errors}
                                        rules={
                                            {
                                                valueAsNumber: true,
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: 'Por favor entre com um valor numérico'
                                                }
                                            }}
                                        className="pb-4"
                                    />
                                </div>
                                <div>
                                    <FormInput
                                        id="criterioDmaxc"
                                        name="criterioDmaxc"
                                        label="Diâmetro Máximo"
                                        type="number"
                                        register={register}
                                        errors={errors}
                                        rules={
                                            {
                                                valueAsNumber: true,
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: 'Por favor entre com um valor numérico'
                                                }
                                            }}
                                        className="pb-4"
                                    />
                                </div>
                            </div>  
                            <div className='flex flex-col md:flex-row space-x-0 md:space-x-4'>
                                <div>
                                    <FormInput
                                        id="criterioNMin"
                                        name="criterioNMin"
                                        label="Mínimo / 100ha"
                                        type="number"
                                        register={register}
                                        errors={errors}
                                        rules={
                                            {
                                                valueAsNumber: true,
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: 'Por favor entre com um valor numérico'
                                                }
                                            }}
                                        className="pb-4"
                                    />
                                </div>
                                <div>
                                    <FormInput
                                        id="criterioPercMin"
                                        name="criterioPercMin"
                                        label="Percentual Explorável"
                                        type="number"
                                        register={register}
                                        errors={errors}
                                        rules={
                                            {
                                                valueAsNumber: true,
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: 'Por favor entre com um valor numérico'
                                                }
                                            }}
                                        className="pb-4"
                                    />
                                </div>
                            </div>
                            <div className='flex flex-row space-x-0 md:space-x-4'>
                                <div>
                                    <FormInput
                                        id="criterioAltura"
                                        name="criterioAltura"
                                        label="Altura máxima da árvore"
                                        type="number"
                                        register={register}
                                        errors={errors}
                                        rules={
                                            {
                                                valueAsNumber: true,
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: 'Por favor entre com um valor numérico'
                                                }
                                            }}
                                        className="pb-4"
                                    />
                                </div>
                                <div>
                                    <FormInput
                                        id="criterioVolume"
                                        name="criterioVolume"
                                        label="Volume máximo da árvore"
                                        type="number"
                                        register={register}
                                        errors={errors}
                                        rules={
                                            {
                                                valueAsNumber: true,
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: 'Por favor entre com um valor numérico'
                                                }
                                            }}
                                        className="pb-4"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-starter py-4">
                            <input  
                                // checked={checkedEspecies?.length === currentEspecies?.length}
                                // onChange={handleSelectAllEspecies}   
                                {...register('preservar')}    
                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="preservar"
                            /> Remanescente ?
                            </div>
                            {/* <div>
                                <div className="relative">
                                    <input id="email" name="email" type="text" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600" placeholder="john@doe.com" />
                                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email address</label>
                                </div>
                            </div> */}
                            <div className='flex items-center justify-between pt-4'>
                                <Link href="/categoria-especie" className="text-center w-2/5 bg-gray-200 text-gray-800 p-3 rounded-md">Voltar</Link>
                                <button className="w-2/5 bg-green-600 text-white p-3 rounded-md">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Especie