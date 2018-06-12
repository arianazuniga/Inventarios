var sequelize=require('sequelize')
module.exports=(sequelize,DataTypes) =>{
	const Almacen_Insumo =sequelize.define('Almacen_Insumos',{
		Id_almacenI :{
			type: DataTypes.STRING(5),
			primaryKey: true
		},
		
		Estante:{
			type:DataTypes.STRING(2)
		},
		Valor_Horizontal:{
			type: DataTypes.INTEGER,
			validate:{
				isNumeric: true
			}
		},
		Valor_Vertical:{
			type: DataTypes.INTEGER,
			validate:{
				isNumeric: true
			}
		},
		Stock:{
			type: DataTypes.INTEGER,
			validate:{
				isNumeric: true
			}
		},
		Punto_Reorden:{
			type: DataTypes.INTEGER,
			validate:{
				isNumeric: true
			} 
		}
	})
	return Almacen_Insumo 
}