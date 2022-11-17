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
exports.AddEdit = void 0;
var formik_1 = require("formik");
var react_1 = require("react");
var hooks_1 = require("../../store/hooks");
var Yup = require("yup");
require("react-toastify/dist/ReactToastify.css");
var alert_1 = require("../../services/alert");
var react_2 = require("next-auth/react");
var router_1 = require("next/router");
var AuthContext_1 = require("contexts/AuthContext");
var Select_1 = require("../Select");
exports.AddEdit = react_1.forwardRef(function AddEdit(_a, ref) {
    var _this = this;
    var styles = _a.styles, equacaoId = _a.equacaoId, sendForm = _a.sendForm, projetoId = _a.projetoId, eqModelos = _a.eqModelos;
    var dispatch = hooks_1.useAppDispatch();
    var router = router_1.useRouter();
    var isAddMode = !equacaoId;
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var _b = react_1.useState(), selectedEqModelo = _b[0], setSelectedEqModelo = _b[1];
    var session = react_2.useSession().data;
    var loadEqModelosOptions = function (inputValue, callback) { return __awaiter(_this, void 0, void 0, function () {
        var response, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/eq-modelo/search?nome=" + inputValue)];
                case 1:
                    response = _a.sent();
                    json = response.data;
                    callback(json === null || json === void 0 ? void 0 : json.map(function (eqModelo) { return ({
                        value: eqModelo.id,
                        label: eqModelo.nome
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
    function getEqModelosDefaultOptions() {
        return eqModelos === null || eqModelos === void 0 ? void 0 : eqModelos.map(function (eqModelo) {
            return {
                label: eqModelo.nome,
                value: eqModelo.id
            };
        });
    }
    var validationSchema = Yup.object().shape({
        isAddMode: Yup.boolean(),
        nome: Yup.string()
            .test("len", "O nome tem que ter entre 3 e 20 caracteres.", function (val) {
            return val &&
                val.toString().length >= 3 &&
                val.toString().length <= 20;
        })
            .required("Campo obrigatório!"),
        expressao: Yup.string()
            .test("len", "A expressão tem que ter entre 3 e 40 caracteres.", function (val) {
            return val &&
                val.toString().length >= 3 &&
                val.toString().length <= 20;
        })
            .required("Campo obrigatório!")
    });
    function handleRegister(data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isAddMode) return [3 /*break*/, 2];
                        return [4 /*yield*/, client.post("/eq-volume", data)
                                .then(function (response) {
                                var _a = response.data, error = _a.error, message = _a.message;
                                if (error) {
                                    alert_1["default"].error(message);
                                }
                                else {
                                    alert_1["default"].success(message);
                                    sendForm();
                                    // hideModal()
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, client.put("/eq-volume/" + equacaoId, data)
                            .then(function (response) {
                            var _a = response.data, error = _a.error, message = _a.message;
                            if (error) {
                                alert_1["default"].error(message);
                            }
                            else {
                                alert_1["default"].success(message);
                                sendForm();
                            }
                        })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement("div", null,
        React.createElement(formik_1.Formik, { innerRef: ref, initialValues: {
                nome: '',
                expressao: '',
                observacao: '',
                isAddMode: isAddMode,
                id_eqModelo: '',
                id_projeto: ''
            }, validationSchema: validationSchema, onSubmit: function (values, _a) {
                var setSubmitting = _a.setSubmitting;
                handleRegister(values);
            } }, function (_a) {
            var errors = _a.errors, touched = _a.touched, isSubmitting = _a.isSubmitting, setFieldValue = _a.setFieldValue, setFieldTouched = _a.setFieldTouched, setTouched = _a.setTouched, values = _a.values;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            var loadEquacao = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!isAddMode) return [3 /*break*/, 2];
                            return [4 /*yield*/, client.get("/eq-modelo/" + projetoId + "/" + equacaoId)
                                    .then(function (_a) {
                                    var data = _a.data;
                                    setSelectedEqModelo({
                                        label: data === null || data === void 0 ? void 0 : data.nome,
                                        value: data === null || data === void 0 ? void 0 : data.id
                                    });
                                    var fields = ['nome', 'expressao', 'observacao'];
                                    setFieldValue('id_eqModulo', data === null || data === void 0 ? void 0 : data.id);
                                    fields.forEach(function (field) { return setFieldValue(field, data[field], false); });
                                })];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); }, [setFieldValue]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            react_1.useEffect(function () {
                setFieldValue('id_projeto', projetoId);
                loadEquacao();
            }, [loadEquacao, setFieldValue, values]);
            return (React.createElement("div", { className: "flex flex-col justify-center w-full" },
                React.createElement("div", { className: "relative h-full mx-0" },
                    React.createElement("div", { className: "relative pt-3 px-4 w-full" },
                        React.createElement(formik_1.Form, null,
                            React.createElement("div", { className: 'lg:grid lg:grid-cols-2 lg:gap-4' },
                                React.createElement("div", null,
                                    React.createElement("label", { className: styles.label, htmlFor: "nome" }, "Nome"),
                                    React.createElement(formik_1.Field, { className: styles.field, id: "nome", name: "nome", placeholder: "Michael" }),
                                    React.createElement(formik_1.ErrorMessage, { className: 'text-sm text-red-500 mt-1', name: "nome", component: "div" })),
                                React.createElement("div", null,
                                    React.createElement("label", { className: styles.label, htmlFor: "expressao" }, "Express\u00E3o"),
                                    React.createElement(formik_1.Field, { className: styles.field, id: "expressao", name: "expressao" }),
                                    React.createElement(formik_1.ErrorMessage, { className: 'text-sm text-red-500 mt-1', name: "expressao", component: "div" })),
                                React.createElement("div", null,
                                    React.createElement("label", { className: styles.label, htmlFor: "observacao" }, "Observa\u00E7\u00E3o"),
                                    React.createElement(formik_1.Field, { className: styles.field, id: "observacao", name: "observacao" }),
                                    React.createElement(formik_1.ErrorMessage, { className: 'text-sm text-red-500 mt-1', name: "observacao", component: "div" })),
                                React.createElement("div", { className: 'py-4' },
                                    React.createElement(formik_1.Field, { name: "id_eqModelo" }, function () { return (React.createElement(Select_1.Select, { initialData: {
                                            label: 'Entre com as iniciais...',
                                            value: ''
                                        }, selectedValue: selectedEqModelo, defaultOptions: getEqModelosDefaultOptions(), options: loadEqModelosOptions, label: "Pesquisar Equa\u00E7\u00E3o Modelo", callback: function (value) {
                                            setFieldValue('id_eqModelo', value === null || value === void 0 ? void 0 : value.value);
                                            setSelectedEqModelo(value);
                                        } })); }),
                                    React.createElement(formik_1.ErrorMessage, { className: 'text-sm text-red-500 mt-1', name: "id_eqModelo", component: "div" }))))))));
        })));
});
