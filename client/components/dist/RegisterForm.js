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
exports.RegisterForm = void 0;
/* eslint-disable react-hooks/rules-of-hooks */
var formik_1 = require("formik");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var hooks_1 = require("../store/hooks");
var userSlice_1 = require("../store/userSlice");
var Yup = require("yup");
var messageSlice_1 = require("../store/messageSlice");
require("react-toastify/dist/ReactToastify.css");
var alert_1 = require("../services/alert");
var react_2 = require("next-auth/react");
var router_1 = require("next/router");
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(' ');
}
exports.RegisterForm = function (_a) {
    var styles = _a.styles, empresaId = _a.empresaId, userId = _a.userId, redirect = _a.redirect;
    var dispatch = hooks_1.useAppDispatch();
    var router = router_1.useRouter();
    var user = react_redux_1.useSelector(function (state) { return state.user.data; });
    var errorMessage = react_redux_1.useSelector(function (state) { return state.user.errorMessage; });
    var isAddMode = !userId;
    var message = react_redux_1.useSelector(function (state) { return state.message; }).message;
    var validationSchema = Yup.object().shape({
        isAddMode: Yup.boolean(),
        username: Yup.string()
            .test("len", "O nome de usuário tem que ter entre 3 e 20 caracteres.", function (val) {
            return val &&
                val.toString().length >= 3 &&
                val.toString().length <= 20;
        })
            .required("Campo obrigatório!"),
        email: Yup.string()
            .email("Este não é um email válido.")
            .required("Campo obrigatório!"),
        password: Yup.string()
            .when('isAddMode', {
            is: true,
            then: Yup.string().required('Password is required').min(6, 'A senha deve possuir no mínimo 6 caracteres')
        }),
        confirmPassword: Yup.string()
            .when('password', function (password, schema) {
            if (password || isAddMode)
                return schema.required('A confirmação de senha é obrigatória');
        })
            .oneOf([Yup.ref('password')], 'As senhas informadas não coincidem')
    });
    function handleRegister(data) {
        return __awaiter(this, void 0, void 0, function () {
            var preparedData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        preparedData = __assign(__assign({}, data), { empresaId: empresaId });
                        return [4 /*yield*/, dispatch(userSlice_1.create(preparedData))
                                .unwrap()
                                .then(function (responseData) { return __awaiter(_this, void 0, void 0, function () {
                                var email, password, res;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!redirect) return [3 /*break*/, 2];
                                            email = data.email, password = data.password;
                                            return [4 /*yield*/, react_2.signIn('credentials', {
                                                    redirect: false,
                                                    email: email,
                                                    password: password
                                                }).then(function (response) {
                                                    console.log(response);
                                                    if (response.ok) {
                                                        alert_1["default"].success('Login realizado com sucesso');
                                                        router.push('/');
                                                    }
                                                    else {
                                                        alert_1["default"].warn('Email ou senha inválidos, verifique os dados e tente novamente!');
                                                    }
                                                })["catch"](function (e) {
                                                    console.log(e);
                                                })];
                                        case 1:
                                            res = _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            console.log(responseData);
                                            alert_1["default"].success('Usuário cadastrado com SUCESSO!');
                                            router.push("/empresa/" + empresaId + "/users");
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })["catch"](function (error) {
                                alert_1["default"].warn("Error: " + error.message);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    react_1.useEffect(function () {
        messageSlice_1.setMessage('Loading...');
        return function () {
        };
    }, []);
    return (React.createElement("div", null,
        React.createElement(formik_1.Formik, { initialValues: {
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                provider: '',
                idProvider: '',
                isAddMode: isAddMode
            }, validationSchema: validationSchema, onSubmit: function (values, _a) {
                var setSubmitting = _a.setSubmitting;
                handleRegister(values);
            } }, function (props) {
            var values = props.values, touched = props.touched, errors = props.errors, dirty = props.dirty, isSubmitting = props.isSubmitting, handleChange = props.handleChange, handleBlur = props.handleBlur, handleSubmit = props.handleSubmit, handleReset = props.handleReset, setValues = props.setValues;
            return (React.createElement(formik_1.Form, null,
                React.createElement("label", { className: styles.label, htmlFor: "username" }, "Nome"),
                React.createElement(formik_1.Field, { className: styles.field, id: "username", name: "username", placeholder: "Michael" }),
                React.createElement(formik_1.ErrorMessage, { className: 'text-sm text-red-500 mt-1', name: "username", component: "div" }),
                React.createElement("label", { className: styles.label, htmlFor: "email" }, "Email"),
                React.createElement(formik_1.Field, { className: styles.field, id: "email", name: "email", placeholder: "john@acme.com", type: "email" }),
                React.createElement(formik_1.ErrorMessage, { className: 'text-sm text-red-500 mt-1', name: "email", component: "div" }),
                isAddMode && (React.createElement(React.Fragment, null,
                    React.createElement("label", { className: styles.label, htmlFor: "password" }, "Senha"),
                    React.createElement(formik_1.Field, { type: "password", className: styles.field, id: "password", name: "password", placeholder: "******" }),
                    React.createElement(formik_1.ErrorMessage, { className: 'text-sm text-red-500 mt-1', name: "password", component: "div" }),
                    React.createElement("label", { className: styles.label, htmlFor: "password" }, "Confirmar a Senha"),
                    React.createElement(formik_1.Field, { type: "password", className: styles.field, id: "confirmPassword", name: "confirmPassword", placeholder: "******" }),
                    React.createElement(formik_1.ErrorMessage, { className: 'text-sm text-red-500 mt-1', name: "confirmPassword", component: "div" }))),
                React.createElement("div", { className: 'mt-8 flex flex-row justify-end w-full items-center' },
                    React.createElement("button", { className: classNames(styles.button, 'w-full'), type: "submit" }, "Cadastrar"))));
        })));
};
