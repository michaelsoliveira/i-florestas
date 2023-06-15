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
var client_1 = require("@prisma/client");
var bcryptjs_1 = require("bcryptjs");
var prisma = new client_1.PrismaClient();
var observacoes = [
    {
        nome: 'Oca'
    },
    {
        nome: 'Morta'
    },
    {
        nome: 'Tombada'
    },
    {
        nome: 'Ninho'
    },
    {
        nome: 'Estimada',
        preservar: false
    },
    {
        nome: 'Caida'
    }
];
var roles = [
    {
        name: 'Admin',
        description: 'Administrador do Projeto'
    },
    {
        name: 'Gerente',
        description: 'Gerente do Projeto'
    },
    {
        name: 'Funcionário',
        description: 'Usuário Padrão'
    }
];
var equacoesModelo = [
    {
        nome: 'Schumacher - Hall',
        expressao: 'EXP(a + b * LN(DAP) + c * LN(ALTURA))'
    },
    {
        nome: 'Spurr',
        expressao: 'EXP(a + b * LN(DAP ^ 2 * ALTURA))'
    },
    {
        nome: 'Husch (1963)',
        expressao: 'EXP(a + b * LN(DAP))'
    },
    {
        nome: 'Fator de forma',
        expressao: 'a * (3.141592 * (DAP ^ 2) / 40000 ) * ALTURA'
    },
];
var equacoesVolume = [
    {
        nome: 'Fator de forma',
        expressao: '0.7 * (3.141592 * (DAP ^ 2) / 40000 ) * ALTURA'
    },
    {
        nome: 'Equação de Volume Flona Tapajós',
        expressao: 'EXP(-8.86102 + 1.93181 * LN(DAP) + 0.78683 * LN(ALTURA))'
    },
];
var situacoesPoa = [
    { nome: 'Novo' },
    { nome: 'Validado' },
    { nome: 'Processado' },
    { nome: 'Finalizado/Fechado' },
];
var estados = [
    {
        uf: 'AC',
        nome: 'Acre',
        ddd: 68
    },
    {
        uf: 'AL',
        nome: 'Alagoas',
        ddd: 82
    },
    {
        uf: 'AM',
        nome: 'Amazonas',
        ddd: 92
    },
    {
        uf: 'AP',
        nome: 'Amapá',
        ddd: 96
    },
    {
        uf: 'BA',
        nome: 'Bahia',
        ddd: 71
    },
    {
        uf: 'CE',
        nome: 'Ceará',
        ddd: 85
    },
    {
        uf: 'DF',
        nome: 'Distrito Federal',
        ddd: 61
    },
    {
        uf: 'ES',
        nome: 'Espírito Santo',
        ddd: 27
    },
    {
        uf: 'GO',
        nome: 'Goiás',
        ddd: 62
    },
    {
        uf: 'MA',
        nome: 'Maranhão',
        ddd: 98
    },
    {
        uf: 'MG',
        nome: 'Minas Gerais',
        ddd: 31
    },
    {
        uf: 'MS',
        nome: 'Mato Grosso do Sul',
        ddd: 67
    },
    {
        uf: 'MT',
        nome: 'Mato Grosso',
        ddd: 65
    },
    {
        uf: 'PA',
        nome: 'Pará',
        ddd: 91
    },
    {
        uf: 'PB',
        nome: 'Paraíba',
        ddd: 83
    },
    {
        uf: 'PE',
        nome: 'Pernambuco',
        ddd: 81
    },
    {
        uf: 'PI',
        nome: 'Piauí',
        ddd: 86
    },
    {
        uf: 'PR',
        nome: 'Paraná',
        ddd: 41
    },
    {
        uf: 'RJ',
        nome: 'Rio de Janeiro',
        ddd: 21
    },
    {
        uf: 'RN',
        nome: 'Rio Grande do Norte',
        ddd: 84
    },
    {
        uf: 'RO',
        nome: 'Rondônia',
        ddd: 69
    },
    {
        uf: 'RR',
        nome: 'Roraima',
        ddd: 95
    },
    {
        uf: 'RS',
        nome: 'Rio Grande do Sul',
        ddd: 51
    },
    {
        uf: 'SC',
        nome: 'Santa Catarina',
        ddd: 47
    },
    {
        uf: 'SE',
        nome: 'Sergipe',
        ddd: 79
    },
    {
        uf: 'SP',
        nome: 'São Paulo',
        ddd: 11
    },
    {
        uf: 'TO',
        nome: 'Tocantins',
        ddd: 63
    },
];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, estados_1, e, estado, ufAP, _a, roles_1, r, role, _b, situacoesPoa_1, s, situacaoPoa, roleAdmin, projeto, user, _c, _d, _e, _f, detentor, _g, observacoes_1, obs, obsModelo, _h, equacoesModelo_1, eqModelo, equacaoModelo, _j, equacoesVolume_1, eqVolume, equacaoVolume;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    console.log("Start seeding ...");
                    _i = 0, estados_1 = estados;
                    _k.label = 1;
                case 1:
                    if (!(_i < estados_1.length)) return [3 /*break*/, 4];
                    e = estados_1[_i];
                    return [4 /*yield*/, prisma.estado.create({
                            data: e
                        })];
                case 2:
                    estado = _k.sent();
                    console.log("Created estado with id: " + estado.id);
                    _k.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, prisma.estado.findFirst({
                        where: {
                            uf: {
                                equals: 'AP'
                            }
                        }
                    })];
                case 5:
                    ufAP = _k.sent();
                    _a = 0, roles_1 = roles;
                    _k.label = 6;
                case 6:
                    if (!(_a < roles_1.length)) return [3 /*break*/, 9];
                    r = roles_1[_a];
                    return [4 /*yield*/, prisma.role.create({
                            data: r
                        })];
                case 7:
                    role = _k.sent();
                    console.log("Created role with id: " + role.id);
                    _k.label = 8;
                case 8:
                    _a++;
                    return [3 /*break*/, 6];
                case 9:
                    _b = 0, situacoesPoa_1 = situacoesPoa;
                    _k.label = 10;
                case 10:
                    if (!(_b < situacoesPoa_1.length)) return [3 /*break*/, 13];
                    s = situacoesPoa_1[_b];
                    return [4 /*yield*/, prisma.situacaoPoa.create({
                            data: s
                        })];
                case 11:
                    situacaoPoa = _k.sent();
                    console.log("Created role with id: " + situacaoPoa.id);
                    _k.label = 12;
                case 12:
                    _b++;
                    return [3 /*break*/, 10];
                case 13: return [4 /*yield*/, prisma.role.findFirst({
                        where: {
                            name: {
                                equals: 'Admin'
                            }
                        }
                    })];
                case 14:
                    roleAdmin = _k.sent();
                    return [4 /*yield*/, prisma.projeto.create({
                            data: {
                                nome: 'Projeto Inicial'
                            }
                        })];
                case 15:
                    projeto = _k.sent();
                    _d = (_c = prisma.user).create;
                    _e = {};
                    _f = {
                        username: 'michaelsoliveira',
                        email: 'michaelsoliveira@gmail.com'
                    };
                    return [4 /*yield*/, bcryptjs_1["default"].hash('Fms237691', 10)];
                case 16: return [4 /*yield*/, _d.apply(_c, [(_e.data = (_f.password = _k.sent(),
                            _f.id_projeto_active = projeto === null || projeto === void 0 ? void 0 : projeto.id,
                            _f.users_roles = {
                                create: [
                                    {
                                        projeto: {
                                            connect: {
                                                id: projeto === null || projeto === void 0 ? void 0 : projeto.id
                                            }
                                        },
                                        roles: {
                                            connect: {
                                                id: roleAdmin === null || roleAdmin === void 0 ? void 0 : roleAdmin.id
                                            }
                                        }
                                    }
                                ]
                            },
                            _f),
                            _e)])];
                case 17:
                    user = _k.sent();
                    console.log("Created user admin with id: " + user.id);
                    return [4 /*yield*/, prisma.pessoa.create({
                            include: {
                                pessoaJuridica: true
                            },
                            data: {
                                tipo: 'J',
                                endereco: {
                                    create: {
                                        logradouro: 'BR 210',
                                        municipio: 'Macapá',
                                        estado: {
                                            connect: {
                                                id: ufAP === null || ufAP === void 0 ? void 0 : ufAP.id
                                            }
                                        }
                                    }
                                },
                                pessoaJuridica: {
                                    create: {
                                        cnpj: '322390487',
                                        nome_fantasia: 'iFlorestas - Gerenciamento Florestal Sustentável',
                                        razao_social: 'iFlorestal SA'
                                    }
                                },
                                projeto: {
                                    connect: {
                                        id: projeto === null || projeto === void 0 ? void 0 : projeto.id
                                    }
                                }
                            }
                        })];
                case 18:
                    detentor = _k.sent();
                    console.log("Detentor criada com o id: " + detentor.id);
                    _g = 0, observacoes_1 = observacoes;
                    _k.label = 19;
                case 19:
                    if (!(_g < observacoes_1.length)) return [3 /*break*/, 22];
                    obs = observacoes_1[_g];
                    return [4 /*yield*/, prisma.observacaoArvore.create({
                            data: __assign({}, obs)
                        })];
                case 20:
                    obsModelo = _k.sent();
                    console.log("Created observacao with id: " + obsModelo.id);
                    _k.label = 21;
                case 21:
                    _g++;
                    return [3 /*break*/, 19];
                case 22:
                    _h = 0, equacoesModelo_1 = equacoesModelo;
                    _k.label = 23;
                case 23:
                    if (!(_h < equacoesModelo_1.length)) return [3 /*break*/, 26];
                    eqModelo = equacoesModelo_1[_h];
                    return [4 /*yield*/, prisma.equacaoModelo.create({
                            data: __assign({}, eqModelo)
                        })];
                case 24:
                    equacaoModelo = _k.sent();
                    console.log("Created user Equa\u00E7\u00E3o Modelo with id: " + equacaoModelo.id);
                    _k.label = 25;
                case 25:
                    _h++;
                    return [3 /*break*/, 23];
                case 26:
                    _j = 0, equacoesVolume_1 = equacoesVolume;
                    _k.label = 27;
                case 27:
                    if (!(_j < equacoesVolume_1.length)) return [3 /*break*/, 30];
                    eqVolume = equacoesVolume_1[_j];
                    return [4 /*yield*/, prisma.equacaoVolume.create({
                            data: __assign(__assign({}, eqVolume), { projeto: {
                                    connect: {
                                        id: projeto === null || projeto === void 0 ? void 0 : projeto.id
                                    }
                                } })
                        })];
                case 28:
                    equacaoVolume = _k.sent();
                    console.log("Created user Equa\u00E7\u00E3o Volume with id: " + equacaoVolume.id);
                    _k.label = 29;
                case 29:
                    _j++;
                    return [3 /*break*/, 27];
                case 30:
                    console.log("Seeding finished.");
                    return [2 /*return*/];
            }
        });
    });
}
main()["catch"](function (e) {
    console.error(e);
    process.exit(1);
})["finally"](function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
