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
var Select_1 = require("@/components/Select");
var ListArvore_1 = require("@/components/arvore/ListArvore");
var classnames_1 = require("classnames");
var AuthContext_1 = require("@/context/AuthContext");
var react_1 = require("react");
var alert_1 = require("@/services/alert");
var Exploracao = function (_a) {
    var ut = _a.ut, loadUts = _a.loadUts;
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var _b = react_1.useState(), data = _b[0], setData = _b[1];
    var _c = react_1.useState(), totais = _c[0], setTotais = _c[1];
    var _d = react_1.useState([]), especies = _d[0], setEspecies = _d[1];
    var _e = react_1.useState([]), inventario = _e[0], setInventario = _e[1];
    var _f = react_1.useState(inventario), filteredArvores = _f[0], setFilteredArvores = _f[1];
    var _g = react_1.useState({ label: 'Todos', value: 'todos' }), selectedEspecie = _g[0], setSelectedEspecie = _g[1];
    var _h = react_1.useState(false), sorted = _h[0], setSorted = _h[1];
    var _j = react_1.useState(Number(0)), fuste = _j[0], setFuste = _j[1];
    var _k = react_1.useState([]), checkedArvores = _k[0], setCheckedArvores = _k[1];
    var _l = react_1.useState(), volumePreservado = _l[0], setVolumePreservado = _l[1];
    var sortArvores = function (sortBy) {
        var sortedBy = sortBy.split(".");
        var nElements = sortedBy.length;
        var sortedArvores = [];
        var tiposNumericos = ['numero_arvore', 'dap', 'cap', 'fuste', 'area_basal'];
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
    var ajustarInventario = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, error, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.post('/poa/inventario', {
                        arvores: checkedArvores
                    })];
                case 1:
                    data = (_a.sent()).data;
                    error = data.error, message = data.message;
                    if (!error) {
                        loadInventario();
                        loadUts();
                        loadData();
                        alert_1["default"].success(message);
                    }
                    else {
                        alert_1["default"].error(message);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var loadData = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, _a, error, data, esp, totEspecies, totVolCorte, totVolCorteHa;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, client.get("/poa/get-volume-ut?ut=" + (ut === null || ut === void 0 ? void 0 : ut.id_ut))];
                case 1:
                    result = _b.sent();
                    _a = result === null || result === void 0 ? void 0 : result.data, error = _a.error, data = _a.data;
                    setData(data);
                    esp = data.map(function (e) {
                        return {
                            id_especie: e.id_especie,
                            nome: e.especie
                        };
                    });
                    setEspecies(esp);
                    totEspecies = data.reduce(function (acc, curr) { return acc + curr.total_especie; }, 0);
                    totVolCorte = data.reduce(function (acc, curr) { return acc + curr.volume_corte; }, 0);
                    totVolCorteHa = data.reduce(function (acc, curr) { return acc + curr.volume_corte_ha; }, 0);
                    console.log(totVolCorteHa);
                    setTotais({
                        total_individuos: totEspecies,
                        total_corte: totVolCorte,
                        total_corte_ha: totVolCorteHa
                    });
                    return [2 /*return*/];
            }
        });
    }); }, [client, ut]);
    var loadEspecies = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            data = especies.filter(function (e) { return e.nome.includes(inputValue); });
            callback(data === null || data === void 0 ? void 0 : data.map(function (especie) { return ({
                value: especie.id_especie,
                label: especie.nome
            }); }));
            return [2 /*return*/];
        });
    }); };
    function getEspeciesDefaultOptions() {
        var data = especies === null || especies === void 0 ? void 0 : especies.map(function (especie, idx) {
            return {
                label: especie.nome,
                value: especie.id_especie
            };
        });
        return [{ label: 'Todos', value: 'todos' }].concat(data);
    }
    var loadInventario = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, error, inventario, total, filteredData;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, client.get("/poa/get-arvore-especie?order=asc&orderBy=numero_arvore&ut=" + (ut === null || ut === void 0 ? void 0 : ut.id_ut))];
                case 1:
                    res = _d.sent();
                    error = res.error, inventario = res.data, total = res.total;
                    setInventario(inventario.data);
                    filteredData = (selectedEspecie === null || selectedEspecie === void 0 ? void 0 : selectedEspecie.value) ? (selectedEspecie === null || selectedEspecie === void 0 ? void 0 : selectedEspecie.value) !== 'todos'
                        ? fuste === 0
                            ? (_a = inventario.data) === null || _a === void 0 ? void 0 : _a.filter(function (arvore) { return (arvore === null || arvore === void 0 ? void 0 : arvore.id_especie) === (selectedEspecie === null || selectedEspecie === void 0 ? void 0 : selectedEspecie.value); }) : (_b = inventario.data) === null || _b === void 0 ? void 0 : _b.filter(function (arvore) { return (arvore === null || arvore === void 0 ? void 0 : arvore.id_especie) === (selectedEspecie === null || selectedEspecie === void 0 ? void 0 : selectedEspecie.value) && (arvore === null || arvore === void 0 ? void 0 : arvore.fuste) === fuste; })
                        : fuste === 0
                            ? inventario.data
                            : (_c = inventario.data) === null || _c === void 0 ? void 0 : _c.filter(function (arvore) { return (arvore === null || arvore === void 0 ? void 0 : arvore.fuste) === fuste; })
                        : inventario.data;
                    setFilteredArvores(filteredData ? filteredData : inventario.data);
                    return [2 /*return*/];
            }
        });
    }); }, [client, ut, setInventario, setFilteredArvores, selectedEspecie, fuste]);
    react_1.useEffect(function () {
        loadData();
        loadInventario();
    }, [loadInventario, loadData]);
    var handleSearch = function (especie) {
        var filteredData = especie.value !== 'todos' ? inventario.filter(function (arvore) {
            return fuste === 0 ? (arvore === null || arvore === void 0 ? void 0 : arvore.id_especie) === especie.value : (arvore === null || arvore === void 0 ? void 0 : arvore.id_especie) === especie.value && (arvore === null || arvore === void 0 ? void 0 : arvore.fuste) === fuste;
        }) : fuste === 0 ? inventario : inventario.filter(function (arvore) { return (arvore === null || arvore === void 0 ? void 0 : arvore.fuste) === fuste; });
        setFilteredArvores(filteredData);
    };
    var selectEspecie = function (especie) {
        setSelectedEspecie(especie);
        handleSearch(especie);
    };
    var callBack = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var selecionados, volumeSomado;
        return __generator(this, function (_a) {
            selecionados = filteredArvores.filter(function (arv) { return data.includes(arv === null || arv === void 0 ? void 0 : arv.id); });
            volumeSomado = selecionados.reduce(function (acc, curr) { return acc + Number(curr.volume); }, 0);
            setVolumePreservado({
                total: Number(totais.total_corte - volumeSomado),
                area_util: Number(totais.total_corte - volumeSomado) / (ut === null || ut === void 0 ? void 0 : ut.area_util)
            });
            setCheckedArvores(data);
            return [2 /*return*/];
        });
    }); };
    var filterByFuste = function (e) {
        setFuste(Number(e.target.value));
        var filteredData = selectedEspecie && (selectedEspecie === null || selectedEspecie === void 0 ? void 0 : selectedEspecie.value) !== 'todos'
            ? e.target.value === '0'
                ? inventario.filter(function (arvore) { return (arvore === null || arvore === void 0 ? void 0 : arvore.id_especie) === (selectedEspecie === null || selectedEspecie === void 0 ? void 0 : selectedEspecie.value); })
                : inventario.filter(function (arvore) { return (arvore === null || arvore === void 0 ? void 0 : arvore.id_especie) === (selectedEspecie === null || selectedEspecie === void 0 ? void 0 : selectedEspecie.value) && (arvore === null || arvore === void 0 ? void 0 : arvore.fuste) === Number(e.target.value); })
            : e.target.value === '0'
                ? inventario
                : inventario.filter(function (arvore) { return (arvore === null || arvore === void 0 ? void 0 : arvore.fuste) === Number(e.target.value); });
        setFilteredArvores(filteredData);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "border border-gray-300 p-4 rounded-md col-span-6 relative w-full mt-6" },
            react_1["default"].createElement("span", { className: "text-gray-700 absolute -top-3 bg-white px-2 text-sm" }, "Resumo"),
            react_1["default"].createElement("div", { className: 'flex flex-col md:flex-row space-x-2' },
                react_1["default"].createElement("div", { className: 'w-full h-64 overflow-y-auto' },
                    react_1["default"].createElement("table", { className: "min-w-full divide-y divide-gray-200 w-full" },
                        react_1["default"].createElement("thead", { className: "bg-gray-50 w-full sticky top-0" },
                            react_1["default"].createElement("tr", null,
                                react_1["default"].createElement("th", { scope: "col", className: "justify-between items-center px-2 py-2 text-left text-xs font-medium text-gray-500" },
                                    react_1["default"].createElement("div", { className: "flex flex-row justify-between" }, "Indiv\u00EDduos")),
                                react_1["default"].createElement("th", { scope: "col", className: "justify-between px-2 py-2 text-left text-xs font-medium text-gray-500" },
                                    react_1["default"].createElement("div", { className: "flex flex-row justify-between" }, "Total - Corte")),
                                react_1["default"].createElement("th", { scope: "col", className: "px-3 py-3 text-left text-xs font-medium text-gray-500" },
                                    react_1["default"].createElement("div", { className: "flex flex-row justify-between" }, "Volume - Corte")),
                                react_1["default"].createElement("th", { scope: "col", className: "py-3 text-left text-xs font-medium text-gray-500" },
                                    react_1["default"].createElement("div", { className: "flex flex-row" },
                                        "Volume - Corte (m",
                                        react_1["default"].createElement("sup", null, "3"),
                                        "/ha)")))),
                        react_1["default"].createElement("tbody", { className: "bg-white divide-y divide-gray-300 w-full h-48 overflow-y-auto", style: { height: '50vh' } }, data === null || data === void 0 ? void 0 : data.map(function (especie) { return (react_1["default"].createElement("tr", { key: especie.id_especie },
                            react_1["default"].createElement("td", { className: "px-3 whitespace-nowrap" },
                                react_1["default"].createElement("div", { className: "text-sm" }, especie === null || especie === void 0 ? void 0 : especie.especie)),
                            react_1["default"].createElement("td", { className: "px-3 whitespace-nowrap" },
                                react_1["default"].createElement("span", { className: "text-sm" },
                                    react_1["default"].createElement("div", { className: "text-sm" }, especie === null || especie === void 0 ? void 0 : especie.total_especie))),
                            react_1["default"].createElement("td", { className: "px-3 whitespace-nowrap" },
                                react_1["default"].createElement("span", { className: "text-sm" },
                                    react_1["default"].createElement("div", { className: "text-sm" }, especie === null || especie === void 0 ? void 0 : especie.volume_corte.toFixed(4)))),
                            react_1["default"].createElement("td", { className: "px-3 whitespace-nowrap" },
                                react_1["default"].createElement("span", { className: "text-sm" },
                                    react_1["default"].createElement("div", { className: "text-sm" }, especie === null || especie === void 0 ? void 0 : especie.volume_corte_ha.toFixed(4)))))); })),
                        react_1["default"].createElement("tfoot", { className: 'sticky bottom-0 bg-gray-200' },
                            react_1["default"].createElement("tr", { className: 'px-2' },
                                react_1["default"].createElement("td", { scope: "col", className: "justify-between items-center text-left text-xs font-medium text-gray-500" },
                                    react_1["default"].createElement("span", { className: "text-sm" },
                                        react_1["default"].createElement("div", { className: "text-sm" }, "Total: "))),
                                react_1["default"].createElement("td", { className: "px-3 whitespace-nowrap px-4" },
                                    react_1["default"].createElement("span", { className: "text-sm" },
                                        react_1["default"].createElement("div", { className: "text-sm" }, totais === null || totais === void 0 ? void 0 : totais.total_individuos))),
                                react_1["default"].createElement("td", { className: "px-3 whitespace-nowrap" },
                                    react_1["default"].createElement("span", { className: "text-sm" },
                                        react_1["default"].createElement("div", { className: "text-sm" }, totais === null || totais === void 0 ? void 0 : totais.total_corte.toFixed(4)))),
                                react_1["default"].createElement("td", { className: "px-3 whitespace-nowrap" },
                                    react_1["default"].createElement("span", { className: "text-sm" },
                                        react_1["default"].createElement("div", { className: "text-sm" }, totais === null || totais === void 0 ? void 0 : totais.total_corte_ha.toFixed(4)))))))))),
        react_1["default"].createElement("div", { className: "border border-gray-300 p-4 rounded-md col-span-6 relative w-full mt-6" },
            react_1["default"].createElement("span", { className: "text-gray-700 absolute -top-3 bg-white px-2 text-sm" }, "Ajuste da UT"),
            react_1["default"].createElement("div", { className: 'flex flex-col lg:flex-row' },
                react_1["default"].createElement("div", { className: "lg:flex lg:flex-wrap lg:w-4/5 px-4" },
                    react_1["default"].createElement("span", { className: "w-3/12 flex items-center" }, "Esp\u00E9cie: "),
                    react_1["default"].createElement("div", { className: "lg:w-3/4" },
                        react_1["default"].createElement(Select_1.Select, { placeholder: 'Selecione uma Esp\u00E9cie', selectedValue: selectedEspecie, defaultOptions: getEspeciesDefaultOptions(), options: loadEspecies, callback: selectEspecie, initialData: {
                                label: 'Entre com as iniciais da Espécie ...', value: ''
                            } }))),
                react_1["default"].createElement("div", { className: "flex flex-col lg:flex-row px-4 w-auto lg:items-center lg:space-x-4" },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { htmlFor: "perPage", className: "px-1 text-sm" }, "Fuste")),
                    react_1["default"].createElement("select", { value: fuste, onChange: filterByFuste, id: "fuste", className: "w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" },
                        react_1["default"].createElement("option", { value: "0" }, "Todos"),
                        react_1["default"].createElement("option", { value: "1" }, "1"),
                        react_1["default"].createElement("option", { value: "2" }, "2"),
                        react_1["default"].createElement("option", { value: "3" }, "3"))),
                react_1["default"].createElement("div", { className: 'flex flex-row w-full items-center justify-center' },
                    react_1["default"].createElement("button", { disabled: checkedArvores.length === 0, onClick: ajustarInventario, className: classnames_1["default"]("px-6 py-2 bg-green-700 hover:bg-green-800 hover:cursor-pointer text-white items-center text-center", checkedArvores.length === 0 && "hover:cursor-not-allowed opacity-50") }, "Executar Opera\u00E7\u00E3o"))),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(ListArvore_1["default"], { currentArvores: filteredArvores, sortArvores: sortArvores, sorted: sorted, planejar: true, callBack: callBack }))),
        volumePreservado && (react_1["default"].createElement("div", { className: 'mt-2' },
            react_1["default"].createElement("div", { className: 'flex flex-col w-full items-center justify-center' },
                react_1["default"].createElement("span", { className: 'font-medium' },
                    "Volume Total: ", volumePreservado === null || volumePreservado === void 0 ? void 0 :
                    volumePreservado.total.toFixed(4)),
                react_1["default"].createElement("span", { className: 'font-medium' },
                    "Volume / ha: ", volumePreservado === null || volumePreservado === void 0 ? void 0 :
                    volumePreservado.area_util.toFixed(4)))))));
};
exports["default"] = Exploracao;
