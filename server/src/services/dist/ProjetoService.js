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
exports.getProjeto = void 0;
var client_1 = require("@prisma/client");
var prismaClient_1 = require("../database/prismaClient");
exports.getProjeto = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.prismaClient.projeto.findFirst({
                    where: {
                        AND: {
                            active: true,
                            users_roles: {
                                some: {
                                    user_id: userId
                                }
                            }
                        }
                    }
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var ProjetoService = /** @class */ (function () {
    function ProjetoService() {
    }
    ProjetoService.prototype.create = function (data, userId) {
        return __awaiter(this, void 0, Promise, function () {
            var projetoExists, roleAdmin, projeto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.projeto.findFirst({
                            where: {
                                AND: {
                                    users_roles: {
                                        some: {
                                            user_id: (data === null || data === void 0 ? void 0 : data.id_user) ? data === null || data === void 0 ? void 0 : data.id_user : userId
                                        }
                                    },
                                    nome: data.nome
                                }
                            }
                        })];
                    case 1:
                        projetoExists = _a.sent();
                        if (projetoExists) {
                            throw new Error('Já existe um Projeto cadastrada com este nome');
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.role.findFirst({
                                where: { name: { mode: client_1.Prisma.QueryMode.insensitive, equals: 'admin' } }
                            })];
                    case 2:
                        roleAdmin = _a.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.projeto.create({
                                data: {
                                    nome: data === null || data === void 0 ? void 0 : data.nome,
                                    active: data === null || data === void 0 ? void 0 : data.active,
                                    users_roles: {
                                        create: {
                                            users: {
                                                connect: {
                                                    id: (data === null || data === void 0 ? void 0 : data.id_user) ? data === null || data === void 0 ? void 0 : data.id_user : userId
                                                }
                                            },
                                            roles: {
                                                connect: {
                                                    id: roleAdmin === null || roleAdmin === void 0 ? void 0 : roleAdmin.id
                                                }
                                            }
                                        }
                                    }
                                }
                            })];
                    case 3:
                        projeto = _a.sent();
                        return [2 /*return*/, projeto];
                }
            });
        });
    };
    ProjetoService.prototype.update = function (id, data, userId) {
        return __awaiter(this, void 0, Promise, function () {
            var projeto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.projeto.update({
                            where: {
                                id: id
                            },
                            data: {
                                nome: data === null || data === void 0 ? void 0 : data.nome,
                                active: data === null || data === void 0 ? void 0 : data.active
                            }
                        })];
                    case 1:
                        projeto = _a.sent();
                        return [2 /*return*/, projeto];
                }
            });
        });
    };
    ProjetoService.prototype.changeActive = function (projetoId, userId) {
        return __awaiter(this, void 0, Promise, function () {
            var projeto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.projeto.update({
                            data: {
                                active: true
                            },
                            where: {
                                id: projetoId
                            }
                        })];
                    case 1:
                        projeto = _a.sent();
                        return [2 /*return*/, projeto];
                }
            });
        });
    };
    ProjetoService.prototype.getDefaultData = function (projetoId, userId) {
        return __awaiter(this, void 0, Promise, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.umf.findFirst({
                            include: {
                                projeto: true,
                                upa: true
                            },
                            where: {
                                projeto: {
                                    id: projetoId,
                                    excluido: false,
                                    users_roles: {
                                        some: {
                                            users: {
                                                id: userId
                                            }
                                        }
                                    }
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
    ProjetoService.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.projeto.update({
                            data: {
                                excluido: true,
                                active: false
                            },
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
    ProjetoService.prototype.getAll = function (id, query) {
        return __awaiter(this, void 0, Promise, function () {
            var perPage, page, search, orderBy, order, skip, orderByTerm, orderByElement, where, _a, projetos, total, data;
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
                                AND: [
                                    { nome: { mode: client_1.Prisma.QueryMode.insensitive, contains: search } },
                                    { excluido: false },
                                    {
                                        users_roles: {
                                            some: {
                                                user_id: id
                                            }
                                        }
                                    }
                                ]
                            } : {
                            AND: [
                                { excluido: false },
                                {
                                    users_roles: {
                                        some: {
                                            user_id: id
                                        }
                                    }
                                }
                            ]
                        };
                        return [4 /*yield*/, prismaClient_1.prismaClient.$transaction([
                                prismaClient_1.prismaClient.projeto.findMany({
                                    include: {
                                        pessoa: true
                                    },
                                    where: where,
                                    take: perPage ? parseInt(perPage) : 50,
                                    skip: skip ? skip : 0,
                                    orderBy: __assign({}, orderByTerm)
                                }),
                                prismaClient_1.prismaClient.projeto.count({ where: where })
                            ])];
                    case 1:
                        _a = _d.sent(), projetos = _a[0], total = _a[1];
                        data = projetos.map(function (projeto) {
                            return {
                                id: projeto === null || projeto === void 0 ? void 0 : projeto.id,
                                nome: projeto === null || projeto === void 0 ? void 0 : projeto.nome,
                                active: projeto === null || projeto === void 0 ? void 0 : projeto.active,
                                pessoa: projeto === null || projeto === void 0 ? void 0 : projeto.pessoa[0]
                            };
                        });
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
    ProjetoService.prototype.deleteProjetos = function (projetos) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.projeto.deleteMany({
                            where: {
                                id: { "in": projetos }
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProjetoService.prototype.getUsers = function (projetoId, query) {
        return __awaiter(this, void 0, Promise, function () {
            var perPage, page, search, orderBy, order, skip, orderByTerm, orderByElement, where, _a, usersRoles, total, data;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        perPage = query.perPage, page = query.page, search = query.search, orderBy = query.orderBy, order = query.order;
                        skip = (page - 1) * perPage;
                        orderByTerm = {};
                        orderByElement = orderBy ? orderBy.split('.') : {};
                        if (orderByElement.length == 1) {
                            orderByTerm = (_b = {},
                                _b[orderByElement] = order,
                                _b);
                        }
                        else {
                            orderByTerm = orderByElement.reduce(function (ordered, curr) {
                                var _a, _b;
                                return _a = {},
                                    _a[ordered] = (_b = {},
                                        _b[curr] = order,
                                        _b),
                                    _a;
                            });
                        }
                        where = search ?
                            {
                                AND: [
                                    {
                                        users: {
                                            OR: [{
                                                    username: { mode: client_1.Prisma.QueryMode.insensitive, contains: search }
                                                }, {
                                                    email: { mode: client_1.Prisma.QueryMode.insensitive, contains: search }
                                                }]
                                        }
                                    },
                                    {
                                        projeto: {
                                            id: projetoId
                                        }
                                    }
                                ]
                            } : {
                            projeto: {
                                id: projetoId
                            }
                        };
                        return [4 /*yield*/, prismaClient_1.prismaClient.$transaction([
                                prismaClient_1.prismaClient.userRole.findMany({
                                    include: {
                                        users: true,
                                        roles: {
                                            select: {
                                                id: true,
                                                name: true
                                            }
                                        }
                                    },
                                    where: where,
                                    take: perPage ? parseInt(perPage) : 50,
                                    skip: skip ? skip : 0,
                                    orderBy: __assign({}, orderByTerm)
                                }),
                                prismaClient_1.prismaClient.userRole.count({
                                    where: where
                                })
                            ])];
                    case 1:
                        _a = _c.sent(), usersRoles = _a[0], total = _a[1];
                        data = usersRoles.map(function (userRole) {
                            return {
                                id: userRole === null || userRole === void 0 ? void 0 : userRole.users.id,
                                username: userRole === null || userRole === void 0 ? void 0 : userRole.users.username,
                                email: userRole === null || userRole === void 0 ? void 0 : userRole.users.email,
                                image: userRole === null || userRole === void 0 ? void 0 : userRole.users.image,
                                email_verified: userRole === null || userRole === void 0 ? void 0 : userRole.users.email_verified,
                                roles: [__assign({}, userRole.roles)]
                            };
                        });
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
    ProjetoService.prototype.search = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var projetos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.projeto.findMany({
                            where: {
                                AND: {
                                    excluido: false,
                                    nome: { mode: client_1.Prisma.QueryMode.insensitive, contains: text }
                                }
                            },
                            orderBy: {
                                nome: 'asc'
                            }
                        })];
                    case 1:
                        projetos = _a.sent();
                        return [2 /*return*/, projetos];
                }
            });
        });
    };
    ProjetoService.prototype.findById = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var projeto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.projeto.findUnique({ where: { id: id } })];
                    case 1:
                        projeto = _a.sent();
                        return [2 /*return*/, projeto];
                }
            });
        });
    };
    ProjetoService.prototype.getActive = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.userRole.findFirst({
                            include: {
                                projeto: {
                                    include: {
                                        pessoa: true
                                    }
                                }
                            },
                            where: {
                                AND: [
                                    {
                                        projeto: {
                                            excluido: false,
                                            active: true
                                        }
                                    },
                                    { user_id: id }
                                ]
                            }
                        })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user === null || user === void 0 ? void 0 : user.projeto];
                }
            });
        });
    };
    return ProjetoService;
}());
exports["default"] = new ProjetoService;
