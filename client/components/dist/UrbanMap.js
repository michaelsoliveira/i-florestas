"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var api_1 = require("@react-google-maps/api");
var places_1 = require("./places");
var distance_1 = require("./distance");
function Map() {
    var _a = react_1.useState(), office = _a[0], setOffice = _a[1];
    var _b = react_1.useState(), directions = _b[0], setDirections = _b[1];
    var mapRef = react_1.useRef();
    var center = react_1.useMemo(function () { return ({ lat: 43.45, lng: -80.49 }); }, []);
    var options = react_1.useMemo(function () { return ({
        mapId: "b181cac70f27f5e6",
        disableDefaultUI: true,
        clickableIcons: false
    }); }, []);
    var onLoad = react_1.useCallback(function (map) { return (mapRef.current = map); }, []);
    var houses = react_1.useMemo(function () { return generateHouses(center); }, [center]);
    var fetchDirections = function (house) {
        if (!office)
            return;
        var service = new google.maps.DirectionsService();
        service.route({
            origin: house,
            destination: office,
            travelMode: google.maps.TravelMode.DRIVING
        }, function (result, status) {
            if (status === "OK" && result) {
                setDirections(result);
            }
        });
    };
    return (React.createElement("div", { className: "container" },
        React.createElement("div", { className: "controls" },
            React.createElement("h1", null, "Commute?"),
            React.createElement(places_1["default"], { setOffice: function (position) {
                    var _a;
                    setOffice(position);
                    (_a = mapRef.current) === null || _a === void 0 ? void 0 : _a.panTo(position);
                } }),
            !office && React.createElement("p", null, "Enter the address of your office."),
            directions && React.createElement(distance_1["default"], { leg: directions.routes[0].legs[0] })),
        React.createElement("div", { className: "map" },
            React.createElement(api_1.GoogleMap, { zoom: 10, center: center, mapContainerClassName: "map-container", options: options, onLoad: onLoad },
                directions && (React.createElement(api_1.DirectionsRenderer, { directions: directions, options: {
                        polylineOptions: {
                            zIndex: 50,
                            strokeColor: "#1976D2",
                            strokeWeight: 5
                        }
                    } })),
                office && (React.createElement(React.Fragment, null,
                    React.createElement(api_1.Marker, { position: office, icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png" }),
                    React.createElement(api_1.MarkerClusterer, null, function (clusterer) {
                        return houses.map(function (house) { return (React.createElement(api_1.Marker, { key: house.lat, position: house, clusterer: clusterer, onClick: function () {
                                fetchDirections(house);
                            } })); });
                    }),
                    React.createElement(api_1.Circle, { center: office, radius: 15000, options: closeOptions }),
                    React.createElement(api_1.Circle, { center: office, radius: 30000, options: middleOptions }),
                    React.createElement(api_1.Circle, { center: office, radius: 45000, options: farOptions })))))));
}
exports["default"] = Map;
var defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true
};
var closeOptions = __assign(__assign({}, defaultOptions), { zIndex: 3, fillOpacity: 0.05, strokeColor: "#8BC34A", fillColor: "#8BC34A" });
var middleOptions = __assign(__assign({}, defaultOptions), { zIndex: 2, fillOpacity: 0.05, strokeColor: "#FBC02D", fillColor: "#FBC02D" });
var farOptions = __assign(__assign({}, defaultOptions), { zIndex: 1, fillOpacity: 0.05, strokeColor: "#FF5252", fillColor: "#FF5252" });
var generateHouses = function (position) {
    var _houses = [];
    for (var i = 0; i < 100; i++) {
        var direction = Math.random() < 0.5 ? -2 : 2;
        _houses.push({
            lat: position.lat + Math.random() / direction,
            lng: position.lng + Math.random() / direction
        });
    }
    return _houses;
};
