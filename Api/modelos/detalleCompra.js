var sequelize=require('sequelize')
module.exports=(sequelize,DataTypes) =>{
	const Detalle_Compra =sequelize.define('Detalle_Compras',{
		Id_detalle :{
			type: DataTypes.STRING(5),
			primaryKey: true
		},
		
		Cantidad:{
			type:DataTypes.INTEGER 
		},
		Precio:{
			type:DataTypes.FLOAT,
			validate:{
				isNumeric: true
			}
		},
		Subtotal:{
			type: DataTypes.FLOAT,
			validate:{
				isNumeric: true
			}
		},
		Cantidad_restante:{
			type:DataTypes.INTEGER 
		}
		
	})
	return Detalle_Compra 
}