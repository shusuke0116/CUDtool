const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

let sql = "select gb from eva" 
+ " where (cola = 3 and colb = 2) or (cola = 2 and colb = 3)"
+ ";";

db.serialize(() => {
  db.all(sql, (error, row) => {
    if (error) {
      console.log('Error: ', error);
      return;
    }
    for (let data of row) {
      console.log(data);
    }
  });
});