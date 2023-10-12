const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

let sql =
  `insert into color (name,ccode,pcode,dcode,scode) values` 
  + `("黒","000000","000000","000000","000000")`     //1
  + `,("赤","FF0000","76742C","A7A32F","FF2C01")`    //2
  + `,("橙","FFA500","D2C103","EEDC04","FF8B86")`    //3
  + `,("緑","008000","9A9125","9F9628","2980C4")`    //4
  + `,("黄緑","2BFF05","F4EB00","E3DB02","B0DFF7")`  //5
  + `,("青","0000FF","0044F2","0044F2","00163E")`    //6
  + `,("空色","00BFFF","8FB5FD","88B0F2","2866D3")`  //7
  + `,("紫","800080","002E9A","2D4A94","5C0400")`    //8
  + `,("暗めの橙","986300","837801","AE9F02","A75B58")`    //9
  + `,("明るめの緑","00D900","F0E139","FAEA3E","35A8FF")`   //10
  + `,("ピンク","FF7F82","767561","A7A67D","FF937D")`    //11
  + `,("水色","A8A8FF","9DB5F2","9DB5F2","28303E")`    //12
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