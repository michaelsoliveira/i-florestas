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
var Select_1 = require("../Select");
var FormInput_1 = require("../FormInput");
var react_1 = require("react");
var router_1 = require("next/router");
var react_hook_form_1 = require("react-hook-form");
var alert_1 = require("../../services/alert");
var AuthContext_1 = require("../../contexts/AuthContext");
var react_2 = require("next-auth/react");
var LinkBack_1 = require("../LinkBack");
var Link_1 = require("../Link");
var hooks_1 = require("../../store/hooks");
var poaSlice_1 = require("../../store/poaSlice");
var ProjetoContext_1 = require("contexts/ProjetoContext");
var ModalContext_1 = require("contexts/ModalContext");
var styles_1 = require("../Utils/styles");
var outline_1 = require("@heroicons/react/outline");
var Execucao_1 = require("../responsavel/Execucao");
var Elaboracao_1 = require("../responsavel/Elaboracao");
var AddEdit = function (_a) {
    var id = _a.id;
    var _b = react_hook_form_1.useForm(), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.formState.errors, setValue = _b.setValue;
    var _c = react_1.useState(), upa = _c[0], setUpa = _c[1];
    var _d = react_1.useState(), respTecElab = _d[0], setRespTecElab = _d[1];
    var _e = react_1.useState(), respTecExec = _e[0], setRespTecExec = _e[1];
    var _f = react_1.useState(), respTecElabs = _f[0], setRespTecElabs = _f[1];
    var _g = react_1.useState(), upas = _g[0], setUpas = _g[1];
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var projeto = react_1.useContext(ProjetoContext_1.ProjetoContext).projeto;
    var umf = hooks_1.useAppSelector(function (state) { return state.umf; });
    var dispatch = hooks_1.useAppDispatch();
    var session = react_2.useSession().data;
    var router = router_1.useRouter();
    var isAddMode = !id;
    var showModal = ModalContext_1.useModalContext().showModal;
    var loadProjetos = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a, projetos, error, message, projeto_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(typeof session !== typeof undefined)) return [3 /*break*/, 3];
                    return [4 /*yield*/, client.get("projeto")];
                case 1:
                    response = _b.sent();
                    _a = response.data, projetos = _a.projetos, error = _a.error, message = _a.message;
                    return [4 /*yield*/, client.get('/projeto/active/get')];
                case 2:
                    projeto_1 = (_b.sent()).data.projeto;
                    if (error) {
                        console.log(message);
                    }
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); }, [session, client]);
    var respTecElabModal = function () {
        showModal({
            title: 'Novo Técnico Elaboração',
            type: 'submit', hookForm: 'hook-form', styleButton: styles_1.styles.greenButton, confirmBtn: 'Salvar',
            content: React.createElement(Elaboracao_1["default"], { reloadData: loadProjetos })
        });
    };
    var addModal = function () {
        showModal({ title: 'Novo Projeto', type: "submit", hookForm: 'hook-form', styleButton: styles_1.styles.greenButton, confirmBtn: 'Salvar', content: React.createElement(AddEdit, { reloadData: loadProjetos }) });
    };
    var respTecExecModal = function () {
        showModal({
            title: 'Novo Técnico Execução',
            type: 'submit', hookForm: 'hook-form', styleButton: styles_1.styles.greenButton, confirmBtn: 'Salvar',
            content: React.createElement(Execucao_1["default"], { reloadData: loadProjetos })
        });
    };
    var loadUpas = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var response, upas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/projeto/" + (projeto === null || projeto === void 0 ? void 0 : projeto.id) + "/upa?search=" + inputValue)];
                case 1:
                    response = _a.sent();
                    upas = response.data.upas;
                    callback(upas === null || upas === void 0 ? void 0 : upas.map(function (upa) { return ({
                        value: upa.id,
                        label: upa.descricao
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
    var loadRespTecElab = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var response, respTecElab;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/poa/" + (projeto === null || projeto === void 0 ? void 0 : projeto.id) + "/resp-tec-elab?search=" + inputValue)];
                case 1:
                    response = _a.sent();
                    respTecElab = response.data.respTecElab;
                    callback(upas === null || upas === void 0 ? void 0 : upas.map(function (upa) { return ({
                        value: respTecElab.id,
                        label: respTecElab.nome
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        function loadPoa() {
            return __awaiter(this, void 0, void 0, function () {
                var poa, _i, _a, _b, key, value;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!(!isAddMode && typeof session !== typeof undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, client.get("/poa/" + id)
                                // setUpa({
                                //     label: poa?.upa?.descricao,
                                //     value: poa?.upa?.id
                                // })
                            ];
                        case 1:
                            poa = (_c.sent()).data;
                            // setUpa({
                            //     label: poa?.upa?.descricao,
                            //     value: poa?.upa?.id
                            // })
                            for (_i = 0, _a = Object.entries(poa); _i < _a.length; _i++) {
                                _b = _a[_i], key = _b[0], value = _b[1];
                                switch (key) {
                                    // case 'equacao_volume': setValue('equacao_volume', upa.equacao_volume?.id);
                                    // break;
                                    // case 'spatial_ref_sys': setValue('spatial_ref_sys', upa.spatial_ref_sys?.srid);
                                    // break;
                                    // case 'umf': setValue('umf', upa.umf?.id);
                                    // break;
                                    // case 'tipo': setValue('tipo', upa?.tipo.toString());
                                    // break;
                                    default: {
                                        setValue(key, value, {
                                            shouldValidate: true,
                                            shouldDirty: true
                                        });
                                    }
                                }
                            }
                            _c.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        }
        loadPoa();
    }, [session, isAddMode, client, id, setValue]);
    react_1.useEffect(function () {
        var defaultOptions = function () { return __awaiter(void 0, void 0, void 0, function () {
            var upasResponse, upas_1, respTecElabResponse, respTecElabs_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof session !== typeof undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, client.get("/upa?orderBy=nome&order=asc")];
                    case 1:
                        upasResponse = _a.sent();
                        upas_1 = upasResponse.data.upas;
                        return [4 /*yield*/, client.get("/poa/resp-tec-elabs?orderBy=nome&order=asc")];
                    case 2:
                        respTecElabResponse = _a.sent();
                        respTecElabs_1 = respTecElabResponse.data.respTecElabs;
                        setUpas(upas_1);
                        setRespTecElabs(respTecElabs_1);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        defaultOptions();
    }, [session, client, projeto]);
    var selectedRespTecElab = function (data) {
        setRespTecElab(data);
        setValue('respTecElab', data === null || data === void 0 ? void 0 : data.value);
    };
    function onSubmit(data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, isAddMode
                            ? createPoa(data)
                            : updatePoa(id, data)];
                }
                catch (error) {
                    alert_1["default"].error(error.message);
                }
                return [2 /*return*/];
            });
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
    function getRespTecElabOptions() {
        return respTecElabs === null || respTecElabs === void 0 ? void 0 : respTecElabs.map(function (respTecElab) {
            return {
                label: respTecElab.nome,
                value: respTecElab.id
            };
        });
    }
    function createPoa(data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.post('poa', __assign({}, data))
                            .then(function (response) {
                            var _a = response.data, error = _a.error, message = _a.message;
                            if (!error) {
                                alert_1["default"].success(message);
                                router.push('/poa');
                            }
                            else {
                                alert_1["default"].error(message);
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function updatePoa(id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.put("/poa/" + id, __assign({}, data))
                            .then(function (response) {
                            var _a = response.data, error = _a.error, message = _a.message, poa = _a.poa;
                            if (!error) {
                                dispatch(poaSlice_1.setPoa({
                                    id: poa.id,
                                    descricao: poa.descricao,
                                    data_ultimo_plan: poa.data_ultimo_plan,
                                    pmfs: poa.pmfs
                                }));
                                alert_1["default"].success(message);
                                router.push('/poa');
                            }
                            else {
                                alert_1["default"].error(message);
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement("div", null,
        React.createElement("div", { className: "py-6 flex flex-col justify-center sm:py-4 bg-gray-50" },
            React.createElement("div", { className: "relative py-3 w-11/12 max-w-none lg:max-w-5xl mx-auto" },
                React.createElement("div", { className: 'flex flex-row border-x-2 border-t-2 border-green-600 text-white items-center justify-between shadow-lg bg-gradient-to-r from-green-700 to-green-500 py-4 sm:rounded-t-xl' },
                    React.createElement("div", null,
                        React.createElement(LinkBack_1.LinkBack, { href: "/poa", className: "flex flex-col relative left-0 ml-4" })),
                    React.createElement("div", null, isAddMode ? (React.createElement("h1", { className: 'text-xl' }, "Cadastrar POA")) : (React.createElement("h1", { className: 'text-xl' }, "Editar POA"))),
                    React.createElement("div", null)),
                React.createElement("div", { className: "relative p-8 bg-white shadow-sm sm:rounded-b-xl border-x-2 border-b-2 border-green-600" },
                    React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
                        React.createElement("div", { className: 'grid grid-cols-1 md:grid-cols-4 md:flex-row gap-4' },
                            React.createElement("div", { className: 'col-span-4 md:col-span-3 pr-4' },
                                React.createElement(FormInput_1.FormInput, { name: "descricao", label: "Descricao", register: register, errors: errors, rules: {
                                        required: 'O campo nome é obrigatório',
                                        minLength: {
                                            value: 3,
                                            message: 'Por favor, preencha o campo com no mínimo 3 caracteres'
                                        }
                                    }, id: "descricao" })),
                            React.createElement("div", { className: 'col-span-1' },
                                React.createElement(FormInput_1.FormInput, { id: "pmfs", name: "pmfs", label: "Protocolo PMFS", type: "text", register: register, errors: errors })),
                            React.createElement("div", { className: "border border-gray-200 p-4 rounded-md col-span-4 relative" },
                                React.createElement("span", { className: "text-gray-700 absolute -top-3 bg-white px-2 text-sm" }, "Respons\u00E1veis T\u00E9cnicos"),
                                React.createElement("div", { className: 'flex flex-col md:flex-row lg:space-x-4' },
                                    React.createElement("div", { className: "flex flex-row items-end" },
                                        React.createElement("div", null,
                                            React.createElement(Select_1.Select, { placeholder: 'CPF ou iniciais do nome', selectedValue: respTecElab, defaultOptions: getRespTecElabOptions(), options: loadRespTecElab, label: "pela Elabora\u00E7\u00E3o", callback: selectedRespTecElab })),
                                        React.createElement("div", { className: 'w-10' },
                                            React.createElement("span", { className: 'flex items-center justify-center h-9 w-9 bg-green-400 rounded-sm' },
                                                React.createElement(Link_1.Link, { href: "#", className: "", onClick: respTecElabModal },
                                                    React.createElement(outline_1.PlusIcon, { className: "h-6 w-6", "aria-hidden": "true" }))))),
                                    React.createElement("div", { className: "flex flex-row items-end" },
                                        React.createElement("div", null,
                                            React.createElement(Select_1.Select, { placeholder: 'CPF ou iniciais do nome', selectedValue: respTecElab, defaultOptions: getRespTecElabOptions(), options: loadRespTecElab, label: "pela Execu\u00E7\u00E3o", callback: selectedRespTecElab })),
                                        React.createElement("div", { className: 'w-10' },
                                            React.createElement("span", { className: 'flex items-center justify-center h-9 w-9 bg-green-400 rounded-sm' },
                                                React.createElement(Link_1.Link, { href: "#", className: "", onClick: respTecExecModal },
                                                    React.createElement(outline_1.PlusIcon, { className: "h-6 w-6", "aria-hidden": "true" })))))))),
                        React.createElement("div", { className: 'flex flex-col lg:flex-row space-y-4 mt-4 lg:space-y-0 space-x-0 lg:space-x-4' },
                            React.createElement("div", { className: 'lg:w-1/2 border border-gray-200 rounded-lg p-4' },
                                React.createElement("span", { className: "text-gray-700 py-2" }, "Detentor"),
                                React.createElement("div", { className: 'mt-2' })),
                            React.createElement("div", { className: 'lg:w-1/2 border border-gray-200 rounded-lg p-4' },
                                React.createElement("span", { className: "text-gray-700 py-2" }, "Proponente"),
                                React.createElement("div", { className: 'mt-2' }))),
                        React.createElement("div", { className: 'flex items-center justify-between pt-4' },
                            React.createElement(Link_1.Link, { href: "/poa", className: "text-center w-1/5 bg-gradient-to-r from-orange-600 to-orange-400 text-white p-3 rounded-md" }, "Voltar"),
                            React.createElement("button", { className: "w-1/5 bg-green-600 text-white p-3 rounded-md" }, "Salvar"))))))));
};
exports["default"] = AddEdit;
