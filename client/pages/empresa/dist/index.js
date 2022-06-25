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
exports.getServerSideProps = void 0;
var react_1 = require("react");
var Link_1 = require("../../components/Link");
var empresa_1 = require("../../services/empresa");
var solid_1 = require("@heroicons/react/solid");
var alert_1 = require("../../services/alert");
var Modal_1 = require("../../components/Modal");
var react_2 = require("next-auth/react");
var withAuthentication_1 = require("../../components/withAuthentication");
var AuthContext_1 = require("../../contexts/AuthContext");
var EmpresaIndex = function () {
    var _a = react_1.useState([]), empresas = _a[0], setEmpresas = _a[1];
    var _b = react_1.useState(), selectedEmpresa = _b[0], setSelectedEmpresa = _b[1];
    var _c = react_1.useState(false), openModal = _c[0], setOpenModal = _c[1];
    var _d = react_1.useState(false), isLoading = _d[0], setIsLoading = _d[1];
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var loadEmpresas = function () { return __awaiter(void 0, void 0, void 0, function () {
        var empresas_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    setIsLoading(true);
                    return [4 /*yield*/, client.get('empresa')];
                case 1:
                    empresas_1 = (_a.sent()).data.empresas;
                    setEmpresas(empresas_1);
                    setIsLoading(false);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    alert_1["default"].error(error_1 === null || error_1 === void 0 ? void 0 : error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        loadEmpresas();
    }, []);
    function toogleDeleteModal(id) {
        var empresa = empresas.filter(function (empresa) { return empresa.id === id; });
        setSelectedEmpresa(empresa[0]);
        setOpenModal(true);
    }
    function deleteEmpresa(id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, empresa_1["default"]._delete(id)
                                .then(function () {
                                alert_1["default"].success('A empresa foi deletada com SUCESSO!!!');
                                loadEmpresas();
                                setOpenModal(false);
                            })
                            // setEmpresas(empresas.filter((empresa: EmpresaType) => empresa.id !== id))
                        ];
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
        });
    }
    function hideModal() {
        setOpenModal(false);
    }
    return (React.createElement("div", null,
        React.createElement("div", { className: "flex flex-row items-center justify-between p-6 bg-gray-100" },
            React.createElement("h1", { className: "font-medium text-2xl font-roboto" }, "Empresas"),
            React.createElement(Link_1.Link, { href: '/empresa/add', className: "px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer" }, "Adicionar")),
        isLoading ? (React.createElement("div", { className: "flex flex-row items-center justify-center h-56" }, "Loading...")) : (React.createElement("div", { className: "flex flex-col p-6" },
            React.createElement("div", { className: "-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" }, empresas.length ? (React.createElement("div", { className: "py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8" },
                React.createElement("div", { className: "shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" },
                    React.createElement("table", { className: "min-w-full divide-y divide-gray-200" },
                        React.createElement("thead", { className: "bg-gray-50" },
                            React.createElement("tr", null,
                                React.createElement("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Raz\u00E3o Social / Nome Fantasia"),
                                React.createElement("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Respons\u00E1vel / CREA"),
                                React.createElement("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Registro Ambiental"),
                                React.createElement("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "CNPJ"),
                                React.createElement("th", { scope: "col", className: "relative px-6 py-3" },
                                    React.createElement("span", { className: "sr-only" }, "Edit")))),
                        React.createElement("tbody", { className: "bg-white divide-y divide-gray-200" }, empresas.map(function (empresa) { return (React.createElement("tr", { key: empresa.id },
                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" },
                                React.createElement("div", { className: "flex flex-col items-starter" },
                                    React.createElement("div", { className: "text-sm font-medium text-gray-900" }, empresa.razaoSocial),
                                    React.createElement("div", { className: "text-sm text-gray-500" }, empresa.nomeFantasia))),
                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" },
                                React.createElement("div", { className: "text-sm text-gray-900" }, empresa.respTecnico),
                                React.createElement("div", { className: "text-sm text-gray-500" }, empresa.creaResp)),
                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" },
                                React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                                    React.createElement("div", { className: "text-sm text-gray-500" }, empresa.cnpj))),
                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap" },
                                React.createElement("span", { className: "text-sm font-medium text-gray-900" },
                                    React.createElement("div", { className: "text-sm text-gray-500" }, empresa.regAmbiental))),
                            React.createElement("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row items-center" },
                                React.createElement(Link_1.Link, { href: "/empresa/update/" + empresa.id },
                                    React.createElement(solid_1.PencilAltIcon, { className: "w-5 h-5 ml-4 -mr-1 text-green-600 hover:text-green-700" })),
                                React.createElement(Link_1.Link, { href: "/empresa/" + empresa.id + "/users" },
                                    React.createElement(solid_1.UsersIcon, { className: "w-5 h-5 ml-4 -mr-1 text-indigo-600 hover:text-indigo-700" })),
                                React.createElement(Link_1.Link, { href: "#", onClick: function () { return toogleDeleteModal(empresa.id); } },
                                    React.createElement(solid_1.TrashIcon, { className: "w-5 h-5 ml-4 -mr-1 text-red-600 hover:text-red-700" }))))); })))))) : (React.createElement("div", { className: "flex flex-col items-center justify-center h-64" },
                React.createElement("h1", { className: "font-roboto text-2xl font-medium" }, "Nenhuma Empresa Cadastrada")))),
            openModal &&
                React.createElement(Modal_1["default"], { styleButton: "bg-red-600 hover:bg-red-700 focus:ring-red-500", title: "Deletar Empresar", buttonText: "Deletar", bodyText: "Tem certeza que seja excluir a empresa " + (selectedEmpresa === null || selectedEmpresa === void 0 ? void 0 : selectedEmpresa.razaoSocial) + "?", data: selectedEmpresa, parentFunction: deleteEmpresa, hideModal: function () { return setOpenModal(false); }, open: openModal })))));
};
exports.getServerSideProps = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var session;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, react_2.getSession(ctx)];
            case 1:
                session = _a.sent();
                if (!session) {
                    return [2 /*return*/, {
                            redirect: {
                                destination: '/',
                                permanent: false
                            }
                        }];
                }
                return [2 /*return*/, {
                        props: {}
                    }];
        }
    });
}); };
exports["default"] = withAuthentication_1["default"](EmpresaIndex);
