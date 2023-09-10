const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

let schema = `
create table tc(
  t_id integer NOT NULL,
  c_id integer NOT NULL,
  gb integer NOT NULL,
  primary key(t_id,c_id)
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