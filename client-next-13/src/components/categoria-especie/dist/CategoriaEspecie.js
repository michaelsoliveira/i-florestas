'use client';
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
var FormInput_1 = require("../FormInput");
var react_1 = require("react");
var router_1 = require("next/router");
var react_hook_form_1 = require("react-hook-form");
var alert_1 = require("@/services/alert");
var AuthContext_1 = require("@/context/AuthContext");
var react_2 = require("next-auth/react");
var Link_1 = require("../Link");
var ProjetoContext_1 = require("@/context/ProjetoContext");
var hooks_1 = require("@/redux/hooks");
var ModalContext_1 = require("@/context/ModalContext");
var classnames_1 = require("classnames");
var CategoriaEspecie = react_1.forwardRef(function AddEdit(_a, ref) {
    var id = _a.id, isModal = _a.isModal, loadCategorias = _a.loadCategorias;
    var _b = react_hook_form_1.useForm(), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.formState.errors, setValue = _b.setValue;
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var session = react_2.useSession().data;
    var router = router_1.useRouter();
    var isAddMode = !id;
    var projeto = react_1.useContext(ProjetoContext_1.ProjetoContext).projeto;
    var poa = hooks_1.useAppSelector(function (state) { return state.poa; });
    var _c = ModalContext_1.useModalContext(), showModal = _c.showModal, hideModal = _c.hideModal, store = _c.store;
    var _d = react_1.useState(1), fuste = _d[0], setFuste = _d[1];
    react_1.useEffect(function () {
        function loadCategoria() {
            return __awaiter(this, void 0, void 0, function () {
                var categoria, _i, _a, _b, key, value;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!(!isAddMode && typeof session !== typeof undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, client.get("/categoria/" + id)];
                        case 1:
                            categoria = (_c.sent()).data;
                            setFuste(categoria === null || categoria === void 0 ? void 0 : categoria.criterio_fuste);
                            for (_i = 0, _a = Object.entries(categoria); _i < _a.length; _i++) {
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
        loadCategoria();
    }, [session, isAddMode, client, id, setValue]);
    function onSubmit(data) {
        return __awaiter(this, void 0, void 0, function () {
            var preparedData;
            return __generator(this, function (_a) {
                preparedData = __assign(__assign({}, data), { id_projeto: projeto === null || projeto === void 0 ? void 0 : projeto.id, id_poa: poa.id, criterio_fuste: fuste });
                try {
                    return [2 /*return*/, isAddMode
                            ? createCategoria(preparedData)
                            : updateCategoria(id, preparedData)];
                }
                catch (error) {
                    alert_1["default"].error(error.message);
                }
                return [2 /*return*/];
            });
        });
    }
    function createCategoria(data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    client.post('categoria', data)
                        .then(function (response) {
                        var _a = response.data, error = _a.error, message = _a.message;
                        if (!error) {
                            alert_1["default"].success(message);
                            if (!isModal)
                                router.push('/categoria-especie');
                        }
                        else {
                            alert_1["default"].error(message);
                        }
                    })["catch"](function (error) {
                        alert_1["default"].error(error);
                    });
                }
                catch (e) {
                    console.log(e);
                }
                return [2 /*return*/];
            });
        });
    }
    function updateCategoria(id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                client.put("/categoria/" + id, data)
                    .then(function (response) {
                    var _a = response.data, error = _a.error, message = _a.message;
                    if (!error) {
                        alert_1["default"].success(message);
                        if (!isModal) {
                            router.push('/categoria-especie');
                        }
                        else {
                            loadCategorias();
                            hideModal();
                        }
                    }
                    else {
                        alert_1["default"].error(message);
                    }
                });
                return [2 /*return*/];
            });
        });
    }
    return (React.createElement("div", { className: classnames_1["default"](!isModal && 'shadow-sm border border-gray-400 rounded-b-xl', 'relative p-8 bg-white') },
        React.createElement("form", { onSubmit: handleSubmit(onSubmit), ref: ref },
            React.createElement("div", { className: 'w-full' },
                React.createElement(FormInput_1.FormInput, { name: "nome", label: "Nome", register: register, errors: errors, rules: {
                        required: 'O campo nome é obrigatório',
                        minLength: {
                            value: 3,
                            message: 'Por favor, preencha o campo com no mínimo 3 caracteres'
                        }
                    }, id: "nome", className: "pb-4" })),
            React.createElement("div", { className: 'flex flex-col md:flex-row space-x-0 md:space-x-4' },
                React.createElement("div", { className: "flex flex-col w-auto pt-2" },
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "perPage", className: "px-1 text-sm" }, "Fuste")),
                    React.createElement("select", { value: fuste, onChange: function (e) { return setFuste(Number(e.target.value)); }, id: "fuste", className: "w-24 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" },
                        React.createElement("option", { value: "1" }, "1"),
                        React.createElement("option", { value: "2" }, "1, 2"),
                        React.createElement("option", { value: "3" }, "1, 2 e 3"))),
                React.createElement("div", null,
                    React.createElement(FormInput_1.FormInput, { id: "criterio_dminc", name: "criterio_dminc", label: "Di\u00E2metro Min\u00EDmo", type: "number", register: register, errors: errors, rules: {
                            valueAsNumber: true,
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Por favor entre com um valor numérico'
                            }
                        }, className: "pb-4" })),
                React.createElement("div", null,
                    React.createElement(FormInput_1.FormInput, { id: "criterio_dmaxc", name: "criterio_dmaxc", label: "Di\u00E2metro M\u00E1ximo", type: "number", register: register, errors: errors, rules: {
                            valueAsNumber: true,
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Por favor entre com um valor numérico'
                            }
                        }, className: "pb-4" }))),
            React.createElement("div", { className: 'flex flex-col md:flex-row space-x-0 md:space-x-4' },
                React.createElement("div", null,
                    React.createElement(FormInput_1.FormInput, { id: "criterio_n_min", name: "criterio_n_min", label: "M\u00EDnimo / 100ha", type: "number", register: register, errors: errors, rules: {
                            valueAsNumber: true,
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Por favor entre com um valor numérico'
                            }
                        }, className: "pb-4" })),
                React.createElement("div", null,
                    React.createElement(FormInput_1.FormInput, { id: "criterio_perc_min", name: "criterio_perc_min", label: "Percentual Explor\u00E1vel", type: "number", register: register, errors: errors, rules: {
                            valueAsNumber: true,
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Por favor entre com um valor numérico'
                            }
                        }, className: "pb-4" }))),
            React.createElement("div", { className: 'flex flex-row justify-between md:justify-start space-x-4 md:space-x-4' },
                React.createElement("div", null,
                    React.createElement(FormInput_1.FormInput, { id: "criterio_altura", name: "criterio_altura", label: "Altura m\u00E1xima da \u00E1rvore", type: "number", register: register, errors: errors, rules: {
                            valueAsNumber: true,
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Por favor entre com um valor numérico'
                            }
                        }, className: "pb-4 w-full" })),
                React.createElement("div", null,
                    React.createElement(FormInput_1.FormInput, { id: "criterio_volume", name: "criterio_volume", label: "Vol. m\u00E1ximo da \u00E1rvore", type: "number", register: register, errors: errors, rules: {
                            valueAsNumber: true,
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Por favor entre com um valor numérico'
                            }
                        }, className: "pb-4" }))),
            React.createElement("div", { className: "flex justify-starter py-4" },
                React.createElement("input", __assign({}, register('preservar'), { className: "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer", type: "checkbox", value: "", id: "preservar" })),
                " Remanescente ?"),
            (!isModal) && (React.createElement("div", { className: 'flex items-center justify-between pt-4' },
                React.createElement(Link_1.Link, { href: "/categoria-especie", className: "text-center w-2/5 bg-gray-200 text-gray-800 p-3 rounded-md" }, "Voltar"),
                React.createElement("button", { className: "w-2/5 bg-green-600 text-white p-3 rounded-md" }, "Salvar"))))));
});
exports["default"] = CategoriaEspecie;
