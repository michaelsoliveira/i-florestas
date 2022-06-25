"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MotivoPreservacaoArvore = void 0;
var typeorm_1 = require("typeorm");
var Arvore_1 = require("./Arvore");
var MotivoPreservacaoArvore = /** @class */ (function () {
    function MotivoPreservacaoArvore() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "bigint", name: "id_motivo_preservacao" })
    ], MotivoPreservacaoArvore.prototype, "idMotivoPreservacao");
    __decorate([
        typeorm_1.Column("character varying", { name: "nome", nullable: true, length: 100 })
    ], MotivoPreservacaoArvore.prototype, "nome");
    __decorate([
        typeorm_1.OneToMany(function () { return Arvore_1.Arvore; }, function (arvore) { return arvore.idMotivoPreservacao; })
    ], MotivoPreservacaoArvore.prototype, "arvores");
    MotivoPreservacaoArvore = __decorate([
        typeorm_1.Index("motivo_preservacao_arvore_pkey", ["idMotivoPreservacao"], {
            unique: true
        }),
        typeorm_1.Entity("motivo_preservacao_arvore", { schema: "public" })
    ], MotivoPreservacaoArvore);
    return MotivoPreservacaoArvore;
}());
exports.MotivoPreservacaoArvore = MotivoPreservacaoArvore;
