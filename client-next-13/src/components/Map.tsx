'use client'

import { useMemo, useState, useCallback } from "react"
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
    width: '900px',
    height: '500px'
}

const center = {
    lat: 36.745,
    lng: -86.523
}

const Map = () => {

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map: any) {
        const bounds = new google.maps.LatLngBounds(center)
        map.fitBounds(bounds)
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback() {
        setMap(null)
    }, [])
    
    return (
        <div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={50}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >

            </GoogleMap>
        </div>
    )
}

export default Map