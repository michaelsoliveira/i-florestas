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
exports.CategoriaEspecie = void 0;
var typeorm_1 = require("typeorm");
var Especie_1 = require("./Especie");
var BaseEntity_1 = require("./BaseEntity");
// @Index("categoria_especie_pkey", ["idCategoria"], { unique: true })
var CategoriaEspecie = /** @class */ (function (_super) {
    __extends(CategoriaEspecie, _super);
    function CategoriaEspecie() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column({ name: "nome", nullable: true, length: 50 })
    ], CategoriaEspecie.prototype, "nome");
    __decorate([
        typeorm_1.Column({ type: "smallint", name: "criterio_fuste", nullable: true })
    ], CategoriaEspecie.prototype, "criterioFuste");
    __decorate([
        typeorm_1.Column({ type: "smallint", name: "criterio_dminc", nullable: true })
    ], CategoriaEspecie.prototype, "criterioDminc");
    __decorate([
        typeorm_1.Column({ type: "smallint", name: "criterio_dmaxc", nullable: true })
    ], CategoriaEspecie.prototype, "criterioDmaxc");
    __decorate([
        typeorm_1.Column({ type: "smallint", name: "criterio_n_min", nullable: true })
    ], CategoriaEspecie.prototype, "criterioNMin");
    __decorate([
        typeorm_1.Column({ type: "smallint", name: "criterio_perc_min", nullable: true })
    ], CategoriaEspecie.prototype, "criterioPercMin");
    __decorate([
        typeorm_1.Column({ name: "preservar", nullable: true })
    ], CategoriaEspecie.prototype, "preservar");
    __decorate([
        typeorm_1.Column({ type: "double precision", name: "criterio_altura", nullable: true })
    ], CategoriaEspecie.prototype, "criterioAltura");
    __decorate([
        typeorm_1.Column({ type: "double precision", name: "criterio_volume", nullable: true })
    ], CategoriaEspecie.prototype, "criterioVolume");
    __decorate([
        typeorm_1.OneToMany(function () { return Especie_1.Especie; }, function (especie) { return especie.categoria; })
    ], CategoriaEspecie.prototype, "especies");
    CategoriaEspecie = __decorate([
        typeorm_1.Entity("categoria_especie", {
            schema: "public"
        })
    ], CategoriaEspecie);
    return CategoriaEspecie;
}(BaseEntity_1.BaseModel));
exports.CategoriaEspecie = CategoriaEspecie;
