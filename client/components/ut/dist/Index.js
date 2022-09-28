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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var Link_1 = require("../Link");
var input_1 = require("../atoms/input");
var solid_1 = require("@heroicons/react/solid");
var alert_1 = require("../../services/alert");
var Modal_1 = require("../Modal");
var AuthContext_1 = require("../../contexts/AuthContext");
var Select_1 = require("../Select");
var umfSlice_1 = require("../../store/umfSlice");
var upaSlice_1 = require("../../store/upaSlice");
var hooks_1 = require("../../store/hooks");
var Index = function (_a) {
    var currentUts = _a.currentUts, onPageChanged = _a.onPageChanged, changeItemsPerPage = _a.changeItemsPerPage, orderBy = _a.orderBy, order = _a.order, currentPage = _a.currentPage, perPage = _a.perPage, loading = _a.loading, loadUts = _a.loadUts;
    var _b = react_1.useState(currentUts), filteredUts = _b[0], setFilteredUts = _b[1];
    var _c = react_1.useState(), selectedUt = _c[0], setSelectedUt = _c[1];
    var _d = react_1.useState(false), uploading = _d[0], setUploading = _d[1];
    var _e = react_1.useState(false), removeSingleModal = _e[0], setOpenSingleModal = _e[1];
    var _f = react_1.useState(false), removeMultipleModal = _f[0], setOpenMultipleModal = _f[1];
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var _g = react_1.useState([]), checkedUts = _g[0], setCheckedUts = _g[1];
    var _h = react_1.useState(false), sorted = _h[0], setSorted = _h[1];
    var _j = react_1.useState(), umfs = _j[0], setUmfs = _j[1];
    var _k = react_1.useState(), upas = _k[0], setUpas = _k[1];
    var umf = hooks_1.useAppSelector(function (state) { return state.umf; });
    var upa = hooks_1.useAppSelector(function (state) { return state.upa; });
    var _l = react_1.useState(), selectedUmf = _l[0], setSelectedUmf = _l[1];
    var _m = react_1.useState(), selectedUpa = _m[0], setSelectedUpa = _m[1];
    var dispatch = hooks_1.useAppDispatch();
    var loadUpas = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/upa/search/q?descricao=" + inputValue)];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    console.log(data);
                    callback(data === null || data === void 0 ? void 0 : data.map(function (upa) { return ({
                        value: upa.id,
                        label: upa.descricao
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
    var defaultUpasOptions = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var umfId, response, _a, upas;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    umfId = umf.id;
                    if (!umf) return [3 /*break*/, 2];
                    return [4 /*yield*/, client.get("/upa?orderBy=nome&order=asc&umf=" + umfId)];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, client.get("/upa?orderBy=nome&order=asc")];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    response = _a;
                    upas = response.data.upas;
                    setUpas(upas);
                    return [2 /*return*/];
            }
        });
    }); }, [client, umf]);
    var loadUmfs = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/umf/search/q?nome=" + inputValue)];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    callback(data === null || data === void 0 ? void 0 : data.map(function (umf) { return ({
                        value: umf.id,
                        label: umf.nome
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        function defaultUmfsOptions() {
            return __awaiter(this, void 0, void 0, function () {
                var response, umfs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, client.get("/umf?orderBy=nome&order=asc")];
                        case 1:
                            response = _a.sent();
                            umfs = response.data.umfs;
                            setUmfs(umfs);
                            return [2 /*return*/];
                    }
                });
            });
        }
        function defaultUpasOptions() {
            return __awaiter(this, void 0, void 0, function () {
                var response, upas;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, client.get("/upa?orderBy=descricao&order=asc&umf=" + umf.id)];
                        case 1:
                            response = _a.sent();
                            upas = response.data.upas;
                            setUpas(upas);
                            if (upas.length == 0) {
                                setSelectedUpa({
                                    value: '0',
                                    label: 'Sem UPAs'
                                });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
        if (umf)
            setSelectedUmf({
                value: umf.id,
                label: umf.nome
            });
        if (upa)
            setSelectedUpa({
                value: upa.id,
                label: upa.descricao
            });
        defaultUmfsOptions();
        defaultUpasOptions();
        setFilteredUts(currentUts);
    }, [currentUts, currentPage, client, umf, upa]);
    var selectUmf = function (umf) { return __awaiter(void 0, void 0, void 0, function () {
        var response, upas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch(umfSlice_1.setUmf({
                        id: umf.value,
                        nome: umf.label
                    }));
                    setSelectedUmf(umf);
                    return [4 /*yield*/, client.get("/upa?orderBy=descricao&order=asc&umf=" + umf.value)];
                case 1:
                    response = _a.sent();
                    upas = response.data.upas;
                    setUpas(upas);
                    return [2 /*return*/];
            }
        });
    }); };
    var selectUpa = function (upa) { return __awaiter(void 0, void 0, void 0, function () {
        var upaSelected, response, uts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    upaSelected = upas.find(function (u) { return u.id === upa.value; });
                    dispatch(upaSlice_1.setUpa({
                        id: upa.value,
                        descricao: upa.label,
                        tipo: Number.parseInt(upaSelected.tipo)
                    }));
                    setSelectedUpa(upa);
                    return [4 /*yield*/, client.get("/ut?orderBy=nome&order=asc&upa=" + upa.value)];
                case 1:
                    response = _a.sent();
                    uts = response.data.uts;
                    setFilteredUts(uts);
                    return [2 /*return*/];
            }
        });
    }); };
    function getUmfsDefaultOptions() {
        return umfs === null || umfs === void 0 ? void 0 : umfs.map(function (umf) {
            return {
                label: umf.nome,
                value: umf.id
            };
        });
    }
    function getUpasDefaultOptions() {
        return upas === null || upas === void 0 ? void 0 : upas.map(function (upa) {
            return {
                label: upa.descricao,
                value: upa.id
            };
        });
    }
    function toogleDeleteModal(id) {
        if (id) {
            var ut = currentUts.find(function (ut) { return ut.id === id; });
            setSelectedUt(ut);
        }
        setOpenSingleModal(true);
    }
    function deleteUmf(id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    client["delete"]("/ut/single/" + id)
                        .then(function () {
                        alert_1["default"].success('A UT foi deletada com SUCESSO!!!');
                        loadUts();
                        setOpenSingleModal(false);
                    });
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/];
            });
        });
    }
    var handleSearch = function (query) { return __awaiter(void 0, void 0, void 0, function () {
        var paginatedData;
        return __generator(this, function (_a) {
            paginatedData = {
                currentPage: 1,
                perPage: perPage,
                orderBy: orderBy,
                order: order,
                search: query
            };
            onPageChanged(__assign({ upa: upa.id }, paginatedData));
            return [2 /*return*/];
        });
    }); };
    var sortUpas = function () {
        var sortedUpas = [];
        sortedUpas = filteredUts.sort(function (a, b) {
            return sorted
                ? a.numero_ut.localeCompare(b.numero_ut)
                : b.numero_ut.localeCompare(a.numero_ut);
        });
        setSorted(!sorted);
        setFilteredUts(sortedUpas);
    };
    var handleSelectUpa = function (evt) {
        var upaId = evt.target.value;
        if (!checkedUts.includes(upaId)) {
            setCheckedUts(__spreadArrays(checkedUts, [upaId]));
        }
        else {
            setCheckedUts(checkedUts.filter(function (checkedUpaId) {
                return checkedUpaId !== upaId;
            }));
        }
    };
    var handleSelectAllUpas = function () {
        if ((checkedUts === null || checkedUts === void 0 ? void 0 : checkedUts.length) < (currentUts === null || currentUts === void 0 ? void 0 : currentUts.length)) {
            setCheckedUts(currentUts.map(function (_a) {
                var id = _a.id;
                return id;
            }));
        }
        else {
            setCheckedUts([]);
        }
    };
    var deleteUts = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, client["delete"]('/ut/multiples', { data: { ids: checkedUts } })
                            .then(function (response) {
                            setCheckedUts([]);
                            alert_1["default"].success('As Uts foram deletadas com SUCESSO!!!');
                            loadUts();
                            setOpenMultipleModal(false);
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", null,
        React.createElement("div", { className: "flex flex-row items-center bg-gradient-to-r from-green-600 to-green-400  border-b-2 border-green-600 justify-between p-6 bg-gray-100" },
            React.createElement("h1", { className: "font-medium text-2xl font-roboto text-white" }, "Unidades de Trabalho"),
            React.createElement(Link_1.Link, { href: '/ut/add', className: "px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer" }, "Adicionar")),
        loading ? (React.createElement("div", { className: "flex flex-row items-center justify-center h-56" }, "Loading...")) : (React.createElement("div", { className: "flex flex-col p-6" },
            React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-gray-100 rounded-lg" },
                React.createElement("div", { className: "flex flex-row w-2/12 px-2 items-center justify-between" },
                    React.createElement("div", { className: "w-full" },
                        React.createElement("label", { htmlFor: "perPage", className: "px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400" }, "por P\u00E1gina")),
                    React.createElement("select", { value: perPage, onChange: function (evt) { return changeItemsPerPage(evt.target.value); }, id: "perPage", className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" },
                        React.createElement("option", { value: "10" }, "10"),
                        React.createElement("option", { value: "20" }, "20"),
                        React.createElement("option", { value: "50" }, "50"),
                        React.createElement("option", { value: "100" }, "100"))),
                React.createElement("div", { className: "lg:flex lg:flex-col lg:w-8/12 px-4 space-y-4" },
                    React.createElement("div", null,
                        React.createElement(Select_1.Select, { initialData: {
                                label: 'Selecione UMF...',
                                value: ''
                            }, selectedValue: selectedUmf, defaultOptions: getUmfsDefaultOptions(), options: loadUmfs, label: "UMF:", callback: selectUmf })),
                    React.createElement("div", null,
                        React.createElement(Select_1.Select, { initialData: {
                                label: 'Selecione UPA...',
                                value: ''
                            }, selectedValue: selectedUpa, defaultOptions: getUpasDefaultOptions(), options: loadUpas, label: "UPA:", callback: selectUpa }))),
                React.createElement("div", { className: "w-72 px-4 lg:mt-0 mt-4" }, "Pesquisar UT:"),
                React.createElement("div", { className: "w-full px-4" },
                    React.createElement(input_1.Input, { label: "Pesquisar UT", id: "search", name: "search", onChange: function (e) { return handleSearch(e.target.value); }, className: 'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50' }))),
            React.createElement("div", { className: "flex flex-row items-center justify-between overflow-x-auto mt-2" },
                React.createElement("div", { className: "shadow overflow-y-auto border-b border-gray-200 w-full sm:rounded-lg" },
                    checkedUts.length > 0 && (React.createElement("div", { className: "py-4" },
                        React.createElement("button", { className: "px-4 py-2 bg-red-600 text-white rounded-md", onClick: function () { return setOpenMultipleModal(true); } }, "Deletar"))),
                    React.createElement("table", { className: "min-w-full divide-y divide-gray-200" },
                        React.createElement("thead", { className: "bg-gray-50" },
                            React.createElement("tr", null,
                                React.createElement("th", { className: "w-1/12" },
                                    React.createElement("div", { className: "flex justify-center" },
                                        React.createElement("input", { checked: (checkedUts === null || checkedUts === void 0 ? void 0 : checkedUts.length) === (currentUts === null || currentUts === void 0 ? void 0 : currentUts.length), onChange: handleSelectAllUpas, className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer", type: "checkbox", value: "", id: "flexCheckDefault" }))),
                                React.createElement("th", { className: "w-1/12", onClick: function () { return sortUpas(); } },
                                    React.createElement("div", { className: "flex flex-row items-center px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" },
                                        "Ano",
                                        sorted
                                            ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                            : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                                React.createElement("th", { scope: "col", className: "w-2/12 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "N\u00FAmero UT"),
                                React.createElement("th", { scope: "col", className: "w-3/12 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Tipo de Coordenada"),
                                React.createElement("th", { scope: "col", className: "w-3/12 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Modelo de Equa\u00E7\u00E3o"),
                                React.createElement("th", { scope: "col", className: "relative w-1/12 px-6 py-3" },
                                    React.createElement("span", { className: "sr-only" }, "Edit")))),
                        React.createElement("tbody", { className: "bg-white divide-y divide-gray-200" }, filteredUts === null || filteredUts === void 0 ? void 0 : filteredUts.map(function (ut) { return (React.createElement("tr", { key: upa.id },
                            React.createElement("td", { className: "flex justify-center" },
                                React.createElement("input", { value: ut === null || ut === void 0 ? void 0 : ut.id, checked: checkedUts.includes(ut === null || ut === void 0 ? void 0 : ut.id), onChange: handleSelectUpa, id: "upaId", type: "checkbox", className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" })),
                            React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                React.createElement("div", { className: "flex flex-col items-starter" },
                                    React.createElement("div", { className: "text-sm font-medium text-gray-900" }, ut === null || ut === void 0 ? void 0 : ut.numero_ut))),
                            React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                React.createElement("div", { className: "text-sm text-gray-900" }, [ut === null || ut === void 0 ? void 0 : ut.latitude, ut === null || ut === void 0 ? void 0 : ut.longitude])),
                            React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                                    React.createElement("div", { className: "text-sm text-gray-500" }, ut === null || ut === void 0 ? void 0 : ut.area_util))),
                            React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                                    React.createElement("div", { className: "text-sm text-gray-500" }, ut === null || ut === void 0 ? void 0 : ut.area_total))),
                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center" },
                                React.createElement(Link_1.Link, { href: "/upa/update/" + upa.id },
                                    React.createElement(solid_1.PencilAltIcon, { className: "w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" })),
                                React.createElement(Link_1.Link, { href: "#", onClick: function () { return toogleDeleteModal(upa.id); } },
                                    React.createElement(solid_1.TrashIcon, { className: "w-5 h-5 ml-4 -mr-1 text-red-600 hover:text-red-700" }))))); }))))),
            removeSingleModal &&
                React.createElement(Modal_1["default"], { className: "w-full", styleButton: "bg-red-600 hover:bg-red-700 focus:ring-red-500", title: "Deletar UT", buttonText: "Deletar", bodyText: "Tem certeza que seja excluir a UT " + (selectedUt === null || selectedUt === void 0 ? void 0 : selectedUt.numero_ut) + "?", data: selectedUt, parentFunction: deleteUmf, hideModal: function () { return setOpenSingleModal(false); }, open: removeSingleModal }),
            removeMultipleModal &&
                React.createElement(Modal_1["default"], { className: "w-full", styleButton: "bg-red-600 hover:bg-red-700 focus:ring-red-500", title: "Deletar UTs", buttonText: "Deletar", bodyText: "Tem certeza que seja excluir as " + (checkedUts === null || checkedUts === void 0 ? void 0 : checkedUts.length) + " UTs selecionados?", data: checkedUts, parentFunction: deleteUts, hideModal: function () { return setOpenMultipleModal(false); }, open: removeMultipleModal })))));
};
exports["default"] = Index;
