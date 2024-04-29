'use client'

import { FormInput } from '@/components/ui/FormInput'
import { useContext, useEffect, useState, useCallback, useMemo, useRef, createRef } from 'react'
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
import { FormInputMask } from '../ui/FormInputMask'
import RadioGroup from '../form/RadioGroup'
import Option from '../form/Option'
import { decimalParaGms, gmsParaDecimal } from '../utils/ConvertCoords'
import { OptionType, Select } from '../ui/Select'

type LatLngLiteral = google.maps.LatLngLiteral


const directionLngOptions: Array<OptionType> = [{ label: 'Leste', value: 'L' }, { label: 'Oeste', value: 'O' }]
const directionLatOptions: Array<OptionType> = [{ label: 'Norte', value: 'N' }, { label: 'Sul', value: 'S' }]
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string

const AddEdit = ({ params }: { params: { id: string } }) => {
    const { id } = params
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm()
    const [utLocation, setUtLocation] = useState<google.maps.LatLngLiteral>()
    const { client } = useContext(AuthContext)
    const upa = useAppSelector((state: RootState) => state.upa)
    const [arvores, setArvores] = useState<any>([])
    const { data: session } = useSession()
    const [tipoCoordenada, setTipoCoordenada] = useState<number>(0)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const isAddMode = !id
    const [polygonPath, setPolygonPath] = useState<any>([])
    const libraries: Libraries = useMemo(() => ['places', 'geometry', 'drawing'], [])
    const [directionLat, setDirectionLat] = useState<OptionType>({ label: 'Norte', value: 'N' })
    const [directionLng, setDirectionLng] = useState<OptionType>({ label: 'Leste', value: 'L' })

    const { isLoaded } = useLoadScript({
        id: 'script-loader',
        version: "weekly",
        googleMapsApiKey: API_KEY,
        libraries
    })

    const dirNorte = directionLatOptions.find((dir: OptionType) => dir.value === 'N') as OptionType
    const dirSul = directionLatOptions.find((dir: OptionType) => dir.value === 'S') as OptionType
    const dirLeste = directionLngOptions.find((dir: OptionType) => dir.value === 'L') as OptionType
    const dirOeste = directionLngOptions.find((dir: OptionType) => dir.value === 'O') as OptionType

    const loadGms = useCallback((lat: number, lng: number) => {
        setUtLocation({
            lat,
            lng
        })
        setValue('latitude_gms', decimalParaGms(lat))
        setValue('longitude_gms', decimalParaGms(lng))

        const dirLat = (lat < 0) ? dirSul : dirNorte
        const dirLng = (lng < 0) ? dirOeste : dirLeste

        setDirectionLat(dirLat)
        setDirectionLng(dirLng)
    }, [dirNorte, dirSul, dirLeste, dirOeste, setValue])

    const loadUt = useCallback(async () => {
        if (!isAddMode && typeof session !== typeof undefined) {

            const { data: ut } = await client.get(`/ut/${id}`)
            const { latitude: lat, longitude: lng } = ut

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

            loadGms(lat, lng)

            for (const [key, value] of Object.entries(ut)) {
                switch (key) {
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
            const { data } = await client.get(`/arvore/get-geo-json?ut=${id}`)
            const arvores: Array<LatLngLiteral> = data.geo_json_arvore?.features?.map(({ geometry }: any) => {
                return {
                    lng: geometry.coordinates[0],
                    lat: geometry.coordinates[1],
                }
            })
            setArvores(arvores)
        }
    }, [session, isAddMode, client, id, setValue, setArvores, loadGms])

    useEffect(() => {
        loadUt()
    }, [loadUt])

    function changeDirectionLat(data: any) {
        setDirectionLat(data)
        const { latitude, longitude } = getValues()
        if ((typeof latitude !== typeof undefined || latitude !== 0) && tipoCoordenada === 0 && data?.value === 'S') {
            setValue('latitude', -latitude)
            setUtLocation({
                lat: -latitude,
                lng: longitude
            })
        } else {
            setValue('latitude', Math.abs(latitude))
            setUtLocation({
                lat: Math.abs(latitude),
                lng: longitude
            })
        }
    }

    function changeDirectionLng(data: any) {
        setDirectionLng(data)
        const { latitude, longitude } = getValues()
        if ((typeof longitude !== typeof undefined || longitude !== 0) && tipoCoordenada === 0 && data?.value === 'O') {
            setValue('longitude', -longitude)
            setUtLocation({
                lat: latitude,
                lng: -longitude
            })
        } else {
            setValue('longitude', Math.abs(longitude))
            setUtLocation({
                lat: latitude,
                lng: Math.abs(longitude)
            })
        }
    }

    async function onSubmit(data: any) {
        try {
            if (upa?.tipo === 1 && !utLocation) {
                alertService.error('É necessário indicar a origem da UT...')
                return;
            }
            return isAddMode
                ? createUt({ ...data, polygon_path: polygonPath })
                : updateUt(id, { ...data, polygon_path: polygonPath })
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
                shp(binaryStr).then(function (geojson: any) {
                    const coordinates = geojson.features[0].geometry?.coordinates[0]
                    coordinates.map((coord: any) => {
                        pathUt.push({ lat: coord[1], lng: coord[0] })
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

    async function convertUtmToGeo() {
        const { norte, este } = getValues()
        if (norte && este) {
            await client.post(`/ut/convert-utm-geo`, {
                norte,
                este,
                srid: upa?.srid
            }).then((response: any) => {
                const { latitude: lat, longitude: lng } = response.data
                
                if (lat && lng) {
                    
                    setValue('latitude', lat)
                    setValue('longitude', lng)
    
                    setUtLocation({ lat, lng })
                }
            })
        }
    }

    function handleChangeCoordenadas(mapData?: any) {
        const { latitude, longitude, latitude_gms, longitude_gms } = getValues()

        const latFinal = latitude_gms && latitude_gms?.toString().trim().replaceAll(/[`~!@º#$%^*()_|+\-=?;:'"<>\s\{\}\[\]\\\/]/gi, "")
        const lngFinal = longitude_gms && longitude_gms?.toString().trim().replaceAll(/[`~!@º#$%^*()_|+\-=?;:'"<>\s\{\}\[\]\\\/]/gi, "")
        const grauLt = latFinal && parseInt(latFinal.slice(0, 2))
        const minLt = latFinal && parseInt(latFinal.slice(2, 4))
        const segLt = latFinal && parseFloat(latFinal.slice(4).replaceAll(",", "."))
        const grauLng = lngFinal && parseInt(lngFinal.slice(0, 2))
        const minLng = lngFinal && parseInt(lngFinal.slice(2, 4))
        const segLng = lngFinal && parseFloat(lngFinal.slice(4).replaceAll(",", "."))

        if (typeof mapData !== typeof undefined) {
            
            const decimalGmsLat = decimalParaGms(mapData?.lat)
            const decimalGmsLng = decimalParaGms(mapData?.lng)
            
            setValue('latitude', mapData?.lat)
            setValue('longitude', mapData?.lng)
            setValue('latitude_gms', decimalGmsLat)
            setValue('longitude_gms', decimalGmsLng)
        } else {
            if (tipoCoordenada === 0) {
                const latDecimal = latFinal && gmsParaDecimal(grauLt, minLt, segLt, String(directionLat?.value))
                const lngDecimal = lngFinal && gmsParaDecimal(grauLng, minLng, segLng, String(directionLng?.value))

                if (latFinal.length === 10) {
                    if (grauLt < -90 || grauLt > 90) alertService.error('Graus - Verique se o grau da Latitude está preenchido corretamente!')
                    if (minLt >= 60 || minLt < 0) alertService.error('Minutos - Verique se os minutos da Latitude está preenchido corretamente!')
                    if (segLt >= 60 || segLt < 0) alertService.error('Segundos - Verique se os segundos da Latitude está preenchido corretamente!')
                }

                if (lngFinal.length === 10) {
                    if (grauLng < -90 || grauLng > 90) alertService.error('Graus - Verique se o grau da Longitude está preenchido corretamente!')
                    if (minLng >= 60 || minLng < 0) alertService.error('Minutos - Verique se os minutos da Longitude está preenchido corretamente!')
                    if (segLng >= 60 || segLng < 0) alertService.error('Segundos - Verique se os segundos da Longitude está preenchido corretamente!')
                }
                console.log('latDecimal', latDecimal, 'latFinal', latFinal)
                setValue('latitude', latDecimal)
                setValue('longitude', lngDecimal)
                setUtLocation({
                    lat: latDecimal,
                    lng: lngDecimal
                })

            } else {
                if (typeof latitude !== typeof undefined && latitude !== 0 && latitude < 0.0) { setDirectionLat(dirSul) } else { setDirectionLat(dirNorte) }
                if (typeof longitude !== typeof undefined && longitude !== 0 && longitude < 0.0) { setDirectionLng(dirOeste) } else { setDirectionLng(dirLeste) }

                const decimalGmsLat = latitude ? decimalParaGms(latitude) : "00º 00' 00,000''"
                const decimalGmsLng = longitude ? decimalParaGms(longitude) : "00º 00' 00,000''"

                setValue('latitude_gms', decimalGmsLat)
                setValue('longitude_gms', decimalGmsLng)
                setUtLocation({
                    lat: parseFloat(latitude),
                    lng: parseFloat(longitude)
                })
            }
        }
    }

    async function setLocation(location: google.maps.LatLngLiteral) {
        const { lat, lng } = location
        setUtLocation(location)
        handleChangeCoordenadas(location)
        if (upa?.srid > 5000) {
            await client.post(`/ut/convert-geo-utm`, {
                latitude: lat,
                longitude: lng,
                srid: upa?.srid
            }).then((response: any) => {
                const { este, norte } = response.data
                setValue('este', este)
                setValue('norte', norte)
            })
        } else {
            
            const latDir = lat < 0 ? dirSul : dirNorte
            const lngDir = lng < 0 ? dirOeste : dirLeste

            setDirectionLat(latDir)
            setDirectionLng(lngDir)
        }
            
    }

    const loadDirectionLatOptions = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const data = directionLatOptions.filter((direction: any) => direction.label.toLowerCase().includes(inputValue.toLocaleLowerCase()))

        callback(data?.map((direction: any) => ({
            value: direction.value,
            label: direction.label
        })))
    };

    const loadDirectionLngOptions = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const data = directionLngOptions.filter((direction: any) => direction.label.toLowerCase().includes(inputValue.toLocaleLowerCase()))

        callback(data?.map((direction: any) => ({
            value: direction.value,
            label: direction.label
        })))
    };

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

    const partialAzimute = () => {
        return (
            <>
                <div className='w-full lg:w-32'>
                    <FormInput
                        name="azimute"
                        label="Azimute"
                        type="number"
                        register={register}
                        errors={errors}
                        id="azimute"
                        className="pb-4"
                        rules={
                            upa?.tipo === 1 && 
                            {
                                required: 'O campo nome é obrigatório',
                            }
                        }
                    />
                </div>
                <div className='w-full lg:w-32'>
                    <FormInput
                        name="quadrante"
                        label="Quadrante"
                        type="number"
                        register={register}
                        errors={errors}
                        id="quadrante"
                        className="pb-4"
                        rules={
                            upa?.tipo === 1 && 
                            {
                                required: 'O campo nome é obrigatório',
                            }
                        }
                    />
                </div>
            </>
        )
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
                            ) : (
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
                                    <div className='flex flex-col lg:flex-row lg:space-x-2'>
                                        <div className='lg:w-1/4'>
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

                                        <div className='lg:w-1/4'>
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
                                        <div className='lg:w-1/4'>
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
                                        <div className="relative border border-gray-400 p-4 rounded-md w-full">
                                            <span className="text-gray-700 absolute -top-3 bg-white px-2">Faixas</span>
                                            <div className="flex flex-col lg:flex-row lg:space-x-2">
                                                <div className='lg:w-1/4'>
                                                    <FormInput
                                                        name="quantidade_faixas"
                                                        label="Quantidade"
                                                        type="number"
                                                        register={register}
                                                        errors={errors}
                                                        id="quantidade_faixas"
                                                        className="pb-4"
                                                    />
                                                </div>
                                                <div className='lg:w-1/4'>
                                                    <FormInput
                                                        name="largura_faixas"
                                                        label="Largura"
                                                        type="number"
                                                        register={register}
                                                        errors={errors}
                                                        id="largura_faixas"
                                                        className="pb-4"
                                                    />
                                                </div>
                                                <div className='lg:w-1/4'>
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
                                        </div>
                                        <div className="border border-gray-400 p-4 mt-4 rounded-md col-span-2">
                                            <span className="text-gray-700 block -mt-7 bg-white w-[7.5em] pb-1 px-2">Coordenadas</span>
                                            {(upa.srid === 4326) || (upa.srid === 4674) ? (
                                                <>
                                                    <div className='w-full pb-2'>
                                                        <RadioGroup labelText="Tipo">
                                                            {["Graus, minutos e segundos", "Grau Decimal"].map((el, index) => (
                                                                <Option
                                                                    key={index}
                                                                    index={index}
                                                                    selectedIndex={tipoCoordenada}
                                                                    onSelect={(index: any) => {
                                                                        setValue('tipo_coordenada', index === 0 ? 'gms' : 'decimal')
                                                                        setTipoCoordenada(index)
                                                                        handleChangeCoordenadas()
                                                                    }}
                                                                >
                                                                    {el}
                                                                </Option>
                                                            ))}
                                                        </RadioGroup>
                                                    </div>

                                                    <div className="flex flex-col lg:flex-row lg:space-x-2">
                                                        {tipoCoordenada === 0 ? (
                                                            <>
                                                                <div className='flex flex-row space-x-2'>
                                                                    <FormInputMask
                                                                        id='latitude_gms'
                                                                        name='latitude_gms'
                                                                        label='Latitude'
                                                                        errors={errors}
                                                                        focusOut={() => handleChangeCoordenadas()}
                                                                        placeholder="00º 00' 00,000''"
                                                                        maskFormat="99º 99' 99,999''"
                                                                        register={register}
                                                                    />
                                                                    <div className='mt-2 w-36'>
                                                                        <Select
                                                                            initialData={
                                                                                {
                                                                                    label: 'Sul',
                                                                                    value: 'S'
                                                                                }
                                                                            }
                                                                            selectedValue={directionLat}
                                                                            defaultOptions={directionLatOptions}
                                                                            options={loadDirectionLatOptions}
                                                                            label="Direção Lat"
                                                                            callback={changeDirectionLat}
                                                                            selectStyle='py-[2.5px] w-full'
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className='flex flex-row space-x-2'>
                                                                    <FormInputMask
                                                                        id='longitude_gms'
                                                                        name='longitude_gms'
                                                                        label='Longitude'
                                                                        errors={errors}
                                                                        focusOut={() => handleChangeCoordenadas()}
                                                                        placeholder="00º 00' 00,000''"
                                                                        maskFormat="99º 99' 99,999''"
                                                                        register={register}
                                                                    />

                                                                    <div className='mt-2 w-36'>
                                                                        <Select
                                                                            initialData={
                                                                                {
                                                                                    label: 'Leste',
                                                                                    value: 'L'
                                                                                }
                                                                            }
                                                                            selectedValue={directionLng}
                                                                            defaultOptions={directionLngOptions}
                                                                            options={loadDirectionLngOptions}
                                                                            label="Direção Lng"
                                                                            callback={changeDirectionLng}
                                                                            selectStyle='py-[2.5px] w-full'
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FormInput
                                                                    id="latitude"
                                                                    name="latitude"
                                                                    label="Latitude"
                                                                    type="number"
                                                                    register={register}
                                                                    errors={errors}
                                                                    className="pb-4"
                                                                    step="any"
                                                                    focusOut={() => handleChangeCoordenadas()}
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
                                                                    focusOut={() => handleChangeCoordenadas()}
                                                                />
                                                            </>
                                                        )}
                                                        <div className='flex flex-row space-x-2'>
                                                            {partialAzimute()}
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="flex flex-col md:flex-row md:space-x-2">
                                                        <FormInput
                                                            id="norte"
                                                            name="norte"
                                                            label="Norte"
                                                            type="number"
                                                            register={register}
                                                            errors={errors}
                                                            className="pb-4 md:w-[180px]"
                                                            step="any"
                                                            focusOut={convertUtmToGeo}
                                                        />
                                                        <FormInput
                                                            id="este"
                                                            name="este"
                                                            label="Este"
                                                            type="number"
                                                            register={register}
                                                            errors={errors}
                                                            className="pb-4 md:w-[180px]"
                                                            step="any"
                                                            focusOut={convertUtmToGeo}
                                                        />
                                                        {partialAzimute()}
                                                    </div>
                                                </>
                                            )}
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