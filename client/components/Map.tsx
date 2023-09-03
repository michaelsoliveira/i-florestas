import { useState, useCallback } from "react"
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
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
      })

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        const bounds = new google.maps.LatLngBounds(center)
        map.fitBounds(bounds)
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])
    
    return (
        <div>
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={50}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >

                </GoogleMap>
            )}
            
        </div>
    )
}

export default Map