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
  + `,(2,2,0)`
  + `,(2,3,0)` 
  + `,(2,4,1)` 
  + `,(2,5,0)` 
  + `,(2,6,1)` 
  + `,(2,7,1)` 
  + `,(2,8,1)` 
  + `,(2,9,1)` 
  //橙
  + `,(3,3,0)`
  + `,(3,4,0)` 
  + `,(3,5,1)` 
  + `,(3,6,0)` 
  + `,(3,7,1)` 
  + `,(3,8,1)` 
  + `,(3,9,1)` 
  //黄色
  + `,(4,4,0)` 
  + `,(4,5,1)`
  + `,(4,6,0)` 
  + `,(4,7,1)` 
  + `,(4,8,1)` 
  + `,(4,9,1)` 
  //緑
  + `,(5,5,0)`
  + `,(5,6,0)` 
  + `,(5,7,1)` 
  + `,(5,8,0)`
  + `,(5,9,1)`
  //黄緑
  + `,(6,6,0)`
  + `,(6,7,1)`
  + `,(6,8,1)`
  + `,(6,9,1)`
  //青
  + `,(7,7,0)`
  + `,(7,8,1)`
  + `,(7,9,0)`
  //空色
  + `,(8,8,0)`
  + `,(8,9,1)`
  //紫
  + `,(9,9,0)`
  //明度関連
  + `,(10,11,1)`
  + `,(10,12,0)`
  + `,(10,13,1)`
  + `,(11,12,1)`
  + `,(11,13,0)`
  + `,(12,13,1)`
  //彩度関連
  + `,(14,2,1)`
  + `,(14,7,1)`
  + `,(14,15,0)`
  + `,(15,2,1)`
  + `,(15,7,0)`
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