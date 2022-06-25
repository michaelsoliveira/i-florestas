"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ObservacaoArvore = void 0;
var typeorm_1 = require("typeorm");
var Arvore_1 = require("./Arvore");
var ObservacaoArvore = /** @class */ (function () {
    function ObservacaoArvore() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "bigint", name: "id_observacao" })
    ], ObservacaoArvore.prototype, "idObservacao");
    __decorate([
        typeorm_1.Column("character varying", { name: "nome", unique: true, length: 30 })
    ], ObservacaoArvore.prototype, "nome");
    __decorate([
        typeorm_1.Column("boolean", { name: "preservar", nullable: true })
    ], ObservacaoArvore.prototype, "preservar");
    __decorate([
        typeorm_1.OneToMany(function () { return Arvore_1.Arvore; }, function (arvore) { return arvore.idObservacao; })
    ], ObservacaoArvore.prototype, "arvores");
    ObservacaoArvore = __decorate([
        typeorm_1.Index("observacao_arvore_pkey", ["idObservacao"], { unique: true }),
        typeorm_1.Index("observacao_arvore_nome_unique", ["nome"], { unique: true }),
        typeorm_1.Entity("observacao_arvore", { schema: "public" })
    ], ObservacaoArvore);
    return ObservacaoArvore;
}());
exports.ObservacaoArvore = ObservacaoArvore;
