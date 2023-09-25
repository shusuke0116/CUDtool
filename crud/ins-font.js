const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

let sql =
  `insert into font (face,name,gb) values` 
  + `("serif","明朝体",0),` 
  + `("sans-serif","ゴシック体",1)` 
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