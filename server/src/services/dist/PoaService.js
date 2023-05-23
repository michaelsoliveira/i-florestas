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
var ProjetoService_1 = require("./ProjetoService");
var PoaService = /** @class */ (function () {
    function PoaService() {
    }
    PoaService.prototype.create = function (data, userId) {
        return __awaiter(this, void 0, Promise, function () {
            var user, projeto, poaExists, poa;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.user.findUnique({
                            where: {
                                id: userId
                            }
                        })];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, ProjetoService_1.getProjeto(userId)];
                    case 2:
                        projeto = _a.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.poa.findFirst({
                                where: {
                                    AND: [
                                        { descricao: data.descricao },
                                        {
                                            projeto: {
                                                id: projeto === null || projeto === void 0 ? void 0 : projeto.id
                                            }
                                        }
                                    ]
                                }
                            })];
                    case 3:
                        poaExists = _a.sent();
                        if (poaExists) {
                            throw new Error('Já existe uma Poa cadastrada com este nome');
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.poa.create({
                                data: {
                                    descricao: data.descricao,
                                    corte_maximo: data.corte_maximo,
                                    resp_elab: {
                                        connect: {
                                            id: data.resp_elab
                                        }
                                    },
                                    resp_exec: {
                                        connect: {
                                            id: data.resp_exec
                                        }
                                    },
                                    projeto: {
                                        connect: {
                                            id: projeto === null || projeto === void 0 ? void 0 : projeto.id
                                        }
                                    },
                                    user: {
                                        connect: {
                                            id: user === null || user === void 0 ? void 0 : user.id
                                        }
                                    }
                                }
                            })];
                    case 4:
                        poa = _a.sent();
                        return [2 /*return*/, poa];
                }
            });
        });
    };
    PoaService.prototype.update = function (id, data) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.poa.update({
                            where: {
                                id: id
                            },
                            data: {
                                descricao: data.descricao
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.findById(id)];
                }
            });
        });
    };
    PoaService.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.poa["delete"]({
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
    PoaService.prototype.getAll = function (userId, query) {
        return __awaiter(this, void 0, Promise, function () {
            var perPage, page, search, orderBy, order, umf, skip, orderByTerm, orderByElement, projeto, where, _a, poas, total;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        perPage = query.perPage, page = query.page, search = query.search, orderBy = query.orderBy, order = query.order, umf = query.umf;
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
                        return [4 /*yield*/, ProjetoService_1.getProjeto(userId)];
                    case 1:
                        projeto = _d.sent();
                        where = {
                            descricao: {
                                mode: client_1.Prisma.QueryMode.insensitive,
                                contains: search ? search : ''
                            },
                            AND: [
                                // { id_umf: umf },
                                {
                                    projeto: {
                                        id: projeto === null || projeto === void 0 ? void 0 : projeto.id
                                    }
                                }
                            ]
                        };
                        return [4 /*yield*/, prismaClient_1.prismaClient.$transaction([
                                prismaClient_1.prismaClient.poa.findMany({
                                    where: where,
                                    take: perPage ? parseInt(perPage) : 10,
                                    skip: skip ? skip : 0,
                                    orderBy: __assign({}, orderByTerm)
                                }),
                                prismaClient_1.prismaClient.poa.count({ where: where })
                            ])];
                    case 2:
                        _a = _d.sent(), poas = _a[0], total = _a[1];
                        return [2 /*return*/, {
                                data: poas,
                                perPage: perPage,
                                page: page,
                                skip: skip,
                                count: total
                            }];
                }
            });
        });
    };
    PoaService.prototype.deletePoas = function (poas) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.poa.deleteMany({
                            where: {
                                id: { "in": poas }
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PoaService.prototype.search = function (userId, q) {
        return __awaiter(this, void 0, Promise, function () {
            var projeto, upas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ProjetoService_1.getProjeto(userId)];
                    case 1:
                        projeto = _a.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.poa.findMany({
                                where: {
                                    AND: [{
                                            projeto: {
                                                id: projeto === null || projeto === void 0 ? void 0 : projeto.id
                                            },
                                            descricao: {
                                                mode: client_1.Prisma.QueryMode.insensitive,
                                                contains: q
                                            }
                                        }]
                                }
                            })];
                    case 2:
                        upas = _a.sent();
                        return [2 /*return*/, upas];
                }
            });
        });
    };
    PoaService.prototype.findById = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var poa;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.poa.findUnique({
                            where: { id: id },
                            include: {
                                resp_elab: true,
                                resp_exec: true,
                                situacao_poa: true
                            }
                        })];
                    case 1:
                        poa = _a.sent();
                        return [2 /*return*/, poa];
                }
            });
        });
    };
    return PoaService;
}());
exports["default"] = new PoaService;
