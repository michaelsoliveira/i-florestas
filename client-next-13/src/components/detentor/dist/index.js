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
var Link_1 = require("src/components/Link");
var alert_1 = require("@/services/alert");
var solid_1 = require("@heroicons/react/24/solid");
var react_1 = require("react");
var ModalContext_1 = require("@/context/ModalContext");
var AuthContext_1 = require("@/context/AuthContext");
var styles_1 = require("../Utils/styles");
var LinkBack_1 = require("../LinkBack");
var ListEmpresas = function (_a) {
    var empresas = _a.empresas, isLoading = _a.isLoading, loadEmpresas = _a.loadEmpresas, projetoId = _a.projetoId;
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var _b = ModalContext_1.useModalContext(), showModal = _b.showModal, hideModal = _b.hideModal;
    function deleteEmpresa(id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client["delete"]("/detentor/" + id)
                                .then(function () {
                                alert_1["default"].success('O detentor foi deletada com SUCESSO!!!');
                                loadEmpresas();
                                hideModal();
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
    var empresaById = function (id) {
        return empresas.find(function (empresa) { return empresa.id === id; });
    };
    var deleteSingleModal = function (id) { var _a; return showModal({ title: 'Deletar UPA', onConfirm: function () { deleteEmpresa(id); }, styleButton: styles_1.styles.redButton, iconType: 'warn', confirmBtn: 'Deletar', content: "Tem Certeza que deseja excluir a UPA " + ((_a = empresaById(id)) === null || _a === void 0 ? void 0 : _a.razao_social) + " ?" }); };
    return (React.createElement("div", { className: "lg:h-[33.3em] h-auto" },
        React.createElement("div", { className: "flex flex-row items-center justify-between p-6 bg-gray-100" },
            React.createElement("div", null,
                React.createElement(LinkBack_1.LinkBack, { href: "/projeto", className: "flex flex-col relative left-0 ml-4" })),
            React.createElement("h1", { className: "font-medium text-2xl font-roboto" }, "Empresas"),
            React.createElement(Link_1.Link, { href: "/projeto/" + projetoId + "/detentor/add", className: "px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer" }, "Adicionar")),
        isLoading ? (React.createElement("div", { className: "flex flex-row items-center justify-center h-full" }, "Loading...")) : (React.createElement("div", { className: "flex flex-col p-6" }, (empresas === null || empresas === void 0 ? void 0 : empresas.length) ? (React.createElement("div", { className: "py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8" },
            React.createElement("div", { className: "overflow-auto lg:overflow-hidden border border-gray-400 shadow-lg bg-gray-100 py-4 lg:rounded-t-xl lg:rounded-lg" },
                React.createElement("table", { className: "min-w-full divide-y divide-gray-200" },
                    React.createElement("thead", { className: "bg-gray-50" },
                        React.createElement("tr", null,
                            React.createElement("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Raz\u00E3o Social / Nome Fantasia"),
                            React.createElement("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Respons\u00E1vel / CREA"),
                            React.createElement("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Registro Ambiental"),
                            React.createElement("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "CNPJ"),
                            React.createElement("th", { scope: "col", className: "relative px-6 py-3" },
                                React.createElement("span", { className: "sr-only" }, "Edit")))),
                    React.createElement("tbody", { className: "bg-white divide-y divide-gray-200" }, empresas.map(function (empresa) {
                        var _a;
                        return (React.createElement("tr", { key: empresa.id },
                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" },
                                React.createElement("div", { className: "flex flex-col items-starter" },
                                    React.createElement("div", { className: "text-sm font-medium text-gray-900" }, empresa.nome),
                                    React.createElement("div", { className: "text-sm text-gray-500" }, empresa.tipo === 'J' && ((_a = empresa.pessoaJuridica) === null || _a === void 0 ? void 0 : _a.razao_social)))),
                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" },
                                React.createElement("div", { className: "text-sm text-gray-900" }, empresa.resp_tecnico),
                                React.createElement("div", { className: "text-sm text-gray-500" }, empresa.crea_resp)),
                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" },
                                React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                                    React.createElement("div", { className: "text-sm text-gray-500" }, empresa.cnpj))),
                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" },
                                React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                                    React.createElement("div", { className: "text-sm text-gray-500" }, empresa.reg_ambiental))),
                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center" },
                                React.createElement(Link_1.Link, { href: "/projeto/" + projetoId + "/detentor/update/" + empresa.id },
                                    React.createElement(solid_1.PencilIcon, { className: "w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" })),
                                React.createElement(Link_1.Link, { href: "#", onClick: function () { return deleteSingleModal(empresa.id); } },
                                    React.createElement(solid_1.TrashIcon, { className: "w-5 h-5 ml-4 -mr-1 text-red-600 hover:text-red-700" })))));
                    })))))) : (React.createElement("div", { className: "flex flex-col items-center justify-center h-64" },
            React.createElement("h1", { className: "font-roboto text-2xl font-medium" }, "Nenhuma Empresa Cadastrada")))))));
};
exports["default"] = ListEmpresas;
