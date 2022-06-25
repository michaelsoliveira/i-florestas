"use strict";
exports.__esModule = true;
var express_1 = require("express");
var UserController_1 = require("../controllers/UserController");
var AuthController_1 = require("../controllers/AuthController");
var auth_middleware_1 = require("../middleware/auth.middleware");
var EmpresaController_1 = require("../controllers/EmpresaController");
var EspecieController_1 = require("../controllers/EspecieController");
var multer_1 = require("multer");
var CategoriaEspecieController_1 = require("../controllers/CategoriaEspecieController");
var UmfController_1 = require("../controllers/UmfController");
var EstadoController_1 = require("../controllers/EstadoController");
var UpaController_1 = require("../controllers/UpaController");
var EquacaoVolumeController_1 = require("../controllers/EquacaoVolumeController");
var SysRefController_1 = require("../controllers/SysRefController");
var routes = express_1["default"].Router();
routes.get('/users', auth_middleware_1.Authentication(), new UserController_1.UserController().findAll);
routes.get('/users/:id', auth_middleware_1.Authentication(), new UserController_1.UserController().findOne);
routes.post('/users/create', new UserController_1.UserController().store);
routes.put('/users', auth_middleware_1.Authentication(), new UserController_1.UserController().update);
routes.post('/users/create-role', new UserController_1.UserController().createRole);
routes.post('/users/create-permission', new UserController_1.UserController().createPermission);
routes.post('/users/create-role-permission', new UserController_1.UserController().createRolePermission);
routes.post('/users/create-user-acl', new UserController_1.UserController().createUserACL);
routes.post('/users/send-email', new UserController_1.UserController().sendMail);
//Alterar senha
routes.post('/users/change-password', auth_middleware_1.Authentication(), new UserController_1.UserController().updatePassword);
routes.get('/provider/find', new UserController_1.UserController().findProvider);
routes.post('/auth/login', new AuthController_1.AuthController().login);
routes.get('/auth/oauth', new AuthController_1.AuthController().googleAuth);
routes.get('/auth/google', new AuthController_1.AuthController().googleAuth);
routes.get('/auth/me', auth_middleware_1.Authentication(), new AuthController_1.AuthController().getUserByToken);
routes.post('/auth/refresh', new AuthController_1.AuthController().refreshToken);
routes.get('/auth/callback/github', new AuthController_1.AuthController().signInCallback);
//Empresa
routes.post('/empresa', auth_middleware_1.Authentication(), new EmpresaController_1.EmpresaController().store);
routes.get('/empresa', auth_middleware_1.Authentication(), new EmpresaController_1.EmpresaController().findAll);
routes.get('/empresa/:empresaId/users', auth_middleware_1.Authentication(), new EmpresaController_1.EmpresaController().findUsers);
routes.get('/empresa/:id', auth_middleware_1.Authentication(), new EmpresaController_1.EmpresaController().findOne);
routes.put('/empresa/:id', auth_middleware_1.Authentication(), new EmpresaController_1.EmpresaController().update);
routes["delete"]('/empresa/:id', auth_middleware_1.Authentication(), new EmpresaController_1.EmpresaController()["delete"]);
//Categoria
routes.post('/categoria/', auth_middleware_1.Authentication(), new CategoriaEspecieController_1.CategoriaEspecieController().store);
routes.get('/categoria/', auth_middleware_1.Authentication(), new CategoriaEspecieController_1.CategoriaEspecieController().findAll);
routes.get('/categoria/:id', auth_middleware_1.Authentication(), new CategoriaEspecieController_1.CategoriaEspecieController().findOne);
routes.get('/categoria/search/q', auth_middleware_1.Authentication(), new CategoriaEspecieController_1.CategoriaEspecieController().search);
routes.put('/categoria/:id', auth_middleware_1.Authentication(), new CategoriaEspecieController_1.CategoriaEspecieController().update);
routes["delete"]('/categoria/:id', auth_middleware_1.Authentication(), new CategoriaEspecieController_1.CategoriaEspecieController()["delete"]);
//Umf
routes.post('/umf/', auth_middleware_1.Authentication(), new UmfController_1.UmfController().store);
routes.get('/umf/', auth_middleware_1.Authentication(), new UmfController_1.UmfController().findAll);
routes.get('/umf/:id', auth_middleware_1.Authentication(), new UmfController_1.UmfController().findOne);
routes.get('/umf/search/q', auth_middleware_1.Authentication(), new UmfController_1.UmfController().search);
routes.put('/umf/:id', auth_middleware_1.Authentication(), new UmfController_1.UmfController().update);
routes["delete"]('/umf/single/:id', auth_middleware_1.Authentication(), new UmfController_1.UmfController()["delete"]);
routes["delete"]('/umf/multiples', auth_middleware_1.Authentication(), new UmfController_1.UmfController().deleteUmfs);
//Umf
routes.post('/upa/', auth_middleware_1.Authentication(), new UpaController_1.UpaController().store);
routes.get('/upa/', auth_middleware_1.Authentication(), new UpaController_1.UpaController().findAll);
routes.get('/upa/:id', auth_middleware_1.Authentication(), new UpaController_1.UpaController().findOne);
routes.get('/upa/search/q', auth_middleware_1.Authentication(), new UpaController_1.UpaController().search);
routes.put('/upa/:id', auth_middleware_1.Authentication(), new UpaController_1.UpaController().update);
routes["delete"]('/upa/single/:id', auth_middleware_1.Authentication(), new UpaController_1.UpaController()["delete"]);
routes["delete"]('/upa/multiples', auth_middleware_1.Authentication(), new UpaController_1.UpaController().deleteUpas);
//Umf
routes.post('/estado/', auth_middleware_1.Authentication(), new EstadoController_1.EstadoController().store);
routes.get('/estado/', auth_middleware_1.Authentication(), new EstadoController_1.EstadoController().findAll);
routes.get('/estado/:id', auth_middleware_1.Authentication(), new EstadoController_1.EstadoController().findOne);
routes.get('/estado/search/q', auth_middleware_1.Authentication(), new EstadoController_1.EstadoController().search);
routes.put('/estado/:id', auth_middleware_1.Authentication(), new EstadoController_1.EstadoController().update);
routes["delete"]('/estado/single/:id', auth_middleware_1.Authentication(), new EstadoController_1.EstadoController()["delete"]);
//Equação de volume
routes.post('/eq-volume/', auth_middleware_1.Authentication(), new EquacaoVolumeController_1.EquacaoVolumeController().store);
routes.get('/eq-volume/', auth_middleware_1.Authentication(), new EquacaoVolumeController_1.EquacaoVolumeController().findAll);
routes.get('/eq-volume/:id', auth_middleware_1.Authentication(), new EquacaoVolumeController_1.EquacaoVolumeController().findOne);
routes.get('/eq-volume/search/q', auth_middleware_1.Authentication(), new EquacaoVolumeController_1.EquacaoVolumeController().search);
routes.put('/eq-volume/:id', auth_middleware_1.Authentication(), new EquacaoVolumeController_1.EquacaoVolumeController().update);
routes["delete"]('/eq-volume/single/:id', auth_middleware_1.Authentication(), new EquacaoVolumeController_1.EquacaoVolumeController()["delete"]);
//Sistema de Coordenadas
routes.get('/sys-ref/', auth_middleware_1.Authentication(), new SysRefController_1.SysRefController().findAll);
routes.get('/sys-ref/:id', auth_middleware_1.Authentication(), new SysRefController_1.SysRefController().findOne);
routes.get('/sys-ref/search/q', auth_middleware_1.Authentication(), new SysRefController_1.SysRefController().search);
var multerConfig = multer_1["default"]();
//Especie
routes.post('/especie', auth_middleware_1.Authentication(), new EspecieController_1.EspecieController().store);
routes.get('/especie', auth_middleware_1.Authentication(), new EspecieController_1.EspecieController().findAll);
routes.get('/especie/:id', auth_middleware_1.Authentication(), new EspecieController_1.EspecieController().findOne);
routes.put('/especie/:id', auth_middleware_1.Authentication(), new EspecieController_1.EspecieController().update);
routes["delete"]('/especie/single/:id', auth_middleware_1.Authentication(), new EspecieController_1.EspecieController()["delete"]);
routes["delete"]('/especie/multiples', auth_middleware_1.Authentication(), new EspecieController_1.EspecieController().deleteEspecies);
routes.post('/especie/import', multerConfig.single('file'), new EspecieController_1.EspecieController().importEspecie);
exports["default"] = routes;
