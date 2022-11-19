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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
exports.EspecieController = void 0;
var especie_service_1 = require("../services/especie.service");
var stream_1 = require("stream");
var readline_1 = require("readline");
var ProjetoService_1 = require("../services/ProjetoService");
var EspecieController = /** @class */ (function () {
    function EspecieController() {
    }
    EspecieController.prototype.store = function (request, response) {
        return __awaiter(this, void 0, Promise, function () {
            var especie, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, especie_service_1["default"].create(request.body)];
                    case 1:
                        especie = _a.sent();
                        return [2 /*return*/, response.json({
                                error: false,
                                especie: especie,
                                message: "Esp\u00E9cie " + especie.nome + " cadastrada com SUCESSO!!!"
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, response.json({
                                error: true,
                                especie: null,
                                message: error_1.message
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EspecieController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, Promise, function () {
            var id, especie, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, especie_service_1["default"].update(id, request.body)];
                    case 2:
                        especie = _a.sent();
                        return [2 /*return*/, response.json({
                                error: false,
                                especie: especie,
                                message: "Especie " + especie.nome + " atualizada com SUCESSO!!!"
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, response.json({
                                error: true,
                                especie: null,
                                message: error_2.message
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EspecieController.prototype["delete"] = function (request, response) {
        return __awaiter(this, void 0, Promise, function () {
            var id, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, especie_service_1["default"]["delete"](id).then(function (data) {
                                return response.status(200).json({
                                    error: false,
                                    message: 'A Espécie foi deletada com Sucesso!!!'
                                });
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, response.json({
                                error: true,
                                especie: null,
                                message: error_3.message
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EspecieController.prototype.deleteEspecies = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var ids;
            return __generator(this, function (_a) {
                ids = request.body.ids;
                especie_service_1["default"].deleteEspecies(ids);
                return [2 /*return*/, response.json({
                        ids: ids,
                        message: 'Espécies deletadas com sucesso',
                        error: false
                    })];
            });
        });
    };
    EspecieController.prototype.findAll = function (request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, data, perPage, orderBy, order, page, skip, count, error_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, especie_service_1["default"].getAll(request.query, (_a = request.user) === null || _a === void 0 ? void 0 : _a.id)];
                    case 1:
                        _b = _c.sent(), data = _b.data, perPage = _b.perPage, orderBy = _b.orderBy, order = _b.order, page = _b.page, skip = _b.skip, count = _b.count;
                        return [2 /*return*/, response.json({
                                error: false,
                                especies: data,
                                orderBy: orderBy,
                                order: order,
                                perPage: perPage,
                                page: page,
                                skip: skip,
                                count: count,
                                message: null
                            })];
                    case 2:
                        error_4 = _c.sent();
                        return [2 /*return*/, response.json({
                                error: false,
                                especies: [],
                                message: null
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EspecieController.prototype.findOne = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, especie, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, especie_service_1["default"].findById(id)];
                    case 2:
                        especie = _a.sent();
                        return [2 /*return*/, response.json(especie)];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, response.json(error_5.message)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EspecieController.prototype.importEspecie = function (request, response) {
        var e_1, _a, e_2, _b;
        var _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var especies, projeto, projetoId, readableFile, especiesLine, especiesLine_1, especiesLine_1_1, line, especieLineSplit, e_1_1, especies_1, especies_1_1, especie, e_2_1, error_6;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        especies = [];
                        return [4 /*yield*/, ProjetoService_1.getProjeto((_c = request.user) === null || _c === void 0 ? void 0 : _c.id)];
                    case 1:
                        projeto = _e.sent();
                        projetoId = projeto ? projeto === null || projeto === void 0 ? void 0 : projeto.id : '';
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 27, , 28]);
                        if ((request === null || request === void 0 ? void 0 : request.file) === undefined) {
                            return [2 /*return*/, response.status(400).send("Please upload a CSV file!")];
                        }
                        readableFile = new stream_1.Readable().setEncoding('utf8');
                        readableFile.push((_d = request.file) === null || _d === void 0 ? void 0 : _d.buffer);
                        readableFile.push(null);
                        especiesLine = readline_1["default"].createInterface({
                            input: readableFile
                        });
                        _e.label = 3;
                    case 3:
                        _e.trys.push([3, 8, 9, 14]);
                        especiesLine_1 = __asyncValues(especiesLine);
                        _e.label = 4;
                    case 4: return [4 /*yield*/, especiesLine_1.next()];
                    case 5:
                        if (!(especiesLine_1_1 = _e.sent(), !especiesLine_1_1.done)) return [3 /*break*/, 7];
                        line = especiesLine_1_1.value;
                        especieLineSplit = line.split(";");
                        especies.push({
                            nome: especieLineSplit[0],
                            nome_orgao: especieLineSplit[1],
                            nome_cientifico: especieLineSplit[2]
                        });
                        _e.label = 6;
                    case 6: return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _e.trys.push([9, , 12, 13]);
                        if (!(especiesLine_1_1 && !especiesLine_1_1.done && (_a = especiesLine_1["return"]))) return [3 /*break*/, 11];
                        return [4 /*yield*/, _a.call(especiesLine_1)];
                    case 10:
                        _e.sent();
                        _e.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14:
                        _e.trys.push([14, 20, 21, 26]);
                        especies_1 = __asyncValues(especies);
                        _e.label = 15;
                    case 15: return [4 /*yield*/, especies_1.next()];
                    case 16:
                        if (!(especies_1_1 = _e.sent(), !especies_1_1.done)) return [3 /*break*/, 19];
                        especie = especies_1_1.value;
                        if (!(especies.indexOf(especie) > 0)) return [3 /*break*/, 18];
                        return [4 /*yield*/, especie_service_1["default"].create(especie, projetoId)];
                    case 17:
                        _e.sent();
                        _e.label = 18;
                    case 18: return [3 /*break*/, 15];
                    case 19: return [3 /*break*/, 26];
                    case 20:
                        e_2_1 = _e.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 26];
                    case 21:
                        _e.trys.push([21, , 24, 25]);
                        if (!(especies_1_1 && !especies_1_1.done && (_b = especies_1["return"]))) return [3 /*break*/, 23];
                        return [4 /*yield*/, _b.call(especies_1)];
                    case 22:
                        _e.sent();
                        _e.label = 23;
                    case 23: return [3 /*break*/, 25];
                    case 24:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 25: return [7 /*endfinally*/];
                    case 26: return [2 /*return*/, response.json({
                            error: false,
                            especies: especies,
                            message: 'Espécies importadas com sucesso!!!'
                        })];
                    case 27:
                        error_6 = _e.sent();
                        return [2 /*return*/, response.json(error_6.message)];
                    case 28: return [2 /*return*/];
                }
            });
        });
    };
    return EspecieController;
}());
exports.EspecieController = EspecieController;
