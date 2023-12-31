const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

let schema = `
create table color(
  id integer primary key,
  name text NOT NULL,
  ccode text NOT NULL,
  pcode text NOT NULL,
  dcode text NOT NULL,
  scode text NOT NULL
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