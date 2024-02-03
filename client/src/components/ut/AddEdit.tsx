'use client'

import { FormInput } from '@/components/utils/FormInput'
import { useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import alertService from '@/services/alert'
import { AuthContext } from '@/context/AuthContext'
import { useSession } from 'next-auth/react'
import { LinkBack } from '@/components/utils/LinkBack'
import { Link } from '@/components/utils/Link'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { RootState } from '@/redux/store'
import { setUt } from "@/redux/features/utSlice"
import Map from '../maps/MapUt'
import { Libraries, useLoadScript } from '@react-google-maps/api'
import shp from "shpjs";

type LatLngLiteral = google.maps.LatLngLiteral;

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string

const AddEdit = ({ params } : { params: { id: string } }) => {
    const { id } = params
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm()
    const [utLocation, setUtLocation] = useState<google.maps.LatLngLiteral>()
    const { client } = useContext(AuthContext)
    const upa = useAppSelector((state: RootState) => state.upa)
    const [arvores, setArvores] = useState<any>([])
    const { data: session } = useSession()
    // const [utLocation, setUtLocation] = useState<google.maps.LatLngLiteral | null>(null)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const isAddMode = !id
    const [polygonPath, setPolygonPath] = useState<any>([])
    const libraries: Libraries = useMemo(() =>['places', 'geometry', 'drawing'], [])

    const { isLoaded } = useLoadScript({
        id: 'script-loader',
        version: "weekly",
        googleMapsApiKey: API_KEY,
        libraries
    })

    const loadUt = useCallback(async () => {
        if (!isAddMode && typeof session !== typeof undefined) {
                
            const { data: ut } = await client.get(`/ut/${id}`)

            const polygon_path = ut.polygon_path?.length > 0 ? JSON.parse(ut.polygon_path)?.coordinates[0].map((polygon: any) => {
                return {
                    lat: polygon[1],
                    lng: polygon[0]
                }
            }) : []

            let polygonValues: Array<google.maps.LatLngLiteral> = []
                
            polygon_path.map((poly: any) => {
                polygonValues.push({ lat: poly.lat, lng: poly.lng })
            })

            setUtLocation({
                lat: ut?.latitude,
                lng: ut?.longitude
            })

            for (const [key, value] of Object.entries(ut)) {
                switch(key) {
                    case 'upa': setValue('upa', ut?.id_upa);
                    break;
                    case 'polygon_path': setPolygonPath(polygonValues);
                    break;
                    default: {
                        setValue(key, value, {
                            shouldValidate: true,
                            shouldDirty: true
                        })
                    }
                }
            }
            const { data } = await client.get(`/arvore/get-all?utId=${id}`)
            const arvores: Array<LatLngLiteral> = data.arvores?.map(({ lat, lng }: any) => {
                return {
                    lat,
                    lng
                }
            })
            setArvores(arvores)
        }
    }, [session, isAddMode, client, id, setValue, upa, setArvores, setUtLocation])

    useEffect(() => {        
        loadUt()
    }, [loadUt])

    async function onSubmit(data: any) {
        try {
            if (upa?.tipo === 1 && !utLocation) {
                alertService.error('É necessário indicar a origem da UT...')
                return;
            }
            return isAddMode
                ? createUt({...data, polygon_path: polygonPath})
                : updateUt(id, {...data, polygon_path: polygonPath})
        } catch (error: any) {
            alertService.error(error.message);
        }   
    }

    const loadShapeFile = (e: any) => {
        let pathUt: Array<LatLngLiteral> = []
        var reader = new FileReader();
        var file = e.target && e.target.files[0];

        let fileType = file.name.split('.').pop();
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = (e) => {
            const binaryStr: any = reader.result;
            if (fileType === 'zip') {
                shp(binaryStr).then(function(geojson: any){
                    const coordinates = geojson.features[0].geometry?.coordinates[0]
                    coordinates.map((coord: any) => {
                        pathUt.push({ lat: coord[1],  lng: coord[0]})
                    })
                    setPolygonPath(pathUt)
                }).catch((error) => {
                    console.log('didnt work');
                    console.log(error);
                });
            } else if (fileType === 'kml') {
            // do other stuff
            }
        };
        if (fileType === 'zip') {
            reader.readAsArrayBuffer(file)
        } else {
            reader.readAsText(file)
        }

        // reader.readAsArrayBuffer(file);
        // reader.onload = function(buffer: any) {
        //     console.log(buffer.target.result)
        //     shpjs?.parseShape(buffer.target.result).then((geojson: any) => {
        //         console.log(geojson)
        //     })
        //     // topojson.feature(buffer)
        //     // setPolygonPath(buffer.target.result);
        // }
      }

    async function createUt(data: any) {
        await client.post('ut', {
            id_upa: upa.id,
            ...data
        })
            .then((response: any) => {
                const { error, message, ut } = response.data
                if (!error) {
                    dispatch(setUt({
                        id: ut.id,
                        numero_ut: ut.numero_ut,
                    }))
                    alertService.success(message);
                    router.push('/ut')
                } else {
                    alertService.error(message)
                }
            }) 
    }

    async function setLocation(location: any) {
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
                const { error, message, ut } = response.data
                if (!error) {
                    dispatch(setUt({
                        id: ut.id,
                        numero_ut: ut.numero_ut,
                    }))
                    alertService.success(message);
                    router.push('/ut')
                } else {
                    alertService.error(message)
                }
            })
    }

    return (
        <div>
            <div className="text-sm py-4 justify-center sm:py-12 bg-gray-50">                
                <div className="relative py-3 w-full max-w-none lg:max-w-5xl mx-auto">
                    <div className='flex flex-row items-center justify-between border border-custom-green text-white shadow-lg bg-custom-green py-4 sm:rounded-t-xl'>
                        
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
                    <div className="relative p-8 bg-white shadow-sm sm:rounded-b-xl border-x border-b border-custom-green">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative border border-gray-400 p-4 rounded-md">
                                <span className="text-gray-700 absolute -top-3 bg-white px-2">Dados básicos da UT</span>
                                    <div className='w-1/2'>
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
                            {
                                (upa.tipo === 1) &&
                                (<>
                                    <div className="relative border border-gray-400 p-4 rounded-md">
                                        <span className="text-gray-700 absolute -top-3 bg-white px-2">Faixas</span>
                                        <div className="flex flex-col lg:flex-wrap">
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
                                    <div className="border border-gray-400 p-4 mt-4 rounded-md">
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
                                            <div className='w-full lg:w-1/3'>
                                                <FormInput
                                                    name="azimute"
                                                    label="Azimute"
                                                    type="number"
                                                    register={register}
                                                    errors={errors}
                                                    id="azimute"
                                                    className="pb-4"
                                                />
                                            </div>
                                            <div className='w-full lg:w-1/3'>
                                                <FormInput
                                                    name="quadrante"
                                                    label="Quadrante"
                                                    type="number"
                                                    register={register}
                                                    errors={errors}
                                                    id="quadrante"
                                                    className="pb-4"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>)
                            }
                            {
                                isLoaded && upa.tipo === 1 &&
                                (
                                    <div className="col-span-2 relative border border-gray-400 p-4 rounded-md mt-6">
                                        <span className="text-gray-700 absolute -top-3 bg-white px-2">Localização da UT</span>
                                        <div className='inline-block align-baseline space-x-2'>
                                            <label htmlFor="shapefile" className=''>Selecionar Shapefile:</label>
                                            <input 
                                                type="file" 
                                                onChange={loadShapeFile} 
                                                className="inputfile"
                                            />
                                        </div>
                                        
                                        <div className='flex flex-row items-center mx-auto'>
                                            <Map 
                                                setLocation={setLocation}
                                                arvores={arvores}
                                                point={setPolygonPath}
                                                polygonPath={polygonPath}
                                                utLocation={utLocation}
                                                isLoaded={isLoaded}
                                            />
                                        </div>
                                    </div>
                                    )}
                                </div>
                            <div className='flex items-center justify-between pt-4'>
                                <Link href="/ut" className="text-center bg-gray-light w-1/5 text-gray-dark border p-3 rounded-md">Voltar</Link>
                                <button className="w-1/5 bg-custom-green text-white p-3 rounded-md font-medium">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEdit