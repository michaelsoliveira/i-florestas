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
exports.Poa = void 0;
var typeorm_1 = require("typeorm");
var CategoriaEspecie_1 = require("./CategoriaEspecie");
var BaseEntity_1 = require("./BaseEntity");
// @Index("poa_pkey", ["idPoa"], { unique: true })
var Poa = /** @class */ (function (_super) {
    __extends(Poa, _super);
    function Poa() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column({
            name: "descricao",
            nullable: true,
            length: 50
        })
    ], Poa.prototype, "descricao");
    __decorate([
        typeorm_1.Column({
            name: "data_ultimo_plan",
            nullable: true,
            length: 50
        })
    ], Poa.prototype, "dataUltimoPlan");
    __decorate([
        typeorm_1.Column({ name: "pmfs", nullable: true, length: 50 })
    ], Poa.prototype, "pmfs");
    __decorate([
        typeorm_1.Column({
            name: "nome_resp_elab",
            nullable: true,
            length: 50
        })
    ], Poa.prototype, "nomeRespElab");
    __decorate([
        typeorm_1.Column({
            name: "crea_resp_elab",
            nullable: true,
            length: 25
        })
    ], Poa.prototype, "creaRespElab");
    __decorate([
        typeorm_1.Column({
            name: "art_resp_elab",
            nullable: true,
            length: 25
        })
    ], Poa.prototype, "artRespElab");
    __decorate([
        typeorm_1.Column("character varying", {
            name: "nome_resp_exec",
            nullable: true,
            length: 50
        })
    ], Poa.prototype, "nomeRespExec");
    __decorate([
        typeorm_1.Column({
            name: "crea_resp_exec",
            nullable: true,
            length: 25
        })
    ], Poa.prototype, "creaRespExec");
    __decorate([
        typeorm_1.Column({
            name: "art_resp_exec",
            nullable: true,
            length: 25
        })
    ], Poa.prototype, "artRespExec");
    __decorate([
        typeorm_1.Column({
            name: "nome_detentor",
            nullable: true,
            length: 50
        })
    ], Poa.prototype, "nomeDetentor");
    __decorate([
        typeorm_1.Column({
            name: "cpf_detentor",
            nullable: true,
            length: 11
        })
    ], Poa.prototype, "cpfDetentor");
    __decorate([
        typeorm_1.Column("character varying", {
            name: "nome_proponente",
            nullable: true,
            length: 50
        })
    ], Poa.prototype, "nomeProponente");
    __decorate([
        typeorm_1.Column({
            name: "cpf_proponente",
            nullable: true,
            length: 11
        })
    ], Poa.prototype, "cpfProponente");
    __decorate([
        typeorm_1.Column({
            type: "double precision",
            name: "corte_maximo",
            nullable: true,
            precision: 53
        })
    ], Poa.prototype, "corteMaximo");
    __decorate([
        typeorm_1.Column({ name: "id_parent", nullable: true })
    ], Poa.prototype, "idParent");
    __decorate([
        typeorm_1.ManyToMany(function () { return CategoriaEspecie_1.CategoriaEspecie; }, 
        // (categoriaEspecie) => categoriaEspecie.poas,
        {
            cascade: false
        }),
        typeorm_1.JoinTable()
    ], Poa.prototype, "categoriaEspecies");
    Poa = __decorate([
        typeorm_1.Entity("poa", { schema: "public" })
    ], Poa);
    return Poa;
}(BaseEntity_1.BaseModel));
exports.Poa = Poa;
