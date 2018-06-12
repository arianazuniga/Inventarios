var express =require('express')
var md_auth =require('../middlewares/validacion')
var api=express.Router()
var insumoController=require('../controladores/insumoController')

api.post('/registro-insumo',md_auth.ensureAuth, insumoController.registroInsumo)
api.get('/mostrar-insumo',md_auth.ensureAuth, insumoController.mostrarInsumo)
api.get('/mostrar-insumo/:id',md_auth.ensureAuth, insumoController.buscarInsumo)
api.get('/validar-IdInsumo/:id',md_auth.ensureAuth, insumoController.buscarInsumoporId)

module.exports=api

