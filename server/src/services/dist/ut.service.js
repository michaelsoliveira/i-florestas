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
var UpaService = /** @class */ (function () {
    function UpaService() {
    }
    UpaService.prototype.create = function (data, userId) {
        return __awaiter(this, void 0, Promise, function () {
            var numero_ut, area_util, area_total, quantidade_faixas, comprimento_faixas, largura_faixas, latitude, longitude, utExists, empresa, upa;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        numero_ut = data.numero_ut, area_util = data.area_util, area_total = data.area_total, quantidade_faixas = data.quantidade_faixas, comprimento_faixas = data.comprimento_faixas, largura_faixas = data.largura_faixas, latitude = data.latitude, longitude = data.longitude;
                        return [4 /*yield*/, prismaClient_1.prismaClient.ut.findFirst({
                                where: {
                                    numero_ut: data.numero_ut
                                }
                            })];
                    case 1:
                        utExists = _a.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.empresa.findFirst({
                                where: {
                                    empresa_users: {
                                        some: {
                                            users: {
                                                id: userId
                                            }
                                        }
                                    }
                                }
                            })];
                    case 2:
                        empresa = _a.sent();
                        if (utExists) {
                            throw new Error('J?? existe uma Ut cadastrada com este n??mero');
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.ut.create({
                                data: {
                                    numero_ut: numero_ut,
                                    area_util: area_util,
                                    area_total: area_total,
                                    quantidade_faixas: quantidade_faixas,
                                    comprimento_faixas: comprimento_faixas,
                                    largura_faixas: largura_faixas,
                                    latitude: latitude,
                                    longitude: longitude,
                                    empresa: {
                                        connect: {
                                            id: empresa === null || empresa === void 0 ? void 0 : empresa.id
                                        }
                                    },
                                    upa: {
                                        connect: {
                                            id: data.upa
                                        }
                                    }
                                }
                            })];
                    case 3:
                        upa = _a.sent();
                        return [2 /*return*/, upa];
                }
            });
        });
    };
    UpaService.prototype.update = function (id, data) {
        return __awaiter(this, void 0, Promise, function () {
            var numero_ut, area_util, area_total, quantidade_faixas, comprimento_faixas, largura_faixas, latitude, longitude;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        numero_ut = data.numero_ut, area_util = data.area_util, area_total = data.area_total, quantidade_faixas = data.quantidade_faixas, comprimento_faixas = data.comprimento_faixas, largura_faixas = data.largura_faixas, latitude = data.latitude, longitude = data.longitude;
                        return [4 /*yield*/, prismaClient_1.prismaClient.ut.update({
                                where: {
                                    id: id
                                },
                                data: {
                                    numero_ut: numero_ut,
                                    area_util: area_util,
                                    area_total: area_total,
                                    quantidade_faixas: quantidade_faixas,
                                    comprimento_faixas: comprimento_faixas,
                                    largura_faixas: largura_faixas,
                                    latitude: latitude,
                                    longitude: longitude,
                                    upa: {
                                        connect: {
                                            id: data.upa
                                        }
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.findById(id)];
                }
            });
        });
    };
    UpaService.prototype["delete"] = function (id) {
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
    UpaService.prototype.getAll = function (query, userId) {
        return __awaiter(this, void 0, Promise, function () {
            var empresa, perPage, page, search, orderBy, order, upa, skip, orderByTerm, orderByElement, _a, uts, total;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.empresa.findFirst({
                            where: {
                                empresa_users: {
                                    some: {
                                        users: {
                                            id: userId
                                        }
                                    }
                                }
                            }
                        })];
                    case 1:
                        empresa = _d.sent();
                        perPage = query.perPage, page = query.page, search = query.search, orderBy = query.orderBy, order = query.order, upa = query.upa;
                        skip = (page - 1) * perPage;
                        orderByTerm = {};
                        orderByElement = orderBy ? orderBy.split('.') : {};
                        if (orderByElement instanceof Array) {
                            orderByTerm = orderByElement.length == 2 ? (_b = {},
                                _b[orderByElement[1]] = order,
                                _b) : {};
                        }
                        else {
                            orderByTerm = (_c = {},
                                _c[orderByElement] = order,
                                _c);
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.$transaction([
                                prismaClient_1.prismaClient.ut.findMany({
                                    where: {
                                        OR: {
                                            numero_ut: {
                                                equals: Number.parseInt(search)
                                            }
                                        },
                                        AND: [
                                            {
                                                id_empresa: empresa === null || empresa === void 0 ? void 0 : empresa.id
                                            },
                                            {
                                                upa: {
                                                    id: upa
                                                }
                                            }
                                        ]
                                    },
                                    take: perPage ? parseInt(perPage) : 10,
                                    skip: skip ? skip : 0,
                                    orderBy: __assign({}, orderByTerm),
                                    include: {
                                        upa: true
                                    }
                                }),
                                prismaClient_1.prismaClient.ut.count()
                            ])];
                    case 2:
                        _a = _d.sent(), uts = _a[0], total = _a[1];
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
    UpaService.prototype.deleteUts = function (uts) {
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
    UpaService.prototype.search = function (q) {
        return __awaiter(this, void 0, Promise, function () {
            var uts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.ut.findMany({
                            where: {
                                numero_ut: {
                                    equals: q
                                }
                            }
                        })];
                    case 1:
                        uts = _a.sent();
                        return [2 /*return*/, uts];
                }
            });
        });
    };
    UpaService.prototype.findById = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var upa;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.upa.findUnique({
                            where: { id: id },
                            include: {
                                empresa: true,
                                spatial_ref_sys: true,
                                equacao_volume: true,
                                umf: true
                            }
                        })];
                    case 1:
                        upa = _a.sent();
                        return [2 /*return*/, upa];
                }
            });
        });
    };
    return UpaService;
}());
exports["default"] = new UpaService;
