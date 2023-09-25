const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

let sql =
  `insert into text (item,que,sen,good,bad,adv) values
  ("項目名1","問題文1","変化させる文章1","良い評価1","悪い評価21","アドバイス1"),
  ("項目名2","問題文2","変化させる文章2","良い評価2","悪い評価2","アドバイス2")
 
  ;`;


db.serialize( () => {
	db.run( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
	  	return;
	  }
	  console.log( "データを追加しました" );
	});
});  