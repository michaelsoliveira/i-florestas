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
var prismaClient_1 = require("../database/prismaClient");
var ProjetoService_1 = require("./ProjetoService");
var UtService = /** @class */ (function () {
    function UtService() {
    }
    UtService.prototype.create = function (dataRequest, userId) {
        return __awaiter(this, void 0, Promise, function () {
            var numero_ut, area_util, area_total, quantidade_faixas, comprimento_faixas, largura_faixas, azimute, quadrante, latitude, longitude, id_upa, upa, utExists, preparedData, data, ut;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        numero_ut = dataRequest.numero_ut, area_util = dataRequest.area_util, area_total = dataRequest.area_total, quantidade_faixas = dataRequest.quantidade_faixas, comprimento_faixas = dataRequest.comprimento_faixas, largura_faixas = dataRequest.largura_faixas, azimute = dataRequest.azimute, quadrante = dataRequest.quadrante, latitude = dataRequest.latitude, longitude = dataRequest.longitude, id_upa = dataRequest.id_upa;
                        return [4 /*yield*/, prismaClient_1.prismaClient.upa.findUnique({ where: { id: id_upa } })];
                    case 1:
                        upa = _a.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.ut.findFirst({
                                where: {
                                    AND: {
                                        numero_ut: parseInt(numero_ut),
                                        upa: {
                                            id: id_upa
                                        }
                                    }
                                }
                            })];
                    case 2:
                        utExists = _a.sent();
                        if (utExists) {
                            throw new Error('Já existe uma Ut cadastrada com este número');
                        }
                        preparedData = {
                            numero_ut: parseInt(numero_ut),
                            area_util: parseFloat(area_util),
                            area_total: parseFloat(area_total),
                            latitude: parseFloat(latitude),
                            longitude: parseFloat(longitude),
                            upa: {
                                connect: {
                                    id: id_upa
                                }
                            }
                        };
                        data = (upa === null || upa === void 0 ? void 0 : upa.tipo) === 1 ? __assign(__assign({}, preparedData), { quantidade_faixas: parseInt(quantidade_faixas), comprimento_faixas: parseInt(comprimento_faixas), largura_faixas: parseInt(largura_faixas), azimute: parseFloat(azimute), quadrante: parseInt(quadrante) }) : preparedData;
                        return [4 /*yield*/, prismaClient_1.prismaClient.ut.create({ data: data })];
                    case 3:
                        ut = _a.sent();
                        return [2 /*return*/, ut];
                }
            });
        });
    };
    UtService.prototype.update = function (id, dataRequest) {
        return __awaiter(this, void 0, Promise, function () {
            var numero_ut, area_util, area_total, quantidade_faixas, comprimento_faixas, largura_faixas, azimute, quadrante, latitude, longitude, id_upa, preparedData, upa, data, ut;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        numero_ut = dataRequest.numero_ut, area_util = dataRequest.area_util, area_total = dataRequest.area_total, quantidade_faixas = dataRequest.quantidade_faixas, comprimento_faixas = dataRequest.comprimento_faixas, largura_faixas = dataRequest.largura_faixas, azimute = dataRequest.azimute, quadrante = dataRequest.quadrante, latitude = dataRequest.latitude, longitude = dataRequest.longitude, id_upa = dataRequest.id_upa;
                        preparedData = {
                            numero_ut: parseInt(numero_ut),
                            area_util: parseFloat(area_util),
                            area_total: parseFloat(area_total),
                            latitude: parseFloat(latitude),
                            longitude: parseFloat(longitude),
                            upa: {
                                connect: {
                                    id: id_upa
                                }
                            }
                        };
                        return [4 /*yield*/, prismaClient_1.prismaClient.upa.findUnique({ where: { id: id_upa } })];
                    case 1:
                        upa = _a.sent();
                        data = (upa === null || upa === void 0 ? void 0 : upa.tipo) === 1 ? __assign(__assign({}, preparedData), { quantidade_faixas: parseInt(quantidade_faixas), comprimento_faixas: parseInt(comprimento_faixas), largura_faixas: parseInt(largura_faixas), azimute: parseFloat(azimute), quadrante: parseInt(quadrante) }) : preparedData;
                        return [4 /*yield*/, prismaClient_1.prismaClient.ut.update({
                                where: {
                                    id: id
                                },
                                data: data
                            })];
                    case 2:
                        ut = _a.sent();
                        return [2 /*return*/, ut];
                }
            });
        });
    };
    UtService.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.ut["delete"]({
                            where: {
                                id: id
                            }
                        })
                            .then(function (response) {
                            console.log(response);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UtService.prototype.getAll = function (userId, query) {
        return __awaiter(this, void 0, Promise, function () {
            var projeto, perPage, page, search, upa, skip, where, _a, uts, total;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ProjetoService_1.getProjeto(userId)];
                    case 1:
                        projeto = _b.sent();
                        perPage = query.perPage, page = query.page, search = query.search, upa = query.upa;
                        skip = (page - 1) * perPage;
                        where = search ?
                            {
                                AND: [{
                                        upa: {
                                            umf: {
                                                projeto: {
                                                    id: projeto === null || projeto === void 0 ? void 0 : projeto.id
                                                }
                                            }
                                        }
                                    }, { id_upa: upa },
                                    { numero_ut: parseInt(search)
                                    }]
                            } : {
                            AND: [{
                                    upa: {
                                        umf: {
                                            projeto: {
                                                id: projeto === null || projeto === void 0 ? void 0 : projeto.id
                                            }
                                        }
                                    }
                                }, { id_upa: upa }]
                        };
                        return [4 /*yield*/, prismaClient_1.prismaClient.$transaction([
                                prismaClient_1.prismaClient.ut.findMany({
                                    where: where,
                                    take: perPage ? parseInt(perPage) : 10,
                                    skip: skip ? skip : 0,
                                    orderBy: {
                                        numero_ut: 'asc'
                                    },
                                    include: {
                                        upa: false
                                    }
                                }),
                                prismaClient_1.prismaClient.ut.count({ where: where })
                            ])];
                    case 2:
                        _a = _b.sent(), uts = _a[0], total = _a[1];
                        return [2 /*return*/, {
                                data: uts,
                                perPage: perPage,
                                page: page,
                                skip: skip,
                                count: total
                            }];
                }
            });
        });
    };
    UtService.prototype.deleteUts = function (uts) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.ut.deleteMany({
                            where: {
                                id: { "in": uts }
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UtService.prototype.search = function (userId, q) {
        return __awaiter(this, void 0, Promise, function () {
            var projeto, uts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ProjetoService_1.getProjeto(userId)];
                    case 1:
                        projeto = _a.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.ut.findMany({
                                where: {
                                    AND: {
                                        upa: {
                                            umf: {
                                                projeto: {
                                                    id: projeto === null || projeto === void 0 ? void 0 : projeto.id
                                                }
                                            }
                                        },
                                        numero_ut: parseInt(q)
                                    }
                                }
                            })];
                    case 2:
                        uts = _a.sent();
                        return [2 /*return*/, uts];
                }
            });
        });
    };
    UtService.prototype.findById = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var ut;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.ut.findUnique({
                            where: { id: id },
                            include: {
                                upa: true
                            }
                        })];
                    case 1:
                        ut = _a.sent();
                        return [2 /*return*/, ut];
                }
            });
        });
    };
    return UtService;
}());
exports["default"] = new UtService;
