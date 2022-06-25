"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Tora = void 0;
var typeorm_1 = require("typeorm");
var Arvore_1 = require("./Arvore");
var DestinoTora_1 = require("./DestinoTora");
var Saida_1 = require("./Saida");
var Tora = /** @class */ (function () {
    function Tora() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "bigint", name: "id_tora" })
    ], Tora.prototype, "idTora");
    __decorate([
        typeorm_1.Column("smallint", { name: "patio", nullable: true })
    ], Tora.prototype, "patio");
    __decorate([
        typeorm_1.Column("character varying", { name: "sequencia", length: 17 })
    ], Tora.prototype, "sequencia");
    __decorate([
        typeorm_1.Column("character varying", { name: "secao", length: 3 })
    ], Tora.prototype, "secao");
    __decorate([
        typeorm_1.Column("double precision", {
            name: "diametro_tora_1",
            nullable: true,
            precision: 53
        })
    ], Tora.prototype, "diametroTora_1");
    __decorate([
        typeorm_1.Column("double precision", {
            name: "diametro_tora_2",
            nullable: true,
            precision: 53
        })
    ], Tora.prototype, "diametroTora_2");
    __decorate([
        typeorm_1.Column("double precision", {
            name: "diametro_tora_3",
            nullable: true,
            precision: 53
        })
    ], Tora.prototype, "diametroTora_3");
    __decorate([
        typeorm_1.Column("double precision", {
            name: "diametro_tora_4",
            nullable: true,
            precision: 53
        })
    ], Tora.prototype, "diametroTora_4");
    __decorate([
        typeorm_1.Column("double precision", {
            name: "diametro_oco_1",
            nullable: true,
            precision: 53
        })
    ], Tora.prototype, "diametroOco_1");
    __decorate([
        typeorm_1.Column("double precision", {
            name: "diametro_oco_2",
            nullable: true,
            precision: 53
        })
    ], Tora.prototype, "diametroOco_2");
    __decorate([
        typeorm_1.Column("double precision", {
            name: "diametro_oco_3",
            nullable: true,
            precision: 53
        })
    ], Tora.prototype, "diametroOco_3");
    __decorate([
        typeorm_1.Column("double precision", {
            name: "diametro_oco_4",
            nullable: true,
            precision: 53
        })
    ], Tora.prototype, "diametroOco_4");
    __decorate([
        typeorm_1.Column("double precision", {
            name: "comprimento_tora",
            nullable: true,
            precision: 53
        })
    ], Tora.prototype, "comprimentoTora");
    __decorate([
        typeorm_1.Column("double precision", {
            name: "comprimento_oco",
            nullable: true,
            precision: 53
        })
    ], Tora.prototype, "comprimentoOco");
    __decorate([
        typeorm_1.Column("double precision", {
            name: "volume_tora",
            nullable: true,
            precision: 53
        })
    ], Tora.prototype, "volumeTora");
    __decorate([
        typeorm_1.Column("double precision", {
            name: "volume_oco",
            nullable: true,
            precision: 53
        })
    ], Tora.prototype, "volumeOco");
    __decorate([
        typeorm_1.Column("date", { name: "data_digitacao", nullable: true })
    ], Tora.prototype, "dataDigitacao");
    __decorate([
        typeorm_1.Column("smallint", { name: "tipo", nullable: true })
    ], Tora.prototype, "tipo");
    __decorate([
        typeorm_1.ManyToOne(function () { return Arvore_1.Arvore; }, function (arvore) { return arvore.toras; }),
        typeorm_1.JoinColumn([{ name: "id_arvore", referencedColumnName: "idArvore" }])
    ], Tora.prototype, "idArvore");
    __decorate([
        typeorm_1.ManyToOne(function () { return DestinoTora_1.DestinoTora; }, function (destinoTora) { return destinoTora.toras; }),
        typeorm_1.JoinColumn([{ name: "id_destino", referencedColumnName: "id" }])
    ], Tora.prototype, "destino");
    __decorate([
        typeorm_1.ManyToOne(function () { return Saida_1.Saida; }, function (saida) { return saida.toras; }),
        typeorm_1.JoinColumn([{ name: "id_saida", referencedColumnName: "id" }])
    ], Tora.prototype, "saida");
    Tora = __decorate([
        typeorm_1.Index("tora_pkey", ["idTora"], { unique: true }),
        typeorm_1.Entity("tora", { schema: "public" })
    ], Tora);
    return Tora;
}());
exports.Tora = Tora;
