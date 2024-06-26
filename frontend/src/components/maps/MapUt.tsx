import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  InfoWindowF,
  DrawingManagerF,
  MarkerClustererF,
  MarkerF,
  PolygonF,
  OverlayViewF,
  OverlayView
} from "@react-google-maps/api";

import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/hooks";
import { getCurrentLocation } from "../utils/Coordinates";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type OverlayType = google.maps.drawing.OverlayType
type MapProps = {
  setLocation: (position: google.maps.LatLngLiteral) => void;
  arvores: Array<LatLngLiteral>
  polygonPath?: any;
  utLocation?: any;
  point?: any;
  isLoaded?: boolean;
}

export default function MapUt({ setLocation, arvores, polygonPath, point, utLocation, isLoaded }: MapProps) {
  // Define refs for Polygon instance and listeners
  const polygonRef = useRef<any>(null);
  const listenersRef = useRef<any[]>([]);
  const [showInfoUt, setShowInfoUt] = useState<boolean>(false)
  const [editabledPolygon, setEditabledPolygon] = useState<boolean>(false)
  const upa = useAppSelector((state: RootState) => state.upa)
  const [drawingMode, setDrawingMode] = useState<OverlayType | null>(null);
  const [center, setCenter] = useState<LatLngLiteral>({ lat: -1, lng: -52 })

  const [map, setMap] = useState<any>(null);
  const [fullyLoaded, setFullyLoaded] = useState(false);

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
      const path = polygonRef.current?.getPath()
      .getArray()
      .filter((path: any, key: any) => e.vertex !== key)
      .map((latLng: any) => { return { lat: latLng.lat(), lng: latLng.lng() } })
      point(path)
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
      polygon.forEach(function (location: any) {
        bounds.extend({ lat: Number(location.lat), lng: Number(location.lng) });

      });
    }
    return (bounds);
  };

  const getPosition = useCallback(() => {
    const loc = getCurrentLocation()
    if (typeof loc !== typeof undefined) {
      map.panTo({
        lat: loc.latitude,
        lng: loc.longitude
      })
    }
  }, [map])

  useEffect(() => {
    if (map && isLoaded) {
      const listener = window.google.maps.event.addListener(map, 'tilesloaded', function () {
        setFullyLoaded(true);
        listener.remove();
      });

      if (polygonPath.length > 0) {
        const bounds = getBoundingBox(polygonPath)
        map.fitBounds(bounds)
        // setFullyLoaded(false)
      } else {
        getPosition()
      }
    }

  }, [map, isLoaded, fullyLoaded, polygonPath, getPosition]);

  const onLoad = useCallback((map: any) => {
    setMap(map)
  }, [setMap])

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  const noDraw = () => {
    setDrawingMode(null)
  };

  const onPolygonComplete: any = useCallback(
    function onPolygonComplete(poly: any) {
      const polyArray = poly.getPath().getArray();
      let paths: any = [];
      polyArray.forEach(function (path: any) {
        paths.push({ lat: path.lat(), lng: path.lng() });
      });

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

  const options: google.maps.drawing.DrawingManagerOptions = {
    // drawingMode: null,
    // drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        // google.maps.drawing.OverlayType.MARKER,
        google.maps.drawing.OverlayType.POLYGON
      ],
    },

    polygonOptions
  };

  const handleClick = (e: any) => {
    const { latLng } = e;
    setLocation({ lat: latLng.lat(), lng: latLng.lng() })
  }

  return (
    <div className="mt-2 w-full">
      <div className="pb-2">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row items-center w-64">
            {polygonPath && (
              <>
                <input
                  onChange={() => setEditabledPolygon(!editabledPolygon)}
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault"
                /> Editar Polígono
              </>
            )}

          </div>
          <div className="w-full">
            {upa.tipo === 1 && !utLocation && <p>Selecione no mapa as coordenadas da UT</p>}
            {/* {directions && <Distance leg={directions.routes[0].legs[0]} />} */}
          </div>
        </div>
      </div>
      <div className="map w-full">
        <GoogleMap
          zoom={7.5}
          center={center}
          mapContainerStyle={{
            width: '100%',
            height: '450px'
          }}
          options={mapOptions}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleClick}
        >
          <DrawingManagerF
            drawingMode={drawingMode}
            options={options}
            onPolygonComplete={onPolygonComplete}
          />

          <PolygonF
            path={polygonPath}
            editable={editabledPolygon}
            options={polygonOptions}
            // draggable
            // Event used when manipulating and adding points
            onMouseUp={onEdit}
            // Event used when dragging the whole Polygon
            onDragEnd={onEdit}
            onLoad={onLoadPolygon}
            onUnmount={onUnmountPolygon}
            onClick={handleClick}
          />
          {arvores?.length > 0 && (
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
          )}

          {typeof utLocation !== typeof undefined && (
            <>
              <MarkerF
                position={utLocation}
                icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                onClick={() => setShowInfoUt(!showInfoUt)}
              >
                {showInfoUt && (
                  <InfoWindowF position={utLocation}>
                    <div className="flex flex-col">
                      <span>Latitude: {utLocation?.lat}</span>
                      <span>Longitude: {utLocation?.lng}</span>
                    </div>
                  </InfoWindowF>
                )}
              </MarkerF>
            </>
          )}
        </GoogleMap>
      </div>
      {
        utLocation && (
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