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
var Link_1 = require("../components/Link");
var input_1 = require("../components/atoms/input");
var solid_1 = require("@heroicons/react/solid");
var alert_1 = require("../services/alert");
var Modal_1 = require("../components/Modal");
var AuthContext_1 = require("../contexts/AuthContext");
var Especies = function (_a) {
    var currentEspecies = _a.currentEspecies, onPageChanged = _a.onPageChanged, orderBy = _a.orderBy, order = _a.order, changeItemsPerPage = _a.changeItemsPerPage, currentPage = _a.currentPage, perPage = _a.perPage, loading = _a.loading, loadEspecies = _a.loadEspecies;
    var _b = react_1.useState(currentEspecies), filteredEspecies = _b[0], setFilteredEspecies = _b[1];
    var _c = react_1.useState(), selectedEspecie = _c[0], setSelectedEspecie = _c[1];
    var _d = react_1.useState(false), uploading = _d[0], setUploading = _d[1];
    var _e = react_1.useState(false), openModal = _e[0], setOpenModal = _e[1];
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var fileRef = react_1.useRef(null);
    var _f = react_1.useState(false), sorted = _f[0], setSorted = _f[1];
    var _g = react_1.useState([]), checkedEspecies = _g[0], setCheckedEspecies = _g[1];
    react_1.useEffect(function () {
        setFilteredEspecies(currentEspecies);
    }, [currentEspecies, currentPage]);
    function selectToModal(id) {
        var especie = currentEspecies.find(function (especie) { return especie.id === id; });
        setSelectedEspecie(especie);
        setOpenModal(true);
    }
    function deleteEspecie(id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    client["delete"]("/especie/single/" + id)
                        .then(function () {
                        alert_1["default"].success('A espécie foi deletada com SUCESSO!!!');
                        loadEspecies();
                        setOpenModal(false);
                    });
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/];
            });
        });
    }
    var handleImportEspecies = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var formData;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(e.target.files.length > 0)) return [3 /*break*/, 2];
                    formData = new FormData();
                    formData.append('file', (_a = e.target) === null || _a === void 0 ? void 0 : _a.files[0]);
                    return [4 /*yield*/, client.post('/especie/import', formData)
                            .then(function (data) {
                            alert_1["default"].success('Especies importadas com sucesso!!!');
                            loadEspecies();
                        })];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    setUploading(false);
                    _b.label = 3;
                case 3:
                    setUploading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var openFile = function () {
        var _a;
        (_a = fileRef.current) === null || _a === void 0 ? void 0 : _a.click();
        setUploading(true);
    };
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
            onPageChanged(paginatedData);
            return [2 /*return*/];
        });
    }); };
    var sortEspecies = function (orderBy) { return __awaiter(void 0, void 0, void 0, function () {
        var paginatedData;
        return __generator(this, function (_a) {
            paginatedData = {
                currentPage: currentPage,
                perPage: perPage,
                orderBy: orderBy,
                order: !sorted ? 'DESC' : 'ASC'
            };
            onPageChanged(paginatedData);
            setSorted(!sorted);
            return [2 /*return*/];
        });
    }); };
    var handleSelectEspecie = function (evt) {
        var especieId = evt.target.value;
        if (!checkedEspecies.includes(especieId)) {
            setCheckedEspecies(__spreadArrays(checkedEspecies, [especieId]));
        }
        else {
            setCheckedEspecies(checkedEspecies.filter(function (checkedEspecieId) {
                return checkedEspecieId !== especieId;
            }));
        }
    };
    var handleSelectAllEspecies = function () {
        if (checkedEspecies.length < currentEspecies.length) {
            setCheckedEspecies(currentEspecies.map(function (_a) {
                var id = _a.id;
                return id;
            }));
        }
        else {
            setCheckedEspecies([]);
        }
    };
    var deleteEspecies = function () {
        try {
            client["delete"]('/especie/multiples', { data: { ids: checkedEspecies } })
                .then(function () {
                alert_1["default"].success('As espécies foram deletadas com SUCESSO!!!');
                loadEspecies();
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: "flex flex-row items-center justify-between p-6 bg-gray-100" },
            React.createElement("h1", { className: "font-medium text-2xl font-roboto" }, "Esp\u00E9cies"),
            React.createElement("div", { className: "relative w-64" },
                React.createElement("button", { onClick: openFile, disabled: uploading, className: "bg-indigo hover:bg-indigo-dark text-green-700 font-bold py-2 px-4 w-full inline-flex items-center" },
                    React.createElement("svg", { className: "fill-green-700", height: "18", viewBox: "0 0 24 24", width: "18", xmlns: "http://www.w3.org/2000/svg" },
                        React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" }),
                        React.createElement("path", { d: "M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" })),
                    React.createElement("span", { className: "ml-2" }, uploading ? "Importando..." : "Importar Espécies")),
                React.createElement("input", { disabled: uploading, onChange: function (e) { return handleImportEspecies(e); }, ref: fileRef, className: "cursor-pointer absolute block opacity-0 pin-r pin-t", type: "file", name: "fileRef" })),
            React.createElement(Link_1.Link, { href: '/especie/add', className: "px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer" }, "Adicionar")),
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
                React.createElement("div", { className: "w-60 px-4" }, "Pesquisar Esp\u00E9cie:"),
                React.createElement("div", { className: "w-full px-4" },
                    React.createElement(input_1.Input, { label: "Pesquisar Esp\u00E9cie", id: "search", name: "search", 
                        // value={search}
                        onChange: function (e) { return handleSearch(e.target.value); }, className: 'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50' }))),
            React.createElement("div", { className: "flex flex-row items-center justify-between overflow-x-auto mt-2" },
                React.createElement("div", { className: "shadow overflow-y-auto border-b border-gray-200 w-full sm:rounded-lg" },
                    (checkedEspecies === null || checkedEspecies === void 0 ? void 0 : checkedEspecies.length) > 0 && (React.createElement("div", { className: "py-4" },
                        React.createElement("button", { className: "px-4 py-2 bg-red-600 text-white rounded-md", onClick: deleteEspecies }, "Deletar"))),
                    React.createElement("table", { className: "min-w-full divide-y divide-gray-200" },
                        React.createElement("thead", { className: "bg-gray-50" },
                            React.createElement("tr", null,
                                React.createElement("th", null,
                                    React.createElement("div", { className: "flex justify-center" },
                                        React.createElement("input", { checked: (checkedEspecies === null || checkedEspecies === void 0 ? void 0 : checkedEspecies.length) === (currentEspecies === null || currentEspecies === void 0 ? void 0 : currentEspecies.length), onChange: handleSelectAllEspecies, className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer", type: "checkbox", value: "", id: "flexCheckDefault" }))),
                                React.createElement("th", { scope: "col", className: "flex flex-row items-center w-3/12 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer", onClick: function () { return sortEspecies('especie.nome'); } },
                                    "Nome",
                                    sorted
                                        ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                        : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" }))),
                                React.createElement("th", { scope: "col", className: "w-3/12 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Nome Vulgar"),
                                React.createElement("th", { scope: "col", className: "w-3/12 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Nome Cient\u00EDfico"),
                                React.createElement("th", { scope: "col", className: "flex flex-row items-center w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer", onClick: function () { return sortEspecies('categoria.nome'); } },
                                    "Categoria",
                                    sorted
                                        ? (React.createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                        : (React.createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" }))),
                                React.createElement("th", { scope: "col", className: "relative w-1/12 px-6 py-3" },
                                    React.createElement("span", { className: "sr-only" }, "Edit")))),
                        React.createElement("tbody", { className: "bg-white divide-y divide-gray-200" }, filteredEspecies === null || filteredEspecies === void 0 ? void 0 : filteredEspecies.map(function (especie) {
                            var _a;
                            return (React.createElement("tr", { key: especie.id },
                                React.createElement("td", { className: "flex justify-center" },
                                    React.createElement("input", { value: especie === null || especie === void 0 ? void 0 : especie.id, checked: checkedEspecies.includes(especie === null || especie === void 0 ? void 0 : especie.id), onChange: handleSelectEspecie, id: "especieId", type: "checkbox", className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" })),
                                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                    React.createElement("div", { className: "flex flex-col items-starter" },
                                        React.createElement("div", { className: "text-sm font-medium text-gray-900" }, especie === null || especie === void 0 ? void 0 : especie.nome))),
                                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                    React.createElement("div", { className: "text-sm text-gray-900" }, especie.nomeOrgao)),
                                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                    React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                                        React.createElement("div", { className: "text-sm text-gray-500" }, especie.nomeCientifico))),
                                React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                    React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                                        React.createElement("div", { className: "text-sm text-gray-500" }, (_a = especie.categoria) === null || _a === void 0 ? void 0 : _a.nome))),
                                React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center" },
                                    React.createElement(Link_1.Link, { href: "/especie/update/" + especie.id },
                                        React.createElement(solid_1.PencilAltIcon, { className: "w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" })),
                                    React.createElement(Link_1.Link, { href: "#", onClick: function () { return selectToModal(especie.id); } },
                                        React.createElement(solid_1.TrashIcon, { className: "w-5 h-5 ml-4 -mr-1 text-red-600 hover:text-red-700" })))));
                        }))))),
            openModal &&
                React.createElement(Modal_1["default"], { className: "w-full", styleButton: "bg-red-600 hover:bg-red-700 focus:ring-red-500", title: "Deletar esp\u00E9cie", buttonText: "Deletar", bodyText: "Tem certeza que seja excluir a especie " + (selectedEspecie === null || selectedEspecie === void 0 ? void 0 : selectedEspecie.nome) + "?", data: selectedEspecie, parentReturnData: selectToModal, parentFunction: deleteEspecie, hideModal: function () { return setOpenModal(false); }, open: openModal })))));
};
exports["default"] = Especies;
