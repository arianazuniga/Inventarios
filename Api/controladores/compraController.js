var models=require('../modelos')
var sequelize = require('sequelize')
const Op = sequelize.Op

function registroDetalleCompra(req,res){
	var params=req.body
	var compra=models.Compra.build(params)
	compra.save()
		.then((compraRegistrada)=>{
			res.status(200).send(compraRegistrada)
		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});
		});
}
function compra(req,res) {
	var no_compra = req.params.id
	models.Compra.findAll({ where:{No_Compra:no_compra},
		include:[
		{model:models.Proveedor},
		{model:models.DetalleCompra,
			include:[
			{model:models.Insumo}]}]
	}
		)

		.then(function(compra){
			if(compra){
				res.status(200).send(compra)
			}else{
				res.status(404).send({message:"No existen compra"})
			}
		})
		.catch(function(error){
			res.status(500).send({message:"Error: "+ error})
		});
}
function mostrarOrden(req,res){
	models.Compra.findAll({where:{Aprobado:true}, include:[
            {model:models.Proveedor}
			]})
		.then(function(compra){
			if(compra)
			{
				res.status(200).send(compra)
			}else{
				res.status(404).send({message:"No se ha Aprobado ordenes"})
			}
			
		})
		.catch(function(error) {
			res.status(500).send({message:"Error: "+error});

		});
}
module.exports={
	registroDetalleCompra,
	compra,
	mostrarOrden
}