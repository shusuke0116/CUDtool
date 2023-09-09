const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

let schema = `
create table text(
  id integer primary key,
  item text NOT NULL,
  que text NOT NULL,
  good text NOT NULL,
  bad text NOT NULL,
  adv text NOT NULL
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