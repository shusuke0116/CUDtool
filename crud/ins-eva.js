const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

let sql =
  `insert into eva (cola,colb,gb) values` 
  //黒
  + `(1,2,0)` 
  + `,(1,3,1)`
  + `,(1,4,0)`
  + `,(1,5,1)`
  + `,(1,6,0)`
  + `,(1,7,1)` 
  //赤
  + `,(2,3,1)` 
  + `,(2,4,0)` 
  + `,(2,5,1)` 
  + `,(2,6,0)` 
  + `,(2,7,1)` 
  + `,(2,8,0)` 
  //橙
  + `,(3,4,1)` 
  + `,(3,5,0)` 
  + `,(3,6,1)` 
  + `,(3,7,0)` 
  + `,(3,8,1)` 
  //緑
  + `,(4,5,1)` 
  + `,(4,6,0)` 
  + `,(4,7,1)`
  + `,(4,8,0)`
  //黄緑
  + `,(5,6,1)`
  + `,(5,7,0)`
  + `,(5,8,1)`
  //青
  + `,(6,7,1)`
  + `,(6,8,0)`
  //空色
  + `,(7,8,1)`
  //明度関連
  + `,(9,10,1)`
  + `,(9,11,0)`
  + `,(9,12,1)`
  + `,(10,11,1)`
  + `,(10,12,0)`
  //彩度関連
  + `,(13,2,1)`
  + `,(13,6,1)`
  + `,(13,14,0)`
  + `,(14,2,1)`
  + `,(14,6,1)`
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