'use client';
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ChangeActive = void 0;
var formik_1 = require("formik");
var react_1 = require("react");
var AuthContext_1 = require("@/context/AuthContext");
var ModalContext_1 = require("@/context/ModalContext");
var Select_1 = require("../Select");
var react_2 = require("next-auth/react");
var ProjetoContext_1 = require("@/context/ProjetoContext");
var hooks_1 = require("@/redux/hooks");
var Yup = require("yup");
var poaSlice_1 = require("@/redux/features/poaSlice");
exports.ChangeActive = react_1.forwardRef(function ChangeActive(_a, ref) {
    var _this = this;
    var callback = _a.callback;
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var hideModal = ModalContext_1.useModalContext().hideModal;
    var session = react_2.useSession().data;
    var _b = react_1.useState(), selectedPoa = _b[0], setSelectedPoa = _b[1];
    var _c = react_1.useState(), poas = _c[0], setPoas = _c[1];
    var _d = react_1.useContext(ProjetoContext_1.ProjetoContext), projeto = _d.projeto, setProjeto = _d.setProjeto;
    var dispath = hooks_1.useAppDispatch();
    var poa = hooks_1.useAppSelector(function (state) { return state.poa; });
    var loadPoas = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var response, _a, poas_1, error, message, poa_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(typeof session !== typeof undefined)) return [3 /*break*/, 3];
                    return [4 /*yield*/, client.get("/poa")];
                case 1:
                    response = _b.sent();
                    _a = response.data, poas_1 = _a.poas, error = _a.error, message = _a.message;
                    return [4 /*yield*/, client.get('/poa/active/get')];
                case 2:
                    poa_1 = (_b.sent()).data.poa;
                    if (poa_1) {
                        dispath(poaSlice_1.setPoa({
                            id: poa_1 === null || poa_1 === void 0 ? void 0 : poa_1.id,
                            descricao: poa_1 === null || poa_1 === void 0 ? void 0 : poa_1.descricao,
                            data_ultimo_plan: poa_1 === null || poa_1 === void 0 ? void 0 : poa_1.data_ultimo_plan,
                            pmfs: poa_1 === null || poa_1 === void 0 ? void 0 : poa_1.pmfs
                        }));
                    }
                    else {
                        dispath(poaSlice_1.setPoa({
                            id: '',
                            descricao: 'Padrão',
                            data_ultimo_plan: null,
                            pmfs: ''
                        }));
                    }
                    setPoas(__spreadArrays([{ descricao: 'Padrão', id: '' }], poas_1));
                    if (poa_1) {
                        setSelectedPoa({
                            label: poa_1 === null || poa_1 === void 0 ? void 0 : poa_1.descricao,
                            value: poa_1 === null || poa_1 === void 0 ? void 0 : poa_1.id
                        });
                    }
                    else {
                        setSelectedPoa({
                            label: 'Padrão',
                            value: ''
                        });
                    }
                    if (error) {
                        console.log(message);
                    }
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); }, [session, client, dispath]);
    react_1.useEffect(function () {
        var isLoaded = false;
        if (!isLoaded) {
            loadPoas()
                .then(function () {
                isLoaded = true;
            });
        }
        return function () {
            isLoaded = false;
        };
    }, [loadPoas]);
    var loadOptions = function (inputValue, callback) { return __awaiter(_this, void 0, void 0, function () {
        var response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/poa?search=" + inputValue + "&order=asc&orderBy=descricao")];
                case 1:
                    response = _a.sent();
                    json = response.data;
                    callback(json === null || json === void 0 ? void 0 : json.map(function (poa) { return ({
                        value: poa.id,
                        label: poa.nome
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
    function getPoasDefaultOptions() {
        return poas === null || poas === void 0 ? void 0 : poas.map(function (poa) {
            return {
                label: poa.descricao,
                value: poa.id
            };
        });
    }
    function handleSubmit(dataRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var data, poa;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.post("/poa/active", { poaId: dataRequest === null || dataRequest === void 0 ? void 0 : dataRequest.poa.value })];
                    case 1:
                        data = (_a.sent()).data;
                        poa = data.poa;
                        if (poa) {
                            dispath(poaSlice_1.setPoa({
                                id: poa === null || poa === void 0 ? void 0 : poa.id,
                                descricao: poa === null || poa === void 0 ? void 0 : poa.descricao,
                                data_ultimo_plan: poa === null || poa === void 0 ? void 0 : poa.data_ultimo_plan,
                                pmfs: poa === null || poa === void 0 ? void 0 : poa.pmfs
                            }));
                        }
                        else {
                            dispath(poaSlice_1.setPoa({
                                id: '',
                                descricao: 'Padrão',
                                data_ultimo_plan: null,
                                pmfs: ''
                            }));
                        }
                        hideModal();
                        return [2 /*return*/];
                }
            });
        });
    }
    var validationSchema = Yup.object().shape({
        poa: Yup.array().nullable()
    });
    return (React.createElement("div", null,
        React.createElement(formik_1.Formik, { innerRef: ref, initialValues: {
                poa: {}
            }, validationSchema: validationSchema, onSubmit: function (values, _a) {
                var setSubmitting = _a.setSubmitting;
                handleSubmit(values);
            } }, function (_a) {
            var setFieldValue = _a.setFieldValue;
            return (React.createElement("div", { className: "relative py-3 w-full max-w-xl mx-auto h-full" },
                React.createElement("div", { className: 'pb-4' },
                    React.createElement(formik_1.Field, { name: "poa" }, function () { return (React.createElement(Select_1.Select, { placeholder: 'Entre com as iniciais...', selectedValue: selectedPoa, defaultOptions: getPoasDefaultOptions(), options: loadOptions, callback: function (data) {
                            setSelectedPoa(data);
                            setFieldValue('poa', data);
                        } })); })),
                React.createElement("div", null,
                    React.createElement("span", { className: 'font-semibold' },
                        "Poa Ativo: ",
                        (poa === null || poa === void 0 ? void 0 : poa.descricao) ? poa === null || poa === void 0 ? void 0 : poa.descricao : selectedPoa === null || selectedPoa === void 0 ? void 0 : selectedPoa.descricao))));
        })));
});
exports["default"] = exports.ChangeActive;
