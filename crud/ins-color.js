const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

let sql =
  `insert into color (name,ccode,pcode,dcode,scode) values` 
  + `("黒","000000","000000","000000","000000")`     //1
  + `,("赤","FF0000","76742C","A7A32F","FF2C01")`    //2
  + `,("橙","FFA500","D2C103","EEDC04","FF8B86")`    //3
  + `,("黄色","FFF100","FFF100","FFF100","F3D4CD")`    //4
  + `,("緑","008000","9A9125","9F9628","2980C4")`    //5
  + `,("黄緑","9ACD32","F4EB00","E3DB02","B0DFF7")`  //6
  + `,("青","0000FF","0044F2","0044F2","00163E")`    //7
  + `,("空色","00BFFF","8FB5FD","88B0F2","2866D3")`  //8
  + `,("紫","800080","002E9A","2D4A94","5C0400")`    //9
  + `,("明るめの橙","FFBF33","E3D42D","ECDB21","FF9A96")`    //10
  + `,("暗めの橙","99721E","837801","94890B","8F4E4B")`    //11
  + `,("明るめの緑","31FC31","FFF14D","FFF04B","54B5FF")`   //12
  + `,("暗めの緑","198019","837C2A","8B8223","2A6C9E")`   //13
  + `,("ピンク","FFBFC0","C7C7C7","DADADA","FFC7BC")`    //14
  + `,("水色","C1C1FF","BFD1FF","C1D3FF","5C677A")`    //15
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