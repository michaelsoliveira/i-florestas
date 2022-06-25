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
exports.Umf = void 0;
var typeorm_1 = require("typeorm");
var BaseEntity_1 = require("./BaseEntity");
var Empresa_1 = require("./Empresa");
var Estado_1 = require("./Estado");
var Upa_1 = require("./Upa");
var Umf = /** @class */ (function (_super) {
    __extends(Umf, _super);
    function Umf() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column({ name: "nome", length: 50 })
    ], Umf.prototype, "nome");
    __decorate([
        typeorm_1.Column({
            nullable: true
        })
    ], Umf.prototype, "municipio");
    __decorate([
        typeorm_1.Column({
            name: "localizacao",
            nullable: true,
            length: 50
        })
    ], Umf.prototype, "localizacao");
    __decorate([
        typeorm_1.ManyToOne(function () { return Empresa_1.Empresa; }, function (empresa) { return empresa.umfs; }),
        typeorm_1.JoinColumn([{ name: "id_empresa", referencedColumnName: "id" }])
    ], Umf.prototype, "empresa");
    __decorate([
        typeorm_1.ManyToOne(function () { return Estado_1.Estado; }, function (estado) { return estado.umfs; }),
        typeorm_1.JoinColumn([{ name: "id_estado", referencedColumnName: "id" }])
    ], Umf.prototype, "estado");
    __decorate([
        typeorm_1.OneToMany(function () { return Upa_1.Upa; }, function (upa) { return upa.umf; })
    ], Umf.prototype, "upas");
    Umf = __decorate([
        typeorm_1.Entity("umf")
    ], Umf);
    return Umf;
}(BaseEntity_1.BaseModel));
exports.Umf = Umf;
