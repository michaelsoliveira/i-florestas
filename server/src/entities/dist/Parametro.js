"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Parametro = void 0;
var typeorm_1 = require("typeorm");
var Parametro = /** @class */ (function () {
    function Parametro() {
    }
    __decorate([
        typeorm_1.Column("integer", { primary: true, name: "id_parametro" })
    ], Parametro.prototype, "idParametro");
    __decorate([
        typeorm_1.Column("character varying", {
            name: "codigo",
            nullable: true,
            unique: true,
            length: 255
        })
    ], Parametro.prototype, "codigo");
    __decorate([
        typeorm_1.Column("date", { name: "data_execucao", nullable: true })
    ], Parametro.prototype, "dataExecucao");
    __decorate([
        typeorm_1.Column("character varying", {
            name: "descricao",
            nullable: true,
            length: 50
        })
    ], Parametro.prototype, "descricao");
    __decorate([
        typeorm_1.Column("integer", { name: "realizado" })
    ], Parametro.prototype, "realizado");
    __decorate([
        typeorm_1.Column("character varying", {
            name: "tipo_parametro",
            nullable: true,
            length: 20
        })
    ], Parametro.prototype, "tipoParametro");
    Parametro = __decorate([
        typeorm_1.Index("uk_tfch6qwaswg8ho9n05wa36evf", ["codigo"], { unique: true }),
        typeorm_1.Index("parametro_pkey", ["idParametro"], { unique: true }),
        typeorm_1.Entity("parametro", { schema: "public" })
    ], Parametro);
    return Parametro;
}());
exports.Parametro = Parametro;
