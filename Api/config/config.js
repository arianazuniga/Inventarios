module.exports={
	db:{
		database: 'Db_Almacen',
		user: 'ApiAdmin',
		password:'12345',
		options:{
			host:'localhost',
			dialect:'mysql',
			pool:{
				maxConnections:5,
				minConnections:0,
				maxIdleTime:1000
			}
		}
	}
}