const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

let sql = "select text.id as t_id,item,que,sen,good,bad,adv" 
    + ",gb,color.id as c_id,color.name,ccode"
    + " from text,tc inner join color" 
    + " on ( (text.id=tc.t_id) and (color.id=tc.c_id) )"
    + " where text.id = 1" 
    + " and color.id = " + "1" //後に変更 
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