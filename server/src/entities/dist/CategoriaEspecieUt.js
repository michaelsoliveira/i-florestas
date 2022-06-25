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
exports.CategoriaEspecieUt = void 0;
var typeorm_1 = require("typeorm");
var BaseEntity_1 = require("./BaseEntity");
var CategoriaEspecieUt = /** @class */ (function (_super) {
    __extends(CategoriaEspecieUt, _super);
    function CategoriaEspecieUt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column("integer", { name: "id_categoria", nullable: true })
    ], CategoriaEspecieUt.prototype, "idCategoria");
    __decorate([
        typeorm_1.Column("character varying", { name: "nome", nullable: true, length: 100 })
    ], CategoriaEspecieUt.prototype, "nome");
    __decorate([
        typeorm_1.Column("integer", { name: "criterio_fuste", nullable: true })
    ], CategoriaEspecieUt.prototype, "criterioFuste");
    __decorate([
        typeorm_1.Column("integer", { name: "criterio_dminc", nullable: true })
    ], CategoriaEspecieUt.prototype, "criterioDminc");
    __decorate([
        typeorm_1.Column("integer", { name: "criterio_dmaxc", nullable: true })
    ], CategoriaEspecieUt.prototype, "criterioDmaxc");
    __decorate([
        typeorm_1.Column("integer", { name: "criterio_n_min_ut", nullable: true })
    ], CategoriaEspecieUt.prototype, "criterioNMinUt");
    __decorate([
        typeorm_1.Column("integer", { name: "criterio_perc_min_ut", nullable: true })
    ], CategoriaEspecieUt.prototype, "criterioPercMinUt");
    __decorate([
        typeorm_1.Column("boolean", { name: "preservar", nullable: true })
    ], CategoriaEspecieUt.prototype, "preservar");
    __decorate([
        typeorm_1.Column("integer", { name: "criterio_altura", nullable: true })
    ], CategoriaEspecieUt.prototype, "criterioAltura");
    __decorate([
        typeorm_1.Column("integer", { name: "criterio_volume", nullable: true })
    ], CategoriaEspecieUt.prototype, "criterioVolume");
    CategoriaEspecieUt = __decorate([
        typeorm_1.Entity("categoria_especie_ut", { schema: "public" })
    ], CategoriaEspecieUt);
    return CategoriaEspecieUt;
}(BaseEntity_1.BaseModel));
exports.CategoriaEspecieUt = CategoriaEspecieUt;
