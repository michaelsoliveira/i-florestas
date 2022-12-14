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
var client_1 = require("@prisma/client");
var EspecieService = /** @class */ (function () {
    function EspecieService() {
    }
    EspecieService.prototype.create = function (dataRequest, projetoId) {
        return __awaiter(this, void 0, Promise, function () {
            var nome, nome_cientifico, nome_orgao, id_projeto, especieExists, preparedData, data, especie;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nome = dataRequest.nome, nome_cientifico = dataRequest.nome_cientifico, nome_orgao = dataRequest.nome_orgao, id_projeto = dataRequest.id_projeto;
                        return [4 /*yield*/, prismaClient_1.prismaClient.especie.findFirst({
                                where: {
                                    AND: {
                                        nome: dataRequest.nome,
                                        id_projeto: id_projeto ? id_projeto : projetoId
                                    }
                                }
                            })];
                    case 1:
                        especieExists = _a.sent();
                        if (especieExists) {
                            throw new Error('Já existe uma espécie cadastrada com este nome');
                        }
                        preparedData = {
                            nome: nome,
                            nome_cientifico: nome_cientifico,
                            nome_orgao: nome_orgao,
                            projeto: {
                                connect: {
                                    id: id_projeto ? id_projeto : projetoId
                                }
                            }
                        };
                        data = (dataRequest === null || dataRequest === void 0 ? void 0 : dataRequest.id_categoria) ? __assign(__assign({}, preparedData), { categoria_especie: {
                                connect: {
                                    id: dataRequest === null || dataRequest === void 0 ? void 0 : dataRequest.id_categoria
                                }
                            } }) : preparedData;
                        especie = prismaClient_1.prismaClient.especie.create({ data: data });
                        return [2 /*return*/, especie];
                }
            });
        });
    };
    EspecieService.prototype.update = function (id, dataRequest) {
        return __awaiter(this, void 0, Promise, function () {
            var nome, nome_cientifico, nome_orgao, preparedData, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nome = dataRequest.nome, nome_cientifico = dataRequest.nome_cientifico, nome_orgao = dataRequest.nome_orgao;
                        preparedData = {
                            nome: nome,
                            nome_cientifico: nome_cientifico,
                            nome_orgao: nome_orgao
                        };
                        data = (dataRequest === null || dataRequest === void 0 ? void 0 : dataRequest.id_categoria) ? __assign(__assign({}, preparedData), { categoria_especie: {
                                connect: {
                                    id: dataRequest === null || dataRequest === void 0 ? void 0 : dataRequest.id_categoria
                                }
                            } }) : preparedData;
                        return [4 /*yield*/, prismaClient_1.prismaClient.especie.update({
                                where: {
                                    id: id
                                },
                                data: data
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.findById(id)];
                }
            });
        });
    };
    EspecieService.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.especie["delete"]({
                            where: {
                                id: id
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EspecieService.prototype.deleteEspecies = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                ids.forEach(function (id) {
                    prismaClient_1.prismaClient.especie["delete"]({
                        where: { id: id }
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    EspecieService.prototype.getAll = function (query, userId) {
        return __awaiter(this, void 0, Promise, function () {
            var perPage, page, order, search, orderBy, skip, orderByTerm, orderByElement, where, _a, data, total;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        perPage = query.perPage, page = query.page, order = query.order, search = query.search, orderBy = query.orderBy;
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
                                    nome: { mode: client_1.Prisma.QueryMode.insensitive, contains: search },
                                    projeto: {
                                        projeto_users: {
                                            some: {
                                                id_user: userId,
                                                active: true
                                            }
                                        }
                                    }
                                }
                            } : {
                            projeto: {
                                projeto_users: {
                                    some: {
                                        id_user: userId,
                                        active: true
                                    }
                                }
                            }
                        };
                        return [4 /*yield*/, prismaClient_1.prismaClient.$transaction([
                                prismaClient_1.prismaClient.especie.findMany({
                                    include: {
                                        categoria_especie: {
                                            select: {
                                                id: true,
                                                nome: true
                                            }
                                        }
                                    },
                                    where: where,
                                    take: perPage ? parseInt(perPage) : 50,
                                    skip: skip ? skip : 0,
                                    orderBy: __assign({}, orderByTerm)
                                }),
                                prismaClient_1.prismaClient.especie.count({ where: where })
                            ])];
                    case 1:
                        _a = _d.sent(), data = _a[0], total = _a[1];
                        return [2 /*return*/, {
                                orderBy: orderBy,
                                order: order,
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
    EspecieService.prototype.findById = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var especie;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.especie.findUnique({
                            include: {
                                categoria_especie: {
                                    select: {
                                        id: true,
                                        nome: true
                                    }
                                }
                            },
                            where: {
                                id: id
                            }
                        })];
                    case 1:
                        especie = _a.sent();
                        return [2 /*return*/, especie];
                }
            });
        });
    };
    return EspecieService;
}());
exports["default"] = new EspecieService;
