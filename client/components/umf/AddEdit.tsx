import { OptionType, Select } from '../Select'
import { FormInput } from '../FormInput'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import alertService from '../../services/alert'
import { AuthContext } from '../../contexts/AuthContext'
import { useSession } from 'next-auth/react'
import { LinkBack } from '../LinkBack'
import { Link } from '../Link'

const Umf = ({ id }: any) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [estado, setEstado] = useState<OptionType>()
    const [estados, setEstados] = useState<any>()
    const { client } = useContext(AuthContext)
    const { data: session } = useSession()
    const router = useRouter()
    const isAddMode = !id

    const loadOptions = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const response = await client.get(`/estado/search/q?nome=${inputValue}`)
        const data = response.data
        
        callback(data?.map((estado: any) => ({
            value: estado.id,
            label: estado.nome
        })))
    };

    useEffect(() => {        
        async function loadUmf() {
        
            if (!isAddMode && typeof session !== typeof undefined) {
                
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

    }, [session, isAddMode, client, id, setValue, setEstado])

    useEffect(() => {
        const defaultOptions = async () => {
            if (typeof session !== typeof undefined){
                const response = await client.get(`/estado?orderBy=nome&order=asc`)
                const { estados } = response.data

                setEstados(estados)
            }
        }
        defaultOptions()    
        
    }, [session, client])

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

    function getEstadosDefaultOptions() {
        return estados?.map((estado: any) => {
            return {
                label: estado.nome,
                value: estado.id
            }
        })
    }

    async function createUmf(data: any) {
        await client.post('umf', data)
            .then((response: any) => {
                const { error, message } = response.data
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
                const { error, message } = response.data
                if (!error) {
                    alertService.success(message);
                    router.push('/umf')
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
                            <LinkBack href="/umf" className="flex flex-col relative left-0 ml-4" />
                        </div>
                        <div>
                            {isAddMode ? (
                                <h1 className='text-xl text-gray-800'>Cadastrar UMF</h1>
                            ): (
                                <h1 className='text-xl text-gray-800'>Editar UMF</h1>
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
                                <div className='w-4/12'>
                                <Select
                                    initialData={
                                        {
                                            label: 'Selecione um Estado',
                                            value: ''
                                        }
                                    }
                                    selectedValue={estado}
                                    defaultOptions={getEstadosDefaultOptions()}
                                    options={loadOptions}
                                    label="Estado"
                                    callback={selectedEstado}
                                />
                                </div>
                            </div>
                            <div className='flex items-center justify-between pt-4'>
                                <Link href="/umf" className="text-center w-2/5 bg-gray-200 text-gray-800 p-3 rounded-md">Voltar</Link>
                                <button className="w-2/5 bg-green-600 text-white p-3 rounded-md">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Umf