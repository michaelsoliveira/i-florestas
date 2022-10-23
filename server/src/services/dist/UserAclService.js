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
exports.CreateRolePermissionService = exports.CreatePermissionService = exports.CreateRoleService = exports.CreateUserACLService = void 0;
var prismaClient_1 = require("../database/prismaClient");
var CreateUserACLService = /** @class */ (function () {
    function CreateUserACLService() {
    }
    CreateUserACLService.prototype.execute = function (_a) {
        var id = _a.id, roles = _a.roles, permissions = _a.permissions;
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.user.findUnique({
                            where: {
                                id: id
                            }
                        })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, new Error("User does not exists!")];
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.userRole.createMany({
                                data: roles.map(function (role) { return ({
                                    user_id: id,
                                    role_id: role.id
                                }); })
                            })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.userPermission.createMany({
                                data: permissions.map(function (permission) { return ({
                                    user_id: id,
                                    permission_id: permission.id
                                }); })
                            })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    return CreateUserACLService;
}());
exports.CreateUserACLService = CreateUserACLService;
var CreateRoleService = /** @class */ (function () {
    function CreateRoleService() {
    }
    CreateRoleService.prototype.execute = function (_a) {
        var name = _a.name, description = _a.description;
        return __awaiter(this, void 0, Promise, function () {
            var roleExists, role;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.role.findFirst({
                            where: {
                                name: name
                            }
                        })];
                    case 1:
                        roleExists = _b.sent();
                        if (!roleExists) {
                            return [2 /*return*/, new Error("Role already exists")];
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.role.create({
                                data: { name: name, description: description }
                            })];
                    case 2:
                        role = _b.sent();
                        return [2 /*return*/, role];
                }
            });
        });
    };
    return CreateRoleService;
}());
exports.CreateRoleService = CreateRoleService;
var CreatePermissionService = /** @class */ (function () {
    function CreatePermissionService() {
    }
    CreatePermissionService.prototype.execute = function (_a) {
        var name = _a.name, description = _a.description;
        return __awaiter(this, void 0, Promise, function () {
            var permissionExists, permission;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.permission.findFirst({ where: { name: name } })];
                    case 1:
                        permissionExists = _b.sent();
                        if (permissionExists) {
                            return [2 /*return*/, new Error("Permission already exists")];
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.permission.create({
                                data: { name: name, description: description }
                            })];
                    case 2:
                        permission = _b.sent();
                        return [2 /*return*/, permission];
                }
            });
        });
    };
    return CreatePermissionService;
}());
exports.CreatePermissionService = CreatePermissionService;
var CreateRolePermissionService = /** @class */ (function () {
    function CreateRolePermissionService() {
    }
    CreateRolePermissionService.prototype.execute = function (_a) {
        var roleId = _a.roleId, permissions = _a.permissions;
        return __awaiter(this, void 0, Promise, function () {
            var role;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.role.findUnique({ where: { id: roleId } })];
                    case 1:
                        role = _b.sent();
                        if (!role) {
                            return [2 /*return*/, new Error("Role does not exists!")];
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.permissionRole.createMany({
                                data: permissions.map(function (permission) { return ({
                                    role_id: roleId,
                                    permission_id: permission.id
                                }); })
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, role];
                }
            });
        });
    };
    return CreateRolePermissionService;
}());
exports.CreateRolePermissionService = CreateRolePermissionService;
