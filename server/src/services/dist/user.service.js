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
var bcryptjs_1 = require("bcryptjs");
var typeorm_1 = require("typeorm");
var User_1 = require("../entities/User");
var nodemailer_1 = require("nodemailer");
var Empresa_1 = require("../entities/Empresa");
var prismaClient_1 = require("../database/prismaClient");
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.create = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var userRepository, userExists, passwordHash, preparedData, empresa, _a, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOne({ where: { email: data === null || data === void 0 ? void 0 : data.email } })];
                    case 1:
                        userExists = _b.sent();
                        if (userExists) {
                            throw new Error("Já existe um usuário cadastrado com este e-mail");
                        }
                        return [4 /*yield*/, bcryptjs_1["default"].hash(data === null || data === void 0 ? void 0 : data.password, 10)];
                    case 2:
                        passwordHash = _b.sent();
                        preparedData = {
                            username: data === null || data === void 0 ? void 0 : data.username,
                            email: data === null || data === void 0 ? void 0 : data.email,
                            password: passwordHash,
                            image: data === null || data === void 0 ? void 0 : data.image,
                            provider: data === null || data === void 0 ? void 0 : data.provider,
                            idProvider: data === null || data === void 0 ? void 0 : data.idProvider
                        };
                        _a = (data === null || data === void 0 ? void 0 : data.empresaId);
                        if (!_a) return [3 /*break*/, 4];
                        return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).findOne(data === null || data === void 0 ? void 0 : data.empresaId)];
                    case 3:
                        _a = (_b.sent());
                        _b.label = 4;
                    case 4:
                        empresa = _a;
                        user = userRepository.create(preparedData);
                        if (empresa) {
                            user.empresas = [empresa];
                        }
                        return [4 /*yield*/, user.save()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.prototype.update = function (id, data) {
        return __awaiter(this, void 0, Promise, function () {
            var userRepository, userExists, passwordHash, preparedData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOne({ where: { id: id } })];
                    case 1:
                        userExists = _a.sent();
                        if (!userExists) {
                            throw new Error("Usuário não localizado");
                        }
                        return [4 /*yield*/, bcryptjs_1["default"].hash(data === null || data === void 0 ? void 0 : data.password, 10)];
                    case 2:
                        passwordHash = _a.sent();
                        preparedData = {
                            username: data === null || data === void 0 ? void 0 : data.username,
                            email: data === null || data === void 0 ? void 0 : data.email,
                            password: passwordHash,
                            image: data === null || data === void 0 ? void 0 : data.image,
                            provider: data === null || data === void 0 ? void 0 : data.provider,
                            idProvider: data === null || data === void 0 ? void 0 : data.idProvider
                        };
                        return [4 /*yield*/, userRepository.update(id, preparedData)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, this.findOne(id)];
                }
            });
        });
    };
    UserService.prototype.updatePassword = function (id, oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, userData, validPassword, passwordHash, preparedData;
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
                        console.log(validPassword);
                        if (!validPassword) {
                            throw new Error("Senha informada não corresponde com a cadastrada");
                        }
                        return [4 /*yield*/, bcryptjs_1["default"].hash(newPassword, 10)];
                    case 3:
                        passwordHash = _a.sent();
                        preparedData = {
                            username: userData === null || userData === void 0 ? void 0 : userData.username,
                            email: userData === null || userData === void 0 ? void 0 : userData.email,
                            password: passwordHash,
                            image: userData === null || userData === void 0 ? void 0 : userData.image,
                            provider: userData === null || userData === void 0 ? void 0 : userData.provider,
                            idProvider: userData === null || userData === void 0 ? void 0 : userData.idProvider
                        };
                        console.log(preparedData);
                        return [4 /*yield*/, userRepository.update(id, preparedData)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, this.findOne(id)];
                }
            });
        });
    };
    UserService.prototype.getAll = function () {
        return __awaiter(this, void 0, Promise, function () {
            var userRepository;
            return __generator(this, function (_a) {
                userRepository = typeorm_1.getRepository(User_1.User);
                return [2 /*return*/, userRepository.find()];
            });
        });
    };
    ;
    UserService.prototype.findOne = function (requestId) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({ where: { id: requestId } })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new Error("User not Found");
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
                            throw new Error("User not found");
                        return [2 /*return*/, result];
                }
            });
        });
    };
    UserService.prototype.findByProvider = function (provider, idProvider, email) {
        return __awaiter(this, void 0, Promise, function () {
            var user_1, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!email) return [3 /*break*/, 2];
                        return [4 /*yield*/, prismaClient_1.prismaClient.user.findUnique({
                                where: {
                                    email: email
                                }
                            })];
                    case 1:
                        user_1 = _a.sent();
                        return [2 /*return*/, user_1];
                    case 2: return [4 /*yield*/, prismaClient_1.prismaClient.user.findFirst({
                            where: {
                                AND: [
                                    { provider: provider },
                                    { id_provider: idProvider }
                                ]
                            }
                        })
                        // const query = await getRepository(User).createQueryBuilder("user")
                        // const data =
                        //     query.where("user.provider = :provider", { provider })
                        //         .andWhere("user.idProvider = :idProvider", { idProvider })
                    ];
                    case 3:
                        user = _a.sent();
                        // const query = await getRepository(User).createQueryBuilder("user")
                        // const data =
                        //     query.where("user.provider = :provider", { provider })
                        //         .andWhere("user.idProvider = :idProvider", { idProvider })
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
                    from: '"Michael Santos de Oliveira 👻" <michaelsoliveira@gmail.com>',
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
            var userRepository, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).createQueryBuilder("users")];
                    case 1:
                        userRepository = _a.sent();
                        return [4 /*yield*/, userRepository
                                .select([
                                "users.id",
                                "users.username",
                                "users.password",
                                "users.email",
                                "users.provider",
                                "users.idProvider"
                            ])
                                .where("users.id = :id", { id: id })
                                .getOne()];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    return UserService;
}());
exports["default"] = new UserService();
