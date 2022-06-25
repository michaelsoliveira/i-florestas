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
exports.Saida = void 0;
var typeorm_1 = require("typeorm");
var Comprador_1 = require("./Comprador");
var DestinoTora_1 = require("./DestinoTora");
var Motorista_1 = require("./Motorista");
var Veiculo_1 = require("./Veiculo");
var Tora_1 = require("./Tora");
var BaseEntity_1 = require("./BaseEntity");
var Saida = /** @class */ (function (_super) {
    __extends(Saida, _super);
    function Saida() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column({ name: "data_saida", nullable: true })
    ], Saida.prototype, "dataSaida");
    __decorate([
        typeorm_1.Column({ name: "dof", nullable: true, length: 40 })
    ], Saida.prototype, "dof");
    __decorate([
        typeorm_1.Column({ name: "nf", nullable: true, length: 40 })
    ], Saida.prototype, "nf");
    __decorate([
        typeorm_1.Column({ name: "data_vencimento_dof", nullable: true })
    ], Saida.prototype, "dataVencimentoDof");
    __decorate([
        typeorm_1.Column({ name: "agf", nullable: true, length: 40 })
    ], Saida.prototype, "agf");
    __decorate([
        typeorm_1.Column({ name: "data_vencimento_agf", nullable: true })
    ], Saida.prototype, "dataVencimentoAgf");
    __decorate([
        typeorm_1.ManyToOne(function () { return Comprador_1.Comprador; }, function (comprador) { return comprador.saidas; }),
        typeorm_1.JoinColumn([{ name: "id_comprador", referencedColumnName: "id" }])
    ], Saida.prototype, "comprador");
    __decorate([
        typeorm_1.ManyToOne(function () { return DestinoTora_1.DestinoTora; }, function (destinoTora) { return destinoTora.saidas; }),
        typeorm_1.JoinColumn([{ name: "id_destino", referencedColumnName: "destino" }])
    ], Saida.prototype, "destino");
    __decorate([
        typeorm_1.ManyToOne(function () { return Motorista_1.Motorista; }, function (motorista) { return motorista.saidas; }),
        typeorm_1.JoinColumn([{ name: "id_motorista", referencedColumnName: "id" }])
    ], Saida.prototype, "motorista");
    __decorate([
        typeorm_1.ManyToOne(function () { return Veiculo_1.Veiculo; }, function (veiculo) { return veiculo.saidas; }),
        typeorm_1.JoinColumn([{ name: "id_veiculo", referencedColumnName: "id" }])
    ], Saida.prototype, "veiculo");
    __decorate([
        typeorm_1.OneToMany(function () { return Tora_1.Tora; }, function (tora) { return tora.saida; })
    ], Saida.prototype, "toras");
    Saida = __decorate([
        typeorm_1.Index("saida_pkey", ["idSaida"], { unique: true }),
        typeorm_1.Entity("saida", { schema: "public" })
    ], Saida);
    return Saida;
}(BaseEntity_1.BaseModel));
exports.Saida = Saida;
