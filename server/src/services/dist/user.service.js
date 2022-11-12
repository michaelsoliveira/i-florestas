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
var bcryptjs_1 = require("bcryptjs");
var typeorm_1 = require("typeorm");
var User_1 = require("../entities/User");
var nodemailer_1 = require("nodemailer");
var prismaClient_1 = require("../database/prismaClient");
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.create = function (data, userId) {
        return __awaiter(this, void 0, Promise, function () {
            var userExists, passwordHash, dataRequest, preparedData, _a, user;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.user.findFirst({
                            where: {
                                AND: {
                                    email: data === null || data === void 0 ? void 0 : data.email,
                                    projeto_users: {
                                        some: {
                                            id_user: userId
                                        }
                                    }
                                }
                            }
                        })];
                    case 1:
                        userExists = _b.sent();
                        if (userExists) {
                            throw new Error("Usuário já cadastrado");
                        }
                        return [4 /*yield*/, bcryptjs_1["default"].hash(data === null || data === void 0 ? void 0 : data.password, 10)];
                    case 2:
                        passwordHash = _b.sent();
                        dataRequest = {
                            username: data === null || data === void 0 ? void 0 : data.username,
                            email: data === null || data === void 0 ? void 0 : data.email,
                            password: passwordHash,
                            image: data === null || data === void 0 ? void 0 : data.image,
                            provider: (data === null || data === void 0 ? void 0 : data.provider) ? data === null || data === void 0 ? void 0 : data.provider : 'local',
                            id_provider: (data === null || data === void 0 ? void 0 : data.id_provider) ? data === null || data === void 0 ? void 0 : data.id_provider : ''
                        };
                        if (!!(data === null || data === void 0 ? void 0 : data.projetoId)) return [3 /*break*/, 4];
                        return [4 /*yield*/, prismaClient_1.prismaClient.projeto.findFirst({
                                where: {
                                    projeto_users: {
                                        some: {
                                            id_user: userId
                                        }
                                    }
                                }
                            })
                                .then(function (projeto) { return __awaiter(_this, void 0, void 0, function () {
                                var preparedData_1;
                                return __generator(this, function (_a) {
                                    if (projeto) {
                                        preparedData_1 = __assign(__assign({}, dataRequest), { projeto_users: {
                                                create: {
                                                    id_projeto: projeto === null || projeto === void 0 ? void 0 : projeto.id
                                                }
                                            } });
                                        return [2 /*return*/, preparedData_1];
                                    }
                                    return [2 /*return*/, dataRequest];
                                });
                            }); })];
                    case 3:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _a = __assign(__assign({}, dataRequest), { projeto_users: {
                                create: {
                                    id_projeto: data === null || data === void 0 ? void 0 : data.projetoId
                                }
                            } });
                        _b.label = 5;
                    case 5:
                        preparedData = _a;
                        return [4 /*yield*/, prismaClient_1.prismaClient.user.create({
                                data: __assign({}, preparedData)
                            })];
                    case 6:
                        user = _b.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.update = function (id, data) {
        return __awaiter(this, void 0, Promise, function () {
            var userExists, basicData, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.user.findFirst({
                            where: {
                                id: id
                            }
                        })];
                    case 1:
                        userExists = _a.sent();
                        if (!userExists) {
                            throw new Error("Usuário não localizado");
                        }
                        basicData = {
                            username: data === null || data === void 0 ? void 0 : data.username,
                            email: data === null || data === void 0 ? void 0 : data.email,
                            image: (data === null || data === void 0 ? void 0 : data.image) ? data === null || data === void 0 ? void 0 : data.image : userExists === null || userExists === void 0 ? void 0 : userExists.image
                        };
                        return [4 /*yield*/, prismaClient_1.prismaClient.user.update({
                                where: {
                                    id: id
                                },
                                data: (data === null || data === void 0 ? void 0 : data.id_role) ? __assign(__assign({}, basicData), { users_roles: {
                                        connect: {
                                            user_id_role_id: {
                                                role_id: data === null || data === void 0 ? void 0 : data.id_role,
                                                user_id: id
                                            }
                                        }
                                    } }) : basicData
                            })];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.user["delete"]({
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
    UserService.prototype.updatePassword = function (id, oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, userData, validPassword, passwordHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, this.findWithPassword(id)];
                    case 1:
                        userData = _a.sent();
                        if (!userData) {
                            throw new Error("Usuário não localizado");
                        }
                        return [4 /*yield*/, bcryptjs_1["default"].compare(oldPassword, userData.password)];
                    case 2:
                        validPassword = _a.sent();
                        if (!validPassword) {
                            throw new Error("Senha informada não corresponde com a cadastrada");
                        }
                        return [4 /*yield*/, bcryptjs_1["default"].hash(newPassword, 10)];
                    case 3:
                        passwordHash = _a.sent();
                        return [4 /*yield*/, userRepository.update(id, { password: passwordHash })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, this.findOne(id)];
                }
            });
        });
    };
    UserService.prototype.getAll = function () {
        return __awaiter(this, void 0, Promise, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.user.findMany({
                            where: {
                                projeto_users: {
                                    some: {
                                        active: true
                                    }
                                }
                            }
                        })];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                }
            });
        });
    };
    ;
    UserService.prototype.findOne = function (requestId) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.user.findFirst({
                            where: { id: requestId },
                            select: {
                                id: true,
                                email: true,
                                username: true,
                                users_roles: {
                                    select: {
                                        roles: {
                                            select: {
                                                id: true,
                                                name: true
                                            }
                                        }
                                    }
                                }
                            }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new Error("User not Found 0");
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.findByKey = function (key, value) {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({ where: (_a = {}, _a[key] = value, _a) })];
                    case 1:
                        result = _b.sent();
                        if (!result)
                            throw new Error("User not found 1");
                        return [2 /*return*/, result];
                }
            });
        });
    };
    UserService.prototype.findProvider = function (provider) {
        return __awaiter(this, void 0, Promise, function () {
            var email, id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = provider.email, id = provider.id;
                        return [4 /*yield*/, prismaClient_1.prismaClient.user.findFirst({
                                where: {
                                    OR: [
                                        { email: email },
                                        { id_provider: String(id) }
                                    ]
                                },
                                select: {
                                    id: true,
                                    username: true,
                                    email: true,
                                    provider: true,
                                    id_provider: true,
                                    users_roles: {
                                        select: {
                                            roles: {
                                                select: {
                                                    name: true
                                                }
                                            }
                                        }
                                    }
                                }
                            })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.sendMail = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var email, name, message, transporter, escapedEmail, escapedName, backgroundColor, textColor, mainBackgroundColor, buttonBackgroundColor, buttonBorderColor, buttonTextColor, url, linkLogin;
            return __generator(this, function (_a) {
                email = data.email, name = data.name, message = data.message;
                console.log(process.env.GMAIL_USER, process.env.GMAIL_PWD);
                transporter = nodemailer_1["default"].createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.GMAIL_USER,
                        pass: process.env.GMAIL_PWD
                    }
                });
                escapedEmail = "" + email.replace(/\./g, "&#8203;.");
                escapedName = "" + name.replace(/\./g, "&#8203;.");
                backgroundColor = "#f9f9f9";
                textColor = "#444444";
                mainBackgroundColor = "#ffffff";
                buttonBackgroundColor = "#346df1";
                buttonBorderColor = "#346df1";
                buttonTextColor = "#ffffff";
                url = 'http://bomanejo.com';
                linkLogin = "\n            <a href=\"" + url + "\" target=\"_blank\" style=\"font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: " + buttonTextColor + "; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid " + buttonBorderColor + "; display: inline-block; font-weight: bold;\">\n                Login\n            </a>\n        ";
                // send mail with defined transport object
                transporter.sendMail({
                    from: '"Michael Santos de Oliveira" <michaelsoliveira@gmail.com>',
                    to: email,
                    subject: "Acesso ao Software BOManejo Web",
                    text: "Usu\u00E1rio " + name + " foi cadastrado com Sucesso!",
                    html: "\n            <body style=\"background: " + backgroundColor + ";\">\n                <table style=\"padding: 10px 0px 0px 10px;\" width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n                    <tr>\n                    <td align=\"center\" style=\"padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: " + textColor + ";\">\n                        <strong>Seja bem vindo " + escapedName + "</strong>\n                    </td>\n                    </tr>\n                </table>\n                <table width=\"100%\" border=\"0\" cellspacing=\"20\" cellpadding=\"0\" style=\"background: " + mainBackgroundColor + "; max-width: 600px; margin: auto; border-radius: 10px;\">\n                    <tr>\n                    <td align=\"center\" style=\"padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: " + textColor + ";\">\n                        Voc\u00EA pode realizar o login utilizando seu email: <strong>" + escapedEmail + "</strong>\n                    </td>\n                    </tr>\n                    <tr>\n                    <td align=\"center\" style=\"padding: 20px 0;\">\n                        <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n                        <tr>\n                            <td align=\"center\" style=\"border-radius: 5px; padding: 10px 20px; font-size: 18px; color: #ffffff;\" bgcolor=\"" + buttonBackgroundColor + "\">\n                                " + message + "\n                            </td>\n                        </tr>\n                        </table>\n                    </td>\n                    </tr>\n                    <tr>\n                    <td align=\"center\" style=\"padding: 0px 0px 10px 0px; font-size: 14px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: " + textColor + ";\">\n                        Voc\u00EA n\u00E3o precisa retornar este email\n                    </td>\n                    </tr>\n                </table>\n            </body>"
                }, function (error, data) {
                    if (error) {
                        console.log('Error: ', error);
                    }
                    else {
                        console.log("Message sent: %s", data.response);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    UserService.prototype.findWithPassword = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.user.findFirst({
                            where: {
                                id: id
                            },
                            select: {
                                id: true,
                                password: true
                            }
                        })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    return UserService;
}());
exports["default"] = new UserService();
