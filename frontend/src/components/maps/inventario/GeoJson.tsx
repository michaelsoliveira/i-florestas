import { customIcon } from "@/components/utils/CustomLeafletIcon";
import { useAuthContext } from "@/context/AuthContext";
import L from "leaflet";
import { useEffect, forwardRef } from "react";
import { GeoJSON, GeoJSONProps } from "react-leaflet";

function onEachFeatureInventario(feature: any, layer: any) {
    // does this feature have a property named numero_arvore?
    if (feature.properties && feature.properties.numero_arvore) {
        layer.bindPopup(`Árvore: ${String(feature.properties.numero_arvore)} 
        <br />lat: ${feature.properties.latitude}
        <br />lng: ${feature.properties.longitude}
        <br />altura: ${feature.properties.altura}
        <br />volume: ${feature.properties.volume}
        `);
    }
}
  
export const GeoJsonInventario = ({ data }: any) => {
  return <GeoJSON 
            key={JSON.stringify(data?.features)}
            onEachFeature={onEachFeatureInventario}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            pointToLayer= { (feature, latlng) => {
                    return new L.Marker(latlng, {icon: customIcon})
                } 
            }
            data={data} 
        />
  }

  function onEachFeatureUtShape(feature: any, layer: any) {
    // does this feature have a property named f2?
    if (feature.properties && feature.properties?.f2) {
      // layer.bindTooltip(layer.properties?.f2, { sticky: true });
      layer.setStyle({
          color: "blue",
              weight: 1.5,
              fillColor: "blue",
              fillOpacity:0.2
      });
      layer.on("mouseover", () => {
       
        layer.setStyle({
              color: "blue",
              fillColor: "green",
              fillOpacity: 0.5
          });
      })
      layer.on("mouseout", () => {
        layer.setStyle({
              color: "blue",
              weight: 1.5,
              fillColor: "blue",
              fillOpacity:0.2
          })
      });
    }
  }

  export const GeoJsonShapeUt = ({ data }: any) => {
    if (data?.features) {
      return (<GeoJSON 
                key={JSON.stringify(data?.features)}
                onEachFeature={onEachFeatureUtShape}
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                data={data} 
            />)
    } else {
      return null;
    }
  }