"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Usuario = void 0;
var typeorm_1 = require("typeorm");
var Usuario = /** @class */ (function () {
    function Usuario() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "integer", name: "id_usuario" })
    ], Usuario.prototype, "idUsuario");
    __decorate([
        typeorm_1.Column("character varying", { name: "nome", nullable: true, length: 55 })
    ], Usuario.prototype, "nome");
    __decorate([
        typeorm_1.Column("character varying", { name: "login", length: 15 })
    ], Usuario.prototype, "login");
    __decorate([
        typeorm_1.Column("character varying", { name: "senha", length: 50 })
    ], Usuario.prototype, "senha");
    __decorate([
        typeorm_1.Column("integer", { name: "tipo" })
    ], Usuario.prototype, "tipo");
    __decorate([
        typeorm_1.Column("character varying", { name: "email", nullable: true, length: 50 })
    ], Usuario.prototype, "email");
    __decorate([
        typeorm_1.Column("character varying", { name: "cpf", nullable: true, length: 50 })
    ], Usuario.prototype, "cpf");
    Usuario = __decorate([
        typeorm_1.Index("usuario_pkey", ["idUsuario"], { unique: true }),
        typeorm_1.Entity("usuario", { schema: "public" })
    ], Usuario);
    return Usuario;
}());
exports.Usuario = Usuario;
