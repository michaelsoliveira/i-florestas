"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EquacaoAbasal = void 0;
var typeorm_1 = require("typeorm");
// @Index("equacao_abasal_equacao_pkey", ["idEquacao"], { unique: true })
var EquacaoAbasal = /** @class */ (function () {
    function EquacaoAbasal() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "bigint", name: "id_equacao" })
    ], EquacaoAbasal.prototype, "idEquacao");
    __decorate([
        typeorm_1.Column("character varying", { name: "nome", nullable: true, length: 50 })
    ], EquacaoAbasal.prototype, "nome");
    __decorate([
        typeorm_1.Column("character varying", {
            name: "observacao",
            nullable: true,
            length: 200
        })
    ], EquacaoAbasal.prototype, "observacao");
    __decorate([
        typeorm_1.Column("character varying", {
            name: "expressao",
            nullable: true,
            length: 1000
        })
    ], EquacaoAbasal.prototype, "expressao");
    EquacaoAbasal = __decorate([
        typeorm_1.Entity("equacao_abasal", { schema: "public" })
    ], EquacaoAbasal);
    return EquacaoAbasal;
}());
exports.EquacaoAbasal = EquacaoAbasal;
