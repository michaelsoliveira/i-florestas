"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TipoParametro = void 0;
var typeorm_1 = require("typeorm");
var TipoParametro = /** @class */ (function () {
    function TipoParametro() {
    }
    __decorate([
        typeorm_1.Column("integer", { primary: true, name: "id_tipo_parametro" })
    ], TipoParametro.prototype, "idTipoParametro");
    __decorate([
        typeorm_1.Column("character varying", { name: "nome", nullable: true, length: 50 })
    ], TipoParametro.prototype, "nome");
    TipoParametro = __decorate([
        typeorm_1.Index("tipo_parametro_pkey", ["idTipoParametro"], { unique: true }),
        typeorm_1.Entity("tipo_parametro", { schema: "public" })
    ], TipoParametro);
    return TipoParametro;
}());
exports.TipoParametro = TipoParametro;
