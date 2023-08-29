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
exports.__esModule = true;
var AuthContext_1 = require("@/context/AuthContext");
var react_1 = require("next-auth/react");
var react_2 = require("react");
var Select_1 = require("../Select");
var SelectEstado = function (_a) {
    var callback = _a.callback, value = _a.value;
    var client = react_2.useContext(AuthContext_1.AuthContext).client;
    var session = react_1.useSession().data;
    var _b = react_2.useState(), estados = _b[0], setEstados = _b[1];
    var loadOptions = function (inputValue, callback) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get("/estado/search/q?nome=" + inputValue)];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    callback(data === null || data === void 0 ? void 0 : data.map(function (estado) { return ({
                        value: estado.id,
                        label: estado.nome
                    }); }));
                    return [2 /*return*/];
            }
        });
    }); };
    function getEstadosDefaultOptions() {
        return estados === null || estados === void 0 ? void 0 : estados.map(function (estado) {
            return {
                label: estado.nome,
                value: estado.id
            };
        });
    }
    react_2.useEffect(function () {
        var defaultOptions = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, estados_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof session !== typeof undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, client.get("/estado?orderBy=nome&order=asc")];
                    case 1:
                        response = _a.sent();
                        estados_1 = response.data.estados;
                        setEstados(estados_1);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        defaultOptions();
    }, [session, client, value]);
    return (React.createElement("div", null,
        React.createElement(Select_1.Select, { initialData: {
                label: 'Selecione um Estado',
                value: ''
            }, placeholder: 'Selecione um Estado', selectedValue: value, defaultOptions: getEstadosDefaultOptions(), options: loadOptions, label: "Estado", callback: callback })));
};
exports["default"] = SelectEstado;
