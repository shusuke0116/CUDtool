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
  
  let sql = "select text.id as t_id,item,que,color.name,ccode" 
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

app.get("/question/1", (req, res) => {

  let e = 0;
  let textdata;
  let col = new Array(3);
  
  let sql = "select id,item,que" 
    + " from text"
    + " where text.id = "+ "1"
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

  let sqlb = "select color.id,color.name,ccode" 
    + " from tc inner join color" 
    + " on (color.id=tc.c_id)"
    + " where t_id = "+ "1"
    + ";";
    db.serialize( () => {
        db.all(sqlb, (error, choices) => {
            if( error ) {
              res.render('show', {mes:"エラーです"});
            }
            //console.log(choices); 
            col[0] = choices[0].ccode;
            res.render('layout', {textdata:textdata,choices:choices,e:e,col:col});
        })
    })
  
});

app.post("/question/1/answer", (req, res) => {

  let e = 1;
  let textdata;
  let gb;
  let col = new Array(4);

  // 選択されていた色の評価とカラーコード
  let sql = "select gb,ccode,pcode,dcode,scode"
    + " from tc inner join color" 
    + " on (color.id=tc.c_id)"
    + " where t_id = "+ "1" 
    + " and c_id = "+ req.body.choice
    + ";";
    db.serialize( () => {
        db.all(sql, (error, eva) => {
            if( error ) {
              res.render('show', {mes:"エラーです"});
            }
            
            gb = eva[0].gb;
            col[0] = eva[0].ccode;
            col[1] = eva[0].pcode;
            col[2] = eva[0].dcode;
            col[3] = eva[0].scode;
        })
    })

  // テキスト
  let sqlb = "select *"
    + " from text"
    + " where text.id = "+ "1"
    + ";";
    db.serialize( () => {
        db.all(sqlb, (error, data) => {
            if( error ) {
              res.render('show', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            textdata = data;
        })
    })

  //　選択肢
  let sqlc = "select color.id,color.name,ccode" 
    + " from tc inner join color" 
    + " on (color.id=tc.c_id)"
    + " where t_id = "+ req.body.id 
    + ";";
    db.serialize( () => {
        db.all(sqlc, (error, choices) => {
            if( error ) {
              res.render('show', {mes:"エラーです"});
            }
            res.render('layout', {textdata:textdata,choices:choices,e:e,gb:gb,col:col});
        })
    })
});

app.get("/question/2/:col", (req, res) => {

  let e = 0;
  let textdata;
  let col = req.params.col
  let fon;

  // テキスト
  let sqlb = "select id,item,que"
    + " from text"
    + " where text.id = " + "2"
    + ";";
    db.serialize( () => {
        db.all(sqlb, (error, data) => {
            if( error ) {
              res.render('show', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            textdata = data;
        })
    })

  //　選択肢
  let sqlc = "select *" 
    + " from font" 
    + ";";
    db.serialize( () => {
        db.all(sqlc, (error, choices) => {
            if( error ) {
              res.render('show', {mes:"エラーです"});
            }
            //console.log(choices);
            fon = choices[0].face;
            res.render('layout2', {textdata:textdata,choices:choices,e:e,col:col,fon:fon});
        })
    })
});

app.post("/question/2/answer", (req, res) => {

  let e = 1;
  let textdata;
  let col = req.body.col;
  let fon = req.body.choice;
  let gb;

  // テキスト
  let sqlb = "select *"
    + " from text"
    + " where text.id = " + "2"
    + ";";
    db.serialize( () => {
        db.all(sqlb, (error, data) => {
            if( error ) {
              res.render('show', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            textdata = data;
        })
    })

  //　選択肢
  let sqlc = "select *" 
    + " from font" 
    + ";";
    db.serialize( () => {
        db.all(sqlc, (error, choices) => {
            if( error ) {
              res.render('show', {mes:"エラーです"});
            }
            for(i=0;i<choices.length;i++){
              if(choices[i].face == fon) gb = choices[i].gb;
            }
            
            res.render('layout2', {textdata:textdata,choices:choices,e:e,col:col,fon:fon,gb:gb});
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
