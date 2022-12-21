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
exports.ArvoreController = void 0;
var stream_1 = require("stream");
var readline_1 = require("readline");
var ArvoreService_1 = require("../services/ArvoreService");
var prismaClient_1 = require("../database/prismaClient");
var ArvoreController = /** @class */ (function () {
    function ArvoreController() {
    }
    ArvoreController.prototype.store = function (request, response) {
        return __awaiter(this, void 0, Promise, function () {
            var data, arvore, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = request.body;
                        return [4 /*yield*/, ArvoreService_1["default"].create(data)];
                    case 1:
                        arvore = _a.sent();
                        return [2 /*return*/, response.json({
                                error: false,
                                arvore: arvore,
                                message: "\u00C1rvore cadastrada com SUCESSO!!!"
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
    ArvoreController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, Promise, function () {
            var id, arvore, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ArvoreService_1["default"].update(id, request.body)];
                    case 2:
                        arvore = _a.sent();
                        return [2 /*return*/, response.json({
                                error: false,
                                arvore: arvore,
                                message: "\u00C1rvore atualizada com SUCESSO!!!"
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, response.json({
                                error: true,
                                arvore: null,
                                message: error_2.message
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ArvoreController.prototype["delete"] = function (request, response) {
        return __awaiter(this, void 0, Promise, function () {
            var id, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ArvoreService_1["default"]["delete"](id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.status(200).json({
                                error: false,
                                message: 'Árvore deletada com Sucesso!!!'
                            })];
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
    ArvoreController.prototype.deleteArvores = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var ids;
            return __generator(this, function (_a) {
                ids = request.body.ids;
                ArvoreService_1["default"].deleteArvores(ids);
                return [2 /*return*/, response.json({
                        ids: ids,
                        message: 'Árvores deletadas com sucesso',
                        error: false
                    })];
            });
        });
    };
    ArvoreController.prototype.findAll = function (request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var utId, _b, data, perPage, page, skip, count, error_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        utId = request.params.utId;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ArvoreService_1["default"].getAll((_a = request.user) === null || _a === void 0 ? void 0 : _a.id, request.query, utId)];
                    case 2:
                        _b = _c.sent(), data = _b.data, perPage = _b.perPage, page = _b.page, skip = _b.skip, count = _b.count;
                        return [2 /*return*/, response.json({
                                error: false,
                                arvores: data,
                                perPage: perPage,
                                page: page,
                                skip: skip,
                                count: count,
                                message: null
                            })];
                    case 3:
                        error_4 = _c.sent();
                        return [2 /*return*/, response.json({
                                error: false,
                                arvores: [],
                                message: null
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ArvoreController.prototype.search = function (request, response) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var numero_arvore, utId, arvores, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        numero_arvore = request.query.numero_arvore;
                        utId = request.params.utId;
                        if (!numero_arvore) return [3 /*break*/, 2];
                        return [4 /*yield*/, ArvoreService_1["default"].search(numero_arvore, (_a = request.user) === null || _a === void 0 ? void 0 : _a.id, utId)];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, ArvoreService_1["default"].getAll((_b = request.user) === null || _b === void 0 ? void 0 : _b.id, request.query, utId)];
                    case 3:
                        _c = _d.sent();
                        _d.label = 4;
                    case 4:
                        arvores = _c;
                        return [2 /*return*/, response.json(arvores)];
                }
            });
        });
    };
    ArvoreController.prototype.findOne = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, arvore, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ArvoreService_1["default"].findById(id)];
                    case 2:
                        arvore = _a.sent();
                        return [2 /*return*/, response.json(arvore)];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, response.json(error_5.message)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ArvoreController.prototype.loadCSV = function (request, response) {
        var e_1, _a, e_2, _b;
        var _c;
        return __awaiter(this, void 0, void 0, function () {
            var arvores, upaId, upa, readableFile, arvoresLine, arvoresLine_1, arvoresLine_1_1, line, arvoreLineSplit, e_1_1, arvoresLine_2, arvoresLine_2_1, line, arvoreLineSplit, e_2_1, error_6;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        arvores = [];
                        upaId = request.query.upaId;
                        return [4 /*yield*/, prismaClient_1.prismaClient.upa.findUnique({
                                where: {
                                    id: upaId
                                }
                            })];
                    case 1:
                        upa = _d.sent();
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 27, , 28]);
                        if ((request === null || request === void 0 ? void 0 : request.file) === undefined) {
                            return [2 /*return*/, response.status(400).send("Please upload a CSV file!")];
                        }
                        readableFile = new stream_1.Readable().setEncoding('utf8');
                        readableFile.push((_c = request.file) === null || _c === void 0 ? void 0 : _c.buffer);
                        readableFile.push(null);
                        arvoresLine = readline_1["default"].createInterface({
                            input: readableFile
                        });
                        if (!((upa === null || upa === void 0 ? void 0 : upa.tipo) === 0)) return [3 /*break*/, 15];
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 8, 9, 14]);
                        arvoresLine_1 = __asyncValues(arvoresLine);
                        _d.label = 4;
                    case 4: return [4 /*yield*/, arvoresLine_1.next()];
                    case 5:
                        if (!(arvoresLine_1_1 = _d.sent(), !arvoresLine_1_1.done)) return [3 /*break*/, 7];
                        line = arvoresLine_1_1.value;
                        arvoreLineSplit = line.split(";");
                        arvores.push({
                            ut: arvoreLineSplit[0],
                            numero_arvore: arvoreLineSplit[1],
                            especie: arvoreLineSplit[2],
                            dap: arvoreLineSplit[3],
                            altura: arvoreLineSplit[4],
                            fuste: arvoreLineSplit[5],
                            ponto: arvoreLineSplit[6],
                            latitude: arvoreLineSplit[7],
                            longitude: arvoreLineSplit[8],
                            obs: arvoreLineSplit[9],
                            comentario: arvoreLineSplit[10]
                        });
                        _d.label = 6;
                    case 6: return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _d.trys.push([9, , 12, 13]);
                        if (!(arvoresLine_1_1 && !arvoresLine_1_1.done && (_a = arvoresLine_1["return"]))) return [3 /*break*/, 11];
                        return [4 /*yield*/, _a.call(arvoresLine_1)];
                    case 10:
                        _d.sent();
                        _d.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [3 /*break*/, 26];
                    case 15:
                        _d.trys.push([15, 20, 21, 26]);
                        arvoresLine_2 = __asyncValues(arvoresLine);
                        _d.label = 16;
                    case 16: return [4 /*yield*/, arvoresLine_2.next()];
                    case 17:
                        if (!(arvoresLine_2_1 = _d.sent(), !arvoresLine_2_1.done)) return [3 /*break*/, 19];
                        line = arvoresLine_2_1.value;
                        arvoreLineSplit = line.split(";");
                        arvores.push({
                            ut: arvoreLineSplit[0],
                            faixa: arvoreLineSplit[1],
                            numero_arvore: arvoreLineSplit[2],
                            especie: arvoreLineSplit[3],
                            dap: arvoreLineSplit[4],
                            altura: arvoreLineSplit[5],
                            fuste: arvoreLineSplit[6],
                            orient_x: arvoreLineSplit[7],
                            coord_x: arvoreLineSplit[8],
                            coord_y: arvoreLineSplit[9],
                            obs: arvoreLineSplit[10],
                            comentario: arvoreLineSplit[11]
                        });
                        _d.label = 18;
                    case 18: return [3 /*break*/, 16];
                    case 19: return [3 /*break*/, 26];
                    case 20:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 26];
                    case 21:
                        _d.trys.push([21, , 24, 25]);
                        if (!(arvoresLine_2_1 && !arvoresLine_2_1.done && (_b = arvoresLine_2["return"]))) return [3 /*break*/, 23];
                        return [4 /*yield*/, _b.call(arvoresLine_2)];
                    case 22:
                        _d.sent();
                        _d.label = 23;
                    case 23: return [3 /*break*/, 25];
                    case 24:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 25: return [7 /*endfinally*/];
                    case 26: return [2 /*return*/, response.json({
                            error: false,
                            arvores: arvores,
                            message: 'Árvores carregadas com sucesso!!!'
                        })];
                    case 27:
                        error_6 = _d.sent();
                        return [2 /*return*/, response.json(error_6.message)];
                    case 28: return [2 /*return*/];
                }
            });
        });
    };
    ArvoreController.prototype.importInventario = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var data, upaId, upa, checkData, _i, data_1, arvore, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = request.body;
                        upaId = request.query.upaId;
                        return [4 /*yield*/, prismaClient_1.prismaClient.upa.findUnique({
                                where: {
                                    id: upaId
                                }
                            })];
                    case 1:
                        upa = _a.sent();
                        checkData = Object.keys(data[0]);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, , 8]);
                        if (checkData.includes('faixa') && (upa === null || upa === void 0 ? void 0 : upa.tipo) === 0) {
                            return [2 /*return*/, response.json({
                                    error: true,
                                    message: 'Inventário diferente do tipo da UPA'
                                })];
                        }
                        _i = 0, data_1 = data;
                        _a.label = 3;
                    case 3:
                        if (!(_i < data_1.length)) return [3 /*break*/, 6];
                        arvore = data_1[_i];
                        return [4 /*yield*/, ArvoreService_1["default"].createByImport(arvore, upaId)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, response.json({
                            error: false,
                            message: 'Árvores importadas com sucesso!!!'
                        })];
                    case 7:
                        error_7 = _a.sent();
                        return [2 /*return*/, response.json(error_7.message)];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return ArvoreController;
}());
exports.ArvoreController = ArvoreController;
