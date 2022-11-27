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
var client_1 = require("@prisma/client");
var DetentorService = /** @class */ (function () {
    function DetentorService() {
    }
    DetentorService.prototype.create = function (data) {
        var _a, _b;
        return __awaiter(this, void 0, Promise, function () {
            var nome, pessoaFisica, pessoaJuridica, endereco, where, detentorExists, basicData, preparedData, detentor;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        nome = (data === null || data === void 0 ? void 0 : data.tipo) === 'F' ? (_a = data === null || data === void 0 ? void 0 : data.pessoaFisica) === null || _a === void 0 ? void 0 : _a.nome : (_b = data === null || data === void 0 ? void 0 : data.pessoaJuridica) === null || _b === void 0 ? void 0 : _b.nome_fantasia;
                        pessoaFisica = data.pessoaFisica, pessoaJuridica = data.pessoaJuridica, endereco = data.endereco;
                        where = (data === null || data === void 0 ? void 0 : data.tipo) === 'F' ? {
                            AND: {
                                pessoaFisica: {
                                    nome: nome
                                },
                                projeto: {
                                    id: data === null || data === void 0 ? void 0 : data.id_projeto
                                }
                            }
                        } : {
                            AND: {
                                pessoaJuridica: {
                                    nome_fantasia: nome
                                },
                                projeto: {
                                    id: data === null || data === void 0 ? void 0 : data.id_projeto
                                }
                            }
                        };
                        return [4 /*yield*/, prismaClient_1.prismaClient.pessoa.findFirst({
                                where: where
                            })];
                    case 1:
                        detentorExists = _c.sent();
                        if (detentorExists) {
                            throw new Error("Já existe uma empresa cadastrado com estas informações");
                        }
                        basicData = {
                            tipo: (data === null || data === void 0 ? void 0 : data.tipo) === 'F' ? client_1.TipoPessoa.F : client_1.TipoPessoa.J,
                            // telefone: {
                            //     create: {
                            //         numero: data?.telefone
                            //     }                    
                            // },
                            endereco: {
                                create: {
                                    cep: endereco === null || endereco === void 0 ? void 0 : endereco.cep,
                                    logradouro: endereco === null || endereco === void 0 ? void 0 : endereco.logradouro,
                                    bairro: endereco === null || endereco === void 0 ? void 0 : endereco.bairro,
                                    municipio: endereco === null || endereco === void 0 ? void 0 : endereco.municipio,
                                    estado: {
                                        connect: {
                                            id: endereco === null || endereco === void 0 ? void 0 : endereco.id_estado
                                        }
                                    }
                                }
                            },
                            projeto: {
                                connect: {
                                    id: data === null || data === void 0 ? void 0 : data.id_projeto
                                }
                            }
                        };
                        preparedData = (data === null || data === void 0 ? void 0 : data.tipo) === 'F' ? {
                            pessoaFisica: {
                                create: {
                                    nome: pessoaFisica === null || pessoaFisica === void 0 ? void 0 : pessoaFisica.nome,
                                    rg: pessoaFisica === null || pessoaFisica === void 0 ? void 0 : pessoaFisica.rg,
                                    cpf: pessoaFisica === null || pessoaFisica === void 0 ? void 0 : pessoaFisica.cpf
                                }
                            }
                        } : {
                            pessoaJuridica: {
                                create: {
                                    nome_fantasia: pessoaJuridica === null || pessoaJuridica === void 0 ? void 0 : pessoaJuridica.nome_fantasia,
                                    razao_social: pessoaJuridica === null || pessoaJuridica === void 0 ? void 0 : pessoaJuridica.razao_social,
                                    cnpj: pessoaJuridica === null || pessoaJuridica === void 0 ? void 0 : pessoaJuridica.cnpj,
                                    inscricao_estadual: pessoaJuridica === null || pessoaJuridica === void 0 ? void 0 : pessoaJuridica.inscricao_estadual,
                                    inscricao_federal: pessoaJuridica === null || pessoaJuridica === void 0 ? void 0 : pessoaJuridica.inscricao_federal
                                }
                            }
                        };
                        return [4 /*yield*/, prismaClient_1.prismaClient.pessoa.create({
                                data: __assign(__assign({}, basicData), preparedData)
                            })];
                    case 2:
                        detentor = _c.sent();
                        return [2 /*return*/, detentor];
                }
            });
        });
    };
    DetentorService.prototype.update = function (id, data) {
        return __awaiter(this, void 0, Promise, function () {
            var pessoaFisica, pessoaJuridica, endereco, basicData, preparedData, detentor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(data);
                        pessoaFisica = data.pessoaFisica, pessoaJuridica = data.pessoaJuridica, endereco = data.endereco;
                        basicData = {
                            tipo: data === null || data === void 0 ? void 0 : data.tipo,
                            // telefone: {
                            //     update: {
                            //         numero: data?.telefone
                            //     }                    
                            // },
                            endereco: {
                                update: {
                                    cep: endereco === null || endereco === void 0 ? void 0 : endereco.cep,
                                    logradouro: endereco === null || endereco === void 0 ? void 0 : endereco.logradouro,
                                    bairro: endereco === null || endereco === void 0 ? void 0 : endereco.bairro,
                                    municipio: endereco === null || endereco === void 0 ? void 0 : endereco.municipio,
                                    estado: {
                                        connect: {
                                            id: endereco === null || endereco === void 0 ? void 0 : endereco.id_estado
                                        }
                                    }
                                }
                            },
                            projeto: {
                                connect: {
                                    id: data === null || data === void 0 ? void 0 : data.id_projeto
                                }
                            }
                        };
                        preparedData = (data === null || data === void 0 ? void 0 : data.tipo) === 'F' ? {
                            pessoaFisica: {
                                upsert: {
                                    update: {
                                        nome: pessoaFisica === null || pessoaFisica === void 0 ? void 0 : pessoaFisica.nome,
                                        rg: pessoaFisica === null || pessoaFisica === void 0 ? void 0 : pessoaFisica.rg,
                                        cpf: pessoaFisica === null || pessoaFisica === void 0 ? void 0 : pessoaFisica.cpf
                                    },
                                    create: {
                                        nome: pessoaFisica === null || pessoaFisica === void 0 ? void 0 : pessoaFisica.nome,
                                        rg: pessoaFisica === null || pessoaFisica === void 0 ? void 0 : pessoaFisica.rg,
                                        cpf: pessoaFisica === null || pessoaFisica === void 0 ? void 0 : pessoaFisica.cpf
                                    }
                                }
                            }
                        } : {
                            pessoaJuridica: {
                                upsert: {
                                    update: {
                                        nome_fantasia: pessoaJuridica === null || pessoaJuridica === void 0 ? void 0 : pessoaJuridica.nome_fantasia,
                                        razao_social: pessoaJuridica === null || pessoaJuridica === void 0 ? void 0 : pessoaJuridica.razao_social,
                                        cnpj: pessoaJuridica === null || pessoaJuridica === void 0 ? void 0 : pessoaJuridica.cnpj,
                                        inscricao_estadual: pessoaJuridica === null || pessoaJuridica === void 0 ? void 0 : pessoaJuridica.inscricao_estadual,
                                        inscricao_federal: pessoaJuridica === null || pessoaJuridica === void 0 ? void 0 : pessoaJuridica.inscricao_federal
                                    },
                                    create: {
                                        nome_fantasia: pessoaJuridica === null || pessoaJuridica === void 0 ? void 0 : pessoaJuridica.nome_fantasia,
                                        razao_social: pessoaJuridica === null || pessoaJuridica === void 0 ? void 0 : pessoaJuridica.razao_social,
                                        cnpj: pessoaJuridica === null || pessoaJuridica === void 0 ? void 0 : pessoaJuridica.cnpj,
                                        inscricao_estadual: pessoaJuridica === null || pessoaJuridica === void 0 ? void 0 : pessoaJuridica.inscricao_estadual,
                                        inscricao_federal: pessoaJuridica === null || pessoaJuridica === void 0 ? void 0 : pessoaJuridica.inscricao_federal
                                    }
                                }
                            }
                        };
                        return [4 /*yield*/, prismaClient_1.prismaClient.pessoa.update({
                                data: __assign(__assign({}, basicData), preparedData),
                                where: {
                                    id: id
                                }
                            })];
                    case 1:
                        detentor = _a.sent();
                        return [2 /*return*/, detentor];
                }
            });
        });
    };
    DetentorService.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.pessoa["delete"]({
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
    DetentorService.prototype.getAll = function (projetoId) {
        return __awaiter(this, void 0, Promise, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.pessoa.findMany({
                            include: {
                                pessoaFisica: true,
                                pessoaJuridica: true
                            },
                            where: {
                                projeto: {
                                    id: projetoId
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
    DetentorService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var detentor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.pessoa.findFirst({
                            include: {
                                pessoaFisica: true,
                                pessoaJuridica: true,
                                endereco: {
                                    include: {
                                        estado: true
                                    }
                                },
                                telefone: true
                            },
                            where: {
                                id_projeto: id
                            }
                        })];
                    case 1:
                        detentor = _a.sent();
                        if (!detentor)
                            throw new Error("Detentor não encontrada");
                        return [2 /*return*/, detentor];
                }
            });
        });
    };
    return DetentorService;
}());
exports["default"] = new DetentorService();
