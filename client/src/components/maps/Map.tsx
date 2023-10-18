import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  Polygon,
  DrawingManager
} from "@react-google-maps/api";

import Distance from "./Distance";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser } from "@fortawesome/free-solid-svg-icons"
import { AiOutlineConsoleSql } from "react-icons/ai";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;
type OverlayType = google.maps.drawing.OverlayType
type MapProps = {
  setLocation: (position: google.maps.LatLngLiteral) => void;
  callBackPolygon?: any
  arvores?: Array<LatLngLiteral>
  polygonPath?: any;
  shapeText?: string;
  point?: any
}

export default function Map({ setLocation, arvores, polygonPath, callBackPolygon, point, shapeText = 'Shape' }: MapProps) {
  // Define refs for Polygon instance and listeners
  const polygonRef = useRef<any>(null);
  const listenersRef = useRef<any[]>([]);
  const [polygon, setPolygon] = useState<boolean>(false)
  const [drawingMode, setDrawingMode] = useState<OverlayType>(google.maps.drawing.OverlayType.POLYGON);
  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight
  })
  const [path, setPath] = useState<any>(polygonPath);

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

  const onUnmount = useCallback(function callback() {
    mapRef.current = undefined
  }, [])

  const noDraw = () => {
    setDrawingMode(google.maps.drawing.OverlayType.MARKER)
  };

  const onPolygonComplete = useCallback(
    function onPolygonComplete(poly: any) {
      const polyArray = poly.getPath().getArray();
      let paths: any = [];
      polyArray.forEach(function(path: any) {
        paths.push({ lat: path.lat(), lng: path.lng() });
      });
      setPath(paths);
      console.log("onPolygonComplete", paths);
      point(paths);
      noDraw();
      poly.setMap(null);
    },
    [point]
  );

  const onUnmountPolygon = useCallback(() => {
      listenersRef.current.forEach((lis: any) => lis?.remove());
      polygonRef.current = null;
      // mapRef.current = undefined
  }, [])

  const center = useMemo<LatLngLiteral>(
    () => ({ lat: -3, lng: -49.8 }),
    []
  );

  const mapOptions = useMemo<MapOptions>(
    () => ({
      mapId: "e8b3ef309dafc25e",
      disableDefaultUI: false,
      clickableIcons: true,
    }),
    []
  )

  // const drawingManager = new google.maps.drawing.DrawingManager({
  //   drawingMode: google.maps.drawing.OverlayType.MARKER,
  //   drawingControl: true,
  //   drawingControlOptions: {
  //     position: google.maps.ControlPosition.TOP_CENTER,
  //     drawingModes: [
  //       google.maps.drawing.OverlayType.MARKER,
  //       google.maps.drawing.OverlayType.CIRCLE,
  //       google.maps.drawing.OverlayType.POLYGON,
  //       google.maps.drawing.OverlayType.POLYLINE,
  //       google.maps.drawing.OverlayType.RECTANGLE,
  //     ],
  //   },
  //   markerOptions: {
  //     icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
  //   },
  //   circleOptions: {
  //     fillColor: "#ffff00",
  //     fillOpacity: 1,
  //     strokeWeight: 5,
  //     clickable: false,
  //     editable: true,
  //     zIndex: 1,
  //   },
  // });

  const options: google.maps.drawing.DrawingManagerOptions = {
    // drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      // position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.POLYGON
      ],
    },
    markerOptions: {
      icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    },
    circleOptions: {
      fillColor: "#ffff00",
      fillOpacity: 1,
      strokeWeight: 2,
      clickable: true,
      zIndex: 1,
    },
  };

  // Call setPath with new edited path
  const onEdit = useCallback((e: any) => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng: any) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });

        // path ? callBackPolygon(nextPath) : setUtLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })
        
        
    }
    if (e.domEvent?.ctrlKey) {
      const paths = polygonRef.current?.getPath().getArray().filter((path: any, key: any) => e.vertex !== key)
      callBackPolygon(paths)
    }

  }, [callBackPolygon, polygon]);

  const handleClick = (e: any) => {
    const { latLng } = e;
    if (!polygon) {
      setLocation({ lat: latLng.lat(), lng: latLng.lng() })
      setUtLocation({ lat: latLng.lat(), lng: latLng.lng() })
    } else {
      callBackPolygon((prev: any)=> [...prev, { lat: latLng.lat(), lng: latLng.lng() }])
    }
  }

  const onLoad = useCallback((map: any) => {  
    mapRef.current = map
  }, []);
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
  const houses = useMemo(() => generateHouses(center), [center]);

  const clearPath = () => {
    listenersRef.current.forEach((lis: any) => lis?.remove());
    callBackPolygon([])
  }

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
              /> { shapeText }
            </div> 
            { polygon && polygonPath.length > 0 && (
              <div onClick={() => clearPath()} className="flex flex-row px-4 py-2 space-x-2 border rounded-md">
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
      <div>{JSON.stringify(path)}</div>
      <div className="map">
        
        <GoogleMap
          zoom={8}
          center={center}
          mapContainerStyle={{
            width: `${size.x > 1024 ? 920 : ''}${(size.x > 800 && size.x < 1024) ? 600 : ''}${size.x < 800 ? 400 : ''}px`,
            height: '400px'
          }}
          options={mapOptions}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleClick}
        >
          {path && path.length === 0 ? (
            <DrawingManager
              drawingMode={drawingMode}
              options={options}
              onPolygonComplete={onPolygonComplete}
              //onLoad={onDrawingManagerLoad}
              // editable
              // draggable
              // Event used when manipulating and adding points
              // onMouseUp={onEdit}
              // Event used when dragging the whole Polygon
              // onDragEnd={onEdit}
            />
          ) : (
            <>
            <Polygon
              path={path}
              editable
              // draggable={polygon}
              // Event used when manipulating and adding points
              onMouseUp={onEdit}
              // Event used when dragging the whole Polygon
              onDragEnd={onEdit}
              onLoad={onLoadPolygon}
              onUnmount={onUnmountPolygon}
              options={{
                fillColor: '#00FF00',
                fillOpacity: 0.4,
                strokeColor: '#00FF00',
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
            </>
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

              {/* <Circle center={utLocation} radius={15000} options={closeOptions} />
              <Circle center={utLocation} radius={30000} options={middleOptions} />
              <Circle center={utLocation} radius={45000} options={farOptions} /> */}
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