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
exports.ChangePassword = void 0;
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var FormInput_1 = require("../FormInput");
var yup_1 = require("@hookform/resolvers/yup");
var Yup = require("yup");
var AuthContext_1 = require("../../contexts/AuthContext");
var alert_1 = require("../../services/alert");
var router_1 = require("next/router");
exports.ChangePassword = function () {
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var router = router_1.useRouter();
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var oldPassword, newPassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    oldPassword = data.oldPassword, newPassword = data.newPassword;
                    return [4 /*yield*/, client.post('/users/change-password', { oldPassword: oldPassword, newPassword: newPassword })
                            .then(function (response) {
                            var _a = response.data, message = _a.message, error = _a.error;
                            if (!error) {
                                alert_1["default"].success(message);
                                router.push('/');
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
    }); };
    var validationSchema = Yup.object().shape({
        oldPassword: Yup.string()
            .required('Senha anterior é obrigatório'),
        newPassword: Yup.string()
            .required('Nova senha é obrigatório')
            .min(4, 'Senha deve ter no minímo 4 caracteres'),
        confirmPassword: Yup.string()
            .required('Cofirmação da senha é obrigatório')
            .oneOf([Yup.ref('newPassword')], 'Confirmação da senha não corresponde')
    });
    var validationOptions = { resolver: yup_1.yupResolver(validationSchema) };
    var _a = react_hook_form_1.useForm(validationOptions), handleSubmit = _a.handleSubmit, register = _a.register, errors = _a.formState.errors;
    return (React.createElement("div", { className: "flex flex-col items-center justify-between py-6 rounded-md bg-gray-100" },
        React.createElement("div", { className: "relative py-3 w-11/12 max-w-xl sm:mx-auto" },
            React.createElement("div", { className: "relative p-8 bg-white shadow-sm sm:rounded-xl" },
                React.createElement("form", { className: "w-full", onSubmit: handleSubmit(onSubmit) },
                    React.createElement(FormInput_1.FormInput, { name: "oldPassword", label: "Senha Atual", register: register, errors: errors, type: "password", 
                        // rules={ {required: 'O campo nome é obrigatório'} }
                        // hasError={!!errors.nome}
                        // errorMessage={errors.nome?.message}
                        // forwardRef={inputNome}
                        id: "nome", className: "pb-4" }),
                    React.createElement(FormInput_1.FormInput, { id: "newPassword", name: "newPassword", label: "Nova Senha", register: register, errors: errors, type: "password", 
                        // rules={
                        //     {
                        //         minLength: {
                        //             value: 3,
                        //             message: 'Por favor, preencha o campo com no mínimo 3 caracteres'
                        //         }
                        //     }}
                        className: "pb-4" }),
                    React.createElement(FormInput_1.FormInput, { id: "confirmPassword", name: "confirmPassword", label: "Confirma\u00E7\u00E3o", register: register, errors: errors, type: "password", 
                        // rules={
                        //     {
                        //         minLength: {
                        //             value: 3,
                        //             message: 'Por favor, preencha o campo com no mínimo 3 caracteres'
                        //         }
                        //     }}
                        className: "pb-4" }),
                    React.createElement("button", { className: "w-full bg-green-600 text-white p-3 rounded-md" }, "Salvar"))))));
};
