import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerClustererF,
  MarkerF,
  PolygonF,
} from "@react-google-maps/api";

import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/hooks";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type MapProps = {
  arvores: Array<LatLngLiteral>
  polygonPath?: any;
  utLocation?: any;
  point?: any;  
  isLoaded?: boolean;
}

export default function MapInventario({ arvores, polygonPath, point, utLocation, isLoaded }: MapProps) {
  // Define refs for Polygon instance and listeners
  const polygonRef = useRef<any>(null);
  const listenersRef = useRef<any[]>([]);
  const [showInfoUt, setShowInfoUt] = useState<boolean>(false)
  const upa = useAppSelector((state: RootState) => state.upa)
  const [center, setCenter] = useState<LatLngLiteral>({ lat: -1, lng: -52 })
  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight
  })

  const [map, setMap] = useState<any>(null);
  const [fullyLoaded, setFullyLoaded] = useState(false);

  const updateSize = () => {
    setSize({
      x: window.innerWidth,
      y: window.innerHeight
    })
  }

  // Call setPath with new edited path
const onEdit = useCallback((e: any) => {
  if (polygonRef.current) {
    const nextPath = polygonRef.current
      .getPath()
      .getArray()
      .map((latLng: any) => {
        return { lat: latLng.lat(), lng: latLng.lng() };
      });
      point(nextPath);
  }
  
  if (e.domEvent?.ctrlKey) {
    const paths = polygonRef.current?.getPath().getArray().filter((path: any, key: any) => e.vertex !== key)
    point(paths)
  }
}, [point]);

const onLoadPolygon = useCallback(
  (polygon: any) => {
    polygonRef.current = polygon;
    const path = polygon.getPath();
    listenersRef.current.push(
      path?.addListener("set_at", onEdit),
      path?.addListener("insert_at", onEdit),
      path?.addListener("remove_at", onEdit)
    );
  },
  [onEdit]
);

  const getBoundingBox = (polygon: any) => {
      var bounds = new google.maps.LatLngBounds();
      if (polygon) {
        polygon.forEach(function(location: any) {
          bounds.extend({ lat: Number(location.lat), lng: Number(location.lng) });

        });
      }
      return(bounds);
  };
  
  useEffect(() => {
    onresize = updateSize
    if (map && isLoaded) {
        const listener = window.google.maps.event.addListener(map, 'tilesloaded', function () {
            setFullyLoaded(true);
            listener.remove();
        });
    }
    const getCurrentPosition = () => {
      navigator.geolocation.getCurrentPosition(function success(position: any) {
        const { latitude, longitude } = position.coords
        
        setCenter({
          lat: latitude,
          lng: longitude
        })
      }, function error() {
        console.log('Error tentando obter a localização')
      })
    }

    if (map && fullyLoaded && polygonPath.length === 0) getCurrentPosition()
  }, [map, isLoaded]);

  const onLoad = useCallback((map: any) => { 
      setMap(map)
  }, [setMap])

  useEffect(() => {
      if (map && fullyLoaded && polygonPath.length > 0) {
        const bounds = getBoundingBox(polygonPath)
        map.fitBounds(bounds)
        setFullyLoaded(false)
      }
    }, [map, fullyLoaded])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  const onUnmountPolygon = useCallback(() => {
      listenersRef.current.forEach((lis: any) => lis?.remove());
      polygonRef.current = null;
  }, [])

  const mapOptions = useMemo<MapOptions>(
    () => ({
      mapId: "e8b3ef309dafc25e",
      disableDefaultUI: false,
      clickableIcons: true,
    }),
    []
  )

  const polygonOptions = {
    fillColor: "#2196F3",
    strokeColor: "#54A6C3",
    fillOpacity: 0.5,
    strokeWeight: 1,
    clickable: true,
    zIndex: -1,
    visible: true
  }

  return (
    <div className="mt-2 w-full">
      <div>
          <GoogleMap
            zoom={7.5}
            center={center}
            mapContainerStyle={{
              width: '100%',
              height: '600px'
            }}
            options={mapOptions}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >   
            <PolygonF
              path={polygonPath}
              editable={false}
              options={polygonOptions}
              // draggable
              // Event used when manipulating and adding points
              onMouseUp={onEdit}
              // Event used when dragging the whole Polygon
              onDragEnd={onEdit}
              onLoad={onLoadPolygon}
              onUnmount={onUnmountPolygon}
            />
              { arvores?.length > 0 && (
                <MarkerClustererF>
                {(clusterer) =>
                  <>
                    {arvores?.map((arv: any, idx: any) => (
                      <MarkerF
                        key={idx}
                        position={arv}
                        clusterer={clusterer}
                        // onClick={() => {
                        //   fetchDirections(arv);
                        // } } 
                      />
                    ))}
                  </> 
                }
              </MarkerClustererF>
              ) }
        
            { utLocation && (
              <>
                <MarkerF
                  position={utLocation}
                  icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                  onClick={() => setShowInfoUt(!showInfoUt)}
                >
                  { showInfoUt && (
                    <InfoWindowF position={utLocation}>
                      <div className="flex flex-col">
                        <span>Latitude: {utLocation?.lat}</span>
                        <span>Longitude: {utLocation?.lng}</span>
                      </div>
                    </InfoWindowF>
                  )}
                </MarkerF>
              </>
            ) }
          </GoogleMap>
      </div>
      {
        upa.tipo === 1 && utLocation && (
          <>
            <div className="mt-2">
              <p className="flex text-sm flex-row items-center w-full">Coordenadas da UT:{" "}[{utLocation?.lat}, {utLocation?.lng}]</p>
            </div>
          </>
        )
      }
    </div>
  );
}