'use client';
"use strict";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var alert_1 = require("@/services/alert");
var AuthContext_1 = require("../../context/AuthContext");
var hooks_1 = require("@/redux/hooks");
var LoadingContext_1 = require("@/context/LoadingContext");
var ProjetoContext_1 = require("@/context/ProjetoContext");
var CriterioPoa_1 = require("../categoria-especie/CriterioPoa");
var classnames_1 = require("classnames");
var solid_1 = require("@heroicons/react/solid");
var ModalContext_1 = require("@/context/ModalContext");
var styles_1 = require("../Utils/styles");
var Index_1 = require("../poa/exploracao/Index");
var Index = function () {
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var _a = react_1.useState(), poas = _a[0], setPoas = _a[1];
    var _b = react_1.useState(), categorias = _b[0], setCategorias = _b[1];
    var poa = hooks_1.useAppSelector(function (state) { return state.poa; });
    var _c = react_1.useState(), selectedPoa = _c[0], setSelectedPoa = _c[1];
    var dispatch = hooks_1.useAppDispatch();
    var projeto = react_1.useContext(ProjetoContext_1.ProjetoContext).projeto;
    var setLoading = react_1.useContext(LoadingContext_1.LoadingContext).setLoading;
    var _d = react_1.useState([]), uts = _d[0], setUts = _d[1];
    var showModal = ModalContext_1.useModalContext().showModal;
    var loadPoas = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/poa/search/q?nome=" + inputValue)];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    callback(data === null || data === void 0 ? void 0 : data.map(function (poa) { return ({
                        value: poa.id,
                        label: poa.nome
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
    var loadUts = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get('/planejo/uts')];
                case 1:
                    data = (_a.sent()).data;
                    setUts(data === null || data === void 0 ? void 0 : data.uts);
                    return [2 /*return*/];
            }
        });
    }); }, [client, setUts]);
    var poaExists = poas === null || poas === void 0 ? void 0 : poas.length;
    var loadPoa = react_1.useCallback(function () {
        if (poa && poaExists > 0) {
            setSelectedPoa({
                value: poa === null || poa === void 0 ? void 0 : poa.id,
                label: poa === null || poa === void 0 ? void 0 : poa.descricao
            });
        }
        else {
            setSelectedPoa({});
        }
    }, [poa, poaExists]);
    var loadCategorias = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, categorias;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/categoria?poa=" + (poa === null || poa === void 0 ? void 0 : poa.id) + "&projetoId=" + (projeto === null || projeto === void 0 ? void 0 : projeto.id) + "&order=asc&orderBy=nome")];
                case 1:
                    response = _a.sent();
                    categorias = response.data.categorias;
                    setCategorias(categorias);
                    return [2 /*return*/];
            }
        });
    }); }, [client, poa === null || poa === void 0 ? void 0 : poa.id, projeto === null || projeto === void 0 ? void 0 : projeto.id]);
    react_1.useEffect(function () {
        function defaultOptions() {
            return __awaiter(this, void 0, void 0, function () {
                var response, poas;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, client.get("/poa?orderBy=descricao&order=asc")];
                        case 1:
                            response = _a.sent();
                            poas = response.data.poas;
                            setPoas(__spreadArrays([{ descricao: 'Padrão', id: '' }], poas));
                            return [2 /*return*/];
                    }
                });
            });
        }
        loadPoa();
        loadUts();
        loadCategorias();
        defaultOptions();
    }, [client, loadUts, loadCategorias, loadPoa]);
    function PlanejarPOA(event) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        return [4 /*yield*/, client.post('/planejo', { poa: poa === null || poa === void 0 ? void 0 : poa.id }).then(function (_a) {
                                var data = _a.data;
                                var error = data.error, message = data.message;
                                if (!error) {
                                    alert_1["default"].success(message);
                                    loadUts();
                                }
                                else {
                                    alert_1["default"].error(message);
                                }
                            })["catch"](function (error) {
                                setLoading(false);
                                console.log(error);
                            })["finally"](function () {
                                setLoading(false);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function ajusteExploracao(utId) {
        var selectedUt = uts.find(function (ut) { return (ut === null || ut === void 0 ? void 0 : ut.id_ut) === utId; });
        showModal({
            title: "Ajustar Explora\u00E7\u00E3o de Esp\u00E9cies na UT: " + (selectedUt === null || selectedUt === void 0 ? void 0 : selectedUt.numero_ut),
            size: 'max-w-5xl',
            type: 'submit', hookForm: 'hook-form', styleButton: styles_1.styles.greenButton,
            cancelName: 'Fechar',
            content: React.createElement("div", null,
                React.createElement(Index_1["default"], { ut: selectedUt, loadUts: loadUts }))
        });
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "flex flex-row items-center bg-gradient-to-r from-green-600 to-green-400  border-b-2 border-green-600 justify-between p-6 bg-gray-100" },
            React.createElement("h1", { className: "font-medium text-2xl font-roboto text-white" }, "Processamento do POA")),
        React.createElement("div", { className: "flex flex-col p-6 mx-auto" },
            categorias && (React.createElement("div", { className: "overflow-x-auto border border-gray-300 rounded-md" },
                React.createElement(CriterioPoa_1.CriterioPoa, { categorias: categorias, loadCategorias: loadCategorias }))),
            React.createElement("div", { className: "border border-gray-300 p-4 rounded-md col-span-6 relative w-full mt-6" },
                React.createElement("span", { className: "text-gray-700 absolute -top-3 bg-white px-2 text-sm" }, "Processamento do POA"),
                React.createElement("div", { className: 'flex flex-col md:flex-row space-x-2 items-center w-full' },
                    React.createElement("button", { disabled: !(poa === null || poa === void 0 ? void 0 : poa.id), id: 'btn-resp', onClick: PlanejarPOA, className: classnames_1["default"]("px-6 py-2 bg-green-700 hover:bg-green-800 hover:cursor-pointer text-white items-center text-center w-1/2 lg:w-1/6", !(poa === null || poa === void 0 ? void 0 : poa.id) && ("hover:cursor-not-allowed opacity-50")) }, "Planejar POA"))),
            React.createElement("div", { className: "border border-gray-300 p-4 rounded-md col-span-6 relative w-full mt-6" },
                React.createElement("span", { className: "text-gray-700 absolute -top-3 bg-white px-2 text-sm" }, "Definir ajustes"),
                React.createElement("div", { className: 'flex flex-col md:flex-row space-x-2 w-full overflow-x-auto' },
                    React.createElement("table", { className: "min-w-full divide-y divide-gray-200 w-full" },
                        React.createElement("thead", { className: "bg-gray-50 w-full" },
                            React.createElement("tr", null,
                                React.createElement("th", { scope: "col" }),
                                React.createElement("th", { scope: "col", className: "justify-between items-center px-2 py-2 text-left text-xs font-medium text-gray-500" },
                                    React.createElement("div", { className: "flex flex-row justify-between" }, "UPA")),
                                React.createElement("th", { scope: "col", className: "justify-between px-2 py-2 text-left text-xs font-medium text-gray-500" },
                                    React.createElement("div", { className: "flex flex-row justify-between" }, "UT")),
                                React.createElement("th", { scope: "col", className: "px-3 py-3 text-left text-xs font-medium text-gray-500" },
                                    React.createElement("div", { className: "flex flex-row justify-between" }, "Volume Total")),
                                React.createElement("th", { scope: "col", className: "py-3 text-left text-xs font-medium text-gray-500" },
                                    React.createElement("div", { className: "flex flex-row justify-between" }, "Volume Explorar")),
                                React.createElement("th", { scope: "col", className: "px-3 py-3 text-left text-xs font-medium text-gray-500" },
                                    React.createElement("div", { className: "flex flex-row w-full justify-between" }, "Volume Explorar/Area Util")))),
                        React.createElement("tbody", { className: "bg-white divide-y divide-gray-300" }, uts === null || uts === void 0 ? void 0 : uts.map(function (ut) { return (React.createElement("tr", { key: ut.numero_ut },
                            React.createElement("td", { className: "w-full py-2 whitespace-nowrap text-sm flex flex-row items-center justify-center" },
                                React.createElement("button", { onClick: function () { return ajusteExploracao(ut === null || ut === void 0 ? void 0 : ut.id_ut); } },
                                    React.createElement(solid_1.PencilAltIcon, { className: classnames_1["default"]("w-5 h-5 text-green-600 hover:text-green-700") }))),
                            React.createElement("td", { className: "px-3 whitespace-nowrap" },
                                React.createElement("div", { className: "text-sm" }, ut === null || ut === void 0 ? void 0 : ut.ano)),
                            React.createElement("td", { className: "px-3 whitespace-nowrap" },
                                React.createElement("div", { className: "text-sm" }, ut === null || ut === void 0 ? void 0 : ut.numero_ut)),
                            React.createElement("td", { className: "px-3 whitespace-nowrap" },
                                React.createElement("span", { className: "text-sm" },
                                    React.createElement("div", { className: "text-sm" }, ut === null || ut === void 0 ? void 0 : ut.volume_total.toFixed(2)))),
                            React.createElement("td", { className: "px-3 whitespace-nowrap" },
                                React.createElement("span", { className: "text-sm" },
                                    React.createElement("div", { className: "text-sm" }, ut === null || ut === void 0 ? void 0 : ut.volume_explorar.toFixed(4)))),
                            React.createElement("td", { className: "px-3 whitespace-nowrap" },
                                React.createElement("span", { className: "text-sm" },
                                    React.createElement("div", { className: classnames_1["default"]("text-sm", (ut === null || ut === void 0 ? void 0 : ut.volume_area_util) > 30 && "text-red-700") }, ut === null || ut === void 0 ? void 0 : ut.volume_area_util.toFixed(4)))))); }))))))));
};
exports["default"] = Index;
