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
exports.__esModule = true;
var react_1 = require("react");
var input_1 = require("../atoms/input");
var alert_1 = require("@/services/alert");
var AuthContext_1 = require("../../context/AuthContext");
var hooks_1 = require("@/redux/hooks");
var Select_1 = require("../Select");
var ProjetoContext_1 = require("@/context/ProjetoContext");
var umfSlice_1 = require("@/redux/features/umfSlice");
var upaSlice_1 = require("@/redux/features/upaSlice");
var utSlice_1 = require("@/redux/features/utSlice");
var ListArvore_1 = require("./ListArvore");
var router_1 = require("next/router");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var Index = function (_a) {
    var currentArvores = _a.currentArvores, onPageChanged = _a.onPageChanged, orderBy = _a.orderBy, order = _a.order, changeItemsPerPage = _a.changeItemsPerPage, currentPage = _a.currentPage, perPage = _a.perPage, loadArvores = _a.loadArvores, exportCsv = _a.exportCsv;
    var _b = react_1.useState(currentArvores), filteredArvores = _b[0], setFilteredArvores = _b[1];
    var _c = react_1.useState(""), searchInput = _c[0], setSearchInput = _c[1];
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var _d = react_1.useState(false), sorted = _d[0], setSorted = _d[1];
    var _e = react_1.useState(), umfs = _e[0], setUmfs = _e[1];
    var _f = react_1.useState(), upas = _f[0], setUpas = _f[1];
    var _g = react_1.useState(), uts = _g[0], setUts = _g[1];
    var umf = hooks_1.useAppSelector(function (state) { return state.umf; });
    var upa = hooks_1.useAppSelector(function (state) { return state.upa; });
    var ut = hooks_1.useAppSelector(function (state) { return state.ut; });
    var _h = react_1.useState(), selectedUmf = _h[0], setSelectedUmf = _h[1];
    var _j = react_1.useState(), selectedUpa = _j[0], setSelectedUpa = _j[1];
    var _k = react_1.useState(), selectedUt = _k[0], setSelectedUt = _k[1];
    var projeto = react_1.useContext(ProjetoContext_1.ProjetoContext).projeto;
    var dispatch = hooks_1.useAppDispatch();
    var router = router_1.useRouter();
    var loadUpas = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/upa/search/q?descricao=" + inputValue)];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    callback(data === null || data === void 0 ? void 0 : data.map(function (upa) { return ({
                        value: upa.id,
                        label: upa.descricao
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
    var loadUts = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/ut/search/q?numero_ut=" + inputValue)];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    callback(data === null || data === void 0 ? void 0 : data.map(function (ut) { return ({
                        value: ut.id,
                        label: ut.numero_ut
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
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
    var defaultUmfsOptions = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, umfs, compareUmf;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/umf/find-by-projeto/" + (projeto === null || projeto === void 0 ? void 0 : projeto.id) + "?orderBy=nome&order=asc")];
                case 1:
                    response = _a.sent();
                    umfs = response.data.umfs;
                    setUmfs(umfs);
                    compareUmf = umfs ? umfs.find(function (u) { return u.id === umf.id; }) : null;
                    if (compareUmf) {
                        setSelectedUmf({
                            value: umf === null || umf === void 0 ? void 0 : umf.id,
                            label: umf === null || umf === void 0 ? void 0 : umf.nome
                        });
                    }
                    if (umfs.length === 0) {
                        setSelectedUmf({
                            value: '0',
                            label: 'Nenhuma UMF Cadastrada'
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); }, [client, projeto === null || projeto === void 0 ? void 0 : projeto.id, umf.id, umf === null || umf === void 0 ? void 0 : umf.nome]);
    var defaultUpasOptions = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, upas, compareUpa;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/upa?orderBy=descricao&order=asc&umf=" + (umf === null || umf === void 0 ? void 0 : umf.id))];
                case 1:
                    response = _a.sent();
                    upas = response.data.upas;
                    setUpas(upas);
                    if (upas.length === 0) {
                        setSelectedUpa({
                            value: '0',
                            label: 'Nenhuma UPA Cadastrada'
                        });
                    }
                    compareUpa = upas ? upas.find(function (u) { return u.id === upa.id; }) : null;
                    if (compareUpa) {
                        setSelectedUpa({
                            value: upa === null || upa === void 0 ? void 0 : upa.id,
                            label: upa === null || upa === void 0 ? void 0 : upa.descricao
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); }, [client, umf === null || umf === void 0 ? void 0 : umf.id, upa === null || upa === void 0 ? void 0 : upa.descricao, upa.id]);
    var defaultUtsOptions = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, uts, compareUt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/ut?orderBy=nome&order=asc&upa=" + (upa === null || upa === void 0 ? void 0 : upa.id))];
                case 1:
                    response = _a.sent();
                    uts = response.data.uts;
                    setUts(uts);
                    if (uts && uts.length === 0) {
                        setSelectedUt({
                            value: '0',
                            label: 'Nenhuma UT Cadastrada'
                        });
                    }
                    compareUt = uts ? uts.find(function (u) { return u.id === ut.id; }) : null;
                    if (compareUt) {
                        setSelectedUt({
                            value: ut === null || ut === void 0 ? void 0 : ut.id,
                            label: ut === null || ut === void 0 ? void 0 : ut.numero_ut.toString()
                        });
                    }
                    else {
                        setSelectedUt({
                            value: '0',
                            label: 'Todos'
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); }, [client, upa === null || upa === void 0 ? void 0 : upa.id, ut.id, ut === null || ut === void 0 ? void 0 : ut.numero_ut]);
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
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    upaSelected = upas.find(function (u) { return u.id === upa.value; });
                    dispatch(upaSlice_1.setUpa({
                        id: upaSelected.id,
                        descricao: upaSelected.descricao,
                        tipo: Number.parseInt(upaSelected.tipo)
                    }));
                    setSelectedUpa(upa);
                    return [4 /*yield*/, client.get("/ut?orderBy=nome&order=asc&upa=" + upaSelected.id)];
                case 1:
                    response = _c.sent();
                    uts = response.data.uts;
                    dispatch(utSlice_1.setUt({
                        id: (_a = uts[0]) === null || _a === void 0 ? void 0 : _a.id,
                        numero_ut: (_b = uts[0]) === null || _b === void 0 ? void 0 : _b.numero_ut
                    }));
                    setUts(uts);
                    return [2 /*return*/];
            }
        });
    }); };
    var selectUt = function (ut) { return __awaiter(void 0, void 0, void 0, function () {
        var paginatedData;
        return __generator(this, function (_a) {
            dispatch(utSlice_1.setUt({
                id: ut.value,
                numero_ut: ut.label
            }));
            setSelectedUt(ut);
            paginatedData = {
                currentPage: 1,
                perPage: perPage,
                utId: ut === null || ut === void 0 ? void 0 : ut.value,
                orderBy: orderBy,
                order: order,
                totalItems: filteredArvores ? filteredArvores.length : 0
            };
            onPageChanged(paginatedData);
            return [2 /*return*/];
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
    function getUtsDefaultOptions() {
        var data = uts === null || uts === void 0 ? void 0 : uts.map(function (ut) {
            return {
                label: ut.numero_ut,
                value: ut.id
            };
        });
        return [{ label: 'Todos', value: '0' }].concat(data);
    }
    var goToAddForm = function () {
        if (ut.numero_ut.toString() === 'Todos' || typeof ut === undefined) {
            alert_1["default"].warn('Selecione uma UT para iniciar o cadastro de uma árvore');
        }
        else {
            router.push('/arvore/add');
        }
    };
    react_1.useEffect(function () {
        defaultUmfsOptions();
        defaultUpasOptions();
        defaultUtsOptions();
        setFilteredArvores(currentArvores);
    }, [currentArvores, currentPage, defaultUmfsOptions, defaultUpasOptions, defaultUtsOptions]);
    var handleSearch = function (evt) { return __awaiter(void 0, void 0, void 0, function () {
        var paginatedData;
        var _a, _b;
        return __generator(this, function (_c) {
            paginatedData = {
                currentPage: 1,
                perPage: perPage,
                orderBy: orderBy,
                order: order,
                search: (_a = evt.target) === null || _a === void 0 ? void 0 : _a.value
            };
            setSearchInput((_b = evt.target) === null || _b === void 0 ? void 0 : _b.value);
            onPageChanged(paginatedData);
            return [2 /*return*/];
        });
    }); };
    var sortArvores = function (sortBy) {
        var sortedBy = sortBy.split(".");
        var nElements = sortedBy.length;
        var sortedArvores = [];
        var tiposNumericos = ['numero_arvore', 'lat_y', 'long_x', 'lat', 'lng', 'cap', 'dap', 'ut.numero_ut'];
        sortedArvores = filteredArvores.sort(function (a, b) {
            if (!tiposNumericos.includes(sortBy)) {
                return sorted ?
                    nElements > 1
                        ? a[sortedBy[0]][sortedBy[1]].toLowerCase().localeCompare(b[sortedBy[0]][sortedBy[1]].toLowerCase())
                        : a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase())
                    : nElements > 1
                        ? b[sortedBy[0]][sortedBy[1]].toLowerCase().localeCompare(a[sortedBy[0]][sortedBy[1]].toLowerCase())
                        : b[sortBy].toLowerCase().localeCompare(a[sortBy].toLowerCase());
            }
            else {
                return sorted ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
            }
        });
        setSorted(!sorted);
        setFilteredArvores(sortedArvores);
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: "flex flex-row items-center justify-between p-6 bg-gray-100 items-center" },
            React.createElement("h1", { className: "font-medium text-2xl font-roboto" }, "\u00C1rvores"),
            React.createElement("div", { className: "flex flex-row space-x-2" },
                React.createElement("div", { onClick: exportCsv, className: "px-4 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer" },
                    React.createElement("div", { className: "flex flex-row justify-around w-full space-x-2" },
                        React.createElement("div", null,
                            React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faFileExport })),
                        React.createElement("span", null, "Exportar"))),
                React.createElement("div", { onClick: goToAddForm, className: "px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer" },
                    React.createElement("div", { className: "flex flex-row justify-around w-full space-x-2" },
                        React.createElement("div", null,
                            React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faPlus })),
                        React.createElement("span", null, "Adicionar"))))),
        React.createElement("div", { className: "flex flex-col p-6" },
            React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-gray-100 rounded-lg" },
                React.createElement("div", { className: "flex flex-col px-4 w-auto" },
                    React.createElement("div", { className: "w-full" },
                        React.createElement("label", { htmlFor: "perPage", className: "px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400" }, "por P\u00E1gina")),
                    React.createElement("select", { value: perPage, onChange: function (evt) { return changeItemsPerPage(evt); }, id: "perPage", className: "w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" },
                        React.createElement("option", { value: "10" }, "10"),
                        React.createElement("option", { value: "20" }, "20"),
                        React.createElement("option", { value: "50" }, "50"),
                        React.createElement("option", { value: "100" }, "100"),
                        React.createElement("option", { value: "200" }, "200"),
                        React.createElement("option", { value: "500" }, "500"))),
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4" },
                    React.createElement("div", null,
                        React.createElement(Select_1.Select, { initialData: {
                                label: 'Selecione UMF...',
                                value: ''
                            }, selectedValue: selectedUmf, defaultOptions: getUmfsDefaultOptions(), options: loadUmfs, label: "UMF:", callback: function (e) { selectUmf(e); } })),
                    React.createElement("div", null,
                        React.createElement(Select_1.Select, { initialData: {
                                label: 'Selecione UPA...',
                                value: ''
                            }, selectedValue: selectedUpa, defaultOptions: getUpasDefaultOptions(), options: loadUpas, label: "UPA:", callback: function (e) { selectUpa(e); } })),
                    React.createElement("div", null,
                        React.createElement(Select_1.Select, { initialData: {
                                label: 'Selecione UT...',
                                value: ''
                            }, selectedValue: selectedUt, defaultOptions: getUtsDefaultOptions(), options: loadUts, label: "UT:", callback: selectUt }))),
                React.createElement("div", { className: "w-full px-4 pt-4 lg:pt-0" },
                    React.createElement("label", { htmlFor: "procurar_ut" }, "Pesquisar \u00C1rvore:"),
                    React.createElement(input_1.Input, { label: "Pesquisar UT", id: "search", name: "search", value: searchInput, onChange: handleSearch, className: 'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50' }))),
            React.createElement(ListArvore_1["default"], { currentArvores: currentArvores, sortArvores: sortArvores, sorted: sorted, loadArvores: loadArvores }))));
};
exports["default"] = Index;
