"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Arquivo = void 0;
var typeorm_1 = require("typeorm");
var Arquivo = /** @class */ (function () {
    function Arquivo() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "bigint", name: "id_arquivo" })
    ], Arquivo.prototype, "idArquivo");
    __decorate([
        typeorm_1.Column("text", { name: "nome", nullable: true })
    ], Arquivo.prototype, "nome");
    __decorate([
        typeorm_1.Column("bytea", { name: "arquivo", nullable: true })
    ], Arquivo.prototype, "arquivo");
    Arquivo = __decorate([
        typeorm_1.Index("arquivos_pkey", ["idArquivo"], { unique: true }),
        typeorm_1.Entity("arquivo", { schema: "public" })
    ], Arquivo);
    return Arquivo;
}());
exports.Arquivo = Arquivo;
