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
// import { CategoriaEspecie } from "../entities/CategoriaEspecie";
var prismaClient_1 = require("../database/prismaClient");
var client_1 = require("@prisma/client");
var ObservacaoArvoreService = /** @class */ (function () {
    function ObservacaoArvoreService() {
    }
    ObservacaoArvoreService.prototype.create = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var observacaoExists, observacao;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.observacaoArvore.findFirst({
                            where: {
                                AND: {
                                    nome: data.nome
                                }
                            }
                        })];
                    case 1:
                        observacaoExists = _a.sent();
                        if (observacaoExists) {
                            throw new Error('Já existe uma observação cadastrada com este nome');
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.observacaoArvore.create({
                                data: data
                            })];
                    case 2:
                        observacao = _a.sent();
                        return [2 /*return*/, observacao];
                }
            });
        });
    };
    ObservacaoArvoreService.prototype.update = function (id, data) {
        return __awaiter(this, void 0, Promise, function () {
            var observacao;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.observacaoArvore.update({
                            data: data,
                            where: {
                                id: id
                            }
                        })];
                    case 1:
                        observacao = _a.sent();
                        return [2 /*return*/, observacao];
                }
            });
        });
    };
    ObservacaoArvoreService.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.observacaoArvore["delete"]({
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
    ObservacaoArvoreService.prototype.getAll = function (userId, query) {
        return __awaiter(this, void 0, Promise, function () {
            var perPage, page, search, orderBy, order, skip, orderByTerm, orderByElement, where, _a, data, total;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
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
                                    nome: { mode: client_1.Prisma.QueryMode.insensitive, contains: search }
                                }
                            } : {
                        // projeto: {
                        //     projeto_users: {
                        //         some: {
                        //             active: true,
                        //             id_user: userId
                        //         }
                        //     }
                        // }
                        };
                        return [4 /*yield*/, prismaClient_1.prismaClient.$transaction([
                                prismaClient_1.prismaClient.observacaoArvore.findMany({
                                    where: where,
                                    orderBy: orderByTerm,
                                    take: perPage ? parseInt(perPage) : 50,
                                    skip: skip ? skip : 0
                                }),
                                prismaClient_1.prismaClient.observacaoArvore.count()
                            ])];
                    case 1:
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
    ObservacaoArvoreService.prototype.deleteCategorias = function (observacoes) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.observacaoArvore.deleteMany({
                            where: { id: { "in": observacoes } }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ObservacaoArvoreService.prototype.search = function (q, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.observacaoArvore.findMany({
                            where: {
                                AND: {
                                    nome: { mode: client_1.Prisma.QueryMode.insensitive, contains: q }
                                }
                            }
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    ObservacaoArvoreService.prototype.findById = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var observacao;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.observacaoArvore.findUnique({ where: { id: id } })];
                    case 1:
                        observacao = _a.sent();
                        return [2 /*return*/, observacao];
                }
            });
        });
    };
    return ObservacaoArvoreService;
}());
exports["default"] = new ObservacaoArvoreService;
