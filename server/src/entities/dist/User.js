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
exports.User = void 0;
var typeorm_1 = require("typeorm");
var BaseEntity_1 = require("./BaseEntity");
var Empresa_1 = require("./Empresa");
var Permission_1 = require("./Permission");
var Role_1 = require("./Role");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "username");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "email");
    __decorate([
        typeorm_1.Column({ select: false })
    ], User.prototype, "password");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], User.prototype, "provider");
    __decorate([
        typeorm_1.Column({ name: "id_provider", nullable: true })
    ], User.prototype, "idProvider");
    __decorate([
        typeorm_1.ManyToMany(function () { return Role_1.Role; }),
        typeorm_1.JoinTable({
            name: "users_roles",
            joinColumns: [{ name: "user_id" }],
            inverseJoinColumns: [{ name: "role_id" }]
        })
    ], User.prototype, "roles");
    __decorate([
        typeorm_1.ManyToMany(function () { return Permission_1.Permission; }),
        typeorm_1.JoinTable({
            name: "users_permissions",
            joinColumns: [{ name: "user_id" }],
            inverseJoinColumns: [{ name: "permission_id" }]
        })
    ], User.prototype, "permissions");
    __decorate([
        typeorm_1.OneToMany(function () { return Empresa_1.Empresa; }, function (empresa) { return empresa.user; })
    ], User.prototype, "empresas");
    User = __decorate([
        typeorm_1.Entity("users")
    ], User);
    return User;
}(BaseEntity_1.BaseModel));
exports.User = User;
