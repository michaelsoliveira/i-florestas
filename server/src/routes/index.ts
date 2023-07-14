import express from "express"

import { UserController } from "../controllers/UserController"
import { AuthController } from "../controllers/AuthController"
import { Authentication } from "../middleware/auth.middleware"
import { DetentorController } from "../controllers/DetentorController"
import { ResponsavelController } from "../controllers/ResponsavelController"
import { EspecieController } from "../controllers/EspecieController"
import multer from 'multer'
import { CategoriaEspecieController } from "../controllers/CategoriaEspecieController"
import { UmfController } from "../controllers/UmfController"
import { EstadoController } from "../controllers/EstadoController"
import { UpaController } from "../controllers/UpaController"
import { EquacaoVolumeController } from "../controllers/EquacaoVolumeController"
import { SysRefController } from "../controllers/SysRefController"
import { UtController } from "../controllers/UtController"
import { ProjetoController } from "../controllers/ProjetoController"
import { can, is } from "../middleware/permission"
import { RoleController } from "../controllers/RoleController"
import { PermissionController } from "../controllers/PermissionController"
import { ArvoreController } from "../controllers/ArvoreController"
import { ObservacaoArvoreController } from "../controllers/ObservacaoArvoreController"
import { PoaController } from "../controllers/PoaController"
import { PlanejoController } from "../controllers/PlanejoController"

const routes = express.Router()

routes.get('/users', Authentication(), new UserController().findAll)
routes.get('/users/provider/find-by-email', Authentication(), new UserController().findByEmail)
routes.get('/users/:projetoId/:userId', Authentication(), new UserController().findOne)
routes.post('/users/create', new UserController().store)
routes.put('/users/:id', Authentication(), new UserController().update)
routes.get('/users/search', Authentication(), new UserController().search)
routes.delete('/users/:id', Authentication(), new UserController().delete)
routes.post('/users/create-role', Authentication(), new UserController().createRole)
routes.post('/users/create-permission', Authentication(), new UserController().createPermission)
routes.post('/users/create-role-permission/:roleId', Authentication(), new UserController().createRolePermission)
routes.post('/users/create-acl/:userId', Authentication(), new UserController().createUserACL)
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

//Detentor
routes.post('/detentor', Authentication(), new DetentorController().store)
routes.get('/detentor/findAll/:projetoId', Authentication(), new DetentorController().findAll)
routes.get('/detentor/:id', Authentication(), new DetentorController().findOne)
routes.put('/detentor/:id', Authentication(), new DetentorController().update)
routes.delete('/detentor/:id', Authentication(), new DetentorController().delete)

//Responsavel
routes.post('/responsavel', Authentication(), new ResponsavelController().store)
routes.get('/responsavel', Authentication(), new ResponsavelController().findAll)
routes.get('/responsavel/:id', Authentication(), new ResponsavelController().findOne)
routes.put('/responsavel/:id', Authentication(), new ResponsavelController().update)
routes.delete('/responsavel/:id', Authentication(), new ResponsavelController().delete)

//Categoria
routes.post('/categoria/', Authentication(), is(['admin', 'gerente']), new CategoriaEspecieController().store)
routes.get('/categoria/', Authentication(), new CategoriaEspecieController().findAll)
routes.get('/categoria/get-by-poa/', Authentication(), new CategoriaEspecieController().getByPoa)
routes.get('/categoria/grupo/', Authentication(), new CategoriaEspecieController().getCategoriaGrupo)
routes.get('/categoria/:id', Authentication(), new CategoriaEspecieController().findOne)
routes.get('/categoria/search/q', Authentication(), new CategoriaEspecieController().search)
routes.put('/categoria/:id', Authentication(), new CategoriaEspecieController().update)
routes.delete('/categoria/:id', Authentication(), new CategoriaEspecieController().delete)

//Categoria
routes.post('/obs-arvore/', Authentication(), is(['admin', 'gerente']), new ObservacaoArvoreController().store)
routes.get('/obs-arvore/', Authentication(), new ObservacaoArvoreController().findAll)
routes.get('/obs-arvore/:id', Authentication(), new ObservacaoArvoreController().findOne)
routes.get('/obs-arvore/search/q', Authentication(), new ObservacaoArvoreController().search)
routes.put('/obs-arvore/:id', Authentication(), new ObservacaoArvoreController().update)
routes.delete('/obs-arvore/:id', Authentication(), new ObservacaoArvoreController().delete)

//Umf
routes.post('/umf/', Authentication(), new UmfController().store)
routes.get('/umf/:id', Authentication(), new UmfController().findOne)
routes.get('/umf/find-by-projeto/:projetoId', Authentication(), new UmfController().findAll)
routes.get('/umf/get/', Authentication(), new UmfController().getUmf)
routes.get('/umf/search/q', Authentication(), new UmfController().search)
routes.put('/umf/:id', Authentication(), new UmfController().update)
routes.delete('/umf/single/:id', Authentication(), new UmfController().delete)
routes.delete('/umf/multiples', Authentication(), new UmfController().deleteUmfs)

//Projeto
routes.post('/projeto/', Authentication(), new ProjetoController().store)
routes.get('/projeto/', Authentication(), new ProjetoController().findAll)
routes.get('/projeto/:projetoId/default-data', Authentication(), new ProjetoController().getDefaultData)
routes.get('/projeto/:projetoId/users', Authentication(), new ProjetoController().findUsers)
routes.get('/projeto/:projetoId/eq-volume', Authentication(), new ProjetoController().findEqVolumes)
routes.get('/projeto/:id', Authentication(), new ProjetoController().findOne)
routes.get('/projeto/search/q', Authentication(), new ProjetoController().search)
routes.get('/projeto/active/get', Authentication(), new ProjetoController().getActive)
routes.post('/projeto/active/:projetoId', Authentication(), new ProjetoController().changeActive)
routes.put('/projeto/:id', Authentication(), new ProjetoController().update)
routes.put('/projeto/single/:id', Authentication(), new ProjetoController().delete)
routes.delete('/projeto/multiples', Authentication(), new ProjetoController().deleteProjetos)

//Upa
routes.post('/upa/', Authentication(), new UpaController().store)
routes.get('/upa/', Authentication(), new UpaController().findAll)
routes.get('/upa/:id', Authentication(), new UpaController().findOne)
routes.get('/upa/search/q', Authentication(), new UpaController().search)
routes.put('/upa/:id', Authentication(), new UpaController().update)
routes.delete('/upa/single/:id', Authentication(), new UpaController().delete)
routes.delete('/upa/multiples', Authentication(), new UpaController().deleteUpas)

//POA
routes.post('/poa/', Authentication(), new PoaController().store)
routes.get('/poa/', Authentication(), new PoaController().findAll)
routes.get('/poa/active/get', Authentication(), new PoaController().getActive)
routes.post('/poa/active/', Authentication(), new PoaController().changeActive)
routes.get('/poa/:id', Authentication(), new PoaController().findOne)
routes.get('/poa/search/q', Authentication(), new PoaController().search)
routes.put('/poa/:id', Authentication(), new PoaController().update)
routes.delete('/poa/single/:id', Authentication(), new PoaController().delete)
routes.delete('/poa/multiples', Authentication(), new PoaController().deletePoas)

//Planejamento do POA
routes.post('/planejo', Authentication(), new PlanejoController().execute)

//Ut
routes.post('/ut/', Authentication(), new UtController().store)
routes.get('/ut/', Authentication(), new UtController().findAll)
routes.get('/ut/:id', Authentication(), new UtController().findOne)
routes.get('/ut/search/q', Authentication(), new UtController().search)
routes.put('/ut/:id', Authentication(), new UtController().update)
routes.delete('/ut/single/:id', Authentication(), new UtController().delete)
routes.delete('/ut/multiples', Authentication(), new UtController().deleteUts)

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
routes.get('/eq-volume/:projetoId/search/q', Authentication(), new EquacaoVolumeController().search)
routes.put('/eq-volume/:id', Authentication(), new EquacaoVolumeController().update)
routes.delete('/eq-volume/single/:id', Authentication(), new EquacaoVolumeController().delete)

//Equação Modelo
routes.get('/eq-modelo', Authentication(), new EquacaoVolumeController().getEqModelos)

//Role
routes.post('/role/', Authentication(), new RoleController().store)
routes.get('/role', new RoleController().findAll)
routes.get('/role/search', Authentication(), new RoleController().search)
routes.get('/role/:id', Authentication(), new RoleController().findOne)
routes.put('/role/:id', Authentication(), new RoleController().update)
routes.delete('/role/single/:id', Authentication(), new RoleController().delete)
routes.delete('/role/multiples', Authentication(), new RoleController().deleteAll)

//Permission
routes.post('/permission/', Authentication(), new PermissionController().store)
routes.get('/permission/', Authentication(), new PermissionController().findAll)
routes.get('/permission/:id', Authentication(), new PermissionController().findOne)
routes.get('/permission/search/q', Authentication(), new PermissionController().search)
routes.put('/permission/:id', Authentication(), new PermissionController().update)
routes.delete('/permission/single/:id', Authentication(), new PermissionController().delete)
routes.delete('/permission/multiples', Authentication(), new PermissionController().deleteAll)

//Sistema de Coordenadas
routes.get('/sys-ref/', Authentication(), new SysRefController().findAll)
routes.get('/sys-ref/:id', Authentication(), new SysRefController().findOne)
routes.get('/sys-ref/search/q', Authentication(), new SysRefController().search)

const multerConfig = multer()
//Especie
routes.post('/especie', Authentication(), new EspecieController().store)
routes.post('/especie/categorias', Authentication(), new EspecieController().setCategoriaEspecies)
routes.get('/especie/find-by-categoria', Authentication(), new EspecieController().findByCategoria)
routes.get('/especie', Authentication(), new EspecieController().findAll)
routes.get('/especie/:id', Authentication(), new EspecieController().findOne)
routes.put('/especie/:id', Authentication(), new EspecieController().update)
routes.delete('/especie/single/:id', Authentication(), new EspecieController().delete)
routes.delete('/especie/multiples', Authentication(), new EspecieController().deleteEspecies)
routes.post('/especie/import', multerConfig.single('file'), Authentication(), new EspecieController().importEspecie)

//Arvore
routes.post('/arvore', Authentication(), new ArvoreController().store)
routes.get('/arvore/get-all/:utId', Authentication(), new ArvoreController().findAll)
routes.get('/arvore/:id', Authentication(), new ArvoreController().findOne)
routes.put('/arvore/:id', Authentication(), new ArvoreController().update)
routes.delete('/arvore/single/:id', Authentication(), new ArvoreController().delete)
routes.delete('/arvore/multiples', Authentication(), new ArvoreController().deleteArvores)
routes.post('/arvore/import-inventario', Authentication(), new ArvoreController().importInventario)


export default routes;