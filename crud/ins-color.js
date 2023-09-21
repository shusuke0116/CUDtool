const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

let sql =
  `insert into color (name,ccode,pcode,dcode,scode) values` 
  + `("赤","#FF2C01","#76742C","#A7A32F","#FF2C01"),` 
  + `("橙","#FFC706","#E7D404","#EEDC04","#FF8B86"),`
  + `("青","#0348BC","#004FD7","#004ED6","#00163E")`
  + `;`;


db.serialize( () => {
	db.run( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
	  	return;
	  }
	  console.log( "データを追加しました" );
	});
});  