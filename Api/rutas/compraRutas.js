var express =require('express')
var md_auth =require('../middlewares/validacion')
var api=express.Router()
var compraController=require('../controladores/compraController')

api.post('/registro-compras',md_auth.ensureAuth, compraController.registroDetalleCompra)
api.get('/compras/:id',md_auth.ensureAuth, compraController.compra)
api.get('/mostrar-orden',md_auth.ensureAuth, compraController.mostrarOrden)
module.exports=api
