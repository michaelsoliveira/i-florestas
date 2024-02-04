'use client'

import { FormInput } from '@/components/utils/FormInput'
import { useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import alertService from '@/services/alert'
import { AuthContext } from '@/context/AuthContext'
import { useSession } from 'next-auth/react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { RootState } from '@/redux/store'
import { setUt } from "@/redux/features/utSlice"
import MapInventario from '../maps/MapInventario'
import { Libraries, useLoadScript } from '@react-google-maps/api'
import { OptionType } from '../utils/Select'

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string

const Map = () => {
    const [utLocation, setUtLocation] = useState<google.maps.LatLngLiteral>()
    const { client } = useContext(AuthContext)
    const ut = useAppSelector((state: RootState) => state.ut)
    const [arvores, setArvores] = useState<any>([])
    const { data: session } = useSession()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [polygonPath, setPolygonPath] = useState<any>([])
    const libraries: Libraries = useMemo(() =>['geometry'], [])
    const [umfs, setUmfs] = useState<any>()
    const [upas, setUpas] = useState<any>()
    const [uts, setUts] = useState<any>()
    const umf = useAppSelector((state: RootState) => state.umf)
    const upa = useAppSelector((state: RootState) => state.upa)

    const { isLoaded } = useLoadScript({
        id: 'script-loader',
        version: "weekly",
        googleMapsApiKey: API_KEY,
        libraries
    })

    useEffect(() => {        
        async function loadUt() {
            
            if (ut && typeof session !== typeof undefined) {
                
                const { data: u } = await client.get(`/ut/${ut?.id}`)

                const polygon_path = u.polygon_path?.length > 0 ? JSON.parse(u.polygon_path)?.coordinates[0].map((polygon: any) => {
                    return {
                        lat: polygon[1],
                        lng: polygon[0]
                    }
                }) : []

                let polygonValues: Array<google.maps.LatLngLiteral> = []
                
                polygon_path.map((poly: any) => {
                    polygonValues.push({ lat: poly.lat, lng: poly.lng })
                })
                
                setPolygonPath(polygonValues)

                setUtLocation({
                    lat: u?.latitude,
                    lng: u?.longitude
                })

                const { data } = await client.get(`/arvore/get-all?utId=${ut?.id}`)

                const arvores = data.arvores?.map(({ lat, lng }: any) => {
                    return {
                        lat,
                        lng
                    }
                })

                setArvores(arvores)
            }
        }

        loadUt()

    }, [session, client, upa, ut, setArvores, setUtLocation])

    const loadUpas = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const data = upas.filter((upa: any) => upa?.descricao.toLowerCase().includes(inputValue.toLowerCase()))
        
        callback(data?.map((upa: any) => ({
            value: upa.id,
            label: upa.descricao
        })))
    }

    const loadUts = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const data = uts.filter((ut: any) => ut?.numero_ut.toString().includes(inputValue))
        
        callback(data?.map((ut: any) => ({
            value: ut.id,
            label: ut.numero_ut
        })))
    }

    const loadUmfs = async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const data = umfs.filter((umf: any) => umf?.nome.toLowerCase().includes(inputValue.toLowerCase()))
        
        callback(data?.map((umf: any) => ({
            value: umf.id,
            label: umf.nome
        })))
    }

    return (
        <div>
            <div className="text-sm py-4 justify-center sm:py-4 bg-gray-50">                
                <div className="relative py-3 w-full max-w-none mx-auto px-8">
                    <div className='flex flex-row items-center justify-between border border-custom-green text-white shadow-lg bg-custom-green py-3 sm:rounded-t-xl'>    
                        <div className="mx-auto">
                            <h1 className="text-xl font-semibold">Visualização de Mapa</h1>
                        </div>
                    </div>
                    <div className="relative p-8 bg-white shadow-sm sm:rounded-b-xl border-x border-b border-custom-green">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative border border-gray-400 p-4 rounded-md">
                            <span className="text-gray-700 absolute -top-3 bg-white px-2">Dados básicos da UT</span>
                                
                        </div>  
                        {
                            isLoaded && upa.tipo === 1 &&
                            (
                                <div className="col-span-2 relative border border-gray-400 p-4 rounded-md mt-6">
                                    <span className="text-gray-700 absolute -top-3 bg-white px-2">Mapa</span>
                                    <div className='flex flex-row items-center mx-auto'>
                                        
                                        <MapInventario 
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Map