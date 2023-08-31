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
var Link_1 = require("../Link");
var input_1 = require("../atoms/input");
var solid_1 = require("@heroicons/react/24/solid");
var alert_1 = require("@/services/alert");
var AuthContext_1 = require("../../context/AuthContext");
var styles_1 = require("../Utils/styles");
var ModalContext_1 = require("@/context/ModalContext");
var LinkBack_1 = require("../LinkBack");
var AddEdit_1 = require("./AddEdit");
var react_2 = require("react");
var outline_1 = require("@heroicons/react/24/outline");
var ProjetoContext_1 = require("@/context/ProjetoContext");
var Index = function (_a) {
    var currentObservacoes = _a.currentObservacoes, onPageChanged = _a.onPageChanged, orderBy = _a.orderBy, order = _a.order, changeItemsPerPage = _a.changeItemsPerPage, currentPage = _a.currentPage, perPage = _a.perPage, loading = _a.loading, loadObservacoes = _a.loadObservacoes;
    var _b = react_1.useState(currentObservacoes), filteredObservacoes = _b[0], setFilteredObservacoes = _b[1];
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var _c = react_1.useState(false), sorted = _c[0], setSorted = _c[1];
    var _d = react_1.useState([]), checkedObservacoes = _d[0], setCheckedObservacoes = _d[1];
    var _e = ModalContext_1.useModalContext(), showModal = _e.showModal, hideModal = _e.hideModal;
    var formRef = react_2.createRef();
    var projeto = react_1.useContext(ProjetoContext_1.ProjetoContext).projeto;
    var obsById = function (id) {
        return currentObservacoes.find(function (equacao) { return equacao.id === id; });
    };
    var formSubmit = function () {
        formRef.current.handleSubmit();
        if (formRef.current.isValid) {
            hideModal();
        }
    };
    var deleteSingleModal = function (id) {
        var _a;
        return showModal({
            size: 'max-w-lg',
            title: 'Deletar Obserção',
            onConfirm: function () { deleteObs(id); },
            styleButton: styles_1.styles.redButton,
            iconType: 'warn',
            confirmBtn: 'Deletar',
            content: "Tem Certeza que deseja excluir o Equa\u00E7\u00E3o " + ((_a = obsById(id)) === null || _a === void 0 ? void 0 : _a.nome) + " ?"
        });
    };
    var updateObservacao = function (id) {
        showModal({ size: 'sm:max-w-2xl', hookForm: 'hook-form', type: 'submit', title: 'Editar Observação', onConfirm: formSubmit, styleButton: styles_1.styles.greenButton, confirmBtn: 'Salvar', content: react_2["default"].createElement(AddEdit_1.AddEdit, { sendForm: function () { loadObservacoes(10); }, ref: formRef, projetoId: projeto === null || projeto === void 0 ? void 0 : projeto.id, obsId: id, styles: styles_1.stylesForm, redirect: false })
        });
    };
    var addObs = function () {
        showModal({ size: 'sm:max-w-2xl', hookForm: 'hook-form', type: 'submit', title: 'Nova Observação', onConfirm: formSubmit, styleButton: styles_1.styles.greenButton, confirmBtn: 'Salvar', content: react_2["default"].createElement(AddEdit_1.AddEdit, { sendForm: function () { loadObservacoes(10); }, ref: formRef, projetoId: projeto === null || projeto === void 0 ? void 0 : projeto.id, styles: styles_1.stylesForm, redirect: false })
        });
    };
    var deleteMultModal = function () { return showModal({ title: 'Deletar Observações', onConfirm: deleteObservacoes, styleButton: styles_1.styles.redButton, iconType: 'warn', confirmBtn: 'Deletar', content: 'Tem certeza que deseja excluir os equações selecionados' }); };
    react_1.useEffect(function () {
        setFilteredObservacoes(currentObservacoes);
    }, [currentObservacoes, currentPage]);
    function deleteObs(id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client["delete"]("/obs-arvore/" + id)
                                .then(function (response) {
                                var _a = response.data, error = _a.error, message = _a.message;
                                if (!error) {
                                    alert_1["default"].success(message);
                                    loadObservacoes(10);
                                    hideModal();
                                }
                                else {
                                    alert_1["default"].error(message);
                                    hideModal();
                                }
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
            onPageChanged(paginatedData);
            return [2 /*return*/];
        });
    }); };
    var sortObservacoes = function (orderBy) { return __awaiter(void 0, void 0, void 0, function () {
        var paginatedData;
        return __generator(this, function (_a) {
            paginatedData = {
                currentPage: currentPage,
                perPage: perPage,
                orderBy: orderBy,
                order: !sorted ? 'desc' : 'asc'
            };
            onPageChanged(paginatedData);
            setSorted(!sorted);
            return [2 /*return*/];
        });
    }); };
    var handleSelectEquacoes = function (evt) {
        var obsId = evt.target.value;
        if (!checkedObservacoes.includes(obsId)) {
            setCheckedObservacoes(__spreadArrays(checkedObservacoes, [obsId]));
        }
        else {
            setCheckedObservacoes(checkedObservacoes.filter(function (checkedObsId) {
                return checkedObsId !== obsId;
            }));
        }
    };
    var handleSelectAllObs = function () {
        if (checkedObservacoes.length < currentObservacoes.length) {
            setCheckedObservacoes(currentObservacoes.map(function (_a) {
                var id = _a.id;
                return id;
            }));
        }
        else {
            setCheckedObservacoes([]);
        }
    };
    var deleteObservacoes = function () {
        try {
            client["delete"]('/obs-arvore/multiples', { data: { ids: checkedObservacoes } })
                .then(function () {
                alert_1["default"].success('As observações de árvores foram excluidas com SUCESSO!!!');
                loadObservacoes();
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    return (react_2["default"].createElement("div", null,
        react_2["default"].createElement("div", { className: "flex flex-row items-center justify-between p-6 bg-gray-100" },
            react_2["default"].createElement("div", null,
                react_2["default"].createElement(LinkBack_1.LinkBack, { href: "/projeto", className: "flex flex-col relative left-0 ml-4" })),
            react_2["default"].createElement("h1", { className: "font-medium text-2xl font-roboto" }, "Obser\u00E7\u00F5es de \u00E1rvores"),
            react_2["default"].createElement("div", null)),
        loading ? (react_2["default"].createElement("div", { className: "flex flex-row items-center justify-center h-56" }, "Loading...")) : (react_2["default"].createElement("div", { className: "flex flex-col p-6 mx-auto max-w-5xl" },
            react_2["default"].createElement("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-items-center py-4 bg-gray-100 rounded-lg" },
                react_2["default"].createElement("div", { className: "flex flex-row w-2/12 px-2 items-center justify-between" },
                    react_2["default"].createElement("div", { className: "w-full" },
                        react_2["default"].createElement("label", { htmlFor: "perPage", className: "px-1 block mb-2 text-sm text-gray-900 dark:text-gray-400" }, "por P\u00E1gina")),
                    react_2["default"].createElement("select", { value: perPage, onChange: function (evt) { return changeItemsPerPage(evt.target.value); }, id: "perPage", className: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" },
                        react_2["default"].createElement("option", { value: "10" }, "10"),
                        react_2["default"].createElement("option", { value: "20" }, "20"),
                        react_2["default"].createElement("option", { value: "50" }, "50"),
                        react_2["default"].createElement("option", { value: "100" }, "100"))),
                react_2["default"].createElement("div", { className: "w-60 px-4 text-sm" }, "Pesquisar Observa\u00E7\u00E3o:"),
                react_2["default"].createElement("div", { className: "w-full px-4" },
                    react_2["default"].createElement(input_1.Input, { label: "Pesquisar Observa\u00E7\u00F5es", id: "search", name: "search", onChange: function (e) { return handleSearch(e.target.value); }, className: 'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50', autoFocus: true })),
                react_2["default"].createElement("div", { className: "flex items-center justify-center w-full lg:mr-4 pt-2 lg:w-32 lg:pt-0" },
                    react_2["default"].createElement("button", { 
                        // disabled={formState.isSubmitting}
                        type: "submit", className: "flex flex-row justify-between group relative w-24 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500", onClick: addObs },
                        react_2["default"].createElement("span", { className: "flex items-center" },
                            react_2["default"].createElement(outline_1.PlusIcon, { className: "h-5 w-5 text-green-200 group-hover:text-green-100", "aria-hidden": "true" })),
                        react_2["default"].createElement("div", null, "Novo")))),
            react_2["default"].createElement("div", { className: "flex flex-row items-center justify-between overflow-x-auto mt-2" },
                react_2["default"].createElement("div", { className: "shadow overflow-y-auto border-b border-gray-200 w-full sm:rounded-lg" },
                    (checkedObservacoes === null || checkedObservacoes === void 0 ? void 0 : checkedObservacoes.length) > 0 && (react_2["default"].createElement("div", { className: "py-4" },
                        react_2["default"].createElement("button", { className: "px-4 py-2 bg-red-600 text-white rounded-md", onClick: deleteMultModal }, "Deletar"))),
                    react_2["default"].createElement("table", { className: "min-w-full divide-y divide-gray-200" },
                        react_2["default"].createElement("thead", { className: "bg-gray-50" },
                            react_2["default"].createElement("tr", null,
                                react_2["default"].createElement("th", { className: "w-24" },
                                    react_2["default"].createElement("div", { className: "flex justify-center" },
                                        react_2["default"].createElement("input", { checked: (checkedObservacoes === null || checkedObservacoes === void 0 ? void 0 : checkedObservacoes.length) === (currentObservacoes === null || currentObservacoes === void 0 ? void 0 : currentObservacoes.length), onChange: handleSelectAllObs, className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer", type: "checkbox", value: "", id: "flexCheckDefault" }))),
                                react_2["default"].createElement("th", { scope: "col", className: "w-auto px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer", onClick: function () { return sortObservacoes('nome'); } },
                                    react_2["default"].createElement("div", { className: "flex flex-row items-center" },
                                        "Nome",
                                        sorted
                                            ? (react_2["default"].createElement(solid_1.ChevronUpIcon, { className: "w-5 h-5" }))
                                            : (react_2["default"].createElement(solid_1.ChevronDownIcon, { className: "w-5 h-5" })))),
                                react_2["default"].createElement("th", { scope: "col", className: "relative w-1/12 px-6 py-3" },
                                    react_2["default"].createElement("span", { className: "sr-only" }, "Edit")))),
                        react_2["default"].createElement("tbody", { className: "bg-white divide-y divide-gray-200" }, filteredObservacoes === null || filteredObservacoes === void 0 ? void 0 : filteredObservacoes.map(function (obs) { return (react_2["default"].createElement("tr", { key: obs.id },
                            react_2["default"].createElement("td", { className: "flex justify-center" },
                                react_2["default"].createElement("input", { value: obs === null || obs === void 0 ? void 0 : obs.id, checked: checkedObservacoes.includes(obs === null || obs === void 0 ? void 0 : obs.id), onChange: handleSelectEquacoes, id: "id_obs", type: "checkbox", className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" })),
                            react_2["default"].createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                react_2["default"].createElement("div", { className: "flex flex-col items-starter" },
                                    react_2["default"].createElement("div", { className: "text-sm font-medium text-gray-900" }, obs === null || obs === void 0 ? void 0 : obs.nome))),
                            react_2["default"].createElement("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center" },
                                react_2["default"].createElement(Link_1.Link, { href: "#", onClick: function () { return updateObservacao(obs.id); } },
                                    react_2["default"].createElement(solid_1.PencilIcon, { className: "w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" })),
                                react_2["default"].createElement(Link_1.Link, { href: "#", onClick: function () { return deleteSingleModal(obs.id); } },
                                    react_2["default"].createElement(solid_1.TrashIcon, { className: "w-5 h-5 ml-4 -mr-1 text-red-600 hover:text-red-700" }))))); })))))))));
};
exports["default"] = Index;
