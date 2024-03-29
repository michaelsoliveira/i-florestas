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
exports.CategoriaEspecieController = void 0;
var categoria_service_1 = require("../services/categoria.service");
var CategoriaEspecieController = /** @class */ (function () {
    function CategoriaEspecieController() {
    }
    CategoriaEspecieController.prototype.store = function (request, response) {
        return __awaiter(this, void 0, Promise, function () {
            var categoria, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, categoria_service_1["default"].create(request.body)];
                    case 1:
                        categoria = _a.sent();
                        return [2 /*return*/, response.json({
                                error: false,
                                categoria: categoria,
                                message: "Categoria de esp\u00E9cie " + categoria.nome + " cadastrada com SUCESSO!!!"
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, response.json({
                                error: true,
                                especie: null,
                                message: error_1.message
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CategoriaEspecieController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, Promise, function () {
            var id, categoria, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, categoria_service_1["default"].update(id, request.body)];
                    case 2:
                        categoria = _a.sent();
                        return [2 /*return*/, response.json({
                                error: false,
                                categoria: categoria,
                                message: "Categoria de esp\u00E9cie " + categoria.nome + " atualizada com SUCESSO!!!"
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, response.json({
                                error: true,
                                categoria: null,
                                message: error_2.message
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CategoriaEspecieController.prototype["delete"] = function (request, response) {
        return __awaiter(this, void 0, Promise, function () {
            var id, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, categoria_service_1["default"]["delete"](id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.status(200).json({
                                error: false,
                                message: 'Especie deletada com Sucesso!!!'
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, response.json({
                                error: true,
                                especie: null,
                                message: error_3.message
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CategoriaEspecieController.prototype.findAll = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, perPage, page, skip, count, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, categoria_service_1["default"].getAll(request.query)];
                    case 1:
                        _a = _b.sent(), data = _a.data, perPage = _a.perPage, page = _a.page, skip = _a.skip, count = _a.count;
                        return [2 /*return*/, response.json({
                                error: false,
                                categorias: data,
                                perPage: perPage,
                                page: page,
                                skip: skip,
                                count: count,
                                message: null
                            })];
                    case 2:
                        error_4 = _b.sent();
                        return [2 /*return*/, response.json({
                                error: false,
                                categorias: [],
                                message: null
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CategoriaEspecieController.prototype.search = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var nome, categorias, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        nome = request.query.nome;
                        if (!nome) return [3 /*break*/, 2];
                        return [4 /*yield*/, categoria_service_1["default"].search(nome)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, categoria_service_1["default"].getAll()];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        categorias = _a;
                        return [2 /*return*/, response.json(categorias)];
                }
            });
        });
    };
    CategoriaEspecieController.prototype.findOne = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, categoria, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, categoria_service_1["default"].findById(id)];
                    case 2:
                        categoria = _a.sent();
                        return [2 /*return*/, response.json(categoria)];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, response.json(error_5.message)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return CategoriaEspecieController;
}());
exports.CategoriaEspecieController = CategoriaEspecieController;
