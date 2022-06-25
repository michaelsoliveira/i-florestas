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
exports.Configuracoes = void 0;
var typeorm_1 = require("typeorm");
var BaseEntity_1 = require("./BaseEntity");
var Configuracoes = /** @class */ (function (_super) {
    __extends(Configuracoes, _super);
    function Configuracoes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column("character varying", {
            name: "modo_acesso",
            nullable: true,
            length: 6
        })
    ], Configuracoes.prototype, "modoAcesso");
    __decorate([
        typeorm_1.Column("character varying", {
            name: "endereco_host",
            nullable: true,
            length: 15
        })
    ], Configuracoes.prototype, "enderecoHost");
    __decorate([
        typeorm_1.Column("smallint", { name: "dap_min", nullable: true })
    ], Configuracoes.prototype, "dapMin");
    __decorate([
        typeorm_1.Column("smallint", { name: "dap_max", nullable: true })
    ], Configuracoes.prototype, "dapMax");
    __decorate([
        typeorm_1.Column("smallint", { name: "alt_min", nullable: true })
    ], Configuracoes.prototype, "altMin");
    __decorate([
        typeorm_1.Column("smallint", { name: "alt_max", nullable: true })
    ], Configuracoes.prototype, "altMax");
    __decorate([
        typeorm_1.Column("smallint", { name: "diam_min", nullable: true })
    ], Configuracoes.prototype, "diamMin");
    __decorate([
        typeorm_1.Column("smallint", { name: "diam_max", nullable: true })
    ], Configuracoes.prototype, "diamMax");
    __decorate([
        typeorm_1.Column("smallint", { name: "comp_min", nullable: true })
    ], Configuracoes.prototype, "compMin");
    __decorate([
        typeorm_1.Column("smallint", { name: "comp_max", nullable: true })
    ], Configuracoes.prototype, "compMax");
    Configuracoes = __decorate([
        typeorm_1.Entity("configuracoes", { schema: "public" })
    ], Configuracoes);
    return Configuracoes;
}(BaseEntity_1.BaseModel));
exports.Configuracoes = Configuracoes;
