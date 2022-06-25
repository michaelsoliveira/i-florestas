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
exports.DestinoTora = void 0;
var typeorm_1 = require("typeorm");
var TipoDestino_1 = require("./TipoDestino");
var Saida_1 = require("./Saida");
var Tora_1 = require("./Tora");
var BaseEntity_1 = require("./BaseEntity");
// @Index("destino_tora_pkey", ["idDestino"], { unique: true })
var DestinoTora = /** @class */ (function (_super) {
    __extends(DestinoTora, _super);
    function DestinoTora() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column("character varying", {
            name: "descricao",
            nullable: true,
            length: 40
        })
    ], DestinoTora.prototype, "descricao");
    __decorate([
        typeorm_1.Column({
            name: "nome",
            nullable: true,
            unique: true,
            length: 50
        })
    ], DestinoTora.prototype, "nome");
    __decorate([
        typeorm_1.ManyToOne(function () { return TipoDestino_1.TipoDestino; }, function (tipoDestino) { return tipoDestino.destinoToras; }),
        typeorm_1.JoinColumn([
            { name: "id_tipo_destino", referencedColumnName: "id" },
        ])
    ], DestinoTora.prototype, "tipoDestino");
    __decorate([
        typeorm_1.OneToMany(function () { return Saida_1.Saida; }, function (saida) { return saida.destino; })
    ], DestinoTora.prototype, "saidas");
    __decorate([
        typeorm_1.OneToMany(function () { return Tora_1.Tora; }, function (tora) { return tora.destino; })
    ], DestinoTora.prototype, "toras");
    DestinoTora = __decorate([
        typeorm_1.Index("uk_nome_tora", ["nome"], { unique: true }),
        typeorm_1.Entity("destino_tora", { schema: "public" })
    ], DestinoTora);
    return DestinoTora;
}(BaseEntity_1.BaseModel));
exports.DestinoTora = DestinoTora;
