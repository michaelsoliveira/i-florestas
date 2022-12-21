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
var prismaClient_1 = require("../database/prismaClient");
var ProjetoService_1 = require("./ProjetoService");
var ArvoreService = /** @class */ (function () {
    function ArvoreService() {
    }
    ArvoreService.prototype.create = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var ut, upa, arvoreExists, especie, preparedData, arvore, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(data);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, prismaClient_1.prismaClient.ut.findUnique({
                                where: {
                                    id: data === null || data === void 0 ? void 0 : data.ut
                                }
                            })];
                    case 2:
                        ut = _a.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.upa.findUnique({
                                where: {
                                    id: data === null || data === void 0 ? void 0 : data.upa
                                }
                            })];
                    case 3:
                        upa = _a.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.arvore.findFirst({
                                where: {
                                    AND: {
                                        numero_arvore: parseInt(data.numero_arvore),
                                        ut: {
                                            id: data === null || data === void 0 ? void 0 : data.ut
                                        }
                                    }
                                }
                            })];
                    case 4:
                        arvoreExists = _a.sent();
                        if (arvoreExists) {
                            throw new Error('Já existe uma árvore cadastrada com este número');
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.especie.findUnique({
                                where: {
                                    id: data === null || data === void 0 ? void 0 : data.especie
                                }
                            })];
                    case 5:
                        especie = _a.sent();
                        preparedData = (upa === null || upa === void 0 ? void 0 : upa.tipo) === 1 ? {
                            numero_arvore: parseInt(data === null || data === void 0 ? void 0 : data.numero_arvore),
                            faixa: parseInt(data === null || data === void 0 ? void 0 : data.faixa),
                            dap: (data === null || data === void 0 ? void 0 : data.cap) ? parseFloat(data === null || data === void 0 ? void 0 : data.cap) / Math.PI : parseFloat(data === null || data === void 0 ? void 0 : data.dap),
                            altura: parseFloat(data === null || data === void 0 ? void 0 : data.altura),
                            fuste: parseInt(data === null || data === void 0 ? void 0 : data.fuste),
                            orient_x: data === null || data === void 0 ? void 0 : data.orient_x,
                            lat_x: parseFloat(data === null || data === void 0 ? void 0 : data.lat_x),
                            long_y: parseFloat(data === null || data === void 0 ? void 0 : data.long_y),
                            ut: {
                                connect: {
                                    id: ut === null || ut === void 0 ? void 0 : ut.id
                                }
                            },
                            especie: {
                                connect: {
                                    id: especie === null || especie === void 0 ? void 0 : especie.id
                                }
                            }
                        } : {
                            numero_arvore: parseInt(data === null || data === void 0 ? void 0 : data.numero_arvore),
                            dap: (data === null || data === void 0 ? void 0 : data.cap) ? parseFloat(data === null || data === void 0 ? void 0 : data.cap) / Math.PI : parseFloat(data === null || data === void 0 ? void 0 : data.dap),
                            altura: parseFloat(data === null || data === void 0 ? void 0 : data.altura),
                            fuste: parseInt(data === null || data === void 0 ? void 0 : data.fuste),
                            ut: {
                                connect: {
                                    id: ut === null || ut === void 0 ? void 0 : ut.id
                                }
                            }
                        };
                        return [4 /*yield*/, prismaClient_1.prismaClient.arvore.create({
                                data: preparedData
                            })];
                    case 6:
                        arvore = _a.sent();
                        return [2 /*return*/, arvore];
                    case 7:
                        e_1 = _a.sent();
                        return [2 /*return*/, e_1];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ArvoreService.prototype.createByImport = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var ut, upa, especie, arvoreExists, preparedData, arvore, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, prismaClient_1.prismaClient.ut.findFirst({
                                where: {
                                    numero_ut: parseInt(data === null || data === void 0 ? void 0 : data.ut)
                                }
                            })];
                    case 1:
                        ut = _a.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.upa.findUnique({
                                where: {
                                    id: ut === null || ut === void 0 ? void 0 : ut.id_upa
                                }
                            })];
                    case 2:
                        upa = _a.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.especie.findFirst({
                                where: {
                                    nome_orgao: data === null || data === void 0 ? void 0 : data.especie
                                }
                            })];
                    case 3:
                        especie = _a.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.arvore.findFirst({
                                where: {
                                    AND: {
                                        numero_arvore: parseInt(data.numero_arvore),
                                        ut: {
                                            id: ut === null || ut === void 0 ? void 0 : ut.id
                                        }
                                    }
                                }
                            })];
                    case 4:
                        arvoreExists = _a.sent();
                        if (arvoreExists) {
                            throw new Error('Já existe uma árvore cadastrada com este número');
                        }
                        preparedData = (upa === null || upa === void 0 ? void 0 : upa.tipo) === 1 ? {
                            numero_arvore: parseInt(data === null || data === void 0 ? void 0 : data.numero_arvore),
                            faixa: parseInt(data === null || data === void 0 ? void 0 : data.faixa),
                            dap: (data === null || data === void 0 ? void 0 : data.cap) ? parseFloat(data === null || data === void 0 ? void 0 : data.cap) / Math.PI : parseFloat(data === null || data === void 0 ? void 0 : data.dap),
                            altura: parseFloat(data === null || data === void 0 ? void 0 : data.altura),
                            fuste: parseInt(data === null || data === void 0 ? void 0 : data.fuste),
                            orient_x: data === null || data === void 0 ? void 0 : data.orient_x,
                            lat_x: parseFloat(data === null || data === void 0 ? void 0 : data.lat_x),
                            long_y: parseFloat(data === null || data === void 0 ? void 0 : data.long_y),
                            ut: {
                                connect: {
                                    id: ut === null || ut === void 0 ? void 0 : ut.id
                                }
                            },
                            especie: {
                                connect: {
                                    id: especie === null || especie === void 0 ? void 0 : especie.id
                                }
                            }
                        } : {
                            numero_arvore: parseInt(data === null || data === void 0 ? void 0 : data.numero_arvore),
                            dap: (data === null || data === void 0 ? void 0 : data.cap) ? parseFloat(data === null || data === void 0 ? void 0 : data.cap) / Math.PI : parseFloat(data === null || data === void 0 ? void 0 : data.dap),
                            altura: parseFloat(data === null || data === void 0 ? void 0 : data.altura),
                            fuste: parseInt(data === null || data === void 0 ? void 0 : data.fuste),
                            latitude: parseFloat(data === null || data === void 0 ? void 0 : data.latitude),
                            longitude: parseFloat(data === null || data === void 0 ? void 0 : data.longitude),
                            ut: {
                                connect: {
                                    id: ut === null || ut === void 0 ? void 0 : ut.id
                                }
                            },
                            especie: {
                                connect: {
                                    id: especie === null || especie === void 0 ? void 0 : especie.id
                                }
                            }
                        };
                        return [4 /*yield*/, prismaClient_1.prismaClient.arvore.create({
                                data: preparedData
                            })];
                    case 5:
                        arvore = _a.sent();
                        return [2 /*return*/, arvore];
                    case 6:
                        error_1 = _a.sent();
                        console.log(error_1 === null || error_1 === void 0 ? void 0 : error_1.message);
                        return [2 /*return*/, error_1];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ArvoreService.prototype.update = function (id, data) {
        return __awaiter(this, void 0, Promise, function () {
            var ut, upa, especie, preparedData, arvore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(data);
                        return [4 /*yield*/, prismaClient_1.prismaClient.ut.findUnique({
                                where: {
                                    id: data === null || data === void 0 ? void 0 : data.id_ut
                                }
                            })];
                    case 1:
                        ut = _a.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.upa.findUnique({
                                where: {
                                    id: ut === null || ut === void 0 ? void 0 : ut.id_upa
                                }
                            })];
                    case 2:
                        upa = _a.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.especie.findUnique({
                                where: {
                                    id: data === null || data === void 0 ? void 0 : data.id_especie
                                }
                            })];
                    case 3:
                        especie = _a.sent();
                        preparedData = (upa === null || upa === void 0 ? void 0 : upa.tipo) === 1 ? {
                            numero_arvore: parseInt(data === null || data === void 0 ? void 0 : data.numero_arvore),
                            faixa: parseInt(data === null || data === void 0 ? void 0 : data.faixa),
                            dap: (data === null || data === void 0 ? void 0 : data.cap) ? parseFloat(data === null || data === void 0 ? void 0 : data.cap) / Math.PI : parseFloat(data === null || data === void 0 ? void 0 : data.dap),
                            altura: parseFloat(data === null || data === void 0 ? void 0 : data.altura),
                            fuste: parseInt(data === null || data === void 0 ? void 0 : data.fuste),
                            orient_x: data === null || data === void 0 ? void 0 : data.orient_x,
                            lat_x: parseFloat(data === null || data === void 0 ? void 0 : data.lat_x),
                            long_y: parseFloat(data === null || data === void 0 ? void 0 : data.long_y),
                            ut: {
                                connect: {
                                    id: ut === null || ut === void 0 ? void 0 : ut.id
                                }
                            },
                            especie: {
                                connect: {
                                    id: especie === null || especie === void 0 ? void 0 : especie.id
                                }
                            }
                        } : {
                            numero_arvore: parseInt(data === null || data === void 0 ? void 0 : data.numero_arvore),
                            dap: (data === null || data === void 0 ? void 0 : data.cap) ? parseFloat(data === null || data === void 0 ? void 0 : data.cap) / Math.PI : parseFloat(data === null || data === void 0 ? void 0 : data.dap),
                            altura: parseFloat(data === null || data === void 0 ? void 0 : data.altura),
                            fuste: parseInt(data === null || data === void 0 ? void 0 : data.fuste),
                            lat_x: parseFloat(data === null || data === void 0 ? void 0 : data.latitude),
                            long_y: parseFloat(data === null || data === void 0 ? void 0 : data.longitude),
                            ut: {
                                connect: {
                                    id: ut === null || ut === void 0 ? void 0 : ut.id
                                }
                            },
                            especie: {
                                connect: {
                                    id: especie === null || especie === void 0 ? void 0 : especie.id
                                }
                            }
                        };
                        return [4 /*yield*/, prismaClient_1.prismaClient.arvore.update({
                                data: preparedData,
                                where: {
                                    id: id
                                }
                            })];
                    case 4:
                        arvore = _a.sent();
                        return [2 /*return*/, arvore];
                }
            });
        });
    };
    ArvoreService.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.arvore["delete"]({
                            where: { id: id }
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
    ArvoreService.prototype.getAll = function (userId, query, utId) {
        return __awaiter(this, void 0, Promise, function () {
            var projeto, perPage, page, search, orderBy, order, skip, orderByTerm, orderByElement, where, _a, data, total;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, ProjetoService_1.getProjeto(userId)];
                    case 1:
                        projeto = _d.sent();
                        perPage = query.perPage, page = query.page, search = query.search, orderBy = query.orderBy, order = query.order;
                        skip = (page - 1) * perPage;
                        orderByTerm = {};
                        orderByElement = orderBy ? orderBy.split('.') : {};
                        if (orderByElement.length == 2) {
                            orderByTerm = (_b = {},
                                _b[orderByElement[1]] = order,
                                _b);
                        }
                        else {
                            orderByTerm = (_c = {},
                                _c[orderByElement] = order,
                                _c);
                        }
                        where = search ?
                            {
                                AND: {
                                    numero_arvore: parseInt(search),
                                    ut: { id: utId }
                                }
                            } : {
                            ut: { id: utId }
                        };
                        return [4 /*yield*/, prismaClient_1.prismaClient.$transaction([
                                prismaClient_1.prismaClient.arvore.findMany({
                                    where: where,
                                    orderBy: orderByTerm,
                                    take: perPage ? parseInt(perPage) : 50,
                                    skip: skip ? skip : 0
                                }),
                                prismaClient_1.prismaClient.arvore.count()
                            ])];
                    case 2:
                        _a = _d.sent(), data = _a[0], total = _a[1];
                        return [2 /*return*/, {
                                data: data,
                                perPage: perPage,
                                page: page,
                                skip: skip,
                                count: total
                            }];
                }
            });
        });
    };
    ArvoreService.prototype.deleteArvores = function (arvores) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.arvore.deleteMany({
                            where: { id: { "in": arvores } }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ArvoreService.prototype.search = function (q, userId, utId) {
        return __awaiter(this, void 0, void 0, function () {
            var projeto, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ProjetoService_1.getProjeto(userId)];
                    case 1:
                        projeto = _a.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.arvore.findMany({
                                where: {
                                    AND: {
                                        numero_arvore: parseInt(q),
                                        ut: { id: utId }
                                    }
                                }
                            })];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    ArvoreService.prototype.findById = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var arvore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.arvore.findUnique({
                            include: {
                                observacao_arvore: true,
                                especie: true
                            },
                            where: { id: id }
                        })];
                    case 1:
                        arvore = _a.sent();
                        return [2 /*return*/, arvore];
                }
            });
        });
    };
    return ArvoreService;
}());
exports["default"] = new ArvoreService;
