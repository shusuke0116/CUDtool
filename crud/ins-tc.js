const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

let sql =
  `insert into tc (t_id,c_id) values` 
  + `(1,2)` 
  + `,(1,3)`
  + `,(1,5)`
  + `,(1,6)`
  + `,(1,7)` 
  + `,(1,8)` 
  + `,(4,2)` 
  + `,(4,3)` 
  + `,(4,4)` 
  + `,(4,5)` 
  + `,(4,6)` 
  + `,(4,7)` 
  + `,(4,8)`
  + `,(4,9)`
  + `,(5,10)`
  + `,(5,11)`
  + `,(5,12)`
  + `,(5,13)`
  + `,(6,2)`
  + `,(6,8)`
  + `,(6,14)`
  + `,(6,15)`
  + `,(7,2)`
  + `,(7,3)`
  + `,(7,4)`
  + `,(7,5)`
  + `,(7,6)`
  + `,(7,7)`
  + `,(7,8)`
  + `,(7,9)`
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