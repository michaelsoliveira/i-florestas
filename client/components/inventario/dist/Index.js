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
var Link_1 = require("../Link");
var input_1 = require("../atoms/input");
var solid_1 = require("@heroicons/react/solid");
var alert_1 = require("../../services/alert");
var AuthContext_1 = require("../../contexts/AuthContext");
var ModalContext_1 = require("contexts/ModalContext");
var LoadingContext_1 = require("contexts/LoadingContext");
var create_csv_1 = require("services/create-csv");
var hooks_1 = require("store/hooks");
var Select_1 = require("../Select");
var ProjetoContext_1 = require("contexts/ProjetoContext");
var umfSlice_1 = require("../../store/umfSlice");
var upaSlice_1 = require("../../store/upaSlice");
var ProgressBar_1 = require("../Utils/ProgressBar");
var Index = function (_a) {
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
    var umf = hooks_1.useAppSelector(function (state) { return state.umf; });
    var upa = hooks_1.useAppSelector(function (state) { return state.upa; });
    var ut = hooks_1.useAppSelector(function (state) { return state.ut; });
    var _l = react_1.useState(), selectedUmf = _l[0], setSelectedUmf = _l[1];
    var _m = react_1.useState(), selectedUpa = _m[0], setSelectedUpa = _m[1];
    var _o = react_1.useState(), selectedUt = _o[0], setSelectedUt = _o[1];
    var projeto = react_1.useContext(ProjetoContext_1.ProjetoContext).projeto;
    var _p = react_1.useState(), inventario = _p[0], setInventario = _p[1];
    var _q = react_1.useState(0), completedLoad = _q[0], setCompletedLoad = _q[1];
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
        var upaSelected;
        return __generator(this, function (_a) {
            upaSelected = upas.find(function (u) { return u.id === upa.value; });
            dispatch(upaSlice_1.setUpa({
                id: upaSelected.id,
                descricao: upaSelected.descricao,
                tipo: Number.parseInt(upaSelected.tipo)
            }));
            setSelectedUpa(upa);
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
    var deleteArvore = react_1.useCallback(function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                client["delete"]("/arvore/single/" + id)
                    .then(function (response) {
                    var _a = response.data, error = _a.error, message = _a.message;
                    if (!error) {
                        alert_1["default"].success(message);
                        loadArvores();
                        hideModal();
                    }
                });
            }
            catch (error) {
                console.log(error);
            }
            return [2 /*return*/];
        });
    }); }, [client, hideModal, loadArvores]);
    var deleteSingleModal = react_1.useCallback(function (id) {
        var arvore = arvoreById(id);
        showModal({ title: 'Deletar Árvore', onConfirm: function () { deleteArvore(id); }, styleButton: styleDelBtn, iconType: 'warn', confirmBtn: 'Deletar', content: "Tem certeza que deseja excluir a \u00C1rvore de n\u00FAmero " + (arvore === null || arvore === void 0 ? void 0 : arvore.numero_arvore) + "?" });
    }, [arvoreById, showModal, deleteArvore]);
    var deleteMultModal = function () { return showModal({ title: 'Deletar Árvores', onConfirm: deleteArvores, styleButton: styleDelBtn, iconType: 'warn', confirmBtn: 'Deletar', content: 'Tem certeza que deseja excluir Todas as Árvores Selecionadas?' }); };
    react_1.useEffect(function () {
        defaultUmfsOptions();
        defaultUpasOptions();
        // setFilteredArvores(currentArvores)
    }, [currentArvores, currentPage, defaultUmfsOptions, defaultUpasOptions]);
    var deleteArvores = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client["delete"]('/arvore/multiples', { data: { ids: checkedArvores } })
                            .then(function () {
                            setCheckedArvores([]);
                            alert_1["default"].success('As espécies foram deletadas com SUCESSO!!!');
                            loadArvores();
                            hideModal();
                        })];
                case 2:
                    _a.sent();
                    setLoading(false);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleImportTemplate = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            data = upa.tipo === 0 ? [
                { ut: 1, numero_arvore: 1, especie: 'Abiu', dap: 10, altura: 20.0, qf: 1, ponto_gps: 1, latitude: 2.565, longitude: 0.56, obs: '', comentario: '' },
                { ut: 1, numero_arvore: 2, especie: 'Abiu', dap: 15, altura: 17.3, qf: 1, ponto_gps: 2, latitude: 7.544, longitude: 1.24, obs: '', comentario: '' },
                { ut: 1, numero_arvore: 3, especie: 'Especie Teste', dap: 13.5, altura: 15.4, qf: 1, ponto_gps: 3, latitude: 14.224, longitude: 4.67, obs: '', comentario: '' },
            ] : [
                { ut: 1, faixa: 1, numero_arvore: 1, especie: 'Abiu', dap: 10, altura: 20.0, qf: 1, orient_x: 'D', coord_x: 7.5, coord_y: 10, obs: '', comentario: '' },
                { ut: 1, faixa: 1, numero_arvore: 2, especie: 'Abiu', dap: 15, altura: 17.3, qf: 1, orient_x: 'D', coord_x: 12.5, coord_y: 10, obs: '', comentario: '' },
                { ut: 1, faixa: 1, numero_arvore: 3, especie: 'Especie Teste', dap: 13.5, altura: 15.4, qf: 1, orient_x: 'D', coord_x: 22.4, coord_y: 10, obs: '', comentario: '' },
            ];
            create_csv_1.CsvDataService.exportToCsv(upa.tipo === 0 ? 'template_inventario_gps' : 'template_inventario_xy', data);
            return [2 /*return*/];
        });
    }); };
    var handleImportInventario = function () { return __awaiter(void 0, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    setLoading(true);
                    if (!(filteredArvores.length === 0)) return [3 /*break*/, 1];
                    alert_1["default"].error('Por favor, carregue primeiramente a planilha!');
                    setLoading(false);
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, client.post("/arvore/import-inventario?upaId=" + (upa === null || upa === void 0 ? void 0 : upa.id), filteredArvores)
                        .then(function (response) {
                        var _a = response.data, error = _a.error, message = _a.message;
                        if (!error) {
                            alert_1["default"].success(message);
                        }
                        else {
                            alert_1["default"].error(message);
                        }
                        setLoading(false);
                    })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleLoadInventario = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var formData, e_2;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    window.removeEventListener('focus', handleFocusBack);
                    if (!((_a = e.target) === null || _a === void 0 ? void 0 : _a.value.length)) return [3 /*break*/, 2];
                    formData = new FormData();
                    formData.append('file', (_b = e.target) === null || _b === void 0 ? void 0 : _b.files[0]);
                    setLoading(true);
                    setCompletedLoad(20);
                    return [4 /*yield*/, client.post("/arvore/load-csv?upaId=" + (upa === null || upa === void 0 ? void 0 : upa.id), formData)
                            .then(function (response) {
                            var _a = response.data, error = _a.error, message = _a.message, arvores = _a.arvores;
                            if (!error) {
                                alert_1["default"].success(message);
                                setFilteredArvores(arvores.slice(1));
                                setLoading(false);
                                setCompletedLoad(100);
                            }
                            else {
                                setLoading(false);
                                setCompletedLoad(0);
                                console.log(message);
                            }
                        })["catch"](function () {
                            setCompletedLoad(0);
                            setLoading(false);
                        })];
                case 1:
                    _c.sent();
                    _c.label = 2;
                case 2: return [3 /*break*/, 4];
                case 3:
                    e_2 = _c.sent();
                    setLoading(false);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleFocusBack = function () {
        setUploading(false);
        window.removeEventListener('focus', handleFocusBack);
    };
    var openFile = function () {
        var _a;
        (_a = fileRef.current) === null || _a === void 0 ? void 0 : _a.click();
        setUploading(true);
        window.addEventListener('focus', handleFocusBack);
    };
    var handleSearch = function (evt) { return __awaiter(void 0, void 0, void 0, function () {
        var paginatedData;
        return __generator(this, function (_a) {
            paginatedData = {
                currentPage: 1,
                perPage: perPage,
                orderBy: orderBy,
                order: order,
                search: evt.target.value
            };
            setSearchInput(evt.target.value);
            onPageChanged(paginatedData);
            return [2 /*return*/];
        });
    }); };
    var sortArvores = function (sortBy) {
        var sortedBy = sortBy.split(".");
        var nElements = sortedBy.length;
        var sortedArvores = [];
        sortedArvores = filteredArvores.sort(function (a, b) {
            return sorted
                ? nElements > 1
                    ? a[sortedBy[0]][sortedBy[1]].toLowerCase().localeCompare(b[sortedBy[0]][sortedBy[1]].toLowerCase())
                    : a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase())
                : nElements > 1
                    ? b[sortedBy[0]][sortedBy[1]].toLowerCase().localeCompare(a[sortedBy[0]][sortedBy[1]].toLowerCase())
                    : b[sortBy].toLowerCase().localeCompare(a[sortBy].toLowerCase());
        });
        setSorted(!sorted);
        setFilteredArvores(sortedArvores);
    };
    var handleSelectArvore = function (evt) {
        var arvoreId = evt.target.value;
        if (!checkedArvores.includes(arvoreId)) {
            setCheckedArvores(__spreadArrays(checkedArvores, [arvoreId]));
        }
        else {
            setCheckedArvores(checkedArvores.filter(function (checkedArvoreId) {
                return checkedArvoreId !== arvoreId;
            }));
        }
    };
    var handleSelectAllArvore = function () {
        if (checkedArvores.length < currentArvores.length) {
            setCheckedArvores(currentArvores.map(function (_a) {
                var id = _a.id;
                return id;
            }));
        }
        else {
            setCheckedArvores([]);
        }
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: "flex flex-row items-center justify-between p-6 bg-gray-100" },
            React.createElement("h1", { className: "font-medium text-2xl font-roboto" }, "\u00C1rvores"),
            React.createElement("div", { className: "flex flex-row" },
                React.createElement("a", { onClick: openFile, className: "bg-indigo hover:bg-indigo-dark text-green-700 font-bold py-2 px-4 w-full inline-flex items-center hover:cursor-pointer" },
                    React.createElement("svg", { className: "fill-green-700 w-6 h-6", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                        React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" }),
                        React.createElement("path", { d: "M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" })),
                    React.createElement("span", { className: "ml-2" }, uploading ? "Abrindo..." : "Abrir Planilha")),
                React.createElement("input", { disabled: uploading, onChange: handleLoadInventario, ref: fileRef, type: "file", className: "cursor-pointer absolute block opacity-0 pin-r pin-t", name: "fileRef" })),
            React.createElement("div", null,
                React.createElement("a", { onClick: handleImportTemplate, className: "bg-indigo hover:bg-indigo-dark text-green-700 font-bold py-2 px-4 w-full inline-flex items-center hover:cursor-pointer" },
                    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", className: "w-6 h-6" },
                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" })),
                    React.createElement("span", { className: "ml-2" }, "Modelo"))),
            React.createElement("a", { onClick: handleImportInventario, className: "px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer" }, "Importar")),
        React.createElement("div", { className: "flex flex-col p-6" },
            React.createElement("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-gray-100 rounded-lg" },
                React.createElement("div", { className: "flex flex-col px-4 w-auto" },
                    React.createElement("div", { className: "w-full" },
                        React.createElement("label", { htmlFor: "perPage", className: "px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400" }, "por P\u00E1gina")),
                    React.createElement("select", { value: perPage, onChange: function (evt) { return changeItemsPerPage(evt.target.value); }, id: "perPage", className: "w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" },
                        React.createElement("option", { value: "10" }, "10"),
                        React.createElement("option", { value: "20" }, "20"),
                        React.createElement("option", { value: "50" }, "50"),
                        React.createElement("option", { value: "100" }, "100"))),
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4" },
                    React.createElement("div", null,
                        React.createElement(Select_1.Select, { initialData: {
                                label: 'Selecione UMF...',
                                value: ''
                            }, selectedValue: selectedUmf, defaultOptions: getUmfsDefaultOptions(), options: loadUmfs, label: "UMF:", callback: selectUmf })),
                    React.createElement("div", null,
                        React.createElement(Select_1.Select, { initialData: {
                                label: 'Selecione UPA...',
                                value: ''
                            }, selectedValue: selectedUpa, defaultOptions: getUpasDefaultOptions(), options: loadUpas, label: "UPA:", callback: function (e) { selectUpa(e); } }))),
                React.createElement("div", { className: "w-full px-4" },
                    React.createElement("label", { htmlFor: "procurar_ut" }, "Pesquisar UT:"),
                    React.createElement(input_1.Input, { label: "Pesquisar UT", id: "search", name: "search", onChange: function (e) { return handleSearch(e.target.value); }, className: 'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50' }))),
            React.createElement(ProgressBar_1["default"], { completed: completedLoad }),
            React.createElement("div", { className: "flex flex-row items-center justify-between overflow-x-auto mt-2" },
                React.createElement("div", { className: "shadow overflow-y-auto border-b border-gray-200 w-full sm:rounded-lg" },
                    (checkedArvores === null || checkedArvores === void 0 ? void 0 : checkedArvores.length) > 0 && (React.createElement("div", { className: "py-4" },
                        React.createElement("button", { className: "px-4 py-2 bg-red-600 text-white rounded-md", onClick: deleteMultModal }, "Deletar"))),
                    React.createElement("table", { className: "min-w-full divide-y divide-gray-200" },
                        React.createElement("thead", { className: "bg-gray-50" },
                            React.createElement("tr", null,
                                React.createElement("th", null,
                                    React.createElement("div", { className: "flex justify-center" },
                                        React.createElement("input", { checked: (checkedArvores === null || checkedArvores === void 0 ? void 0 : checkedArvores.length) === (currentArvores === null || currentArvores === void 0 ? void 0 : currentArvores.length), onChange: handleSelectAllArvore, className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer", type: "checkbox", value: "", id: "flexCheckDefault" }))),
                                React.createElement("th", { scope: "col", className: "px-3 py-3 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer", onClick: function () { return sortArvores('ut'); } },
                                    React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                        "UT",
                                        sorted
                                            ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                            : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                                React.createElement("th", { scope: "col", className: "px-3 py-3 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer", onClick: function () { return sortArvores('numero_arvore'); } },
                                    React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                        "N\u00FAmero",
                                        sorted
                                            ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                            : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                                (upa.tipo === 1) ? (React.createElement(React.Fragment, null,
                                    React.createElement("th", { scope: "col", className: "justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer", onClick: function () { return sortArvores('faixa'); } },
                                        React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                            "Faixa",
                                            sorted
                                                ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                                : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                                    React.createElement("th", { scope: "col", className: "justify-between items-center px-2 py-2 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer", onClick: function () { return sortArvores('orient_x'); } },
                                        React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                            "Orienta\u00E7\u00E3o X",
                                            sorted
                                                ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                                : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                                    React.createElement("th", { scope: "col", className: "justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer", onClick: function () { return sortArvores('coord_x'); } },
                                        React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                            "Coord. X",
                                            sorted
                                                ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                                : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                                    React.createElement("th", { scope: "col", className: "justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer", onClick: function () { return sortArvores('coord_y'); } },
                                        React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                            "Coord. Y",
                                            sorted
                                                ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                                : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))))) : (React.createElement(React.Fragment, null,
                                    React.createElement("th", { scope: "col", className: "justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer", onClick: function () { return sortArvores('lat_x'); } },
                                        React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                            "Latitude",
                                            sorted
                                                ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                                : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                                    React.createElement("th", { scope: "col", className: "justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer", onClick: function () { return sortArvores('long_y'); } },
                                        React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                            "Longitude",
                                            sorted
                                                ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                                : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))))),
                                React.createElement("th", { scope: "col", className: "justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer", onClick: function () { return sortArvores('especie'); } },
                                    React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                        "Esp\u00E9cie",
                                        sorted
                                            ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                            : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                                React.createElement("th", { scope: "col", className: "justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer", onClick: function () { return sortArvores('dap'); } },
                                    React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                        "DAP",
                                        sorted
                                            ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                            : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                                React.createElement("th", { scope: "col", className: "justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer", onClick: function () { return sortArvores('altura'); } },
                                    React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                        "Altura",
                                        sorted
                                            ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                            : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                                React.createElement("th", { scope: "col", className: "relative w-1/8 px-6 py-3" },
                                    React.createElement("span", { className: "sr-only" }, "Edit")))),
                        React.createElement("tbody", { className: "bg-white divide-y divide-gray-200" }, filteredArvores === null || filteredArvores === void 0 ? void 0 : filteredArvores.map(function (arvore, key) { return (React.createElement("tr", { key: key },
                            React.createElement("td", { className: "flex justify-center" },
                                React.createElement("input", { value: arvore === null || arvore === void 0 ? void 0 : arvore.ut, checked: checkedArvores.includes(arvore === null || arvore === void 0 ? void 0 : arvore.id), onChange: handleSelectArvore, id: "arvoreId", type: "checkbox", className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" })),
                            React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                React.createElement("div", { className: "text-sm text-gray-900" }, arvore.ut)),
                            React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                React.createElement("div", { className: "text-sm text-gray-900" }, arvore.numero_arvore)),
                            (upa.tipo === 1) ? (React.createElement(React.Fragment, null,
                                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                    React.createElement("div", { className: "flex flex-col items-starter" },
                                        React.createElement("div", { className: "text-gray-900" }, arvore === null || arvore === void 0 ? void 0 : arvore.faixa))),
                                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                    React.createElement("span", { className: "text-gray-900" },
                                        React.createElement("div", { className: "text-sm text-gray-500" }, arvore.orient_x))),
                                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                    React.createElement("span", { className: "text-gray-900" },
                                        React.createElement("div", { className: "text-sm text-gray-500" }, arvore.coord_x))),
                                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                    React.createElement("span", { className: "text-gray-900" },
                                        React.createElement("div", { className: "text-sm text-gray-500" }, arvore.coord_y))))) : (React.createElement(React.Fragment, null,
                                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                    React.createElement("span", { className: "text-gray-900" },
                                        React.createElement("div", { className: "text-sm text-gray-500" }, arvore.lat_x))),
                                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                    React.createElement("span", { className: "text-gray-900" },
                                        React.createElement("div", { className: "text-sm text-gray-500" }, arvore.long_y))))),
                            React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                React.createElement("span", { className: "text-xs text-gray-900" },
                                    React.createElement("div", { className: "text-sm text-gray-500" }, arvore.especie))),
                            React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                React.createElement("span", { className: "text-gray-900" },
                                    React.createElement("div", { className: "text-sm text-gray-500" }, arvore.dap))),
                            React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                React.createElement("span", { className: "text-gray-900" },
                                    React.createElement("div", { className: "text-sm text-gray-500" }, arvore.altura))),
                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-right flex flex-row items-center" },
                                React.createElement(Link_1.Link, { href: "/arvore/update/" + arvore.id },
                                    React.createElement(solid_1.PencilAltIcon, { className: "w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" })),
                                React.createElement(Link_1.Link, { href: "#", onClick: function () { return deleteSingleModal(arvore.id); } },
                                    React.createElement(solid_1.TrashIcon, { className: "w-5 h-5 ml-4 -mr-1 text-red-600 hover:text-red-700" }))))); }))))))));
};
exports["default"] = Index;
