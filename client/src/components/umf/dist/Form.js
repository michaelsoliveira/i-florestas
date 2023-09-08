"use client";
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
exports.getStaticProps = exports.getStaticPaths = void 0;
var FormInput_1 = require("@/components/utils/FormInput");
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var react_hook_form_1 = require("react-hook-form");
var alert_1 = require("@/services/alert");
var AuthContext_1 = require("@/context/AuthContext");
var Link_1 = require("@/components/utils/Link");
var hooks_1 = require("@/redux/hooks");
var umfSlice_1 = require("@/redux/features/umfSlice");
var SelectEstado_1 = require("@/components/utils/SelectEstado");
var LinkBack_1 = require("../utils/LinkBack");
var next_auth_1 = require("next-auth");
var authOptions_1 = require("@/lib/authOptions");
var getSession = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, next_auth_1.getServerSession(authOptions_1.authOptions)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getData = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var session, url, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getSession()];
            case 1:
                session = _a.sent();
                url = process.env.NEXT_PUBLIC_API_URL + "/umf/" + id;
                return [4 /*yield*/, fetch(url, {
                        next: {
                            revalidate: 0
                        },
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + (session === null || session === void 0 ? void 0 : session.accessToken),
                            'Content-Type': 'application/json'
                        }
                    }).then(function (response) { return response.json(); })];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data];
        }
    });
}); };
function getStaticPaths(_a) {
    var params = _a.params;
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getData(params.id)];
                case 1:
                    data = _b.sent();
                    return [2 /*return*/, data.map(function (umf) { return ({
                            id: umf.id
                        }); })];
            }
        });
    });
}
exports.getStaticPaths = getStaticPaths;
function getStaticProps(_a) {
    var params = _a.params;
    return __awaiter(this, void 0, void 0, function () {
        var umf;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getData(params.id)];
                case 1:
                    umf = _b.sent();
                    return [2 /*return*/, { props: { umf: umf } }];
            }
        });
    });
}
exports.getStaticProps = getStaticProps;
var Form = function (_a) {
    var umf = _a.umf;
    var _b = react_hook_form_1.useForm(), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.formState.errors, setValue = _b.setValue;
    var _c = react_1.useState(), estado = _c[0], setEstado = _c[1];
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    // const { data: session } = useSession()
    var router = navigation_1.useRouter();
    var isAddMode = !umf;
    var dispatch = hooks_1.useAppDispatch();
    react_1.useEffect(function () {
        function loadUmf() {
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function () {
                var _i, _d, _e, key, value;
                return __generator(this, function (_f) {
                    if (!isAddMode) {
                        setEstado({
                            label: (_a = umf === null || umf === void 0 ? void 0 : umf.estado) === null || _a === void 0 ? void 0 : _a.nome,
                            value: (_b = umf === null || umf === void 0 ? void 0 : umf.estado) === null || _b === void 0 ? void 0 : _b.id
                        });
                        for (_i = 0, _d = Object.entries(umf); _i < _d.length; _i++) {
                            _e = _d[_i], key = _e[0], value = _e[1];
                            if (key === 'estado') {
                                setValue('estado', (_c = umf.estado) === null || _c === void 0 ? void 0 : _c.id);
                            }
                            else {
                                setValue(key, value, {
                                    shouldValidate: true,
                                    shouldDirty: true
                                });
                            }
                        }
                    }
                    return [2 /*return*/];
                });
            });
        }
        loadUmf();
    }, [isAddMode, client, setValue, setEstado, umf]);
    var selectedEstado = function (data) {
        setEstado(data);
        setValue('estado', data === null || data === void 0 ? void 0 : data.value);
    };
    function onSubmit(data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, isAddMode
                            ? createUmf(data)
                            : updateUmf(umf === null || umf === void 0 ? void 0 : umf.id, data)];
                }
                catch (error) {
                    alert_1["default"].error(error.message);
                }
                return [2 /*return*/];
            });
        });
    }
    function createUmf(data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.post('umf', data)
                            .then(function (response) {
                            var _a = response.data, error = _a.error, message = _a.message, umf = _a.umf;
                            dispatch(umfSlice_1.setUmf({
                                id: umf.id,
                                nome: umf.nome
                            }));
                            if (!error) {
                                alert_1["default"].success(message);
                                router.push('/umf');
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
    function updateUmf(id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.put("/umf/" + id, data)
                            .then(function (response) {
                            var _a = response.data, error = _a.error, message = _a.message, umf = _a.umf;
                            if (!error) {
                                alert_1["default"].success(message);
                                router.push('/umf');
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
    return (React.createElement("div", { className: "relative py-3 w-11/12 max-w-none lg:max-w-2xl mx-auto" },
        React.createElement("div", { className: 'flex flex-row items-center justify-between border border-custom-green text-white shadow-lg bg-custom-green py-4 sm:rounded-t-xl' },
            React.createElement("div", null,
                React.createElement(LinkBack_1.LinkBack, { href: "/umf", className: "flex flex-col relative left-0 ml-4" })),
            React.createElement("div", null, !umf ? (React.createElement("h1", { className: 'text-xl' }, "Cadastrar UMF")) : (React.createElement("h1", { className: 'text-xl' }, "Editar UMF"))),
            React.createElement("div", null)),
        React.createElement("div", { className: "relative p-8 bg-white shadow-sm sm:rounded-b-xl border-x border-b border-custom-green" },
            React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
                React.createElement("div", { className: 'w-full' },
                    React.createElement(FormInput_1.FormInput, { name: "nome", label: "Nome", register: register, errors: errors, rules: {
                            required: 'O campo nome é obrigatório',
                            minLength: {
                                value: 3,
                                message: 'Por favor, preencha o campo com no mínimo 3 caracteres'
                            }
                        }, id: "nome", className: "pb-4" })),
                React.createElement("div", { className: 'flex flex-col md:flex-row space-x-0 md:space-x-4' },
                    React.createElement("div", { className: 'w-full' },
                        React.createElement(FormInput_1.FormInput, { id: "localizacao", name: "localizacao", label: "Localiza\u00E7\u00E3o", type: "text", register: register, errors: errors, className: "pb-4" }))),
                React.createElement("div", { className: 'flex flex-col md:flex-row space-x-0 md:space-x-4' },
                    React.createElement("div", { className: 'w-8/12' },
                        React.createElement(FormInput_1.FormInput, { id: "municipio", name: "municipio", label: "Munic\u00EDpio", type: "text", register: register, errors: errors, className: "pb-4" })),
                    React.createElement("div", { className: 'w-4/12 pt-1' },
                        React.createElement(SelectEstado_1["default"], { value: (estado === null || estado === void 0 ? void 0 : estado.value) && estado, callback: selectedEstado }))),
                React.createElement("div", { className: 'flex items-center justify-between pt-4' },
                    React.createElement(Link_1.Link, { href: "/umf", className: "text-center w-2/5 bg-gray-light text-gray-700 p-3 rounded-md" }, "Voltar"),
                    React.createElement("button", { className: "w-2/5 bg-custom-green text-white p-3 rounded-md" }, "Salvar"))))));
};
exports["default"] = Form;