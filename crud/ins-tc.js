const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

let sql =
  `insert into tc (t_id,c_id) values` 
  + `(1,2)` 
  + `,(1,3)`
  + `,(1,4)`
  + `,(1,5)`
  + `,(1,6)`
  + `,(1,7)` 
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