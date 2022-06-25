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
exports.Especie = void 0;
var typeorm_1 = require("typeorm");
// import { CategoriaEspeciePoa } from "./CategoriaEspeciePoa";
var CategoriaEspecie_1 = require("./CategoriaEspecie");
var BaseEntity_1 = require("./BaseEntity");
// @Index("especie_pkey", ["idEspecie"], { unique: true })
var Especie = /** @class */ (function (_super) {
    __extends(Especie, _super);
    function Especie() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column({ name: "nome", nullable: true, length: 50 })
    ], Especie.prototype, "nome");
    __decorate([
        typeorm_1.Column({
            name: "nome_orgao",
            nullable: true,
            length: 50
        })
    ], Especie.prototype, "nomeOrgao");
    __decorate([
        typeorm_1.Column({
            name: "nome_cientifico",
            nullable: true,
            length: 100
        })
    ], Especie.prototype, "nomeCientifico");
    __decorate([
        typeorm_1.ManyToOne(function () { return CategoriaEspecie_1.CategoriaEspecie; }, function (categoriaEspecie) { return categoriaEspecie.especies; }),
        typeorm_1.JoinColumn([{ name: "id_categoria", referencedColumnName: "id" }])
    ], Especie.prototype, "categoria");
    Especie = __decorate([
        typeorm_1.Entity("especie", { schema: "public" })
    ], Especie);
    return Especie;
}(BaseEntity_1.BaseModel));
exports.Especie = Especie;
