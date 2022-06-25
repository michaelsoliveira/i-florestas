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
exports.Ut = void 0;
var typeorm_1 = require("typeorm");
// import { Arvore } from "./Arvore";
// import { CategoriaEspecieUt } from "./CategoriaEspecieUt";
// import { Tora } from "./Tora";
// import { Poa } from "./Poa";
var Upa_1 = require("./Upa");
var BaseEntity_1 = require("./BaseEntity");
// @Index("ut_pkey", ["idUt"], { unique: true })
var Ut = /** @class */ (function (_super) {
    __extends(Ut, _super);
    function Ut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column("integer", { name: "numero_ut" })
    ], Ut.prototype, "numeroUt");
    __decorate([
        typeorm_1.Column("double precision", {
            name: "area_util",
            nullable: true
        })
    ], Ut.prototype, "areaUtil");
    __decorate([
        typeorm_1.Column({ name: "quantidade_faixas", nullable: true })
    ], Ut.prototype, "quantidadeFaixas");
    __decorate([
        typeorm_1.Column({ name: "largura_faixas", nullable: true })
    ], Ut.prototype, "larguraFaixas");
    __decorate([
        typeorm_1.Column({ name: "comprimento_faixas", nullable: true })
    ], Ut.prototype, "comprimentoFaixas");
    __decorate([
        typeorm_1.Column("double precision", {
            name: "area_total",
            nullable: true
        })
    ], Ut.prototype, "areaTotal");
    __decorate([
        typeorm_1.Column("double precision", {
            name: "azimute",
            nullable: true
        })
    ], Ut.prototype, "azimute");
    __decorate([
        typeorm_1.Column({ name: "quadrante", nullable: true })
    ], Ut.prototype, "quadrante");
    __decorate([
        typeorm_1.Column("double precision", {
            name: "latitude",
            nullable: true
        })
    ], Ut.prototype, "latitude");
    __decorate([
        typeorm_1.Column("double precision", {
            name: "longitude",
            nullable: true
        })
    ], Ut.prototype, "longitude");
    __decorate([
        typeorm_1.Column({ type: "bytea", name: "shapefile", nullable: true })
    ], Ut.prototype, "shapefile");
    __decorate([
        typeorm_1.Column({ type: "geometry", name: "origem", nullable: true })
    ], Ut.prototype, "origem");
    __decorate([
        typeorm_1.ManyToOne(function () { return Upa_1.Upa; }, function (upa) { return upa.uts; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }),
        typeorm_1.JoinColumn([{ name: "id_upa", referencedColumnName: "id" }])
    ], Ut.prototype, "upa");
    Ut = __decorate([
        typeorm_1.Entity("ut", { schema: "public" })
    ], Ut);
    return Ut;
}(BaseEntity_1.BaseModel));
exports.Ut = Ut;
