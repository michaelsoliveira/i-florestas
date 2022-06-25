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
exports.Upa = void 0;
var typeorm_1 = require("typeorm");
var BaseEntity_1 = require("./BaseEntity");
var EquacaoVolume_1 = require("./EquacaoVolume");
var SpatialRefSys_1 = require("./SpatialRefSys");
var Umf_1 = require("./Umf");
var Ut_1 = require("./Ut");
// @Index("upa_pkey", ["idUpa"], { unique: true })
var Upa = /** @class */ (function (_super) {
    __extends(Upa, _super);
    function Upa() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column("integer", { name: "ano" })
    ], Upa.prototype, "ano");
    __decorate([
        typeorm_1.Column({
            name: "descricao",
            nullable: true,
            length: 50
        })
    ], Upa.prototype, "descricao");
    __decorate([
        typeorm_1.ManyToOne(function () { return EquacaoVolume_1.EquacaoVolume; }, function (equacaoVolume) { return equacaoVolume.upa; }),
        typeorm_1.JoinColumn([{ name: "id_equacao_volume", referencedColumnName: "id" }])
    ], Upa.prototype, "equacaoVolume");
    __decorate([
        typeorm_1.Column({ name: "tipo", nullable: true })
    ], Upa.prototype, "tipo");
    __decorate([
        typeorm_1.Column({ name: "epsg", nullable: true })
    ], Upa.prototype, "epsg");
    __decorate([
        typeorm_1.ManyToOne(function () { return Umf_1.Umf; }, function (umf) { return umf.upas; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }),
        typeorm_1.JoinColumn([{ name: "id_umf", referencedColumnName: "id" }])
    ], Upa.prototype, "umf");
    __decorate([
        typeorm_1.OneToMany(function () { return Ut_1.Ut; }, function (ut) { return ut.upa; })
    ], Upa.prototype, "uts");
    __decorate([
        typeorm_1.ManyToOne(function () { return SpatialRefSys_1.SpatialRefSys; }, function (spatialRefSys) { return spatialRefSys.upa; }),
        typeorm_1.JoinColumn([{ name: "srid", referencedColumnName: "srid" }])
    ], Upa.prototype, "spatialRefSys");
    Upa = __decorate([
        typeorm_1.Entity("upa", { schema: "public" })
    ], Upa);
    return Upa;
}(BaseEntity_1.BaseModel));
exports.Upa = Upa;
