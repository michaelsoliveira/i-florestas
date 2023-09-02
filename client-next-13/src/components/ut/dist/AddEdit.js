'use client';
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.libraries = void 0;
var FormInput_1 = require("../formInput");
var react_1 = require("react");
var router_1 = require("next/router");
var react_hook_form_1 = require("react-hook-form");
var alert_1 = require("@/services/alert");
var AuthContext_1 = require("../../context/AuthContext");
var react_2 = require("next-auth/react");
var LinkBack_1 = require("../LinkBack");
var Link_1 = require("../Link");
var hooks_1 = require("@/redux/hooks");
var utSlice_1 = require("@/redux/features/utSlice");
var Map_1 = require("../maps/Map");
var api_1 = require("@react-google-maps/api");
exports.libraries = String(['places', 'geometry', 'drawing']);
var AddEdit = function (_a) {
    var _b;
    var id = _a.id;
    var _c = react_hook_form_1.useForm(), register = _c.register, handleSubmit = _c.handleSubmit, errors = _c.formState.errors, setValue = _c.setValue;
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var upa = hooks_1.useAppSelector(function (state) { return state.upa; });
    var _d = react_1.useState([]), arvores = _d[0], setArvores = _d[1];
    var session = react_2.useSession().data;
    var _e = react_1.useState(null), utLocation = _e[0], setUtLocation = _e[1];
    var router = router_1.useRouter();
    var dispatch = hooks_1.useAppDispatch();
    var isAddMode = !id;
    var _f = react_1.useState([]), polygonPath = _f[0], setPolygonPath = _f[1];
    var isLoaded = api_1.useJsApiLoader((_b = {
            id: 'google-map-script',
            googleMapsApiKey: "" + process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        },
        _b[exports.libraries] = exports.libraries,
        _b)).isLoaded;
    var callBackPolygon = function (data) {
        setPolygonPath(data);
    };
    react_1.useEffect(function () {
        function loadUt() {
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function () {
                var ut, polygon_path, polygonValues_1, _i, _d, _e, key, value, data, arvores_1;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            if (!(!isAddMode && typeof session !== typeof undefined)) return [3 /*break*/, 3];
                            return [4 /*yield*/, client.get("/ut/" + id)];
                        case 1:
                            ut = (_f.sent()).data;
                            polygon_path = ((_a = ut.polygon_path) === null || _a === void 0 ? void 0 : _a.length) > 0 ? (_b = JSON.parse(ut.polygon_path)) === null || _b === void 0 ? void 0 : _b.coordinates[0].map(function (polygon) {
                                return {
                                    lat: polygon[1],
                                    lng: polygon[0]
                                };
                            }) : [];
                            polygonValues_1 = polygon_path.map(function (poly) {
                                return {
                                    lat: poly.lat, lng: poly.lng
                                };
                            });
                            for (_i = 0, _d = Object.entries(ut); _i < _d.length; _i++) {
                                _e = _d[_i], key = _e[0], value = _e[1];
                                switch (key) {
                                    case 'upa':
                                        setValue('upa', ut === null || ut === void 0 ? void 0 : ut.id_upa);
                                        break;
                                    case 'polygon_path':
                                        polygon_path.map(function (poly) {
                                            setPolygonPath(polygonValues_1);
                                        });
                                        break;
                                    default: {
                                        setValue(key, value, {
                                            shouldValidate: true,
                                            shouldDirty: true
                                        });
                                    }
                                }
                            }
                            return [4 /*yield*/, client.get("/arvore/get-all?utId=" + id)];
                        case 2:
                            data = (_f.sent()).data;
                            arvores_1 = (_c = data.arvores) === null || _c === void 0 ? void 0 : _c.map(function (_a) {
                                var lat = _a.lat, lng = _a.lng;
                                return {
                                    lat: lat,
                                    lng: lng
                                };
                            });
                            setArvores(arvores_1);
                            _f.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        loadUt();
    }, [session, isAddMode, client, id, setValue, upa, setArvores]);
    function onSubmit(data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    console.log(data);
                    return [2 /*return*/, isAddMode
                            ? createUt(__assign(__assign({}, data), { polygon_path: polygonPath }))
                            : updateUt(id, __assign(__assign({}, data), { polygon_path: polygonPath }))];
                }
                catch (error) {
                    alert_1["default"].error(error.message);
                }
                return [2 /*return*/];
            });
        });
    }
    function createUt(data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.post('ut', __assign({ id_upa: upa.id }, data))
                            .then(function (response) {
                            var _a = response.data, error = _a.error, message = _a.message, ut = _a.ut;
                            if (!error) {
                                dispatch(utSlice_1.setUt({
                                    id: ut.id,
                                    numero_ut: ut.numero_ut
                                }));
                                alert_1["default"].success(message);
                                router.push('/ut');
                            }
                            else {
                                alert_1["default"].error(message);
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function setLocation(location) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                setUtLocation(location);
                setValue('latitude', location.lat);
                setValue('longitude', location.lng);
                return [2 /*return*/];
            });
        });
    }
    function updateUt(id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.put("/ut/" + id, __assign({ id_upa: upa.id }, data))
                            .then(function (response) {
                            var _a = response.data, error = _a.error, message = _a.message, ut = _a.ut;
                            if (!error) {
                                dispatch(utSlice_1.setUt({
                                    id: ut.id,
                                    numero_ut: ut.numero_ut
                                }));
                                alert_1["default"].success(message);
                                router.push('/ut');
                            }
                            else {
                                alert_1["default"].error(message);
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement("div", null,
        React.createElement("div", { className: "text-sm py-4 justify-center sm:py-12 bg-gray-50" },
            React.createElement("div", { className: "relative py-3 w-full max-w-none lg:max-w-5xl mx-auto" },
                React.createElement("div", { className: 'flex flex-row border-x-2 border-t-2 border-green-600 text-white items-center justify-between shadow-lg bg-gradient-to-r from-green-700 to-green-500 py-4 sm:rounded-t-xl' },
                    React.createElement("div", null,
                        React.createElement(LinkBack_1.LinkBack, { href: "/ut", className: "flex flex-col relative left-0 ml-4" })),
                    React.createElement("div", null, isAddMode ? (React.createElement("h1", { className: 'text-xl' }, "Cadastrar UT")) : (React.createElement("h1", { className: 'text-xl' }, "Editar UT"))),
                    React.createElement("div", null)),
                React.createElement("div", { className: "relative p-8 bg-white shadow-sm sm:rounded-b-xl border-x-2 border-b-2 border-green-600" },
                    React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
                        React.createElement("div", { className: "grid grid-cols-2 gap-4" },
                            React.createElement("div", { className: "relative border border-gray-400 p-4 rounded-md" },
                                React.createElement("span", { className: "text-gray-700 absolute -top-3 bg-white px-2" }, "Dados b\u00E1sicos da UT"),
                                React.createElement("div", { className: 'w-1/2' },
                                    React.createElement(FormInput_1.FormInput, { name: "numero_ut", label: "N\u00FAmero UT", type: "number", register: register, errors: errors, rules: {
                                            required: 'O campo nome é obrigatório'
                                        }, id: "numero_ut", className: "pb-4" })),
                                React.createElement("div", { className: 'flex flex-col lg:flex-row lg:space-x-4' },
                                    React.createElement("div", null,
                                        React.createElement(FormInput_1.FormInput, { name: "area_util", label: "\u00C1rea \u00DAtil", type: "number", register: register, errors: errors, rules: {
                                                required: 'O campo nome é obrigatório'
                                            }, id: "area_util", className: "pb-4" })),
                                    React.createElement("div", null,
                                        React.createElement(FormInput_1.FormInput, { name: "area_total", label: "\u00C1rea Total", type: "number", register: register, errors: errors, rules: {
                                                required: 'O campo nome é obrigatório'
                                            }, id: "area_total", className: "pb-4" })))),
                            (upa.tipo === 1) &&
                                (React.createElement(React.Fragment, null,
                                    React.createElement("div", { className: "relative border border-gray-400 p-4 rounded-md" },
                                        React.createElement("span", { className: "text-gray-700 absolute -top-3 bg-white px-2" }, "Faixas"),
                                        React.createElement("div", { className: "flex flex-col lg:flex-wrap" },
                                            React.createElement(FormInput_1.FormInput, { name: "quantidade_faixas", label: "Quantidade", type: "number", register: register, errors: errors, id: "quantidade_faixas", className: "pb-4" }),
                                            React.createElement(FormInput_1.FormInput, { name: "largura_faixas", label: "Largura", type: "number", register: register, errors: errors, id: "largura_faixas", className: "pb-4" }),
                                            React.createElement(FormInput_1.FormInput, { name: "comprimento_faixas", label: "Comprimento", type: "number", register: register, errors: errors, id: "comprimento_faixas", className: "pb-4" }))),
                                    React.createElement("div", { className: "border border-gray-400 p-4 mt-4 rounded-md" },
                                        React.createElement("span", { className: "text-gray-700 block -mt-7 bg-white w-[7.5em] pb-1 px-2" }, "Coordenadas"),
                                        React.createElement("div", { className: "flex flex-col" },
                                            React.createElement(FormInput_1.FormInput, { id: "latitude", name: "latitude", label: "Latitude", type: "number", register: register, errors: errors, className: "pb-4", step: "any" }),
                                            React.createElement(FormInput_1.FormInput, { id: "longitude", name: "longitude", label: "Longitude", type: "number", register: register, errors: errors, className: "pb-4", step: "any" }),
                                            React.createElement("div", { className: 'w-full lg:w-1/3' },
                                                React.createElement(FormInput_1.FormInput, { name: "azimute", label: "Azimute", type: "number", register: register, errors: errors, id: "azimute", className: "pb-4" })),
                                            React.createElement("div", { className: 'w-full lg:w-1/3' },
                                                React.createElement(FormInput_1.FormInput, { name: "quadrante", label: "Quadrante", type: "number", register: register, errors: errors, id: "quadrante", className: "pb-4" })))))),
                            React.createElement("div", { className: "col-span-2 relative border border-gray-400 p-4 rounded-md mt-6" },
                                React.createElement("span", { className: "text-gray-700 absolute -top-3 bg-white px-2" }, "Localiza\u00E7\u00E3o da UT"),
                                React.createElement("div", { className: 'flex flex-row items-center mx-auto' }, (!isLoaded) ? React.createElement("div", null, "Loading...") :
                                    (React.createElement(Map_1["default"], { setLocation: setLocation, arvores: arvores, callBackPolygon: callBackPolygon, polygonPath: polygonPath, shapeText: 'Definir \u00E1rea da UT' }))))),
                        React.createElement("div", { className: 'flex items-center justify-between pt-4' },
                            React.createElement(Link_1.Link, { href: "/ut", className: "text-center w-1/5 bg-gradient-to-r from-orange-600 to-orange-400 text-white p-3 rounded-md" }, "Voltar"),
                            React.createElement("button", { className: "w-1/5 bg-green-600 text-white p-3 rounded-md" }, "Salvar"))))))));
};
exports["default"] = AddEdit;
