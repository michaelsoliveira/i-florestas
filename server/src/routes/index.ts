import express from "express"

import { UserController } from "../controllers/UserController"
import { AuthController } from "../controllers/AuthController"
import { Authentication } from "../middleware/auth.middleware"
import { EmpresaController } from "../controllers/EmpresaController"
import { EspecieController } from "../controllers/EspecieController"
import multer from 'multer'
import { CategoriaEspecieController } from "../controllers/CategoriaEspecieController"
import { UmfController } from "../controllers/UmfController"
import { EstadoController } from "../controllers/EstadoController"
import { UpaController } from "../controllers/UpaController"
import { EquacaoVolumeController } from "../controllers/EquacaoVolumeController"
import { SysRefController } from "../controllers/SysRefController"

const routes = express.Router()

routes.get('/users', Authentication(), new UserController().findAll)
routes.get('/users/:id', Authentication(), new UserController().findOne)
routes.post('/users/create', new UserController().store)
routes.put('/users', Authentication(), new UserController().update)
routes.post('/users/create-role', new UserController().createRole)
routes.post('/users/create-permission', new UserController().createPermission)
routes.post('/users/create-role-permission', new UserController().createRolePermission)
routes.post('/users/create-user-acl', new UserController().createUserACL)
routes.post('/users/send-email', new UserController().sendMail)

//Alterar senha
routes.post('/users/change-password', Authentication(), new UserController().updatePassword)

routes.get('/provider/find', new UserController().findProvider)
routes.post('/auth/login', new AuthController().login)
routes.get('/auth/oauth', new AuthController().googleAuth)
routes.get('/auth/google', new AuthController().googleAuth)
routes.get('/auth/me', Authentication(), new AuthController().getUserByToken)
routes.post('/auth/refresh', new AuthController().refreshToken)
routes.get('/auth/callback/github', new AuthController().signInCallback)

//Empresa
routes.post('/empresa', Authentication(), new EmpresaController().store)
routes.get('/empresa', Authentication(), new EmpresaController().findAll)
routes.get('/empresa/:empresaId/users', Authentication(), new EmpresaController().findUsers)
routes.get('/empresa/:id', Authentication(), new EmpresaController().findOne)
routes.put('/empresa/:id', Authentication(), new EmpresaController().update)
routes.delete('/empresa/:id', Authentication(), new EmpresaController().delete)

//Categoria
routes.post('/categoria/', Authentication(), new CategoriaEspecieController().store)
routes.get('/categoria/', Authentication(), new CategoriaEspecieController().findAll)
routes.get('/categoria/:id', Authentication(), new CategoriaEspecieController().findOne)
routes.get('/categoria/search/q', Authentication(), new CategoriaEspecieController().search)
routes.put('/categoria/:id', Authentication(), new CategoriaEspecieController().update)
routes.delete('/categoria/:id', Authentication(), new CategoriaEspecieController().delete)

//Umf
routes.post('/umf/', Authentication(), new UmfController().store)
routes.get('/umf/', Authentication(), new UmfController().findAll)
routes.get('/umf/:id', Authentication(), new UmfController().findOne)
routes.get('/umf/search/q', Authentication(), new UmfController().search)
routes.put('/umf/:id', Authentication(), new UmfController().update)
routes.delete('/umf/single/:id', Authentication(), new UmfController().delete)
routes.delete('/umf/multiples', Authentication(), new UmfController().deleteUmfs)

//Umf
routes.post('/upa/', Authentication(), new UpaController().store)
routes.get('/upa/', Authentication(), new UpaController().findAll)
routes.get('/upa/:id', Authentication(), new UpaController().findOne)
routes.get('/upa/search/q', Authentication(), new UpaController().search)
routes.put('/upa/:id', Authentication(), new UpaController().update)
routes.delete('/upa/single/:id', Authentication(), new UpaController().delete)
routes.delete('/upa/multiples', Authentication(), new UpaController().deleteUpas)

//Umf
routes.post('/estado/', Authentication(), new EstadoController().store)
routes.get('/estado/', Authentication(), new EstadoController().findAll)
routes.get('/estado/:id', Authentication(), new EstadoController().findOne)
routes.get('/estado/search/q', Authentication(), new EstadoController().search)
routes.put('/estado/:id', Authentication(), new EstadoController().update)
routes.delete('/estado/single/:id', Authentication(), new EstadoController().delete)

//Equação de volume
routes.post('/eq-volume/', Authentication(), new EquacaoVolumeController().store)
routes.get('/eq-volume/', Authentication(), new EquacaoVolumeController().findAll)
routes.get('/eq-volume/:id', Authentication(), new EquacaoVolumeController().findOne)
routes.get('/eq-volume/search/q', Authentication(), new EquacaoVolumeController().search)
routes.put('/eq-volume/:id', Authentication(), new EquacaoVolumeController().update)
routes.delete('/eq-volume/single/:id', Authentication(), new EquacaoVolumeController().delete)

//Sistema de Coordenadas
routes.get('/sys-ref/', Authentication(), new SysRefController().findAll)
routes.get('/sys-ref/:id', Authentication(), new SysRefController().findOne)
routes.get('/sys-ref/search/q', Authentication(), new SysRefController().search)

const multerConfig = multer()
//Especie
routes.post('/especie', Authentication(), new EspecieController().store)
routes.get('/especie', Authentication(), new EspecieController().findAll)
routes.get('/especie/:id', Authentication(), new EspecieController().findOne)
routes.put('/especie/:id', Authentication(), new EspecieController().update)
routes.delete('/especie/single/:id', Authentication(), new EspecieController().delete)
routes.delete('/especie/multiples', Authentication(), new EspecieController().deleteEspecies)
routes.post('/especie/import', multerConfig.single('file'), new EspecieController().importEspecie)


export default routes;