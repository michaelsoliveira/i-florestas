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
        var _i, estados_1, e, estado, user, _a, _b, _c, _d, empresa, _e, equacoesModelo_1, eqModelo, equacaoModelo, _f, equacoesVolume_1, eqVolume, equacaoVolume;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    console.log("Start seeding ...");
                    _i = 0, estados_1 = estados;
                    _g.label = 1;
                case 1:
                    if (!(_i < estados_1.length)) return [3 /*break*/, 4];
                    e = estados_1[_i];
                    return [4 /*yield*/, prisma.estado.create({
                            data: e
                        })];
                case 2:
                    estado = _g.sent();
                    console.log("Created estado with id: " + estado.id);
                    _g.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    _b = (_a = prisma.user).create;
                    _c = {};
                    _d = {
                        username: 'michaelsoliveira',
                        email: 'michaelsoliveira@gmail.com'
                    };
                    return [4 /*yield*/, bcryptjs_1["default"].hash('Fms237691', 10)];
                case 5: return [4 /*yield*/, _b.apply(_a, [(_c.data = (_d.password = _g.sent(),
                            _d),
                            _c)])];
                case 6:
                    user = _g.sent();
                    console.log("Created user admin with id: " + user.id);
                    return [4 /*yield*/, prisma.empresa.create({
                            data: {
                                nome_fantasia: 'iFlorestas - Gerenciamento Florestal Sustentável',
                                razao_social: 'iFlorestas SA',
                                endereco: 'BR 210',
                                municipio: 'Macapá',
                                empresa_users: {
                                    create: [
                                        {
                                            users: {
                                                connect: {
                                                    id: user.id
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        })];
                case 7:
                    empresa = _g.sent();
                    console.log("Empresa " + empresa.nome_fantasia + " criada com o id: " + empresa.id);
                    _e = 0, equacoesModelo_1 = equacoesModelo;
                    _g.label = 8;
                case 8:
                    if (!(_e < equacoesModelo_1.length)) return [3 /*break*/, 11];
                    eqModelo = equacoesModelo_1[_e];
                    return [4 /*yield*/, prisma.equacaoModelo.create({
                            data: __assign(__assign({}, eqModelo), { empresa: {
                                    connect: {
                                        id: empresa.id
                                    }
                                } })
                        })];
                case 9:
                    equacaoModelo = _g.sent();
                    console.log("Created user Equa\u00E7\u00E3o Modelo with id: " + equacaoModelo.id);
                    _g.label = 10;
                case 10:
                    _e++;
                    return [3 /*break*/, 8];
                case 11:
                    _f = 0, equacoesVolume_1 = equacoesVolume;
                    _g.label = 12;
                case 12:
                    if (!(_f < equacoesVolume_1.length)) return [3 /*break*/, 15];
                    eqVolume = equacoesVolume_1[_f];
                    return [4 /*yield*/, prisma.equacaoVolume.create({
                            data: __assign(__assign({}, eqVolume), { empresa: {
                                    connect: {
                                        id: empresa.id
                                    }
                                } })
                        })];
                case 13:
                    equacaoVolume = _g.sent();
                    console.log("Created user Equa\u00E7\u00E3o Volume with id: " + equacaoVolume.id);
                    _g.label = 14;
                case 14:
                    _f++;
                    return [3 /*break*/, 12];
                case 15:
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
