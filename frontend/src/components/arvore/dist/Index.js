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
var react_1 = require("react");
var input_1 = require("../atoms/input");
var alert_1 = require("@/services/alert");
var AuthContext_1 = require("@/context/AuthContext");
var hooks_1 = require("@/redux/hooks");
var Select_1 = require("@/components/utils/Select");
var umfSlice_1 = require("@/redux/features/umfSlice");
var upaSlice_1 = require("@/redux/features/upaSlice");
var utSlice_1 = require("@/redux/features/utSlice");
var ListArvore_1 = require("./ListArvore");
var navigation_1 = require("next/navigation");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var LoadingContext_1 = require("@/context/LoadingContext");
var navigation_2 = require("next/navigation");
var ExportData_1 = require("@/components/utils/ExportData");
var paginationSlice_1 = require("@/redux/features/paginationSlice");
var Pagination_1 = require("@/components/utils/Pagination");
var Index = function () {
    var _a = react_1.useState(""), searchInput = _a[0], setSearchInput = _a[1];
    var client = AuthContext_1.useAuthContext().client;
    var _b = react_1.useState(false), sorted = _b[0], setSorted = _b[1];
    var _c = react_1.useState(), umfs = _c[0], setUmfs = _c[1];
    var _d = react_1.useState(), upas = _d[0], setUpas = _d[1];
    var _e = react_1.useState(), uts = _e[0], setUts = _e[1];
    var umf = hooks_1.useAppSelector(function (state) { return state.umf; });
    var upa = hooks_1.useAppSelector(function (state) { return state.upa; });
    var _f = react_1.useState(), selectedUmf = _f[0], setSelectedUmf = _f[1];
    var _g = react_1.useState(), selectedUpa = _g[0], setSelectedUpa = _g[1];
    var _h = react_1.useState(), selectedUt = _h[0], setSelectedUt = _h[1];
    var _j = react_1.useContext(LoadingContext_1.LoadingContext), loading = _j.loading, setLoading = _j.setLoading;
    var _k = react_1.useState(1), currentPage = _k[0], setCurrentPage = _k[1];
    var _l = react_1.useState(10), itemsPerPage = _l[0], setItemsPerPage = _l[1];
    var _m = react_1.useState(0), totalItems = _m[0], setTotalItems = _m[1];
    var _o = react_1.useState(), currentArvores = _o[0], setCurrentArvores = _o[1];
    var _p = react_1.useState(0), totalPages = _p[0], setTotalPages = _p[1];
    var _q = react_1.useState('numero_arvore'), orderBy = _q[0], setOrderBy = _q[1];
    var _r = react_1.useState('asc'), order = _r[0], setOrder = _r[1];
    var pagination = hooks_1.useAppSelector(function (state) { return state.pagination; });
    var ut = hooks_1.useAppSelector(function (state) { return state.ut; });
    var poa = hooks_1.useAppSelector(function (state) { return state.poa; });
    //const dispatch = useAppDispatch()
    var pathname = navigation_2.usePathname();
    var _s = react_1.useState(currentArvores), filteredArvores = _s[0], setFilteredArvores = _s[1];
    var loadArvores = react_1.useCallback(function (itemsPerPage, currentPage) { return __awaiter(void 0, void 0, void 0, function () {
        var currentPagePagination, perPage, url, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    currentPagePagination = (pagination.name === pathname && pagination.currentPage) ? pagination.currentPage : 1;
                    perPage = itemsPerPage ? itemsPerPage : pagination.perPage;
                    url = "/arvore/get-all?utId=" + (ut === null || ut === void 0 ? void 0 : ut.id) + "&page=" + (currentPage ? currentPage : currentPagePagination) + "&perPage=" + (itemsPerPage ? itemsPerPage : perPage) + "&orderBy=" + orderBy + "&order=" + order;
                    setCurrentPage(currentPagePagination);
                    return [4 /*yield*/, client.get(url)];
                case 1:
                    data = (_a.sent()).data;
                    setTotalItems(data === null || data === void 0 ? void 0 : data.count);
                    setCurrentArvores(data === null || data === void 0 ? void 0 : data.arvores);
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); }, [client, order, orderBy, pagination.currentPage, pagination.name, pagination.perPage, pathname, setLoading, ut === null || ut === void 0 ? void 0 : ut.id]);
    var exportCsv = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/arvore/get-all?utId=" + ((ut === null || ut === void 0 ? void 0 : ut.id) ? ut === null || ut === void 0 ? void 0 : ut.id : null) + "&order=asc&orderBy=numero_arvore")];
                case 1:
                    response = (_a.sent()).data;
                    data = response === null || response === void 0 ? void 0 : response.arvores.map(function (arv) {
                        var ut = arv.ut, numero_arvore = arv.numero_arvore, altura = arv.altura, dap = arv.dap, volume = arv.volume, fuste = arv.fuste, area_basal = arv.area_basal, id_especie = arv.id_especie, id_situacao = arv.id_situacao, especie = arv.especie, situacao_arvore = arv.situacao_arvore;
                        return {
                            'UT': ut === null || ut === void 0 ? void 0 : ut.numero_ut,
                            'Num Árvore': numero_arvore,
                            'Altura': altura.replace('.', ','),
                            'Dap': dap.replace('.', ','),
                            'Volume': volume.replace('.', ','),
                            'Fuste': fuste,
                            'Área Basal': area_basal.toString().replace('.', ','),
                            //id_especie,
                            'Espécie': especie === null || especie === void 0 ? void 0 : especie.nome,
                            //id_situacao,
                            'Situação': situacao_arvore === null || situacao_arvore === void 0 ? void 0 : situacao_arvore.nome
                        };
                    });
                    data.length > 0
                        ?
                            ExportData_1.exportToCSV(data, "inventario_" + new Date(Date.now()).toLocaleString().replace(",", "_"), {
                                delimiter: ';'
                            })
                        :
                            alert_1["default"].warn('Não existem árvores cadastradas');
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        loadArvores(itemsPerPage);
    }, [loadArvores, itemsPerPage, poa]);
    var onPageChanged = function (paginatedData) { return __awaiter(void 0, void 0, void 0, function () {
        var name, currentPage, perPage, totalPages, orderBy, order, search, data, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = paginatedData.name, currentPage = paginatedData.currentPage, perPage = paginatedData.perPage, totalPages = paginatedData.totalPages, orderBy = paginatedData.orderBy, order = paginatedData.order, search = paginatedData.search;
                    if (!search) return [3 /*break*/, 2];
                    return [4 /*yield*/, client.get("/arvore/get-all?utId=" + (ut === null || ut === void 0 ? void 0 : ut.id) + "&page=" + currentPage + "&perPage=" + perPage + "&orderBy=" + orderBy + "&order=" + order + "&search=" + search)];
                case 1:
                    data = (_a.sent()).data;
                    paginatedData = __assign(__assign({ name: name }, paginatedData), { totalPages: Math.ceil((data === null || data === void 0 ? void 0 : data.count) / perPage), totalItems: data === null || data === void 0 ? void 0 : data.count });
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, client.get("/arvore/get-all?utId=" + (ut === null || ut === void 0 ? void 0 : ut.id) + "&page=" + currentPage + "&perPage=" + perPage + "&orderBy=" + orderBy + "&order=" + order)];
                case 3:
                    data = (_a.sent()).data;
                    paginatedData = __assign(__assign({ name: name }, paginatedData), { totalPages: Math.ceil((data === null || data === void 0 ? void 0 : data.count) / perPage), totalItems: data === null || data === void 0 ? void 0 : data.count });
                    _a.label = 4;
                case 4:
                    dispatch(paginationSlice_1.paginate(paginatedData));
                    setCurrentPage(currentPage);
                    setItemsPerPage(perPage);
                    setOrderBy(orderBy);
                    setOrder(order);
                    setTotalItems(data === null || data === void 0 ? void 0 : data.count);
                    setCurrentArvores(data === null || data === void 0 ? void 0 : data.arvores);
                    setTotalPages(totalPages ? totalPages : Math.ceil((data === null || data === void 0 ? void 0 : data.count) / perPage));
                    return [2 /*return*/];
            }
        });
    }); };
    var changeItemsPerPage = function (evt) {
        onPageChanged({
            name: pathname,
            currentPage: 1,
            perPage: evt.target.value,
            orderBy: orderBy,
            order: order
        });
    };
    var dispatch = hooks_1.useAppDispatch();
    var router = navigation_1.useRouter();
    var loadUpas = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            data = upas.filter(function (upa) { return (upa === null || upa === void 0 ? void 0 : upa.descricao.includes(inputValue)) || (upa === null || upa === void 0 ? void 0 : upa.descricao.toLowerCase().includes(inputValue)); });
            callback(data === null || data === void 0 ? void 0 : data.map(function (upa) { return ({
                value: upa.id,
                label: upa.descricao
            }); }));
            return [2 /*return*/];
        });
    }); };
    var loadUts = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            data = uts.filter(function (ut) { return ut === null || ut === void 0 ? void 0 : ut.numero_ut.toString().includes(inputValue); });
            callback(data === null || data === void 0 ? void 0 : data.map(function (ut) { return ({
                value: ut.id,
                label: ut.numero_ut
            }); }));
            return [2 /*return*/];
        });
    }); };
    var loadUmfs = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            data = umfs.filter(function (umf) { return (umf === null || umf === void 0 ? void 0 : umf.nome.includes(inputValue)) || (umf === null || umf === void 0 ? void 0 : umf.nome.toLowerCase().includes(inputValue)); });
            callback(data === null || data === void 0 ? void 0 : data.map(function (umf) { return ({
                value: umf.id,
                label: umf.nome
            }); }));
            return [2 /*return*/];
        });
    }); };
    var defaultUmfsOptions = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, umfs, compareUmf;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/umf?orderBy=nome&order=asc")];
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
    }); }, [client, umf.id, umf === null || umf === void 0 ? void 0 : umf.nome]);
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
                perPage: itemsPerPage,
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
            navigation_1.redirect('/arvore/add');
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
                perPage: itemsPerPage,
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
        React.createElement("div", { className: "flex flex-row items-center justify-between p-6 items-center" },
            React.createElement("h1", { className: "font-medium text-2xl text-custom-green" }, "\u00C1rvores"),
            React.createElement("div", { className: "flex flex-row space-x-2" },
                filteredArvores.length > 0 && (React.createElement("div", { onClick: exportCsv, className: "px-4 py-2 text-white bg-brown-normal hover:bg-brown-normal/50 rounded-md hover:cursor-pointer" },
                    React.createElement("div", { className: "flex flex-row justify-around w-full space-x-2" },
                        React.createElement("div", null,
                            React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faFileExport })),
                        React.createElement("span", null, "Exportar")))),
                React.createElement("div", { onClick: goToAddForm, className: "px-6 py-2 text-white bg-custom-green hover:bg-custom-green/50 rounded-md hover:cursor-pointer" },
                    React.createElement("div", { className: "flex flex-row justify-around w-full space-x-2" },
                        React.createElement("div", null,
                            React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faPlus })),
                        React.createElement("span", null, "Adicionar"))))),
        React.createElement("div", { className: "flex flex-col p-6" },
            React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-custom-green rounded-lg" },
                React.createElement("div", { className: "flex flex-col px-4 w-auto" },
                    React.createElement("div", { className: "w-full" },
                        React.createElement("label", { htmlFor: "perPage", className: "px-1 block mb-2 text-sm font-medium w-24 text-white" }, "por P\u00E1gina")),
                    React.createElement("select", { value: itemsPerPage, onChange: function (evt) { return changeItemsPerPage(evt); }, id: "perPage", className: "text-gray-900 w-20 bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" },
                        React.createElement("option", { value: "10" }, "10"),
                        React.createElement("option", { value: "20" }, "20"),
                        React.createElement("option", { value: "50" }, "50"),
                        React.createElement("option", { value: "100" }, "100"),
                        React.createElement("option", { value: "200" }, "200"),
                        React.createElement("option", { value: "500" }, "500"))),
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4" },
                    React.createElement("div", { className: "text-gray-900" },
                        React.createElement(Select_1.Select, { styleLabel: "text-white", initialData: {
                                label: 'Selecione UMF...',
                                value: ''
                            }, selectedValue: selectedUmf, defaultOptions: getUmfsDefaultOptions(), options: loadUmfs, label: "UMF:", callback: function (e) { selectUmf(e); } })),
                    React.createElement("div", null,
                        React.createElement(Select_1.Select, { styleLabel: "text-white", initialData: {
                                label: 'Selecione UPA...',
                                value: ''
                            }, selectedValue: selectedUpa, defaultOptions: getUpasDefaultOptions(), options: loadUpas, label: "UPA:", callback: function (e) { selectUpa(e); } })),
                    React.createElement("div", null,
                        React.createElement(Select_1.Select, { styleLabel: "text-white", initialData: {
                                label: 'Selecione UT...',
                                value: ''
                            }, selectedValue: selectedUt, defaultOptions: getUtsDefaultOptions(), options: loadUts, label: "UT:", callback: selectUt }))),
                React.createElement("div", { className: "w-full px-4 pt-4 lg:pt-0" },
                    React.createElement("label", { htmlFor: "procurar_ut", className: "text-white" }, "Pesquisar \u00C1rvore:"),
                    React.createElement(input_1.Input, { label: "Pesquisar UT", id: "search", name: "search", value: searchInput, onChange: handleSearch, className: 'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50' }))),
            React.createElement(ListArvore_1["default"], { currentArvores: filteredArvores, sortArvores: sortArvores, sorted: sorted, loadArvores: loadArvores }),
            React.createElement(Pagination_1.Pagination, { perPage: itemsPerPage, totalItems: totalItems, orderBy: orderBy, order: order, currentPage: currentPage, onPageChanged: onPageChanged, pageNeighbours: 5 }))));
};
exports["default"] = Index;
