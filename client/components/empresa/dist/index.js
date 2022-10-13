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
var react_hook_form_1 = require("react-hook-form");
var Yup = require("yup");
var yup_1 = require("@hookform/resolvers/yup");
var router_1 = require("next/router");
var alert_1 = require("../../services/alert");
var react_2 = require("next-auth/react");
var AuthContext_1 = require("../../contexts/AuthContext");
var Empresa_module_scss_1 = require("styles/Empresa.module.scss");
var Empresa = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h;
    var id = _a.id;
    var router = router_1.useRouter();
    // const { id } = router.query as any
    var isAddMode = !id;
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var session = react_2.useSession().data;
    react_1.useEffect(function () {
        function loadEmpresa() {
            return __awaiter(this, void 0, void 0, function () {
                var data, _i, _a, _b, key, value;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!(!isAddMode && typeof session !== typeof undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, client.get("/empresa/" + id)];
                        case 1:
                            data = (_c.sent()).data;
                            for (_i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
                                _b = _a[_i], key = _b[0], value = _b[1];
                                setValue(key, value, {
                                    shouldValidate: true,
                                    shouldDirty: true
                                });
                            }
                            _c.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        }
        loadEmpresa();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, isAddMode, client, id]);
    var validationSchema = Yup.object().shape({
        razaoSocial: Yup.string()
            .min(3, "Razão Social deve ter no minimo 3 caracteres")
            .max(100, "Razão Social deve ter no máximo 100 caracteres")
            .required('O campo Razão Social é obrigatório '),
        nomeFantasia: Yup.string()
            .nullable()
            .transform(function (value) { return (!value ? null : value); })
            .min(3, "Nome Fantasia deve ter no minimo 3 caracteres")
            .max(100, "Nome Fantasia deve ter no máximo 100 caracteres"),
        respTecnico: Yup.string()
            .matches(/^[aA-zZ\s]+$/, "Somente letras são permitidas")
            .nullable()
            .transform(function (value) { return (!value ? null : value); })
            .min(3, "Responsável técnico deve ter no minimo 3 caracteres")
            .max(100, "Responsável técnico deve ter no máximo 100 caracteres")
    });
    var formOptions = { resolver: yup_1.yupResolver(validationSchema) };
    var _j = react_hook_form_1.useForm(formOptions), register = _j.register, handleSubmit = _j.handleSubmit, reset = _j.reset, errors = _j.formState.errors, setValue = _j.setValue;
    function onSubmit(data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, isAddMode
                            ? createEmpresa(data)
                            : updateEmpresa(id, data)];
                }
                catch (error) {
                    alert_1["default"].error(error.message);
                }
                return [2 /*return*/];
            });
        });
    }
    function createEmpresa(data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.post('/empresa', data)
                            .then(function (response) {
                            var empresa = response.data;
                            alert_1["default"].success("Empresa " + (empresa === null || empresa === void 0 ? void 0 : empresa.razaoSocial) + " cadastrada com SUCESSO!!!");
                            router.push('/empresa');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function updateEmpresa(id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.put("/empresa/" + id, data)
                            .then(function (response) {
                            var empresa = response.data;
                            alert_1["default"].success("Empresa " + (empresa === null || empresa === void 0 ? void 0 : empresa.razaoSocial) + " atualizada com SUCESSO!!!");
                            router.push('/empresa');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement("div", { className: "px-4 py-4" },
        React.createElement("div", { className: "mt-10 sm:mt-0 shadow-md" },
            React.createElement("div", { className: "md:grid md:grid-cols-3 md:gap-6" },
                React.createElement("div", { className: "md:col-span-1" },
                    React.createElement("div", { className: "lg:p-6 p-4" },
                        React.createElement("h3", { className: "text-lg font-medium leading-6 text-gray-900" },
                            isAddMode ? 'Cadastro ' : 'Atualização ',
                            " da Empresa"),
                        React.createElement("p", { className: "mt-1 text-sm text-gray-600" }, "Entre com as informa\u00E7\u00F5es iniciais de sua empresa para ter acesso ao BOManejo."))),
                React.createElement("div", { className: "mt-5 md:mt-0 md:col-span-2" },
                    React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
                        React.createElement("div", { className: "shadow overflow-hidden sm:rounded-md" },
                            React.createElement("div", { className: "px-4 py-5 bg-white sm:p-6" },
                                React.createElement("div", { className: "grid grid-cols-6 gap-6" },
                                    React.createElement("div", { className: "col-span-6 sm:col-span-3" },
                                        React.createElement("label", { htmlFor: "razaoSocial", className: Empresa_module_scss_1["default"].fieldLabel }, "*Raz\u00E3o Social"),
                                        React.createElement("input", __assign({}, register('razaoSocial'), { 
                                            // value={state.razaoSocial}
                                            // onChange={handleChange}
                                            required: true, name: "razaoSocial", type: "text", id: "razacaoSocial", className: Empresa_module_scss_1["default"].fieldText })),
                                        React.createElement("p", { className: 'text-sm text-red-500 mt-1' }, (_b = errors.razaoSocial) === null || _b === void 0 ? void 0 : _b.message)),
                                    React.createElement("div", { className: "col-span-6 sm:col-span-3" },
                                        React.createElement("label", { htmlFor: "nomeFantasia", className: Empresa_module_scss_1["default"].fieldLabel }, "Nome Fantasia"),
                                        React.createElement("input", __assign({}, register('nomeFantasia'), { 
                                            // value={state.nomeFantasia}
                                            // onChange={handleChange}
                                            type: "text", name: "nomeFantasia", id: "nomeFantasia", className: Empresa_module_scss_1["default"].fieldText })),
                                        React.createElement("p", { className: 'text-sm text-red-500 mt-1' }, (_c = errors.nomeFantasia) === null || _c === void 0 ? void 0 : _c.message)),
                                    React.createElement("div", { className: "col-span-6 sm:col-span-3 w-48" },
                                        React.createElement("label", { htmlFor: "nomeFantasia", className: Empresa_module_scss_1["default"].fieldLabel }, "CNPJ"),
                                        React.createElement("input", __assign({}, register('cnpj'), { 
                                            // value={state.nomeFantasia}
                                            // onChange={handleChange}
                                            type: "text", name: "cnpj", id: "cnpj", className: Empresa_module_scss_1["default"].fieldText })),
                                        React.createElement("p", { className: 'text-sm text-red-500 mt-1' }, (_d = errors.cnpj) === null || _d === void 0 ? void 0 : _d.message)),
                                    React.createElement("div", { className: "col-span-6 sm:col-span-3" },
                                        React.createElement("label", { htmlFor: "respTecnico", className: Empresa_module_scss_1["default"].fieldLabel }, "Registro Ambiental"),
                                        React.createElement("input", __assign({}, register('regAmbiental'), { 
                                            // value={state.respTecnico}
                                            // onChange={handleChange}
                                            type: "text", name: "regAmbiental", id: "regAmbiental", className: Empresa_module_scss_1["default"].fieldText })),
                                        React.createElement("p", { className: 'text-sm text-red-500 mt-1' }, (_e = errors.regAmbiental) === null || _e === void 0 ? void 0 : _e.message)),
                                    React.createElement("div", { className: "col-span-6 sm:col-span-4" },
                                        React.createElement("label", { htmlFor: "respTecnico", className: Empresa_module_scss_1["default"].fieldLabel }, "Respons\u00E1vel T\u00E9cnico"),
                                        React.createElement("input", __assign({}, register('respTecnico'), { 
                                            // value={state.respTecnico}
                                            // onChange={handleChange}
                                            type: "text", name: "respTecnico", id: "respTecnico", className: Empresa_module_scss_1["default"].fieldText })),
                                        React.createElement("p", { className: 'text-sm text-red-500 mt-1' }, (_f = errors.respTecnico) === null || _f === void 0 ? void 0 : _f.message)),
                                    React.createElement("div", { className: "col-span-6 sm:col-span-2" },
                                        React.createElement("label", { htmlFor: "creaResp", className: Empresa_module_scss_1["default"].fieldLabel }, "CREA Respons\u00E1vel"),
                                        React.createElement("input", __assign({}, register('creaResp'), { 
                                            // value={state.respTecnico}
                                            // onChange={handleChange}
                                            type: "text", name: "creaResp", id: "creaResp", className: Empresa_module_scss_1["default"].fieldText })),
                                        React.createElement("p", { className: 'text-sm text-red-500 mt-1' }, (_g = errors.creaResp) === null || _g === void 0 ? void 0 : _g.message)),
                                    React.createElement("div", { className: "col-span-6 w-48 lg:w-48" },
                                        React.createElement("label", { htmlFor: "CEP", className: Empresa_module_scss_1["default"].fieldLabel }, "CEP"),
                                        React.createElement("input", __assign({}, register('cep'), { type: "text", name: "cep", id: "cep", className: Empresa_module_scss_1["default"].fieldText }))),
                                    React.createElement("div", { className: "col-span-4" },
                                        React.createElement("label", { htmlFor: "street_address", className: Empresa_module_scss_1["default"].fieldLabel }, "Endere\u00E7o"),
                                        React.createElement("input", __assign({}, register('endereco'), { type: "text", name: "endereco", id: "endereco", className: Empresa_module_scss_1["default"].fieldText }))),
                                    React.createElement("div", { className: "col-span-2 sm:col-span-2" },
                                        React.createElement("label", { htmlFor: "country", className: Empresa_module_scss_1["default"].fieldLabel }, "Estado"),
                                        React.createElement("select", __assign({}, register('estado'), { id: "estado", name: "estado", className: "mt-1 relative flex w-24 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" }),
                                            React.createElement("option", null, "AP"),
                                            React.createElement("option", null, "BA"),
                                            React.createElement("option", null, "PA"),
                                            React.createElement("option", null, "MA")),
                                        React.createElement("p", { className: 'text-sm text-red-500 mt-1' }, (_h = errors.estado) === null || _h === void 0 ? void 0 : _h.message)),
                                    React.createElement("div", { className: "col-span-6 sm:col-span-6 lg:col-span-3" },
                                        React.createElement("label", { htmlFor: "cidade", className: Empresa_module_scss_1["default"].fieldLabel }, "Cidade"),
                                        React.createElement("input", __assign({}, register('municipio'), { type: "text", name: "municipio", id: "municipio", className: Empresa_module_scss_1["default"].fieldText }))),
                                    React.createElement("div", { className: "col-span-6 sm:col-span-3 lg:col-span-3" },
                                        React.createElement("label", { htmlFor: "complemento", className: Empresa_module_scss_1["default"].fieldLabel }, "Complemento"),
                                        React.createElement("input", __assign({}, register('complemento'), { type: "text", name: "complemento", id: "complemento", className: Empresa_module_scss_1["default"].fieldText }))))),
                            React.createElement("div", { className: "px-4 py-3 bg-gray-50 text-right sm:px-6" },
                                React.createElement("button", { type: "submit", className: "inline-flex w-40 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease duration-200" }, "Salvar")))))))));
};
exports["default"] = Empresa;
