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
exports.Comprador = void 0;
var typeorm_1 = require("typeorm");
var BaseEntity_1 = require("./BaseEntity");
var Pessoa_1 = require("./Pessoa");
var Saida_1 = require("./Saida");
var Comprador = /** @class */ (function (_super) {
    __extends(Comprador, _super);
    function Comprador() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.OneToOne(function () { return Pessoa_1.Pessoa; }, function (pessoa) { return pessoa.comprador; }),
        typeorm_1.JoinColumn([{ name: "id_pessoa", referencedColumnName: "id" }])
    ], Comprador.prototype, "pessoa");
    __decorate([
        typeorm_1.OneToMany(function () { return Saida_1.Saida; }, function (saida) { return saida.comprador; })
    ], Comprador.prototype, "saidas");
    Comprador = __decorate([
        typeorm_1.Index("comprador_pkey", ["idComprador"], { unique: true }),
        typeorm_1.Entity("comprador", { schema: "public" })
    ], Comprador);
    return Comprador;
}(BaseEntity_1.BaseModel));
exports.Comprador = Comprador;
