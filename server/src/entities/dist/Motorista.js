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
exports.Motorista = void 0;
var typeorm_1 = require("typeorm");
var Saida_1 = require("./Saida");
var BaseEntity_1 = require("./BaseEntity");
// @Index("motorista_pkey", ["idMotorista"], { unique: true })
var Motorista = /** @class */ (function (_super) {
    __extends(Motorista, _super);
    function Motorista() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column({ name: "nome", nullable: true, length: 55 })
    ], Motorista.prototype, "nome");
    __decorate([
        typeorm_1.Column({
            name: "endereco",
            nullable: true,
            length: 250
        })
    ], Motorista.prototype, "endereco");
    __decorate([
        typeorm_1.Column({ name: "telefone", nullable: true, length: 10 })
    ], Motorista.prototype, "telefone");
    __decorate([
        typeorm_1.Column({ name: "celular", nullable: true, length: 11 })
    ], Motorista.prototype, "celular");
    __decorate([
        typeorm_1.Column({
            name: "habilitacao",
            nullable: true,
            length: 20
        })
    ], Motorista.prototype, "habilitacao");
    __decorate([
        typeorm_1.OneToMany(function () { return Saida_1.Saida; }, function (saida) { return saida.motorista; })
    ], Motorista.prototype, "saidas");
    Motorista = __decorate([
        typeorm_1.Entity("motorista", { schema: "public" })
    ], Motorista);
    return Motorista;
}(BaseEntity_1.BaseModel));
exports.Motorista = Motorista;
