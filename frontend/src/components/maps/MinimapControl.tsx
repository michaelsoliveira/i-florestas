import { Map } from "leaflet"
import { useCallback, useMemo, useState } from "react"
import { MapContainer, Rectangle, useMap, useMapEvent , TileLayer} from "react-leaflet"
import { LeafletElement, useEventHandlers, useLeafletContext } from '@react-leaflet/core'

export enum MinimapPosition {
    bottomleft = 'bottomleft',
    bottomright = 'bottomright',
    topleft = 'topleft',
    topright = 'topright'
}

export type MinimapControlProps = {
    position: MinimapPosition;
    zoom?: number;
}
// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
  }
  
  const BOUNDS_STYLE = { weight: 1 }

  export type MinimapBoundsProps = {
    parentMap: Map,
    zoom: number
  }
  
  function MinimapBounds({ parentMap, zoom }: MinimapBoundsProps) {
    const minimap = useMap()
  
    // Clicking a point on the minimap sets the parent's map center
    const onClick = useCallback(
      (e: any) => {
        parentMap.setView(e.latlng, parentMap.getZoom())
      },
      [parentMap],
    )
    useMapEvent('click', onClick)
  
    // Keep track of bounds in state to trigger renders
    const [bounds, setBounds] = useState(parentMap.getBounds())
    const onChange = useCallback(() => {
      setBounds(parentMap.getBounds())
      // Update the minimap's view to match the parent map's center and zoom
      minimap.setView(parentMap.getCenter(), zoom)
    }, [minimap, parentMap, zoom])
    const context = useLeafletContext()
    // Listen to events on the parent map
    const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [onChange])
    useEventHandlers({ instance: parentMap, context } , handlers)
  
    return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />
  }
  
  export function MinimapControl({ position, zoom }: MinimapControlProps) {
    const parentMap = useMap()
    const mapZoom = zoom || 0
    
    // Memoize the minimap so it's not affected by position changes
    const minimap = useMemo(
      () => (
        <MapContainer
          style={{ height: 80, width: 80 }}
          center={parentMap.getCenter()}
          zoom={mapZoom}
          dragging={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          attributionControl={false}
          zoomControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
        </MapContainer>
      ),
      [mapZoom, parentMap],
    )
  
    const positionClass =
      (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
    return (
      <div className={positionClass}>
        <div className="leaflet-control leaflet-bar">{minimap}</div>
      </div>
    )
  }
