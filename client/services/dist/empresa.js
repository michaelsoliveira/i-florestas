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
var auth_header_1 = require("./auth-header");
var axios_1 = require("./axios");
var EmpresaService = /** @class */ (function () {
    function EmpresaService() {
        this.initializeHeaders();
    }
    EmpresaService.getInstance = function () {
        if (!EmpresaService.instance) {
            EmpresaService.instance = new EmpresaService();
        }
        return EmpresaService.instance;
    };
    EmpresaService.prototype.initializeHeaders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, auth_header_1["default"]()];
                    case 1:
                        _a.headers = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EmpresaService.prototype.create = function (dataRequest) {
        return __awaiter(this, void 0, Promise, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.apiClient().post("/empresa", dataRequest, this.headers)];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, {
                                data: data.empresa,
                                errorMessage: data.errorMessage,
                                error: data.error
                            }];
                }
            });
        });
    };
    EmpresaService.prototype.update = function (id, dataRequest) {
        return __awaiter(this, void 0, Promise, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.apiClient().put("/empresa/" + id, dataRequest, this.headers)];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, {
                                data: data === null || data === void 0 ? void 0 : data.empresa,
                                errorMessage: data.errorMessage,
                                error: data.error
                            }];
                }
            });
        });
    };
    EmpresaService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.apiClient().get("/empresa", this.headers)
                            .then(function (response) {
                            var data = {
                                data: response.data.empresas,
                                errorMessage: response.data.errorMessage,
                                error: response.data.error
                            };
                            return data;
                        })["catch"](function (error) {
                            return Promise.reject(error);
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    EmpresaService.prototype.getById = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.apiClient().get("/empresa/" + id, this.headers)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                data: response === null || response === void 0 ? void 0 : response.data,
                                errorMessage: "",
                                error: false
                            }];
                }
            });
        });
    };
    EmpresaService.prototype._delete = function (id, ctx) {
        return __awaiter(this, void 0, Promise, function () {
            var headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, auth_header_1["default"]()];
                    case 1:
                        headers = _a.sent();
                        return [4 /*yield*/, axios_1.apiClient()["delete"]("/empresa/" + id, headers)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return EmpresaService;
}());
exports["default"] = EmpresaService.getInstance();
