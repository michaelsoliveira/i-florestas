import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  Polygon
} from "@react-google-maps/api";
import Places from "./Places";
import Distance from "./Distance";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser } from "@fortawesome/free-solid-svg-icons"

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;
type MapProps = {
  setLocation: (position: google.maps.LatLngLiteral) => void;
  callBackPolygon?: (data: any) => void
  arvores?: Array<LatLngLiteral>
}

export default function Map({ setLocation, arvores, callBackPolygon }: MapProps) {
  const [polygon, setPolygon] = useState<boolean>(true)
  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight
  })

  const [polygonPath, setPolygonPath] = useState<any>([]);

  const updateSize = () => {
    setSize({
      x: window.innerWidth,
      y: window.innerHeight
    })
  }

  useEffect(() => (onresize = updateSize), [])

  const [utLocation, setUtLocation] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const mapRef = useRef<GoogleMap>();

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = undefined
  }, [])

  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 0.7, lng: -51.8 }),
    []
  );

  const options = useMemo<MapOptions>(
    () => ({
      mapId: "e8b3ef309dafc25e",
      disableDefaultUI: false,
      clickableIcons: true,
    }),
    []
  )

  const handleClick = (e: any) => {
    if (!polygon) {
      setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })
      setUtLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })
    } else {
      const { latLng } = e;
      setPolygonPath((prevPath: any) => [...prevPath, { lat: latLng.lat(), lng: latLng.lng() }]);
    }
  }

  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const houses = useMemo(() => generateHouses(center), [center]);

  const fetchDirections = (house: LatLngLiteral) => {
    if (!utLocation) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: house,
        destination: utLocation,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };

  return (
    <div className="mt-2">
      <div className="pb-2">
        
        <Places
          setOffice={(position: any) => {
            setUtLocation(position);
            setLocation(position);
            mapRef.current?.panTo(position);
          }}
        />
        <div className="flex flex-row items-center justify-between w-full">
          <div className="w-full">
            {!utLocation && <p>Selecione no mapa as coordenadas da UT</p>}
            {directions && <Distance leg={directions.routes[0].legs[0]} />}
          </div>
          <div className="flex flex-row items-center w-full space-x-2 justify-end">
            <div className="space-x-2">
              <input type="checkbox" 
                checked={polygon}
                onChange={() => setPolygon(!polygon)}
              /> Shape
            </div> 
            { polygon && polygonPath.length > 0 && (
              <div onClick={() => setPolygonPath([])} className="flex flex-row px-4 py-2 space-x-2 border rounded-md">
                <div>
                    <FontAwesomeIcon icon={faEraser} />
                </div>
                <span>
                    Limpar
                </span>
                </div>
            ) }
           
          </div>
        </div>
      </div>
      <div className="map">
        <GoogleMap
          zoom={9}
          center={center}
          mapContainerStyle={{
            width: `${size.x > 1024 ? 920 : ''}${(size.x > 800 && size.x < 1024) ? 600 : ''}${size.x < 800 ? 400 : ''}px`,
            height: '400px'
          }}
          options={options}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleClick}
        >
          { polygon && (
            <Polygon
              paths={polygonPath}
              editable
              options={{
                fillColor: '#00FF00',
                fillOpacity: 0.4,
                strokeColor: '#00FF00',
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
          ) }
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976D2",
                  strokeWeight: 4,
                },
              }}
            />
          )}
          { utLocation && (
            <>
              <Marker
                position={utLocation}
                icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
              />
            </>
          ) }
          {arvores && (
            <>
              <MarkerClusterer>
                {(clusterer) =>
                  <>
                    {arvores?.map((arv: any, idx: any) => (
                      <Marker
                        key={idx}
                        position={arv}
                        clusterer={clusterer}
                        onClick={() => {
                          fetchDirections(arv);
                        } } 
                      />
                    ))}
                  </> 
                }
              </MarkerClusterer>

              <Circle center={utLocation} radius={15000} options={closeOptions} />
              <Circle center={utLocation} radius={30000} options={middleOptions} />
              <Circle center={utLocation} radius={45000} options={farOptions} />
            </>
          )}
        </GoogleMap>
      </div>
      {
        utLocation && (
          <div className="mt-2">
            <p className="flex text-sm flex-row items-center w-full">Coordenadas da UT:{" "}[{utLocation?.lat}, {utLocation?.lng}]</p>
          </div>
        )
      }
    </div>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

const generateHouses = (position: LatLngLiteral) => {
  const _houses: Array<LatLngLiteral> = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
}