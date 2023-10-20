import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  DrawingManagerF,
  MarkerClustererF,
  MarkerF,
  PolygonF,
} from "@react-google-maps/api";

import Distance from "./Distance";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/hooks";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;
type OverlayType = google.maps.drawing.OverlayType
type MapProps = {
  setLocation: (position: google.maps.LatLngLiteral) => void;
  arvores?: Array<LatLngLiteral>
  polygonPath?: any;
  location?: any;
  point?: any;
}

export default function Map({ setLocation, arvores, polygonPath, point, location }: MapProps) {
  // Define refs for Polygon instance and listeners
  const polygonRef = useRef<any>(null);
  const listenersRef = useRef<any[]>([]);
  const [selectedShape, setSelectedShape] = useState<any>()
  const upa = useAppSelector((state: RootState) => state.upa)
  let all_overlays: any = []
  const [drawingMode, setDrawingMode] = useState<OverlayType | null>(google.maps.drawing.OverlayType.POLYGON);
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

  const [utLocation, setUtLocation] = useState<LatLngLiteral>(location);

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
      setDrawingMode(null)
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

  const options: google.maps.drawing.DrawingManagerOptions = {
    drawingMode: null,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        // google.maps.drawing.OverlayType.MARKER,
        google.maps.drawing.OverlayType.POLYGON
      ],
    },
    markerOptions: {
      // icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    },
    
    polygonOptions: {
      fillColor: "#2196F3",
      strokeColor: `#2196F3`,
      fillOpacity: 0.5,
      strokeWeight: 1,
      clickable: true,
      zIndex: 1,
      editable: true,
      draggable: true,
      visible: true
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
        setPath(nextPath);
        point(nextPath);
        // path ? point(nextPath) : setUtLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })
    }
    
    if (e.domEvent?.ctrlKey) {
      const paths = polygonRef.current?.getPath().getArray().filter((path: any, key: any) => e.vertex !== key)
      setPath(paths)
      point(paths)
    }

  }, [point, path]);

  const handleClick = (e: any) => {
    const { latLng } = e;

      setUtLocation({ lat: latLng.lat(), lng: latLng.lng() })
      setLocation({ lat: latLng.lat(), lng: latLng.lng() })    
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
    point([])
  }

  // const fetchDirections = (house: LatLngLiteral) => {
  //   if (!utLocation) return;

  //   const service = new google.maps.DirectionsService();
  //   service.route(
  //     {
  //       origin: house,
  //       destination: utLocation,
  //       travelMode: google.maps.TravelMode.DRIVING,
  //     },
  //     (result, status) => {
  //       if (status === "OK" && result) {
  //         setDirections(result);
  //       }
  //     }
  //   );
  // };

  let marker: google.maps.Marker;
  let infowindow: google.maps.InfoWindow;

  function clearSelection() {
    if (selectedShape) {
      selectedShape.setEditable(false);
      setSelectedShape(null)
    }
  }

  function setSelection(shape: any) {
    clearSelection();
    setSelectedShape(shape)
    console.log
    shape.setEditable(false)
    // selectColor(shape.get('fillColor') || shape.get('strokeColor'));
  }
  function deleteAllShape() {
    for (var i=0; i < all_overlays.length; i++)
    {
      all_overlays[i].overlay.setMap(null);
    }
    all_overlays = [];
  }

  function onOverlayComplete(event: any): void {
    if (event.type === google.maps.drawing.OverlayType.MARKER) {
      deleteAllShape()
      all_overlays.push(event);
      if (!marker || !marker.setPosition) {
        marker = new google.maps.Marker({
            position: event.overlay.position,
            map: event.overlay.map,
            });
        } else {
            marker.setPosition(event.overlay.position);
        }
        if (!!infowindow && !!infowindow.close) {
          infowindow.close();
      }

      setLocation({ lat: event.overlay.position.lat(), lng: event.overlay.position.lng() })   
      // setUtLocation({ lat: event.overlay.position.lat(), lng: event.overlay.position.lng() }) 
      
      infowindow = new google.maps.InfoWindow({
          content: 'Latitude: ' + event.overlay.position.lat() + '<br>Longitude: ' + event.overlay.position.lng()
      });
      infowindow.open(event.overlay.map, marker);
    } else {
      // Switch back to non-drawing mode after drawing a shape.
      // setDrawingMode(null);

      // Add an event listener that selects the newly-drawn shape when the user
      // mouses down on it.
      var newShape = event.overlay;
      newShape.type = event.type;
      google.maps.event.addListener(newShape, 'click', function() {
        setSelection(newShape);
      });
      setSelection(newShape);
    }
}

  return (
    <div className="mt-2">
      <div className="pb-2">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="w-full">
            {upa.tipo === 0 && !utLocation && <p>Selecione no mapa as coordenadas da UT</p>}
            {/* {directions && <Distance leg={directions.routes[0].legs[0]} />} */}
          </div>
        </div>
      </div>
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

              <DrawingManagerF
                // drawingMode={drawingMode}
                options={options}
                onPolygonComplete={onPolygonComplete}
                onOverlayComplete={onOverlayComplete}
              />

              <>
              <PolygonF
                path={polygonPath}
                editable
                draggable
                // Event used when manipulating and adding points
                onMouseUp={onEdit}
                // Event used when dragging the whole Polygon
                onDragEnd={onEdit}
                onLoad={onLoadPolygon}
                onUnmount={onUnmountPolygon}
              />
              </>
        
            {/* {directions && (
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
            )} */}
            { utLocation && (
              <>
                <MarkerF
                  position={utLocation}
                  icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                />
              </>
            ) }
            {arvores && (
              <>
                <MarkerClustererF>
                  {(clusterer) =>
                    <>
                      {arvores?.map((arv: any, idx: any) => (
                        <Marker
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