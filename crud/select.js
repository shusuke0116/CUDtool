const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

let sql = "select ccode,pcode,dcode,scode from color where ccode = 'FF0000';";

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