"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Arvore = void 0;
var typeorm_1 = require("typeorm");
var Especie_1 = require("./Especie");
var MotivoPreservacaoArvore_1 = require("./MotivoPreservacaoArvore");
var ObservacaoArvore_1 = require("./ObservacaoArvore");
var SituacaoArvore_1 = require("./SituacaoArvore");
var Tora_1 = require("./Tora");
var Arvore = /** @class */ (function () {
    function Arvore() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "bigint", name: "id_arvore" })
    ], Arvore.prototype, "idArvore");
    __decorate([
        typeorm_1.Column({ name: "id_ut", nullable: true, unique: true })
    ], Arvore.prototype, "ut");
    __decorate([
        typeorm_1.Column({ type: "integer", name: "numero_arvore", nullable: true, unique: true })
    ], Arvore.prototype, "numeroArvore");
    __decorate([
        typeorm_1.Column({ type: "double precision", name: "dap", nullable: true, precision: 53 })
    ], Arvore.prototype, "dap");
    __decorate([
        typeorm_1.Column({ type: "double precision", name: "altura", nullable: true, precision: 53 })
    ], Arvore.prototype, "altura");
    __decorate([
        typeorm_1.Column({ type: "smallint", name: "fuste", nullable: true })
    ], Arvore.prototype, "fuste");
    __decorate([
        typeorm_1.Column({
            type: "double precision",
            name: "area_basal",
            nullable: true,
            precision: 53
        })
    ], Arvore.prototype, "areaBasal");
    __decorate([
        typeorm_1.Column({ type: "double precision", name: "volume", nullable: true, precision: 53 })
    ], Arvore.prototype, "volume");
    __decorate([
        typeorm_1.Column({
            name: "comentario",
            nullable: true,
            length: 100
        })
    ], Arvore.prototype, "comentario");
    __decorate([
        typeorm_1.Column({ name: "orient_x", nullable: true, length: 1 })
    ], Arvore.prototype, "orientX");
    __decorate([
        typeorm_1.Column({ type: "double precision", name: "lat_x", nullable: true, precision: 53 })
    ], Arvore.prototype, "latX");
    __decorate([
        typeorm_1.Column({ type: "double precision", name: "long_y", nullable: true, precision: 53 })
    ], Arvore.prototype, "longY");
    __decorate([
        typeorm_1.Column({ type: "integer", name: "faixa", nullable: true })
    ], Arvore.prototype, "faixa");
    __decorate([
        typeorm_1.Column({ type: "integer", name: "gps", nullable: true })
    ], Arvore.prototype, "gps");
    __decorate([
        typeorm_1.Column({ name: "derrubada", nullable: true })
    ], Arvore.prototype, "derrubada");
    __decorate([
        typeorm_1.Column({
            name: "motivo_nao_derruba",
            nullable: true,
            length: 120
        })
    ], Arvore.prototype, "motivoNaoDerruba");
    __decorate([
        typeorm_1.Column({ type: "smallint", name: "secoes", nullable: true })
    ], Arvore.prototype, "secoes");
    __decorate([
        typeorm_1.Column({ name: "id_substituida", nullable: true })
    ], Arvore.prototype, "idSubstituida");
    __decorate([
        typeorm_1.Column({ name: "substituida", nullable: true })
    ], Arvore.prototype, "substituida");
    __decorate([
        typeorm_1.Column({ type: "smallint", name: "ponto", nullable: true })
    ], Arvore.prototype, "ponto");
    __decorate([
        typeorm_1.Column({ type: "geometry", name: "ponto_arvore", nullable: true })
    ], Arvore.prototype, "pontoArvore");
    __decorate([
        typeorm_1.Column({ type: "point", name: "arv_ponto", nullable: true })
    ], Arvore.prototype, "arvPonto");
    __decorate([
        typeorm_1.Column({ type: "double precision", name: "lat", nullable: true, precision: 53 })
    ], Arvore.prototype, "lat");
    __decorate([
        typeorm_1.Column({ type: "double precision", name: "lng", nullable: true, precision: 53 })
    ], Arvore.prototype, "lng");
    __decorate([
        typeorm_1.ManyToOne(function () { return Especie_1.Especie; }, function (especie) { return especie.arvores; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }),
        typeorm_1.JoinColumn([{ name: "id_especie", referencedColumnName: "id" }])
    ], Arvore.prototype, "especie");
    __decorate([
        typeorm_1.ManyToOne(function () { return MotivoPreservacaoArvore_1.MotivoPreservacaoArvore; }, function (motivoPreservacaoArvore) { return motivoPreservacaoArvore.arvores; }),
        typeorm_1.JoinColumn([
            {
                name: "id_motivo_preservacao",
                referencedColumnName: "idMotivoPreservacao"
            },
        ])
    ], Arvore.prototype, "idMotivoPreservacao");
    __decorate([
        typeorm_1.ManyToOne(function () { return ObservacaoArvore_1.ObservacaoArvore; }, function (observacaoArvore) { return observacaoArvore.arvores; }, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
        typeorm_1.JoinColumn([{ name: "id_observacao", referencedColumnName: "idObservacao" }])
    ], Arvore.prototype, "idObservacao");
    __decorate([
        typeorm_1.ManyToOne(function () { return SituacaoArvore_1.SituacaoArvore; }, function (situacaoArvore) { return situacaoArvore.arvores; }),
        typeorm_1.JoinColumn([{ name: "id_situacao", referencedColumnName: "idSituacao" }])
    ], Arvore.prototype, "idSituacao");
    __decorate([
        typeorm_1.OneToMany(function () { return Tora_1.Tora; }, function (tora) { return tora.idArvore; })
    ], Arvore.prototype, "toras");
    Arvore = __decorate([
        typeorm_1.Index("inventario_pkey", ["idArvore"], { unique: true }),
        typeorm_1.Index("arvore_ut_unique", ["ut", "numeroArvore"], { unique: true }),
        typeorm_1.Entity("arvore", { schema: "public" })
    ], Arvore);
    return Arvore;
}());
exports.Arvore = Arvore;
