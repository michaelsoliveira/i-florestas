import { OptionType, Select } from '../Select'
import { FormInput } from '../FormInput'
import { useContext, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import alertService from '../../services/alert'
import { AuthContext } from '../../contexts/AuthContext'
import { useSession } from 'next-auth/react'
import { LinkBack } from '../LinkBack'
import { Link } from '../Link'
import { useAppSelector } from '../../store/hooks'
import { RootState } from '../../store'
import Map from '../maps/Map'
import { useJsApiLoader } from '@react-google-maps/api'

export const libraries = String(['places', 'geometry', 'drawing'])

const AddEdit = ({ id }: any) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const { client } = useContext(AuthContext)
    const upa = useAppSelector((state: RootState) => state.upa)
    const { data: session } = useSession()
    const [utLocation, setUtLocation] = useState<google.maps.LatLngLiteral | null>(null)
    const router = useRouter()
    const isAddMode = !id

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
        [libraries]: libraries
    })

    useEffect(() => {        
        async function loadUt() {
            
            if (!isAddMode && typeof session !== typeof undefined) {
                
                const { data: ut } = await client.get(`/ut/${id}`)

                for (const [key, value] of Object.entries(ut)) {
                    switch(key) {
                        case 'upa': setValue('upa', ut?.upa.id);
                        break;
                        default: {
                            setValue(key, value, {
                                shouldValidate: true,
                                shouldDirty: true
                            })
                        }
                    }
                }
            }
        }

        loadUt()

    }, [session, isAddMode, client, id, setValue, upa])

    async function onSubmit(data: any) {
        try {
            return isAddMode
                ? createUt(data)
                : updateUt(id, data)
        } catch (error: any) {
            alertService.error(error.message);
        }
        
    }

    async function createUt(data: any) {
        await client.post('ut', {
            id_upa: upa.id,
            ...data
        })
            .then((response: any) => {
                const { error, message } = response.data
                if (!error) {
                    alertService.success(message);
                    router.push('/ut')
                } else {
                    alertService.error(message)
                }
            }) 
    }

    async function setLocation(location: google.maps.LatLngLiteral) {
        console.log(location)
        setUtLocation(location)
        setValue('latitude', location.lat)
        setValue('longitude', location.lng)
    }

    async function updateUt(id: string, data: any) {
        
        await client.put(`/ut/${id}`, {
            id_upa: upa.id,
            ...data
        })
            .then((response: any) => {
                const { error, message } = response.data
                if (!error) {
                    alertService.success(message);
                    router.push('/ut')
                } else {
                    alertService.error(message)
                }
            })
    }

    return (
        <div>
            <div className="text-sm py-4 flex flex-col justify-center sm:py-12 bg-gray-50">                
                <div className="relative py-3 w-full max-w-none lg:max-w-5xl mx-auto">
                    <div className='flex flex-row border-x-2 border-t-2 border-green-600 text-white items-center justify-between shadow-lg bg-gradient-to-r from-green-700 to-green-500 py-4 sm:rounded-t-xl'>
                        
                        <div>
                            <LinkBack href="/ut" className="flex flex-col relative left-0 ml-4" />
                        </div>
                        <div>
                            {isAddMode ? (
                                <h1 className='text-xl'>Cadastrar UT</h1>
                            ): (
                                <h1 className='text-xl'>Editar UT</h1>
                            )}
                        </div>
                        <div></div>
                    </div>
                    <div className="relative p-8 bg-white shadow-sm sm:rounded-b-xl border-x-2 border-b-2 border-green-600">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex flex-col lg:flex-row lg:space-x-4 pb-6'>
                                <div className="border border-gray-400 p-4 mt-4 rounded-md lg:w-6/12">
                                <span className="text-gray-700 absolute top-9 bg-white px-2">Dados básicos da UT</span>
                                    <div>
                                        <FormInput
                                            name="numero_ut"
                                            label="Número UT"
                                            type="number"
                                            register={register}
                                            errors={errors}
                                            rules={
                                                {
                                                    required: 'O campo nome é obrigatório',
                                                }
                                            }
                                            id="numero_ut"
                                            className="pb-4"
                                        />
                                    </div>
                                    <div className='flex flex-col lg:flex-row lg:space-x-4'>
                                    <div>
                                        <FormInput
                                            name="area_util"
                                            label="Área Útil"
                                            type="number"
                                            register={register}
                                            errors={errors}
                                            rules={
                                                {
                                                    required: 'O campo nome é obrigatório',
                                                }
                                            }
                                            id="area_util"
                                            className="pb-4"
                                        />
                                    </div>
                                    <div>
                                        <FormInput
                                            name="area_total"
                                            label="Área Total"
                                            type="number"
                                            register={register}
                                            errors={errors}
                                            rules={
                                                {
                                                    required: 'O campo nome é obrigatório',
                                                }
                                            }
                                            id="area_total"
                                            className="pb-4"
                                        />
                                    </div>
                                    </div>
                                </div>
                                <div className="border border-gray-400 p-4 mt-4 rounded-md lg:w-6/12">
                                <span className="text-gray-700 block -mt-7 bg-white w-[7.5em] pb-1 px-2">Coordenadas</span>
                                    <div className="flex flex-col">
                                        <FormInput
                                            id="latitude"
                                            name="latitude"
                                            label="Latitude"
                                            type="number"
                                            register={register}
                                            errors={errors}
                                            className="pb-4"
                                            step="any"
                                        />
                                    
                                        <FormInput
                                            id="longitude"
                                            name="longitude"
                                            label="Longitude"
                                            type="number"
                                            register={register}
                                            errors={errors}
                                            className="pb-4"
                                            step="any"
                                        />
                                    </div>
                                </div>
                            </div>  
                            {
                                (upa.tipo === 0) &&
                                (<div className="space-y-8">
                                    <div className="relative border border-gray-400 p-4 rounded-md">
                                        <span className="text-gray-700 absolute -top-3 bg-white px-2">Faixas</span>
                                        <div className="flex flex-row space-x-4">
                                            <FormInput
                                                name="quantidade_faixas"
                                                label="Quantidade"
                                                type="number"
                                                register={register}
                                                errors={errors}
                                                id="quantidade_faixas"
                                                className="pb-4"
                                            />
                                            <FormInput
                                                name="largura_faixas"
                                                label="Largura"
                                                type="number"
                                                register={register}
                                                errors={errors}
                                                id="largura_faixas"
                                                className="pb-4"
                                            />
                                            <FormInput
                                                name="comprimento_faixas"
                                                label="Comprimento"
                                                type="number"
                                                register={register}
                                                errors={errors}
                                                id="comprimento_faixas"
                                                className="pb-4"
                                            />
                                        </div>
                                    </div>
                                </div>)
                            }
                            <div className="relative border border-gray-400 p-4 rounded-md mt-6">
                                <span className="text-gray-700 absolute -top-3 bg-white px-2">Localização da UT</span>
                                <div className='flex flex-row items-center mx-auto'>
                                    {
                                        (!isLoaded) ? <div>Loading...</div> : 
                                        (
                                            <Map 
                                                setLocation={setLocation}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                            <div className='flex items-center justify-between pt-4'>
                                <Link href="/ut" className="text-center w-1/5 bg-gradient-to-r from-orange-600 to-orange-400 text-white p-3 rounded-md">Voltar</Link>
                                <button className="w-1/5 bg-green-600 text-white p-3 rounded-md">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEdit