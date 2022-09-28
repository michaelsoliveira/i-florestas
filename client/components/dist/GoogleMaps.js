"use strict";
exports.__esModule = true;
var react_1 = require("react");
var api_1 = require("@react-google-maps/api");
var containerStyle = {
    width: '900px',
    height: '700px'
};
var center = {
    lat: 36.745,
    lng: -86.523
};
var GoogleMaps = function () {
    console.log(process.env.GOOGLE_MAP_KEY);
    var isLoaded = api_1.useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "" + process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    }).isLoaded;
    var _a = react_1.useState(null), map = _a[0], setMap = _a[1];
    var onLoad = react_1.useCallback(function callback(map) {
        var bounds = new google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);
    var onUnmount = react_1.useCallback(function callback(map) {
        setMap(null);
    }, []);
    return isLoaded ? (React.createElement(api_1.GoogleMap, { mapContainerStyle: containerStyle, center: center, zoom: 50, onLoad: onLoad, onUnmount: onUnmount })) : React.createElement(React.Fragment, null);
};
exports["default"] = GoogleMaps;
