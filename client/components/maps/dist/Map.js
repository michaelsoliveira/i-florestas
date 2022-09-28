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
var Places_1 = require("./Places");
var Distance_1 = require("./Distance");
function Map(_a) {
    var setLocation = _a.setLocation;
    var _b = react_1.useState({
        x: window.innerWidth,
        y: window.innerHeight
    }), size = _b[0], setSize = _b[1];
    var updateSize = function () {
        setSize({
            x: window.innerWidth,
            y: window.innerHeight
        });
    };
    react_1.useEffect(function () { return (onresize = updateSize); }, []);
    var _c = react_1.useState(), utLocation = _c[0], setUtLocation = _c[1];
    var _d = react_1.useState(), directions = _d[0], setDirections = _d[1];
    var mapRef = react_1.useRef();
    var onUnmount = react_1.useCallback(function callback(map) {
        mapRef.current = undefined;
    }, []);
    var center = react_1.useMemo(function () { return ({ lat: 0.7, lng: -51.8 }); }, []);
    var options = react_1.useMemo(function () { return ({
        mapId: "e8b3ef309dafc25e",
        disableDefaultUI: false,
        clickableIcons: true
    }); }, []);
    var getLocation = function (e) {
        setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        setUtLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    };
    var onLoad = react_1.useCallback(function (map) { return (mapRef.current = map); }, []);
    var houses = react_1.useMemo(function () { return generateHouses(center); }, [center]);
    var fetchDirections = function (house) {
        if (!utLocation)
            return;
        var service = new google.maps.DirectionsService();
        service.route({
            origin: house,
            destination: utLocation,
            travelMode: google.maps.TravelMode.DRIVING
        }, function (result, status) {
            if (status === "OK" && result) {
                setDirections(result);
            }
        });
    };
    return (React.createElement("div", { className: "mt-2" },
        React.createElement("div", { className: "pb-2" },
            React.createElement(Places_1["default"], { setOffice: function (position) {
                    var _a;
                    setUtLocation(position);
                    setLocation(position);
                    (_a = mapRef.current) === null || _a === void 0 ? void 0 : _a.panTo(position);
                } }),
            !utLocation && React.createElement("p", null, "Selecione no mapa as coordenadas da UT em defina nos campos acima"),
            directions && React.createElement(Distance_1["default"], { leg: directions.routes[0].legs[0] })),
        React.createElement("div", { className: "map" },
            React.createElement(api_1.GoogleMap, { zoom: 9, center: center, mapContainerStyle: {
                    width: "" + (size.x > 1024 ? 920 : '') + ((size.x > 800 && size.x < 1024) ? 600 : '') + (size.x < 800 ? 400 : '') + "px",
                    height: '400px'
                }, options: options, onLoad: onLoad, onUnmount: onUnmount, onClick: getLocation },
                directions && (React.createElement(api_1.DirectionsRenderer, { directions: directions, options: {
                        polylineOptions: {
                            zIndex: 50,
                            strokeColor: "#1976D2",
                            strokeWeight: 4
                        }
                    } })),
                utLocation && (React.createElement(React.Fragment, null,
                    React.createElement(api_1.Marker, { position: utLocation, icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png" }),
                    React.createElement(api_1.MarkerClusterer, null, function (clusterer) {
                        return React.createElement(React.Fragment, null, houses.map(function (house) { return (React.createElement(api_1.Marker, { key: house.lat, position: house, clusterer: clusterer, onClick: function () {
                                fetchDirections(house);
                            } })); }));
                    }),
                    React.createElement(api_1.Circle, { center: utLocation, radius: 15000, options: closeOptions }),
                    React.createElement(api_1.Circle, { center: utLocation, radius: 30000, options: middleOptions }),
                    React.createElement(api_1.Circle, { center: utLocation, radius: 45000, options: farOptions }))))),
        utLocation && (React.createElement("div", { className: "mt-2" },
            React.createElement("p", { className: "flex text-sm flex-row items-center w-full" },
                "Coordenadas da UT:",
                " ",
                "[", utLocation === null || utLocation === void 0 ? void 0 :
                utLocation.lat,
                ", ", utLocation === null || utLocation === void 0 ? void 0 :
                utLocation.lng,
                "]")))));
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
