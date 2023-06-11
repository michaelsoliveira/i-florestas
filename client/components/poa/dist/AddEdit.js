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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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
    var _c = react_1.useState(), respTecElab = _c[0], setRespTecElab = _c[1];
    var _d = react_1.useState(), respTecExec = _d[0], setRespTecExec = _d[1];
    var _e = react_1.useState(), respTecElabs = _e[0], setRespTecElabs = _e[1];
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var dispatch = hooks_1.useAppDispatch();
    var session = react_2.useSession().data;
    var router = router_1.useRouter();
    var isAddMode = !id;
    var showModal = ModalContext_1.useModalContext().showModal;
    var _f = react_1.useState(), umfs = _f[0], setUmfs = _f[1];
    var _g = react_1.useState(), upas = _g[0], setUpas = _g[1];
    var _h = react_1.useState(), uts = _h[0], setUts = _h[1];
    var umf = hooks_1.useAppSelector(function (state) { return state.umf; });
    var upa = hooks_1.useAppSelector(function (state) { return state.upa; });
    var ut = hooks_1.useAppSelector(function (state) { return state.ut; });
    var _j = react_1.useState(), selectedUmf = _j[0], setSelectedUmf = _j[1];
    var _k = react_1.useState(), selectedUpa = _k[0], setSelectedUpa = _k[1];
    var _l = react_1.useState([]), checkedUts = _l[0], setCheckedUts = _l[1];
    var projeto = react_1.useContext(ProjetoContext_1.ProjetoContext).projeto;
    var loadPoas = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('Submited Data');
            return [2 /*return*/];
        });
    }); }, []);
    var formRef = react_1.createRef();
    var dataResponseElab = function (data) {
        if (formRef.current) {
            formRef.current.submit();
        }
    };
    var returnData = function (data) {
        console.log(data);
    };
    var styleDelBtn = 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
    // const arvoreById = useCallback((id?: string) => {
    //     return currentArvores.find((arvore: any) => arvore.id === id)
    // }, [currentArvores])
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
    var loadUts = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, uts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/ut?orderBy=nome&order=asc&upa=" + upa.id)];
                case 1:
                    response = _a.sent();
                    uts = response.data.uts;
                    setUts(uts);
                    return [2 /*return*/];
            }
        });
    }); }, [upa, uts]);
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
        var upaSelected, response, uts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    upaSelected = upas.find(function (u) { return u.id === upa.value; });
                    setSelectedUpa(upa);
                    return [4 /*yield*/, client.get("/ut?orderBy=nome&order=asc&upa=" + upaSelected.id)];
                case 1:
                    response = _a.sent();
                    uts = response.data.uts;
                    setUts(uts);
                    return [2 /*return*/];
            }
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
    var handleSelectUt = function (evt) {
        var utId = evt.target.value;
        if (!checkedUts.includes(utId)) {
            setCheckedUts(__spreadArrays(checkedUts, [utId]));
        }
        else {
            setCheckedUts(checkedUts.filter(function (checkedUtId) {
                return checkedUtId !== utId;
            }));
        }
    };
    var handleSelectAllUts = function () {
        if ((checkedUts === null || checkedUts === void 0 ? void 0 : checkedUts.length) < (uts === null || uts === void 0 ? void 0 : uts.length)) {
            setCheckedUts(uts.map(function (_a) {
                var id = _a.id;
                return id;
            }));
        }
        else {
            setCheckedUts([]);
        }
    };
    var responseTecElab = function (data) {
        console.log(data);
    };
    var responseTecExec = function (data) {
        console.log(data);
    };
    var respTecElabModal = function () {
        showModal({
            title: 'Novo Técnico Elaboração',
            size: 'max-w-4xl',
            type: 'submit', hookForm: 'hook-form', styleButton: styles_1.styles.greenButton, confirmBtn: 'Salvar',
            content: React.createElement("div", null,
                React.createElement(Elaboracao_1["default"], { responseData: responseTecElab }))
        });
    };
    var respTecExecModal = function () {
        showModal({
            title: 'Novo Técnico Elaboração',
            size: 'max-w-4xl',
            type: 'submit', hookForm: 'hook-form', styleButton: styles_1.styles.greenButton, confirmBtn: 'Salvar',
            content: React.createElement("div", null,
                React.createElement(Execucao_1["default"], { responseData: responseTecExec }))
        });
    };
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
                            defaultUmfsOptions();
                            defaultUpasOptions();
                            if (!(!isAddMode && typeof session !== typeof undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, client.get("/poa/" + id)];
                        case 1:
                            poa = (_c.sent()).data;
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
        loadUts();
    }, [session, isAddMode, client, id, setValue, defaultUmfsOptions, defaultUpasOptions]);
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
                        return [4 /*yield*/, client.get("/poa/resp-tec-elab?orderBy=nome&order=asc")];
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
                        React.createElement("div", { className: 'grid grid-cols-1 md:grid-cols-6 md:flex-row gap-4' },
                            React.createElement("div", { className: 'col-span-6 md:col-span-3' },
                                React.createElement(FormInput_1.FormInput, { name: "descricao", label: "Descricao", register: register, errors: errors, rules: {
                                        required: 'O campo nome é obrigatório',
                                        minLength: {
                                            value: 3,
                                            message: 'Por favor, preencha o campo com no mínimo 3 caracteres'
                                        }
                                    }, id: "descricao" })),
                            React.createElement("div", { className: 'col-span-2' },
                                React.createElement(FormInput_1.FormInput, { id: "pmfs", name: "pmfs", label: "Protocolo PMFS", type: "text", register: register, errors: errors })),
                            React.createElement("div", { className: 'col-span-1' },
                                React.createElement(FormInput_1.FormInput, { id: "corte_maximo", name: "corte_maximo", label: "Corte M\u00E1ximo", type: "text", register: register, errors: errors })),
                            React.createElement("div", { className: "border border-gray-200 p-4 rounded-md col-span-6 relative" },
                                React.createElement("span", { className: "text-gray-700 absolute -top-3 bg-white px-2 text-sm" }, "Respons\u00E1veis T\u00E9cnicos"),
                                React.createElement("div", { className: 'flex flex-col md:flex-row lg:space-x-4' },
                                    React.createElement("div", { className: "flex flex-row items-end" },
                                        React.createElement("div", { className: 'w-[300px]' },
                                            React.createElement(Select_1.Select, { placeholder: 'CPF ou iniciais do nome', selectedValue: respTecElab, defaultOptions: getRespTecElabOptions(), options: loadRespTecElab, label: "pela Elabora\u00E7\u00E3o", callback: selectedRespTecElab })),
                                        React.createElement("div", { className: 'w-10 mb-[1px]' },
                                            React.createElement("span", { className: 'flex items-center justify-center h-9 w-9 bg-green-400 rounded-r-md' },
                                                React.createElement(Link_1.Link, { href: "#", className: "", onClick: respTecElabModal },
                                                    React.createElement(outline_1.PlusIcon, { className: "h-6 w-6", "aria-hidden": "true" }))))),
                                    React.createElement("div", { className: "flex flex-row items-end" },
                                        React.createElement("div", { className: 'w-[300px]' },
                                            React.createElement(Select_1.Select, { placeholder: 'CPF ou iniciais do nome', selectedValue: respTecElab, defaultOptions: getRespTecElabOptions(), options: loadRespTecElab, label: "pela Execu\u00E7\u00E3o", callback: selectedRespTecElab })),
                                        React.createElement("div", { className: 'w-10 mb-[1px]' },
                                            React.createElement("span", { className: 'flex items-center justify-center h-9 w-9 bg-green-400 rounded-r-md' },
                                                React.createElement(Link_1.Link, { href: "#", className: "", onClick: respTecExecModal },
                                                    React.createElement(outline_1.PlusIcon, { className: "h-6 w-6", "aria-hidden": "true" })))))))),
                        React.createElement("div", { className: 'flex flex-col lg:flex-row space-y-4 mt-2 lg:space-y-0 space-x-0 lg:space-x-4' },
                            React.createElement("div", { className: 'border border-gray-200 rounded-lg p-4 w-full' },
                                React.createElement("span", { className: "text-gray-700 py-2" }, "Detentor"))),
                        React.createElement("div", { className: 'border border-gray-200 rounded-lg p-4 mt-5 relative' },
                            React.createElement("span", { className: "text-gray-700 py-2 absolute -top-5 bg-white px-2" }, "UTs"),
                            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4" },
                                React.createElement("div", null,
                                    React.createElement(Select_1.Select, { initialData: {
                                            label: 'Selecione UMF...',
                                            value: ''
                                        }, selectedValue: selectedUmf, defaultOptions: getUmfsDefaultOptions(), options: loadUmfs, label: "UMF:", callback: function (e) { selectUmf(e); } })),
                                React.createElement("div", null,
                                    React.createElement(Select_1.Select, { initialData: {
                                            label: 'Selecione UPA...',
                                            value: ''
                                        }, selectedValue: selectedUpa, defaultOptions: getUpasDefaultOptions(), options: loadUpas, label: "UPA:", callback: function (e) { selectUpa(e); } })),
                                React.createElement("div", { id: 'uts' },
                                    React.createElement("table", { className: "min-w-full divide-y divide-gray-200" },
                                        React.createElement("thead", { className: "bg-gray-50" },
                                            React.createElement("tr", null,
                                                React.createElement("th", { className: "w-1/12" },
                                                    React.createElement("div", { className: "flex justify-center" },
                                                        React.createElement("input", { checked: (checkedUts === null || checkedUts === void 0 ? void 0 : checkedUts.length) === (uts === null || uts === void 0 ? void 0 : uts.length), onChange: handleSelectAllUts, className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer", type: "checkbox", value: "", id: "flexCheckDefault" }))),
                                                React.createElement("th", { className: "w-4/12" },
                                                    React.createElement("div", { className: "flex flex-row items-center px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" }, "UTs")))),
                                        React.createElement("tbody", { className: "bg-white divide-y divide-gray-200" }, uts === null || uts === void 0 ? void 0 : uts.map(function (ut) { return (React.createElement("tr", { key: ut.id },
                                            React.createElement("td", { className: "flex justify-center" },
                                                React.createElement("input", { value: ut === null || ut === void 0 ? void 0 : ut.id, checked: checkedUts.includes(ut === null || ut === void 0 ? void 0 : ut.id), onChange: handleSelectUt, id: "poaId", type: "checkbox", className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" })),
                                            React.createElement("td", { className: "px-3 py-2 whitespace-nowrap" },
                                                React.createElement("div", { className: "flex flex-col items-starter" },
                                                    React.createElement("div", { className: "text-sm font-medium text-gray-900" }, ut === null || ut === void 0 ? void 0 : ut.numero_ut))))); })))))),
                        React.createElement("div", { className: 'flex items-center justify-between pt-4' },
                            React.createElement(Link_1.Link, { href: "/poa", className: "text-center w-1/5 bg-gray-100 transition-all delay-150 hover:bg-gray-200 duration-200 p-3 rounded-md" }, "Voltar"),
                            React.createElement("button", { className: "w-1/5 bg-green-600 text-white p-3 rounded-md transition-all delay-150 hover:bg-green-700 duration-200" }, "Salvar"))))))));
};
exports["default"] = AddEdit;
