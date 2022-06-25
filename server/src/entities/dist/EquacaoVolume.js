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
exports.EquacaoVolume = void 0;
var typeorm_1 = require("typeorm");
var BaseEntity_1 = require("./BaseEntity");
var Upa_1 = require("./Upa");
// @Index("equacao_pkey", ["idEquacao"], { unique: true })
var EquacaoVolume = /** @class */ (function (_super) {
    __extends(EquacaoVolume, _super);
    function EquacaoVolume() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column("character varying", { name: "nome", nullable: true, length: 50 })
    ], EquacaoVolume.prototype, "nome");
    __decorate([
        typeorm_1.Column("character varying", {
            name: "observacao",
            nullable: true,
            length: 200
        })
    ], EquacaoVolume.prototype, "observacao");
    __decorate([
        typeorm_1.Column("character varying", {
            name: "expressao",
            nullable: true,
            length: 1000
        })
    ], EquacaoVolume.prototype, "expressao");
    __decorate([
        typeorm_1.OneToMany(function () { return Upa_1.Upa; }, function (upa) { return upa.equacaoVolume; })
    ], EquacaoVolume.prototype, "upa");
    EquacaoVolume = __decorate([
        typeorm_1.Entity("equacao_volume", { schema: "public" })
    ], EquacaoVolume);
    return EquacaoVolume;
}(BaseEntity_1.BaseModel));
exports.EquacaoVolume = EquacaoVolume;
