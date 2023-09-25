const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

let schema = `
create table font(
  id integer primary key,
  face text NOT NULL,
  name text NOT NULL,
  gb integer NOT NULL
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