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
exports.authOptions = void 0;
var credentials_1 = require("next-auth/providers/credentials");
var google_1 = require("next-auth/providers/google");
var github_1 = require("next-auth/providers/github");
var facebook_1 = require("next-auth/providers/facebook");
var user_1 = require("@/services/user");
var GOOGLE_AUTHORIZATION_URL = "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
        prompt: "consent",
        access_type: "offline",
        response_type: "code"
    });
function findProvider(token) {
    return __awaiter(this, void 0, void 0, function () {
        var name, email, provider, access_token, dataProvider_1, userExists, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = token.name, email = token.email, provider = token.provider, access_token = token.access_token;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    dataProvider_1 = {
                        username: name,
                        email: email,
                        password: Math.random().toString(36).slice(-8),
                        image: token === null || token === void 0 ? void 0 : token.picture,
                        provider: provider,
                        id_provider: token === null || token === void 0 ? void 0 : token.sub,
                        by_provider: true
                    };
                    return [4 /*yield*/, user_1["default"].findProvider(token)];
                case 2:
                    userExists = _a.sent();
                    if (!userExists) return [3 /*break*/, 5];
                    if (!(!userExists.provider || !userExists.id_provider)) return [3 /*break*/, 4];
                    return [4 /*yield*/, user_1["default"].update(userExists === null || userExists === void 0 ? void 0 : userExists.id, dataProvider_1, access_token)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, user_1["default"].create(dataProvider_1)
                        .then(function () {
                        user_1["default"].sendEmail(dataProvider_1);
                    })["catch"](function (err) {
                        console.log(err);
                    })];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    console.log(error_1.message);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function refreshAccessToken(token) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var provider, _d, response, refreshToken, error_2, url, response, refreshedTokens, error_3;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    provider = token.provider ? token.provider : 'local';
                    _d = provider;
                    switch (_d) {
                        case 'local': return [3 /*break*/, 1];
                        case 'google': return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 9];
                case 1:
                    _e.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/refresh", {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ token: token.newRefreshToken !== token.refreshToken ? token.refreshToken : token.newRefreshToken })
                        })];
                case 2:
                    response = _e.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    refreshToken = _e.sent();
                    if (refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.refresh_token) {
                        return [2 /*return*/, __assign(__assign({}, token), { accessToken: refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.access_token, accessTokenExpires: Date.now() + (refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.expires_in) * 1000, refreshToken: (_a = refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.refresh_token) !== null && _a !== void 0 ? _a : token === null || token === void 0 ? void 0 : token.refreshToken, newRefreshToken: (_b = refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.refresh_token) !== null && _b !== void 0 ? _b : refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.refresh_token })];
                    }
                    else {
                        return [2 /*return*/, __assign(__assign({}, token), { accessToken: refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.access_token, accessTokenExpires: refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.expires_in, refreshToken: token.refreshToken })];
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _e.sent();
                    console.log(error_2);
                    return [2 /*return*/, __assign(__assign({}, token), { error: "RefreshAccessTokenError" })];
                case 5:
                    _e.trys.push([5, 8, , 9]);
                    url = "https://oauth2.googleapis.com/token?" +
                        new URLSearchParams({
                            client_id: '80208103401-2is5sf9cdimhq4ghphnn75aa4p1b4p20.apps.googleusercontent.com',
                            client_secret: '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',
                            grant_type: "refresh_token",
                            refresh_token: token.refreshToken
                        });
                    return [4 /*yield*/, fetch(url, {
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            method: "POST"
                        })];
                case 6:
                    response = _e.sent();
                    return [4 /*yield*/, response.json()];
                case 7:
                    refreshedTokens = _e.sent();
                    if (!response.ok) {
                        throw refreshedTokens;
                    }
                    return [2 /*return*/, __assign(__assign({}, token), { accessToken: refreshedTokens.access_token, accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000, refreshToken: (_c = refreshedTokens.refresh_token) !== null && _c !== void 0 ? _c : token.refreshToken })];
                case 8:
                    error_3 = _e.sent();
                    console.log(error_3);
                    return [2 /*return*/, __assign(__assign({}, token), { error: "RefreshAccessTokenError" })];
                case 9:
                    {
                        return [2 /*return*/, token];
                    }
                    _e.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.authOptions = {
    // https://next-auth.js.org/configuration/providers
    providers: [
        google_1["default"]({
            clientId: process.env.GOOGLE_CLIENT_ID || 'undefined',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'undefined',
            authorization: GOOGLE_AUTHORIZATION_URL
        }),
        facebook_1["default"]({
            clientId: process.env.FACEBOOK_CLIENT_ID || 'undefined',
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'undefined'
        }),
        github_1["default"]({
            clientId: process.env.GITHUB_CLIENT_ID || 'undefined',
            clientSecret: process.env.GITHUB_CLIENT_SECRET || 'undefined'
        }),
        credentials_1["default"]({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@bomanejo.online" },
                password: { label: "Password", type: "password" }
            },
            authorize: function (credentials, req) {
                return __awaiter(this, void 0, void 0, function () {
                    var res, user, error_4, errorMessage;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
                                        method: 'POST',
                                        body: JSON.stringify(credentials),
                                        headers: { "Content-Type": "application/json" }
                                    })];
                            case 1:
                                res = _a.sent();
                                user = res.json().then(function (data) {
                                    var response = __assign({ local: true }, data.user);
                                    return response;
                                });
                                // If no error and we have user data, return it
                                if (res.ok && user) {
                                    return [2 /*return*/, user];
                                }
                                return [2 /*return*/, null];
                            case 2:
                                error_4 = _a.sent();
                                errorMessage = error_4.response.data.message;
                                throw new Error(errorMessage + " &email=" + (credentials === null || credentials === void 0 ? void 0 : credentials.email));
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            }
        })
    ],
    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a separate secret is defined explicitly for encrypting the JWT.
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `strategy` should be set to 'jwt' if no database is used.
        strategy: "jwt",
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 24 * 60 * 60
    },
    // JSON Web tokens are only used for sessions if the `jwt: true` session
    // option is set - or by default if no database is specified.
    // https://next-auth.js.org/configuration/options#jwt
    jwt: {
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
    },
    // You can define custom pages to override the built-in ones. These will be regular Next.js pages
    // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
    // The routes shown here are the default URLs that will be used when a custom
    // pages is not specified for that route.
    // https://next-auth.js.org/configuration/pages
    pages: {
        // signIn: '/login',  // Displays signin buttons
        // signOut: '/auth/signout', // Displays form with sign out button
        // error: '/login', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // Used for check email page
        newUser: '/user/change-password' // If set, new users will be directed here on first sign in
    },
    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
        // async signIn({ user, account, profile, email, credentials }) {
        //   return true
        // },
        // async redirect({ url, baseUrl }) { return baseUrl },
        jwt: function (_a) {
            var token = _a.token, account = _a.account, user = _a.user;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (user === null || user === void 0 ? void 0 : user.local) {
                                return [2 /*return*/, {
                                        user: {
                                            id: user.id,
                                            email: user.email,
                                            username: user.username,
                                            image: user.image,
                                            roles: user.roles
                                        },
                                        accessToken: user.access_token,
                                        accessTokenExpires: Date.now() + user.expires_in * 1000,
                                        refreshToken: user.refresh_token
                                    }];
                            }
                            if (!account) return [3 /*break*/, 2];
                            return [4 /*yield*/, findProvider(__assign(__assign({}, token), account))];
                        case 1:
                            _b.sent();
                            return [2 /*return*/, {
                                    provider: account.provider,
                                    accessToken: account.access_token,
                                    accessTokenExpires: Date.now() + account.expires_in * 1000,
                                    refreshToken: account.refresh_token,
                                    user: {
                                        id: user === null || user === void 0 ? void 0 : user.id,
                                        email: user === null || user === void 0 ? void 0 : user.email,
                                        image: user === null || user === void 0 ? void 0 : user.image,
                                        username: user === null || user === void 0 ? void 0 : user.name
                                    }
                                }];
                        case 2:
                            // Return previous token if the access token has not expired yet
                            if (Date.now() < token.accessTokenExpires) {
                                return [2 /*return*/, token];
                            }
                            // Access token has expired, try to update it
                            return [2 /*return*/, refreshAccessToken(token)];
                    }
                });
            });
        },
        session: function (_a) {
            var _b;
            var session = _a.session, token = _a.token;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    // Send properties to the client, like an access_token from a provider.
                    session.user = token.user;
                    session.user.roles = (_b = token.user) === null || _b === void 0 ? void 0 : _b.roles;
                    session.provider = token.provider;
                    session.id = token.id;
                    session.accessToken = token.accessToken;
                    session.refreshToken = token.refreshToken;
                    return [2 /*return*/, session];
                });
            });
        }
    },
    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},
    // You can set the theme to 'light', 'dark' or use 'auto' to default to the
    // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
    theme: {
        colorScheme: "light"
    },
    // Enable debug messages in the console if you are having problems
    debug: false
};
