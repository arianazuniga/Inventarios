var express =require('express')
var md_auth =require('../middlewares/validacion')
var api=express.Router()
var almacenInsumoController=require('../controladores/almacenInsumoController')

api.post('/registro-almacenInsm',md_auth.ensureAuth, almacenInsumoController.registroAlmacenInsumo)

module.exports=api