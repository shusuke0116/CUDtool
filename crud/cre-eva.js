const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

let schema = `
create table eva(
  cola integer NOT NULL,
  colb integer NOT NULL,
  gb integer NOT NULL,
  primary key(cola,colb)
  );
  `

db.serialize( () => {
	db.run( schema, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		console.log( "テーブルを作成しました" );
	});
});