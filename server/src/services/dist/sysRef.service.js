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
var sysRefsTrait = [];
var OR = {
    OR: [
        {
            srid: { "in": [4326, 4674] }
        },
        {
            srid: {
                gte: 32717,
                lte: 32725
            }
        },
        {
            srid: {
                gte: 32617,
                lte: 32625
            }
        },
        {
            srid: {
                gte: 31971,
                lte: 31985
            }
        },
    ]
};
var SysRefService = /** @class */ (function () {
    function SysRefService() {
    }
    SysRefService.prototype.create = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var refSys, SysRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.spatialRefSys.findFirst({
                            where: {
                                srtext: data.srtext
                            }
                        })];
                    case 1:
                        refSys = _a.sent();
                        if (refSys) {
                            throw new Error('Já existe um SysRef com este Nome');
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.spatialRefSys.create({
                                data: {
                                    srid: data.srid,
                                    srtext: data.srtext
                                }
                            })];
                    case 2:
                        SysRef = _a.sent();
                        return [2 /*return*/, SysRef];
                }
            });
        });
    };
    SysRefService.prototype.update = function (srid, data) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.spatialRefSys.update({
                            where: {
                                srid: srid
                            },
                            data: data
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.findById(srid)];
                }
            });
        });
    };
    SysRefService.prototype["delete"] = function (srid) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.spatialRefSys["delete"]({
                            where: {
                                srid: srid
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
    SysRefService.prototype.getAll = function (query) {
        return __awaiter(this, void 0, Promise, function () {
            var perPage, page, search, orderBy, order, skip, orderByTerm, searchTermFilter, orderByElement, sysRefs;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        perPage = query.perPage, page = query.page, search = query.search, orderBy = query.orderBy, order = query.order;
                        skip = (page - 1) * perPage;
                        orderByTerm = {};
                        searchTermFilter = search
                            ? {
                                OR: [
                                    __assign({}, OR),
                                    {
                                        srtext: { contains: search }
                                    },
                                ]
                            }
                            : __assign({}, OR);
                        orderByElement = orderBy ? orderBy.split('.') : {};
                        if (orderByElement.length == 2) {
                            orderByTerm = (_a = {},
                                _a[orderByElement[1]] = order,
                                _a);
                        }
                        else {
                            orderByTerm = (_b = {},
                                _b[orderByElement] = order,
                                _b);
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.spatialRefSys.findMany({
                                where: __assign({}, searchTermFilter),
                                take: perPage ? parseInt(perPage) : 50,
                                skip: skip ? skip : 0,
                                orderBy: __assign({}, orderByTerm),
                                select: {
                                    srid: true,
                                    srtext: true
                                }
                            })];
                    case 1:
                        sysRefs = _c.sent();
                        sysRefs.map(function (sysRef) {
                            var text = sysRef.srtext.split("\"");
                            sysRefsTrait.push({
                                srid: sysRef.srid,
                                srtext: text[1]
                            });
                        });
                        return [2 /*return*/, {
                                data: sysRefsTrait,
                                perPage: perPage,
                                page: page,
                                skip: skip,
                                count: sysRefs.length
                            }];
                }
            });
        });
    };
    SysRefService.prototype.deleteSysRef = function (srids) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.spatialRefSys.deleteMany({
                            where: {
                                srid: { "in": srids }
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SysRefService.prototype.search = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var sysRefs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.spatialRefSys.findMany({
                            where: {
                                OR: [
                                    {
                                        srtext: { mode: 'insensitive', contains: text }
                                    },
                                    __assign({}, OR)
                                ]
                            },
                            orderBy: {
                                srtext: 'asc'
                            },
                            select: {
                                srid: true,
                                srtext: true
                            }
                        })];
                    case 1:
                        sysRefs = _a.sent();
                        sysRefs.map(function (sysRef) {
                            var text = sysRef.srtext.split("\"");
                            sysRefsTrait.push({
                                srid: sysRef.srid,
                                srtext: text[1]
                            });
                        });
                        return [2 /*return*/, sysRefsTrait];
                }
            });
        });
    };
    SysRefService.prototype.findById = function (srid) {
        return __awaiter(this, void 0, Promise, function () {
            var SysRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.spatialRefSys.findUnique({ where: { srid: srid } })];
                    case 1:
                        SysRef = _a.sent();
                        return [2 /*return*/, SysRef];
                }
            });
        });
    };
    return SysRefService;
}());
exports["default"] = new SysRefService;
