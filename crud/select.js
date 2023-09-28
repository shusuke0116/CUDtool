const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

let sql = "select ccode,pcode"
    + " from tc inner join color" 
    + " on (color.id=tc.c_id)"
    + " where t_id = 1"
    + " and ccode = 'FFC706'"
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