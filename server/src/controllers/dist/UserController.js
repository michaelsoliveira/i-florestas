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
exports.UserController = void 0;
var prismaClient_1 = require("../database/prismaClient");
var UserAclService_1 = require("../services/UserAclService");
var user_service_1 = require("../services/user.service");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.store = function (request, response) {
        return __awaiter(this, void 0, Promise, function () {
            var user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(request.body);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, user_service_1["default"].create(request.body)];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, response.json({
                                error: false,
                                user: user,
                                message: null
                            })];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, response.json({
                                error: true,
                                user: null,
                                message: error_1.message
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.search = function (request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var nome, users, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        nome = request.query.nome;
                        if (!nome) return [3 /*break*/, 2];
                        return [4 /*yield*/, user_service_1["default"].search(nome, (_a = request.user) === null || _a === void 0 ? void 0 : _a.id)];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, user_service_1["default"].getAll()];
                    case 3:
                        _b = _c.sent();
                        _c.label = 4;
                    case 4:
                        users = _b;
                        return [2 /*return*/, response.json(users)];
                }
            });
        });
    };
    UserController.prototype.findByEmail = function (request, response) {
        return __awaiter(this, void 0, Promise, function () {
            var email, user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = request.query.email;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, prismaClient_1.prismaClient.user.findFirst({
                                where: {
                                    AND: {
                                        email: email
                                    }
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, response.json({
                                error: false,
                                user: user,
                                message: null
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, response.json({
                                error: true,
                                user: null,
                                message: error_2.message
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.update = function (request, response) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var id, user, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = (_a = request.params) === null || _a === void 0 ? void 0 : _a.id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, user_service_1["default"].update(id, request.body)];
                    case 2:
                        user = _b.sent();
                        return [2 /*return*/, response.json({
                                error: false,
                                user: user,
                                message: 'Usuário atualizado com sucesso!'
                            })];
                    case 3:
                        error_3 = _b.sent();
                        return [2 /*return*/, response.json({
                                error: true,
                                user: null,
                                message: error_3.message
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updatePassword = function (request, response) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var id, _b, oldPassword, newPassword, user, error_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        id = (_a = request.user) === null || _a === void 0 ? void 0 : _a.id;
                        _b = request.body, oldPassword = _b.oldPassword, newPassword = _b.newPassword;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, user_service_1["default"].updatePassword(id, oldPassword, newPassword)];
                    case 2:
                        user = _c.sent();
                        return [2 /*return*/, response.json({
                                error: false,
                                user: user,
                                message: 'Senha alterada com sucesso'
                            })];
                    case 3:
                        error_4 = _c.sent();
                        return [2 /*return*/, response.json({
                                error: true,
                                user: null,
                                message: error_4.message
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype["delete"] = function (request, response) {
        return __awaiter(this, void 0, Promise, function () {
            var id, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, user_service_1["default"]["delete"](id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.status(200).json({
                                error: false,
                                message: 'Usuário deletada com Sucesso!!!'
                            })];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, response.json({
                                error: true,
                                upa: null,
                                message: error_5.message
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.sendMail = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                user_service_1["default"].sendMail(request.body);
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.createPermission = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, description, createPermissionService, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, description = _a.description;
                        createPermissionService = new UserAclService_1.CreatePermissionService();
                        return [4 /*yield*/, createPermissionService.execute({ name: name, description: description })];
                    case 1:
                        result = _b.sent();
                        if (result instanceof Error) {
                            return [2 /*return*/, response.status(400).json(result.message)];
                        }
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    UserController.prototype.createRole = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, description, createRoleService, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, description = _a.description;
                        createRoleService = new UserAclService_1.CreateRoleService();
                        return [4 /*yield*/, createRoleService.execute({ name: name, description: description })];
                    case 1:
                        result = _b.sent();
                        if (result instanceof Error) {
                            return [2 /*return*/, response.status(400).json(result.message)];
                        }
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    UserController.prototype.createRolePermission = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var roleId, permissions, createRolePermissionService, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        roleId = request.params.roleId;
                        permissions = request.body.permissions;
                        createRolePermissionService = new UserAclService_1.CreateRolePermissionService();
                        return [4 /*yield*/, createRolePermissionService.execute({
                                roleId: roleId,
                                permissions: permissions
                            })];
                    case 1:
                        result = _a.sent();
                        if (result instanceof Error) {
                            return [2 /*return*/, response.status(400).json(result.message)];
                        }
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    UserController.prototype.createUserACL = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, permissions, roles, userId, createUserACLService, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, permissions = _a.permissions, roles = _a.roles;
                        userId = request.params.userId;
                        createUserACLService = new UserAclService_1.CreateUserACLService();
                        return [4 /*yield*/, createUserACLService.execute({
                                id: userId,
                                permissions: permissions,
                                roles: roles
                            })];
                    case 1:
                        result = _b.sent();
                        if (result instanceof Error) {
                            return [2 /*return*/, response.status(400).json(result.message)];
                        }
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    UserController.prototype.findProvider = function (request, response) {
        return __awaiter(this, void 0, Promise, function () {
            var email, user, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = request.query.email;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, user_service_1["default"].findProvider(email)];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, response.json(user)];
                    case 3:
                        error_6 = _a.sent();
                        return [2 /*return*/, response.json(error_6)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.findAll = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_service_1["default"].getAllByProjeto()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, response.json(users)];
                    case 2:
                        error_7 = _a.sent();
                        return [2 /*return*/, response.json(error_7.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.findOne = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, projetoId, users, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.params, userId = _a.userId, projetoId = _a.projetoId;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, user_service_1["default"].findOne(userId, projetoId)];
                    case 2:
                        users = _b.sent();
                        return [2 /*return*/, response.json(users)];
                    case 3:
                        error_8 = _b.sent();
                        return [2 /*return*/, response.json(error_8.message)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
