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
exports.ListSelectData = void 0;
var react_1 = require("react");
var AuthContext_1 = require("../../contexts/AuthContext");
var ModalContext_1 = require("contexts/ModalContext");
var LoadingContext_1 = require("contexts/LoadingContext");
var hooks_1 = require("store/hooks");
var ProjetoContext_1 = require("contexts/ProjetoContext");
var umfSlice_1 = require("../../store/umfSlice");
var upaSlice_1 = require("../../store/upaSlice");
var utSlice_1 = require("../../store/utSlice");
exports.ListSelectData = function (_a) {
    var currentArvores = _a.currentArvores, onPageChanged = _a.onPageChanged, orderBy = _a.orderBy, order = _a.order, changeItemsPerPage = _a.changeItemsPerPage, currentPage = _a.currentPage, perPage = _a.perPage, loadArvores = _a.loadArvores;
    var _b = react_1.useState(currentArvores), filteredArvores = _b[0], setFilteredArvores = _b[1];
    var _c = react_1.useState(), selectedArvore = _c[0], setSelectedArvore = _c[1];
    var _d = react_1.useState(""), searchInput = _d[0], setSearchInput = _d[1];
    var _e = react_1.useState(false), uploading = _e[0], setUploading = _e[1];
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var fileRef = react_1.useRef(null);
    var _f = react_1.useState(false), sorted = _f[0], setSorted = _f[1];
    var _g = react_1.useState([]), checkedArvores = _g[0], setCheckedArvores = _g[1];
    var _h = ModalContext_1.useModalContext(), showModal = _h.showModal, hideModal = _h.hideModal, store = _h.store;
    var visible = store.visible;
    var setLoading = react_1.useContext(LoadingContext_1.LoadingContext).setLoading;
    var _j = react_1.useState(), umfs = _j[0], setUmfs = _j[1];
    var _k = react_1.useState(), upas = _k[0], setUpas = _k[1];
    var _l = react_1.useState(), uts = _l[0], setUts = _l[1];
    var umf = hooks_1.useAppSelector(function (state) { return state.umf; });
    var upa = hooks_1.useAppSelector(function (state) { return state.upa; });
    var ut = hooks_1.useAppSelector(function (state) { return state.ut; });
    var _m = react_1.useState(), selectedUmf = _m[0], setSelectedUmf = _m[1];
    var _o = react_1.useState(), selectedUpa = _o[0], setSelectedUpa = _o[1];
    var _p = react_1.useState(), selectedUt = _p[0], setSelectedUt = _p[1];
    var projeto = react_1.useContext(ProjetoContext_1.ProjetoContext).projeto;
    var dispatch = hooks_1.useAppDispatch();
    var styleDelBtn = 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
    var arvoreById = react_1.useCallback(function (id) {
        return currentArvores.find(function (arvore) { return arvore.id === id; });
    }, [currentArvores]);
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
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
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
                    response = _b.sent();
                    uts = response.data.uts;
                    dispatch(utSlice_1.setUt({
                        id: (_a = uts[0]) === null || _a === void 0 ? void 0 : _a.id,
                        numero_ut: uts[0].numero_ut
                    }));
                    setUts(uts);
                    return [2 /*return*/];
            }
        });
    }); };
};
