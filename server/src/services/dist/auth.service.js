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
var jsonwebtoken_1 = require("jsonwebtoken");
var typeorm_1 = require("typeorm");
var User_1 = require("../entities/User");
var bcrypt_1 = require("bcrypt");
var RefreshToken_1 = require("../entities/RefreshToken");
var dayjs_1 = require("dayjs");
var config = require("../config");
var TokenExpiredError = jsonwebtoken_1["default"].TokenExpiredError;
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.execute = function (_a) {
        var email = _a.email, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, user, passwordMatch, token, refresh_token, access_token, expires_in, refreshToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).createQueryBuilder("users")];
                    case 1:
                        userRepository = _b.sent();
                        return [4 /*yield*/, userRepository
                                .select([
                                "users.id",
                                "users.username",
                                "users.password",
                                "users.email"
                            ])
                                .where("users.email = :email", { email: email })
                                .getOne()];
                    case 2:
                        user = _b.sent();
                        if (!user)
                            throw new Error("Usuário informado não existe na base de dados");
                        return [4 /*yield*/, bcrypt_1["default"].compareSync(password, user.password)];
                    case 3:
                        passwordMatch = _b.sent();
                        if (!passwordMatch) {
                            throw new Error("A senha informada está incorreta");
                        }
                        token = this.createToken(user);
                        refresh_token = this.createRefreshToken(user);
                        access_token = token.access_token, expires_in = token.expires_in;
                        refreshToken = typeorm_1.getRepository(RefreshToken_1.RefreshToken).create({
                            user: user,
                            expiresIn: dayjs_1["default"]().add(config.server.jwtRefreshExpiration, "seconds").unix(),
                            token: refresh_token
                        });
                        return [4 /*yield*/, refreshToken.save()];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, {
                                user: {
                                    id: user.id,
                                    username: user.username,
                                    email: user.email,
                                    image: '',
                                    access_token: access_token,
                                    expires_in: expires_in,
                                    refresh_token: refresh_token
                                }
                            }];
                }
            });
        });
    };
    AuthService.prototype.createToken = function (user) {
        var expiresIn = config.server.jwtExpiration;
        var secret = config.server.JWT_SECRET;
        var DataStoredInToken = {
            id: user.id,
            email: user.email,
            username: user.username
        };
        var token = jsonwebtoken_1["default"].sign(DataStoredInToken, secret, { expiresIn: expiresIn });
        return {
            expires_in: expiresIn,
            access_token: token
        };
    };
    AuthService.prototype.getUserByJWT = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var secret;
            return __generator(this, function (_a) {
                secret = config.server.JWT_SECRET;
                return [2 /*return*/, jsonwebtoken_1["default"].verify(token, secret)];
            });
        });
    };
    AuthService.prototype.createRefreshToken = function (user) {
        var expiresIn = config.server.jwtRefreshExpiration;
        var secret = config.server.JWT_REFRESH;
        var DataStoredInToken = {
            id: user.id,
            email: user.email,
            username: user.username
        };
        return jsonwebtoken_1["default"].sign(DataStoredInToken, secret, { expiresIn: expiresIn });
    };
    AuthService.prototype.handleRefreshToken = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var query, refreshTokenExists, secret, expiresIn, newAccessToken, tokenExpired, newRefreshToken, refreshTokenData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = typeorm_1.getRepository(RefreshToken_1.RefreshToken).createQueryBuilder('refreshToken')
                            .innerJoinAndSelect('refreshToken.user', 'user')
                            .where('refreshToken.token = :token', { token: refreshToken });
                        return [4 /*yield*/, query.getOne()];
                    case 1:
                        refreshTokenExists = _a.sent();
                        secret = config.server.JWT_REFRESH;
                        expiresIn = dayjs_1["default"]().add(config.server.jwtRefreshExpiration, "second").unix();
                        if (!refreshTokenExists) {
                            throw new Error('Refresh token is not valid');
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        // const user = jwt.verify(refreshToken, secret) as User   
                        if (!refreshTokenExists.user) {
                            throw new Error("User is not Authenticated");
                        }
                        newAccessToken = this.createToken(refreshTokenExists.user);
                        tokenExpired = this.verifyExpiration(refreshTokenExists);
                        if (!tokenExpired) return [3 /*break*/, 5];
                        console.log('Refresh Token Expirou');
                        newRefreshToken = this.createRefreshToken(refreshTokenExists.user);
                        return [4 /*yield*/, typeorm_1.getRepository(RefreshToken_1.RefreshToken)["delete"](refreshTokenExists.id)];
                    case 3:
                        _a.sent();
                        refreshTokenData = typeorm_1.getRepository(RefreshToken_1.RefreshToken).create({
                            user: refreshTokenExists.user,
                            expiresIn: expiresIn,
                            token: newRefreshToken
                        });
                        return [4 /*yield*/, refreshTokenData.save()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, __assign(__assign({}, newAccessToken), { refresh_token: newRefreshToken })];
                    case 5: return [2 /*return*/, __assign({}, newAccessToken)];
                    case 6:
                        error_1 = _a.sent();
                        throw new Error('Error: ' + error_1.message);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.verifyExpiration = function (token) {
        var expiredToken = dayjs_1["default"]().isAfter(dayjs_1["default"].unix(token.expiresIn));
        return expiredToken;
    };
    AuthService.prototype.createCookie = function (tokenData) {
        return "Authorization=Bearer " + tokenData.access_token + "; HttpOnly; Max-Age=" + tokenData.expires_in;
    };
    AuthService.prototype.getExpiredIn = function () {
        var expiredAt = new Date();
        expiredAt.setSeconds(expiredAt.getSeconds() + config.server.jwtRefreshExpiration);
        return expiredAt.getTime();
    };
    return AuthService;
}());
exports["default"] = new AuthService();
