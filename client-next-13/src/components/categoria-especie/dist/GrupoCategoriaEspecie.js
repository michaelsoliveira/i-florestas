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
var SelectableRowList_1 = require("../Utils/SelectableRowList");
var hooks_1 = require("@/redux/hooks");
var Select_1 = require("../Select");
var ProjetoContext_1 = require("@/context/ProjetoContext");
var AuthContext_1 = require("@/context/AuthContext");
var outline_1 = require("@heroicons/react/outline");
var GrupoCategoriaEspecie = function () {
    var _a = react_1.useState(), especies = _a[0], setEspecies = _a[1];
    var _b = react_1.useState(), especiesCategories = _b[0], setEspeciesCategories = _b[1];
    var _c = react_1.useState(), categorias = _c[0], setCategorias = _c[1];
    var poa = hooks_1.useAppSelector(function (state) { return state.poa; });
    var _d = react_1.useState(), selectedCategoria = _d[0], setSelectedCategoria = _d[1];
    var _e = react_1.useState(), novaCategoria = _e[0], setNovaCategoria = _e[1];
    var projeto = react_1.useContext(ProjetoContext_1.ProjetoContext).projeto;
    var catDisponiveis = categorias === null || categorias === void 0 ? void 0 : categorias.filter(function (cat) { return cat.id !== (selectedCategoria === null || selectedCategoria === void 0 ? void 0 : selectedCategoria.value); });
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var _f = react_1.useState(), especiesResponse = _f[0], setEspeciesResponse = _f[1];
    var loadEspecies = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var especies;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/especie?poa=" + (poa === null || poa === void 0 ? void 0 : poa.id) + "&order=asc&orderBy=nome")];
                case 1:
                    especies = (_a.sent()).especies;
                    setEspecies(especies);
                    return [2 /*return*/];
            }
        });
    }); }, [client, poa]);
    var loadCategorias = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, categorias;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/categoria/grupo")];
                case 1:
                    data = (_a.sent()).data;
                    categorias = data.categorias;
                    setCategorias(categorias);
                    return [2 /*return*/];
            }
        });
    }); }, [client]);
    react_1.useEffect(function () {
        loadCategorias();
        loadEspecies();
    }, [loadCategorias, loadEspecies]);
    function getCategoriasDefaultOptions() {
        var data = categorias === null || categorias === void 0 ? void 0 : categorias.map(function (categoria, idx) {
            return {
                label: categoria.nome,
                value: categoria.id
            };
        });
        return data;
    }
    var setCategoriaEspecies = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.post("/especie/categorias/", { especies: especiesResponse, oldCategory: selectedCategoria === null || selectedCategoria === void 0 ? void 0 : selectedCategoria.value, newCategory: novaCategoria === null || novaCategoria === void 0 ? void 0 : novaCategoria.value })
                        .then(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var oldCategory, especies, newCategory, newEspecies;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, client.get("/especie/find-by-categoria?categoriaId=" + (selectedCategoria === null || selectedCategoria === void 0 ? void 0 : selectedCategoria.value))];
                                case 1:
                                    oldCategory = _a.sent();
                                    especies = oldCategory.data.especies;
                                    setEspecies(especies);
                                    return [4 /*yield*/, client.get("/especie/find-by-categoria?categoriaId=" + (novaCategoria === null || novaCategoria === void 0 ? void 0 : novaCategoria.value))];
                                case 2:
                                    newCategory = _a.sent();
                                    newEspecies = newCategory.data.especies;
                                    setEspeciesCategories(newEspecies);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    function getNovasCategoriasDefaultOptions() {
        var data = catDisponiveis === null || catDisponiveis === void 0 ? void 0 : catDisponiveis.map(function (categoria, idx) {
            return {
                label: categoria.nome,
                value: categoria.id
            };
        });
        return data;
    }
    var loadCategoriasOptions = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/categoria?nome=" + inputValue + "&order=asc&orderBy=nome")];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    callback(data === null || data === void 0 ? void 0 : data.map(function (categoria) { return ({
                        value: categoria.id,
                        label: categoria.nome
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
    var selectCategoria = function (categoria) { return __awaiter(void 0, void 0, void 0, function () {
        var response, especies;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setSelectedCategoria(categoria);
                    return [4 /*yield*/, client.get("/especie/find-by-categoria?categoriaId=" + (categoria === null || categoria === void 0 ? void 0 : categoria.value))];
                case 1:
                    response = _a.sent();
                    especies = response.data.especies;
                    setEspecies(especies);
                    return [2 /*return*/];
            }
        });
    }); };
    var selectNovaCategoria = function (categoria) { return __awaiter(void 0, void 0, void 0, function () {
        var response, especies;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setNovaCategoria(categoria);
                    return [4 /*yield*/, client.get("/especie/find-by-categoria?categoriaId=" + (categoria === null || categoria === void 0 ? void 0 : categoria.value))];
                case 1:
                    response = _a.sent();
                    especies = response.data.especies;
                    setEspeciesCategories(especies);
                    return [2 /*return*/];
            }
        });
    }); };
    var callBackEspecies = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setEspeciesResponse(data);
            return [2 /*return*/];
        });
    }); };
    return (React.createElement("div", { className: "py-6 flex flex-col justify-center sm:py-4 bg-gray-50 px-4" },
        React.createElement("div", { className: "relative py-3 w-full max-w-none lg:max-w-5xl mx-auto" },
            React.createElement("div", { className: 'flex flex-row border-x-2 border-t-2 border-green-600 text-white items-center justify-between shadow-lg bg-gradient-to-r from-green-700 to-green-500 py-4 sm:rounded-t-xl ' },
                React.createElement("div", { className: "px-4" }, "Grupo de Categoria de Esp\u00E9cies")),
            React.createElement("div", { className: "grid grid-cols-4 lg:grid-cols-4 gap-4 w-full px-4 py-2 bg-white shadow-sm sm:rounded-b-xl border-x-2 border-b-2 border-green-600" },
                React.createElement("div", { className: "col-span-4 lg:col-span-2" },
                    React.createElement("label", { className: "flex items-center " }, "Categoria atual das Esp\u00E9cies: "),
                    React.createElement("div", { className: "col-span-2 lg:col-span-2" },
                        React.createElement(Select_1.Select, { placeholder: 'Selecione uma Categoria', selectedValue: selectedCategoria, defaultOptions: getCategoriasDefaultOptions(), options: loadCategoriasOptions, callback: selectCategoria, initialData: {
                                label: 'Entre com as iniciais da Categoria ...', value: ''
                            } })),
                    React.createElement("div", { className: "grid grid-cols-6 gap-6 w-full items-center justify-center mt-4" },
                        React.createElement("div", { className: "relative col-span-5" },
                            React.createElement(SelectableRowList_1["default"], { data: especies ? especies.map(function (especie) { return { id: especie.id, label: especie.nome }; }) : [], callBack: callBackEspecies })),
                        React.createElement("div", { className: "flex items-center justify-center bg-gray-300 rounded-full hover:cursor-pointer h-8 w-8 focus:ring-green-200", onClick: setCategoriaEspecies },
                            React.createElement(outline_1.ArrowSmRightIcon, { className: "h-6 w-6" })))),
                React.createElement("div", { className: "col-span-4 lg:col-span-2" },
                    React.createElement("label", { className: "flex items-center" }, "Nova Categoria de Esp\u00E9cie: "),
                    React.createElement("div", { className: "" },
                        React.createElement(Select_1.Select, { placeholder: 'Selecione uma Categoria', selectedValue: novaCategoria, defaultOptions: getNovasCategoriasDefaultOptions(), options: loadCategoriasOptions, callback: selectNovaCategoria, initialData: {
                                label: 'Entre com as iniciais da Categoria ...', value: ''
                            } })),
                    React.createElement("div", { className: "py-4" },
                        React.createElement(SelectableRowList_1["default"], { data: especiesCategories ? especiesCategories.map(function (especie) { return { id: especie.id, label: especie.nome }; }) : [], callBack: callBackEspecies })))))));
};
exports["default"] = GrupoCategoriaEspecie;
