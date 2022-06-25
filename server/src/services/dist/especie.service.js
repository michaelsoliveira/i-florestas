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
var Especie_1 = require("../entities/Especie");
var typeorm_1 = require("typeorm");
var EspecieService = /** @class */ (function () {
    function EspecieService() {
    }
    EspecieService.prototype.create = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var repositoryEspecie, especieExists, especie;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repositoryEspecie = typeorm_1.getRepository(Especie_1.Especie);
                        return [4 /*yield*/, repositoryEspecie.findOne({ where: { nome: data.nome } })];
                    case 1:
                        especieExists = _a.sent();
                        if (especieExists) {
                            throw new Error('Já existe uma espécie cadastrada com este nome');
                        }
                        especie = repositoryEspecie.create(data);
                        return [4 /*yield*/, especie.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, especie];
                }
            });
        });
    };
    EspecieService.prototype.update = function (id, data) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(Especie_1.Especie).update(id, data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.findById(id)];
                }
            });
        });
    };
    EspecieService.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(Especie_1.Especie)["delete"](id)
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
    EspecieService.prototype.deleteEspecies = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(ids);
                ids.forEach(function (id) {
                    typeorm_1.getRepository(Especie_1.Especie)["delete"](id);
                });
                return [2 /*return*/];
            });
        });
    };
    EspecieService.prototype.getAll = function (query) {
        return __awaiter(this, void 0, Promise, function () {
            var perPage, page, order, search, orderBy, skip, _a, data, total;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        perPage = query.perPage, page = query.page, order = query.order, search = query.search, orderBy = query.orderBy;
                        skip = (page - 1) * perPage;
                        return [4 /*yield*/, typeorm_1.getRepository(Especie_1.Especie).createQueryBuilder('especie')
                                // .select(['especie.id', 'especie.nome', 'especie.nomeOrgao', 'especie.nomeCientifico', 'categoria.id as categoriaId', 'categoria.nome'])
                                .leftJoinAndSelect('especie.categoria', 'categoria')
                                .skip(skip)
                                .take(perPage)
                                .where({
                                nome: search ? typeorm_1.ILike("%" + search + "%") : typeorm_1.ILike('%%')
                            })
                                .orderBy(orderBy, order ? order : 'ASC')
                                .getManyAndCount()
                            // const [data, total] = await getRepository(Especie).findAndCount({
                            //     select: ['id', 'nome', 'nomeOrgao', 'nomeCientifico', 'categoria'],
                            //     where: {
                            //         nome: search ? ILike(`%${search}%`) : ILike('%%')
                            //     },
                            //     relations: ['categoria'],
                            //     order: {
                            //         [orderBy]: order ? order : 'ASC'
                            //     },
                            //     take: perPage,
                            //     skip
                            // })
                        ];
                    case 1:
                        _a = _b.sent(), data = _a[0], total = _a[1];
                        // const [data, total] = await getRepository(Especie).findAndCount({
                        //     select: ['id', 'nome', 'nomeOrgao', 'nomeCientifico', 'categoria'],
                        //     where: {
                        //         nome: search ? ILike(`%${search}%`) : ILike('%%')
                        //     },
                        //     relations: ['categoria'],
                        //     order: {
                        //         [orderBy]: order ? order : 'ASC'
                        //     },
                        //     take: perPage,
                        //     skip
                        // })
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
    EspecieService.prototype.getAllWithCategory = function () {
        return __awaiter(this, void 0, Promise, function () {
            var query, especies;
            return __generator(this, function (_a) {
                query = typeorm_1.getRepository(Especie_1.Especie).createQueryBuilder('especie');
                especies = query.leftJoinAndSelect('especie.categoria', 'categoria').getMany();
                return [2 /*return*/, especies];
            });
        });
    };
    EspecieService.prototype.findById = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var especie;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.getRepository(Especie_1.Especie).createQueryBuilder('especie')
                            .leftJoinAndSelect('especie.categoria', 'categoria').where({ id: id }).getOne()];
                    case 1:
                        especie = _a.sent();
                        return [2 /*return*/, especie];
                }
            });
        });
    };
    return EspecieService;
}());
exports["default"] = new EspecieService;
