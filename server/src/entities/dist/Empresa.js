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
exports.Empresa = void 0;
var typeorm_1 = require("typeorm");
var BaseEntity_1 = require("./BaseEntity");
var Endereco_1 = require("./Endereco");
var Projeto_1 = require("./Projeto");
var Umf_1 = require("./Umf");
var User_1 = require("./User");
var Empresa = /** @class */ (function (_super) {
    __extends(Empresa, _super);
    function Empresa() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column({ name: "razao_social", length: 100 })
    ], Empresa.prototype, "razaoSocial");
    __decorate([
        typeorm_1.Column({
            name: "nome_fantasia",
            nullable: true,
            length: 100
        })
    ], Empresa.prototype, "nomeFantasia");
    __decorate([
        typeorm_1.Column({ name: "cnpj", nullable: true, length: 14 })
    ], Empresa.prototype, "cnpj");
    __decorate([
        typeorm_1.Column({
            name: "reg_ambiental",
            nullable: true,
            length: 50
        })
    ], Empresa.prototype, "regAmbiental");
    __decorate([
        typeorm_1.Column({ name: "telefone", nullable: true, length: 10 })
    ], Empresa.prototype, "telefone");
    __decorate([
        typeorm_1.Column({ name: "endereco", nullable: true, length: 60 })
    ], Empresa.prototype, "endereco");
    __decorate([
        typeorm_1.Column({
            name: "complemento",
            nullable: true,
            length: 40
        })
    ], Empresa.prototype, "complemento");
    __decorate([
        typeorm_1.Column({ name: "cep", nullable: true, length: 8 })
    ], Empresa.prototype, "cep");
    __decorate([
        typeorm_1.Column({
            name: "municipio",
            nullable: true,
            length: 30
        })
    ], Empresa.prototype, "municipio");
    __decorate([
        typeorm_1.Column({ name: "estado", nullable: true, length: 2 })
    ], Empresa.prototype, "estado");
    __decorate([
        typeorm_1.Column({ name: "contato", nullable: true, length: 50 })
    ], Empresa.prototype, "contato");
    __decorate([
        typeorm_1.Column({
            name: "resp_tecnico",
            nullable: true,
            length: 50
        })
    ], Empresa.prototype, "respTecnico");
    __decorate([
        typeorm_1.Column({
            name: "crea_resp",
            nullable: true,
            length: 50
        })
    ], Empresa.prototype, "creaResp");
    __decorate([
        typeorm_1.Column({ name: "dmin_relatorio", nullable: true })
    ], Empresa.prototype, "dminRelatorio");
    __decorate([
        typeorm_1.Column({ name: "intervalo_dmin_relatorio", nullable: true })
    ], Empresa.prototype, "intervaloDminRelatorio");
    __decorate([
        typeorm_1.OneToMany(function () { return Umf_1.Umf; }, function (umf) { return umf.empresa; })
    ], Empresa.prototype, "umfs");
    __decorate([
        typeorm_1.ManyToMany(function () { return User_1.User; }, function (user) { return user.empresas; }),
        typeorm_1.JoinTable({
            name: "empresa_users",
            joinColumns: [{ name: "id_empresa" }],
            inverseJoinColumns: [{ name: "id_user" }]
        })
    ], Empresa.prototype, "users");
    __decorate([
        typeorm_1.OneToMany(function () { return Projeto_1.Projeto; }, function (projeto) { return projeto.empresa; })
    ], Empresa.prototype, "projetos");
    __decorate([
        typeorm_1.OneToMany(function () { return Endereco_1.Endereco; }, function (endereco) { return endereco.empresa; })
    ], Empresa.prototype, "enderecos");
    Empresa = __decorate([
        typeorm_1.Entity("empresa")
    ], Empresa);
    return Empresa;
}(BaseEntity_1.BaseModel));
exports.Empresa = Empresa;
