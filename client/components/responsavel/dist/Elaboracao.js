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
exports.Elaboracao = void 0;
var react_hook_form_1 = require("react-hook-form");
var FormInput_1 = require("@/components/FormInput");
var react_1 = require("react");
var alert_1 = require("../../services/alert");
var AuthContext_1 = require("contexts/AuthContext");
var ModalContext_1 = require("contexts/ModalContext");
exports.Elaboracao = function (_a) {
    var reloadData = _a.reloadData, data = _a.data;
    var _b = react_hook_form_1.useForm(), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.formState.errors, setValue = _b.setValue, reset = _b.reset;
    var isAddMode = !data;
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var hideModal = ModalContext_1.useModalContext().hideModal;
    var loadData = react_1.useCallback(function () {
        if (data) {
            for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                setValue(key, value, {
                    shouldValidate: true,
                    shouldDirty: true
                });
            }
        }
        else {
            reset();
        }
    }, [data, reset, setValue]);
    react_1.useEffect(function () {
        loadData();
    }, [loadData]);
    function onSubmit(data) {
        return __awaiter(this, void 0, void 0, function () {
            var preparedData;
            return __generator(this, function (_a) {
                preparedData = __assign({}, data);
                try {
                    return [2 /*return*/, isAddMode
                            ? createProjeto(preparedData)
                            : updateProjeto(data === null || data === void 0 ? void 0 : data.id, preparedData)];
                }
                catch (error) {
                    alert_1["default"].error(error.message);
                }
                return [2 /*return*/];
            });
        });
    }
    function createProjeto(data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.post("projeto", data)
                            .then(function (response) {
                            var _a = response.data, error = _a.error, message = _a.message;
                            if (!error) {
                                alert_1["default"].success(message);
                                hideModal();
                                reloadData();
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
    function updateProjeto(id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.put("/projeto/" + id, data)
                            .then(function (response) {
                            var _a = response.data, error = _a.error, message = _a.message;
                            if (!error) {
                                alert_1["default"].success(message);
                                hideModal();
                                reloadData();
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
    return (React.createElement("div", { className: 'mt-4 p-4 border-gray-200 border rounded-md' },
        React.createElement("form", { onSubmit: handleSubmit(onSubmit), id: "hook-form" },
            React.createElement("div", { className: 'w-full' },
                React.createElement(FormInput_1.FormInput, { layout: 'floatLabel', id: "nome", name: "nome", label: "Nome", register: register, errors: errors, rules: {
                        required: 'O campo nome é obrigatório',
                        minLength: {
                            value: 3,
                            message: 'Por favor, preencha o campo com no mínimo 3 caracteres'
                        }
                    }, className: "lg:w-full pb-4" })),
            React.createElement(FormInput_1.FormInput, { layout: 'floatLabel', id: "crea", name: "crea", label: "crea", register: register, errors: errors, rules: {
                    required: 'O campo nome é obrigatório',
                    minLength: {
                        value: 3,
                        message: 'Por favor, preencha o campo com no mínimo 3 caracteres'
                    }
                }, className: "lg:w-24 pb-4" }))));
};
exports["default"] = exports.Elaboracao;
