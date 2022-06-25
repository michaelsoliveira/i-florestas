"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SpatialRefSys = void 0;
var typeorm_1 = require("typeorm");
var Upa_1 = require("./Upa");
// @Index("spatial_ref_sys_pkey", ["srid"], { unique: true })
var SpatialRefSys = /** @class */ (function () {
    function SpatialRefSys() {
    }
    __decorate([
        typeorm_1.Column("integer", { primary: true, name: "srid" })
    ], SpatialRefSys.prototype, "srid");
    __decorate([
        typeorm_1.Column("character varying", {
            name: "auth_name",
            nullable: true,
            length: 256
        })
    ], SpatialRefSys.prototype, "authName");
    __decorate([
        typeorm_1.Column("integer", { name: "auth_srid", nullable: true })
    ], SpatialRefSys.prototype, "authSrid");
    __decorate([
        typeorm_1.Column("character varying", { name: "srtext", nullable: true, length: 2048 })
    ], SpatialRefSys.prototype, "srtext");
    __decorate([
        typeorm_1.Column("character varying", {
            name: "proj4text",
            nullable: true,
            length: 2048
        })
    ], SpatialRefSys.prototype, "proj4text");
    __decorate([
        typeorm_1.OneToMany(function () { return Upa_1.Upa; }, function (upa) { return upa.spatialRefSys; })
    ], SpatialRefSys.prototype, "upa");
    SpatialRefSys = __decorate([
        typeorm_1.Entity("spatial_ref_sys", { schema: "public" })
    ], SpatialRefSys);
    return SpatialRefSys;
}());
exports.SpatialRefSys = SpatialRefSys;
