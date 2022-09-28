"use strict";
exports.__esModule = true;
var react_1 = require("react");
var api_1 = require("@react-google-maps/api");
var containerStyle = {
    width: '900px',
    height: '500px'
};
var center = {
    lat: 36.745,
    lng: -86.523
};
var Map = function () {
    var _a = react_1.useState(null), map = _a[0], setMap = _a[1];
    var onLoad = react_1.useCallback(function callback(map) {
        var bounds = new google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);
    var onUnmount = react_1.useCallback(function callback(map) {
        setMap(null);
    }, []);
    return (React.createElement("div", null,
        React.createElement(api_1.GoogleMap, { mapContainerStyle: containerStyle, center: center, zoom: 50, onLoad: onLoad, onUnmount: onUnmount })));
};
exports["default"] = Map;
