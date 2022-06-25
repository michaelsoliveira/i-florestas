"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Pessoa = void 0;
var typeorm_1 = require("typeorm");
var BaseEntity_1 = require("./BaseEntity");
var Comprador_1 = require("./Comprador");
var Pessoa = /** @class */ (function (_super) {
    __extends(Pessoa, _super);
    function Pessoa() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column({ name: "bairro", nullable: true, length: 50 })
    ], Pessoa.prototype, "bairro");
    __decorate([
        typeorm_1.Column({ name: "cep", nullable: true, length: 15 })
    ], Pessoa.prototype, "cep");
    __decorate([
        typeorm_1.Column({ name: "cnf_cnpj", nullable: true, length: 20 })
    ], Pessoa.prototype, "cnfCnpj");
    __decorate([
        typeorm_1.Column({ name: "endereco", nullable: true, length: 50 })
    ], Pessoa.prototype, "endereco");
    __decorate([
        typeorm_1.Column("character varying", { name: "estado", nullable: true, length: 50 })
    ], Pessoa.prototype, "estado");
    __decorate([
        typeorm_1.Column({
            name: "municipio",
            nullable: true,
            length: 50
        })
    ], Pessoa.prototype, "municipio");
    __decorate([
        typeorm_1.Column({ name: "nome", nullable: true, length: 50 })
    ], Pessoa.prototype, "nome");
    __decorate([
        typeorm_1.Column({ name: "numero", nullable: true, length: 50 })
    ], Pessoa.prototype, "numero");
    __decorate([
        typeorm_1.Column({
            name: "pessoa_tipo",
            nullable: true,
            length: 50
        })
    ], Pessoa.prototype, "pessoaTipo");
    __decorate([
        typeorm_1.OneToOne(function () { return Comprador_1.Comprador; }, function (comprador) { return comprador.pessoa; })
    ], Pessoa.prototype, "comprador");
    Pessoa = __decorate([
        typeorm_1.Index("pessoa_pkey", ["idPessoa"], { unique: true }),
        typeorm_1.Entity("pessoa", { schema: "public" })
    ], Pessoa);
    return Pessoa;
}(BaseEntity_1.BaseModel));
exports.Pessoa = Pessoa;
