const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

let sql =
  `insert into color (name,ccode,pcode,dcode,scode) values` 
  + `("黒","000000","000000","000000","000000")`     //1
  + `,("赤","FF2C01","76742C","A7A32F","FF2C01")`    //2
  + `,("橙","FFC706","E7D404","EEDC04","FF8B86")`    //3
  + `,("緑","0DAE00","AEA52B","9F9628","2980C4")`    //4
  + `,("黄緑","29EB05","E7DF01","D1CB02","A8D5EB")`  //5
  + `,("青","0348BC","004FD7","004ED6","00163E")`    //6
  + `,("水色","00D6DE","9ACEEE","8EC1DF","2866D3")`  //7
  + `,("紫","B10DB7","2C45CF","4A66CF","D30900")`    //8
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