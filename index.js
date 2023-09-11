const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render('top'); 
});

app.get("/question", (req, res) => {

  let e = 0;
  let data;
  
  let sql = "select text.id as t_id,item,que,sen,color.name,ccode" 
    + " from text,tc inner join color" 
    + " on ( (text.id=tc.t_id) and (color.id=tc.c_id) )"
    + " where text.id = "+ req.params.id 
    + ";";
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
              res.render('show', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            res.render('layout', {data:data,e:e});
        })
    })
  
});

app.get("/question/:id", (req, res) => {

  let e = 0;
  let textdata;
  
  let sql = "select id,item,que,sen" 
    + " from text"
    + " where text.id = "+ req.params.id 
    + ";";
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
              res.render('show', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            textdata = data;
        })
    })

  let sqlb = "select color.name,ccode,pname,pcode,gb" 
    + " from tc inner join color" 
    + " on (color.id=tc.c_id)"
    + " where t_id = "+ req.params.id 
    + ";";
    db.serialize( () => {
        db.all(sqlb, (error, choices) => {
            if( error ) {
              res.render('show', {mes:"エラーです"});
            }
            console.log(choices); 
            res.render('layout', {textdata:textdata,choices:choices,e:e});
        })
    })
  
});

app.post("/answer", (req, res) => {

  let e = 1;
  let textdata;
  let gb;
  if (req.body.choice == 0) gb = ",bad";
  else gb = ",good";
  
  let sql = "select id,item,que,sen,adv" 
    + gb + " as eva"
    + " from text"
    + " where text.id = "+ req.body.id 
    + ";";
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
              res.render('show', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            textdata = data;
        })
    })

  let sqlb = "select color.name,ccode,pname,pcode,gb" 
    + " from tc inner join color" 
    + " on (color.id=tc.c_id)"
    + " where t_id = "+ req.body.id 
    + ";";
    db.serialize( () => {
        db.all(sqlb, (error, choices) => {
            if( error ) {
              res.render('show', {mes:"エラーです"});
            }
            //console.log(choices);  
            res.render('layout', {textdata:textdata,choices:choices,e:e});
        })
    })
});

/* まとめページ */

app.get("/summary", (req, res) => {

  let eva = 1;
  let gb = 0;

  let data;
  
  let sql = "select text.id as t_id,item,que,sen,color.name,ccode" 
    + " from text,tc inner join color" 
    + " on ( (text.id=tc.t_id) and (color.id=tc.c_id) )"
    + ";";
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            console.log(data);    // ③
            res.render('summary', {data:data,gb:gb});
        })
    })
  
});



app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
