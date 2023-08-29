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
var solid_1 = require("@heroicons/react/solid");
var AuthContext_1 = require("@/context/AuthContext");
var react_1 = require("react");
var hooks_1 = require("@/redux/hooks");
var alert_1 = require("@/services/alert");
var ModalContext_1 = require("@/context/ModalContext");
var Link_1 = require("../Link");
var LoadingContext_1 = require("@/context/LoadingContext");
var classnames_1 = require("classnames");
var ListArvore = function (_a) {
    var currentArvores = _a.currentArvores, sortArvores = _a.sortArvores, sorted = _a.sorted, loadArvores = _a.loadArvores, callBack = _a.callBack, _b = _a.planejar, planejar = _b === void 0 ? false : _b;
    var upa = hooks_1.useAppSelector(function (state) { return state.upa; });
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var _c = ModalContext_1.useModalContext(), showModal = _c.showModal, hideModal = _c.hideModal, store = _c.store;
    var setLoading = react_1.useContext(LoadingContext_1.LoadingContext).setLoading;
    var _d = react_1.useState([]), checkedArvores = _d[0], setCheckedArvores = _d[1];
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
    var deleteMultModal = function () { return showModal({ title: 'Deletar Árvores', onConfirm: deleteArvores, styleButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500', iconType: 'warn', confirmBtn: 'Deletar', content: 'Tem certeza que deseja excluir Todas as Árvores Selecionadas?' }); };
    var handleSelectArvore = function (evt) {
        var arvoreId = evt.target.value;
        if (!checkedArvores.includes(arvoreId)) {
            planejar && callBack(__spreadArrays(checkedArvores, [arvoreId]));
            setCheckedArvores(__spreadArrays(checkedArvores, [arvoreId]));
        }
        else {
            setCheckedArvores(checkedArvores.filter(function (checkedArvoreId) {
                return checkedArvoreId !== arvoreId;
            }));
            planejar && callBack(checkedArvores.filter(function (checkedArvoreId) { return checkedArvoreId !== arvoreId; }));
        }
    };
    var handleSelectAllArvore = function () {
        if (checkedArvores.length < currentArvores.length) {
            planejar && callBack(currentArvores.map(function (_a) {
                var id = _a.id;
                return id;
            }));
            setCheckedArvores(currentArvores.map(function (_a) {
                var id = _a.id;
                return id;
            }));
        }
        else {
            planejar && callBack([]);
            setCheckedArvores([]);
        }
    };
    var deleteArvore = react_1.useCallback(function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, client["delete"]("/arvore/single/" + id)
                            .then(function (response) {
                            var _a = response.data, error = _a.error, message = _a.message;
                            if (!error) {
                                alert_1["default"].success(message);
                                loadArvores();
                                hideModal();
                            }
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, [client, hideModal, loadArvores]);
    var arvoreById = react_1.useCallback(function (id) {
        return currentArvores.find(function (arvore) { return arvore.id === id; });
    }, [currentArvores]);
    var deleteSingleModal = react_1.useCallback(function (id) {
        var arvore = arvoreById(id);
        showModal({ title: 'Deletar Árvore', onConfirm: function () { deleteArvore(id); }, styleButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500', iconType: 'warn', confirmBtn: 'Deletar', content: "Tem certeza que deseja excluir a \u00C1rvore de n\u00FAmero " + (arvore === null || arvore === void 0 ? void 0 : arvore.numero_arvore) + "?" });
    }, [arvoreById, showModal, deleteArvore]);
    return (React.createElement("div", { className: "flex flex-row items-center justify-between overflow-x-auto mt-2" },
        React.createElement("div", { className: classnames_1["default"]("shadow overflow-y-auto border-b border-gray-200 w-full sm:rounded-lg", planejar && 'h-64') },
            !planejar && (checkedArvores === null || checkedArvores === void 0 ? void 0 : checkedArvores.length) > 0 && (React.createElement("div", { className: "py-4" },
                React.createElement("button", { className: "px-4 py-2 bg-red-600 text-white rounded-md", onClick: deleteMultModal }, "Deletar"))),
            React.createElement("table", { className: "min-w-full divide-y divide-gray-200" },
                React.createElement("thead", { className: classnames_1["default"]("bg-gray-50 w-full", planejar && "sticky top-0") },
                    React.createElement("tr", null,
                        planejar ? (React.createElement(React.Fragment, null,
                            React.createElement("th", null,
                                React.createElement("div", { className: "flex justify-center" },
                                    React.createElement("input", { checked: (checkedArvores === null || checkedArvores === void 0 ? void 0 : checkedArvores.length) === (currentArvores === null || currentArvores === void 0 ? void 0 : currentArvores.length), onChange: handleSelectAllArvore, className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer", type: "checkbox", value: "", id: "flexCheckDefault" }))))) : (React.createElement(React.Fragment, null,
                            React.createElement("th", null,
                                React.createElement("div", { className: "flex justify-center" },
                                    React.createElement("input", { checked: (checkedArvores === null || checkedArvores === void 0 ? void 0 : checkedArvores.length) === (currentArvores === null || currentArvores === void 0 ? void 0 : currentArvores.length), onChange: handleSelectAllArvore, className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer", type: "checkbox", value: "", id: "flexCheckDefault" }))))),
                        React.createElement("th", { scope: "col", className: "items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer", onClick: function () { return sortArvores('ut.numero_ut'); } },
                            React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                "UT",
                                sorted
                                    ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                    : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                        React.createElement("th", { scope: "col", className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer", onClick: function () { return sortArvores('numero_arvore'); } },
                            React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                "N\u00FAmero",
                                sorted
                                    ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                    : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                        React.createElement("th", { scope: "col", className: "items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer", onClick: function () { return sortArvores('especie.nome'); } },
                            React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                "Esp\u00E9cie",
                                sorted
                                    ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                    : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                        (upa === null || upa === void 0 ? void 0 : upa.tipo) === 1 && (React.createElement(React.Fragment, null,
                            React.createElement("th", { scope: "row", className: "justify-between px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer", onClick: function () { return sortArvores('faixa'); } },
                                React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                    "Faixa",
                                    sorted
                                        ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                        : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                            React.createElement("th", { scope: "col", className: "justify-between items-center px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer", onClick: function () { return sortArvores('orient_x'); } },
                                React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                    "Orienta\u00E7\u00E3o X",
                                    sorted
                                        ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                        : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))))),
                        React.createElement("th", { scope: "col", className: "items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer", onClick: function () { return sortArvores('dap'); } },
                            React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                "CAP (cm)",
                                sorted
                                    ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                    : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                        React.createElement("th", { scope: "col", className: "items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer", onClick: function () { return sortArvores('dap'); } },
                            React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                "DAP (cm)",
                                sorted
                                    ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                    : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                        React.createElement("th", { scope: "col", className: "items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer", onClick: function () { return sortArvores('altura'); } },
                            React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                "Altura (m)",
                                sorted
                                    ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                    : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                        React.createElement("th", { scope: "col", className: "items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer", onClick: function () { return sortArvores('volume'); } },
                            React.createElement("div", { className: "flex flex-row w-full" },
                                "Volume (m",
                                React.createElement("sup", null, "3"),
                                ")",
                                sorted
                                    ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                    : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                        planejar && (React.createElement(React.Fragment, null,
                            React.createElement("th", { scope: "col", className: "items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer", onClick: function () { return sortArvores('fuste'); } },
                                React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                    "Fuste",
                                    sorted
                                        ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                        : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                            React.createElement("th", { scope: "col", className: "items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer", onClick: function () { return sortArvores('area_basal'); } },
                                React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                    "A. Basal",
                                    sorted
                                        ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                        : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))))),
                        !planejar && (React.createElement(React.Fragment, null,
                            React.createElement("th", { scope: "col", className: "items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer", onClick: function () { return sortArvores('situacao_arvore.nome'); } },
                                React.createElement("div", { className: "flex flex-row w-full justify-between" },
                                    "Situa\u00E7\u00E3o",
                                    sorted
                                        ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                        : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                            React.createElement("th", { scope: "col", className: "relative w-1/12 px-6 py-3" },
                                React.createElement("span", { className: "sr-only" }, "Edit")))))),
                React.createElement("tbody", { className: "bg-white divide-y divide-gray-200" }, currentArvores === null || currentArvores === void 0 ? void 0 : currentArvores.map(function (arvore) {
                    var _a, _b, _c;
                    return (React.createElement("tr", { key: arvore.id },
                        React.createElement("td", { className: "flex justify-center" },
                            React.createElement("input", { value: arvore === null || arvore === void 0 ? void 0 : arvore.id, checked: checkedArvores.includes(arvore === null || arvore === void 0 ? void 0 : arvore.id), onChange: handleSelectArvore, id: "arvoreId", type: "checkbox", className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" })),
                        React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                            React.createElement("div", { className: "flex flex-col items-starter" },
                                React.createElement("div", { className: "text-sm font-medium text-gray-900" }, (_a = arvore === null || arvore === void 0 ? void 0 : arvore.ut) === null || _a === void 0 ? void 0 : _a.numero_ut))),
                        React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                            React.createElement("div", { className: "flex flex-col items-starter" },
                                React.createElement("div", { className: "text-sm font-medium text-gray-900" }, arvore === null || arvore === void 0 ? void 0 : arvore.numero_arvore))),
                        React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                            React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                                React.createElement("div", { className: "text-sm text-gray-500" }, (_b = arvore === null || arvore === void 0 ? void 0 : arvore.especie) === null || _b === void 0 ? void 0 : _b.nome))),
                        ((upa === null || upa === void 0 ? void 0 : upa.tipo) === 1) && (React.createElement(React.Fragment, null,
                            React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                React.createElement("div", { className: "text-sm text-gray-900" }, arvore === null || arvore === void 0 ? void 0 : arvore.faixa)),
                            React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                                    React.createElement("div", { className: "text-sm text-gray-500" }, arvore === null || arvore === void 0 ? void 0 : arvore.orient_x))))),
                        React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                            React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                                React.createElement("div", { className: "text-sm text-gray-500" }, ((arvore === null || arvore === void 0 ? void 0 : arvore.dap) * Math.PI).toFixed(2)))),
                        React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                            React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                                React.createElement("div", { className: "text-sm text-gray-500" }, arvore === null || arvore === void 0 ? void 0 : arvore.dap))),
                        React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                            React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                                React.createElement("div", { className: "text-sm text-gray-500" }, arvore === null || arvore === void 0 ? void 0 : arvore.altura))),
                        React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                            React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                                React.createElement("div", { className: "text-sm text-gray-500" }, arvore === null || arvore === void 0 ? void 0 : arvore.volume))),
                        planejar && (React.createElement(React.Fragment, null,
                            React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                                    React.createElement("div", { className: "text-sm text-gray-500" }, arvore === null || arvore === void 0 ? void 0 : arvore.fuste))),
                            React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                                    React.createElement("div", { className: "text-sm text-gray-500" }, arvore === null || arvore === void 0 ? void 0 : arvore.area_basal.toFixed(4)))))),
                        !planejar && (React.createElement(React.Fragment, null,
                            React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                                    React.createElement("div", { className: "text-sm text-gray-500" }, (_c = arvore === null || arvore === void 0 ? void 0 : arvore.situacao_arvore) === null || _c === void 0 ? void 0 : _c.nome))),
                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center" },
                                React.createElement(Link_1.Link, { href: "/arvore/update/" + arvore.id },
                                    React.createElement(solid_1.PencilAltIcon, { className: "w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" })),
                                React.createElement(Link_1.Link, { href: "#", onClick: function () { return deleteSingleModal(arvore.id); } },
                                    React.createElement(solid_1.TrashIcon, { className: "w-5 h-5 ml-4 -mr-1 text-red-600 hover:text-red-700" })))))));
                }))))));
};
exports["default"] = ListArvore;
