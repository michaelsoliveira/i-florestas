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
exports.TipoDestino = void 0;
var typeorm_1 = require("typeorm");
var BaseEntity_1 = require("./BaseEntity");
var DestinoTora_1 = require("./DestinoTora");
var TipoDestino = /** @class */ (function (_super) {
    __extends(TipoDestino, _super);
    function TipoDestino() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column({
            name: "nome",
            nullable: true,
            unique: true,
            length: 50
        })
    ], TipoDestino.prototype, "nome");
    __decorate([
        typeorm_1.OneToMany(function () { return DestinoTora_1.DestinoTora; }, function (destinoTora) { return destinoTora.toras; })
    ], TipoDestino.prototype, "destinoToras");
    TipoDestino = __decorate([
        typeorm_1.Index("tipo_destino_pkey", ["idTipoDestino"], { unique: true }),
        typeorm_1.Index("uk_pmlndrl7c6nqhn9ojguho3sp9", ["nome"], { unique: true }),
        typeorm_1.Entity("tipo_destino", { schema: "public" })
    ], TipoDestino);
    return TipoDestino;
}(BaseEntity_1.BaseModel));
exports.TipoDestino = TipoDestino;
