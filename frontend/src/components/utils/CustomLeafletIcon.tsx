import L from "leaflet";

export const customIcon = new L.Icon({
    iconUrl: '../imgs/location.svg',
    iconSize: [32, 37],
    iconAnchor: [16, 38],
    popupAnchor: [0, -28]
});