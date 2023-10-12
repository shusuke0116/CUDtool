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
  + `,(4,2)` 
  + `,(4,3)` 
  + `,(4,4)` 
  + `,(4,5)` 
  + `,(4,6)` 
  + `,(4,8)`
  + `,(5,3)`
  + `,(5,9)`
  + `,(5,10)`
  + `,(5,5)`
  + `,(6,2)`
  + `,(6,6)`
  + `,(6,13)`
  + `,(6,14)`
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