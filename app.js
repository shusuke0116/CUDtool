const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

app.set('view engine', 'ejs');
//app.use('/public', express.static(__dirname + "/public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render('top'); 
});

app.get("/question/1", (req, res) => {

  let textdata;
  let col = new Array(3);

  // テキスト
  let sql = "select id,item,que" 
    + " from text"
    + " where text.id = 1"
    + ";";
  
  db.serialize( () => {
    db.all(sql, (error, data) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      //console.log(data);
      textdata = data;
    })
  })

  //　選択肢
  let sqlb = "select color.id,color.name,ccode" 
    + " from tc inner join color" 
    + " on (color.id=tc.c_id)"
    + " where t_id = 1"
    + ";";
  
  db.serialize( () => {
    db.all(sqlb, (error, choices) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      //console.log(choices); 
      col[0] = choices[0].ccode;
      res.render('layout_1a', {e:0,textdata:textdata,choices:choices,col:col});
    })
  })
});

app.post("/question/1/answer", (req, res) => {

  let textdata;
  let gb;
  let col = new Array(5);

  // 選択された色のカラーコード
  let sql = "select name,ccode,pcode,dcode,scode"
    + " from color" 
    + " where id = " + req.body.choice
    + ";";
  
  db.serialize( () => {
    db.all(sql, (error, cho) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      col[0] = cho[0].ccode;
      col[1] = cho[0].pcode;
      col[2] = cho[0].dcode;
      col[3] = cho[0].scode;
      col[4] = cho[0].name;
    })
  })

  //選択された色の評価
  let sqla = "select gb"
    + " from eva" 
    + " where cola = 1" 
    + " and colb = " + req.body.choice
    + ";";
  
  db.serialize( () => {
    db.all(sqla, (error, eva) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      gb = eva[0].gb;
    })
  })

  // テキスト
  let sqlb = "select *"
    + " from text"
    + " where text.id = 1"
    + ";";
  
  db.serialize( () => {
    db.all(sqlb, (error, data) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      //console.log(data);  
      textdata = data;
    })
  })

  //　選択肢
  let sqlc = "select color.id,color.name,ccode" 
    + " from tc inner join color" 
    + " on (color.id=tc.c_id)"
    + " where t_id = 1"
    + ";";
    
  db.serialize( () => {
    db.all(sqlc, (error, choices) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      res.render('layout_1a', {e:1,textdata:textdata,choices:choices,col:col,gb:gb});
    })
  })
});

app.get("/question/2/:col", (req, res) => {

  let textdata;
  let col = [req.params.col,""];
  let fon;

  // テキスト
  let sqlb = "select id,item,que"
    + " from text"
    + " where text.id = 2"
    + ";";
    
  db.serialize( () => {
    db.all(sqlb, (error, data) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      //console.log(data);   
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
      res.render('layout_1b', {e:0,textdata:textdata,choices:choices,col:col,fon:fon});
    })
  })
});

app.post("/question/2/answer", (req, res) => {

  let textdata;
  let col = new Array(2);
  let fon = req.body.choice;
  let gb;

  // 選択されていた色のカラーコード
  let sql = "select ccode,pcode"
    + " from color" 
    + " where ccode = '"+ req.body.col + "'"
    + ";";
    
  db.serialize( () => {
    db.all(sql, (error, cho) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      col[0] = cho[0].ccode;
      col[1] = cho[0].pcode;
    })
  })

  // テキスト
  let sqlb = "select *"
    + " from text"
    + " where text.id = 2"
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
      res.render('layout_1b', {e:1,textdata:textdata,choices:choices,col:col,fon:fon,gb:gb});
    })
  })
});

app.get("/question/3/:col", (req, res) => {

  let col = [req.params.col,""];

  // テキスト
  let sqlb = "select id,item,que"
    + " from text"
    + " where text.id = 3"
    + ";";
    
  db.serialize( () => {
    db.all(sqlb, (error, data) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      //console.log(data);  
      res.render('layout_1c', {e:0,textdata:data,col:col,li:"",bo:"",ch:["",""]});
    })
  })
});

app.post("/question/3/answer", (req, res) => {

  let col = new Array(2);
  let gb;
  let ch = new Array(2);
  let li;
  let bo;

  if(req.body.line == 1 ){
    ch[0] = "checked";
    li = "underline";
    gb = 1;
  } else{
    ch[0] = "";
    li = "none";
    gb = 0;
  }
  if(req.body.bold == 1 ){
    ch[1] = "checked";
    bo = "bold";
  } else{
    ch[1] = "";
    bo = "normal";
    gb = 0;
  }

  // 選択されていた色のカラーコード
  let sql = "select ccode,pcode"
    + " from color"
    + " where ccode = '"+ req.body.col + "'"
    + ";";
    
  db.serialize( () => {
    db.all(sql, (error, eva) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      col[0] = eva[0].ccode;
      col[1] = eva[0].pcode;
    })
  })

  // テキスト
  let sqlb = "select *"
    + " from text"
    + " where text.id = 3"
    + ";";
    
  db.serialize( () => {
    db.all(sqlb, (error, data) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      //console.log(data);   
      res.render('layout_1c', {e:1,textdata:data,col:col,gb:gb,li:li,bo:bo,ch:ch});
    })
  })
});

app.get("/question/4/:bcol", (req, res) => {

  let textdata;
  let col = new Array(3);
  let bcol =  [req.params.bcol,""];
  let backid;

  // テキスト
  let sql = "select id,item,que" 
    + " from text"
    + " where text.id = 4"
    + ";";
  
  db.serialize( () => {
    db.all(sql, (error, data) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      //console.log(data);
      textdata = data;
    })
  })

  //背景色のid

  let sqla = "select id" 
    + " from color"
    + " where ccode = '" + bcol[0] + "'"
    + ";";

  db.serialize( () => {
    db.all(sqla, (error, back) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      backid = back[0].id;
    })
  })
  //　選択肢
  let sqlb = "select color.id,color.name,ccode" 
    + " from tc inner join color" 
    + " on (color.id=tc.c_id)"
    + " where t_id = 4"
    + " and color.ccode != '" + bcol[0] + "'"
    + ";";
  
  db.serialize( () => {
    db.all(sqlb, (error, choices) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      //console.log(choices); 
      col[0] = choices[0].ccode;
      res.render('layout_2a', {e:0,textdata:textdata,choices:choices,col:col,bcol:bcol,backid:backid});
    })
  })
});

app.post("/question/4/answer", (req, res) => {

  let textdata;
  let gb;
  let backid = req.body.backid;
  let col = new Array(5);
  let bcol = new Array(4);

  // 選択された色のカラーコード
  let sql = "select name,ccode,pcode,dcode,scode"
    + " from color" 
    + " where id = " + req.body.choice
    + ";";
  
  db.serialize( () => {
    db.all(sql, (error, cho) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      col[0] = cho[0].ccode;
      col[1] = cho[0].pcode;
      col[2] = cho[0].dcode;
      col[3] = cho[0].scode;
      col[4] = cho[0].name;
    })
  })

  // 背景色のカラーコード
  let sqld = "select ccode,pcode,dcode,scode"
    + " from color" 
    + " where ccode = '" + req.body.bcol + "'"
    + ";";

  db.serialize( () => {
    db.all(sqld, (error, chob) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      bcol[0] = chob[0].ccode;
      bcol[1] = chob[0].pcode;
      bcol[2] = chob[0].dcode;
      bcol[3] = chob[0].scode;
    })
  })

  //選択された色の評価
  let sqla = "select gb"
    + " from eva" 
    + " where (cola = " + backid + " and colb = " + req.body.choice + ")" 
    + " or (cola = " + req.body.choice + " and colb = " + backid + ")"
    + ";";
  
  db.serialize( () => {
    db.all(sqla, (error, eva) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      gb = eva[0].gb;
    })
  })

  // テキスト
  let sqlb = "select *"
    + " from text"
    + " where text.id = 4"
    + ";";
  
  db.serialize( () => {
    db.all(sqlb, (error, data) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      //console.log(data);  
      textdata = data;
    })
  })

  //　選択肢
  let sqlc = "select color.id,color.name,ccode" 
    + " from tc inner join color" 
    + " on (color.id=tc.c_id)"
    + " where t_id = 4"
    + " and color.id != " + backid 
    + ";";
    
  db.serialize( () => {
    db.all(sqlc, (error, choices) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      res.render('layout_2a', {e:1,textdata:textdata,choices:choices,col:col,bcol:bcol,gb:gb,backid:backid});
    })
  })
});

app.get("/question/5/:bcol", (req, res) => {

  let textdata;
  let col = new Array(3);
  let bcol =  [req.params.bcol,""];
  let backid;

  // テキスト
  let sql = "select id,item,que" 
    + " from text"
    + " where text.id = 5"
    + ";";

  db.serialize( () => {
    db.all(sql, (error, data) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      //console.log(data);
      textdata = data;
    })
  })

  //背景色のid

  let sqla = "select id" 
    + " from color"
    + " where ccode = '" + bcol[0] + "'"
    + ";";

  db.serialize( () => {
    db.all(sqla, (error, back) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      backid = back[0].id;
    })
  })
  //　選択肢
  let sqlb = "select color.id,color.name,ccode" 
    + " from tc inner join color" 
    + " on (color.id=tc.c_id)"
    + " where t_id = 5"
    + " and color.ccode != '" + bcol[0] + "'"
    + ";";

  db.serialize( () => {
    db.all(sqlb, (error, choices) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      //console.log(choices); 
      col[0] = choices[0].ccode;
      res.render('layout_2b', {e:0,textdata:textdata,choices:choices,col:col,bcol:bcol,backid:backid});
    })
  })
});

app.post("/question/5/answer", (req, res) => {

  let textdata;
  let gb;
  let backid = req.body.backid;
  let col = new Array(5);
  let bcol = new Array(4);

  // 選択された色のカラーコード
  let sql = "select name,ccode,pcode,dcode,scode"
    + " from color" 
    + " where id = " + req.body.choice
    + ";";

  db.serialize( () => {
    db.all(sql, (error, cho) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      col[0] = cho[0].ccode;
      col[1] = cho[0].pcode;
      col[2] = cho[0].dcode;
      col[3] = cho[0].scode;
      col[4] = cho[0].name;
    })
  })

  // 背景色のカラーコード
  let sqld = "select ccode,pcode,dcode,scode"
    + " from color" 
    + " where ccode = '" + req.body.bcol + "'"
    + ";";

  db.serialize( () => {
    db.all(sqld, (error, chob) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      bcol[0] = chob[0].ccode;
      bcol[1] = chob[0].pcode;
      bcol[2] = chob[0].dcode;
      bcol[3] = chob[0].scode;
    })
  })

  //選択された色の評価
  let sqla = "select gb"
    + " from eva" 
    + " where (cola = " + backid + " and colb = " + req.body.choice + ")" 
    + " or (cola = " + req.body.choice + " and colb = " + backid + ")"
    + ";";

  db.serialize( () => {
    db.all(sqla, (error, eva) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      gb = eva[0].gb;
    })
  })

  // テキスト
  let sqlb = "select *"
    + " from text"
    + " where text.id = 5"
    + ";";

  db.serialize( () => {
    db.all(sqlb, (error, data) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      //console.log(data);  
      textdata = data;
    })
  })

  //　選択肢
  let sqlc = "select color.id,color.name,ccode" 
    + " from tc inner join color" 
    + " on (color.id=tc.c_id)"
    + " where t_id = 5"
    + " and color.id != " + backid 
    + ";";

  db.serialize( () => {
    db.all(sqlc, (error, choices) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      res.render('layout_2b', {e:1,textdata:textdata,choices:choices,col:col,bcol:bcol,gb:gb,backid:backid});
    })
  })
});

app.get("/question/6/:bcol", (req, res) => {

  let textdata;
  let col = new Array(3);
  let bcol =  [req.params.bcol,""];
  let backid;

  // テキスト
  let sql = "select id,item,que" 
    + " from text"
    + " where text.id = 6"
    + ";";

  db.serialize( () => {
    db.all(sql, (error, data) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      //console.log(data);
      textdata = data;
    })
  })

  //背景色のid

  let sqla = "select id" 
    + " from color"
    + " where ccode = '" + bcol[0] + "'"
    + ";";

  db.serialize( () => {
    db.all(sqla, (error, back) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      backid = back[0].id;
    })
  })
  //　選択肢
  let sqlb = "select color.id,color.name,ccode" 
    + " from tc inner join color" 
    + " on (color.id=tc.c_id)"
    + " where t_id = 6"
    + " and color.ccode != '" + bcol[0] + "'"
    + ";";

  db.serialize( () => {
    db.all(sqlb, (error, choices) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      //console.log(choices); 
      col[0] = choices[0].ccode;
      res.render('layout_2c', {e:0,textdata:textdata,choices:choices,col:col,bcol:bcol,backid:backid});
    })
  })
});

app.post("/question/6/answer", (req, res) => {

  let textdata;
  let gb;
  let backid = req.body.backid;
  let col = new Array(5);
  let bcol = new Array(4);

  // 選択された色のカラーコード
  let sql = "select name,ccode,pcode,dcode,scode"
    + " from color" 
    + " where id = " + req.body.choice
    + ";";

  db.serialize( () => {
    db.all(sql, (error, cho) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      col[0] = cho[0].ccode;
      col[1] = cho[0].pcode;
      col[2] = cho[0].dcode;
      col[3] = cho[0].scode;
      col[4] = cho[0].name;
    })
  })

  // 背景色のカラーコード
  let sqld = "select ccode,pcode,dcode,scode"
    + " from color" 
    + " where ccode = '" + req.body.bcol + "'"
    + ";";

  db.serialize( () => {
    db.all(sqld, (error, chob) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      bcol[0] = chob[0].ccode;
      bcol[1] = chob[0].pcode;
      bcol[2] = chob[0].dcode;
      bcol[3] = chob[0].scode;
    })
  })

  //選択された色の評価
  let sqla = "select gb"
    + " from eva" 
    + " where (cola = " + backid + " and colb = " + req.body.choice + ")" 
    + " or (cola = " + req.body.choice + " and colb = " + backid + ")"
    + ";";

  db.serialize( () => {
    db.all(sqla, (error, eva) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      gb = eva[0].gb;
    })
  })

  // テキスト
  let sqlb = "select *"
    + " from text"
    + " where text.id = 6"
    + ";";

  db.serialize( () => {
    db.all(sqlb, (error, data) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      //console.log(data);  
      textdata = data;
    })
  })

  //　選択肢
  let sqlc = "select color.id,color.name,ccode" 
    + " from tc inner join color" 
    + " on (color.id=tc.c_id)"
    + " where t_id = 6"
    + " and color.id != " + backid 
    + ";";

  db.serialize( () => {
    db.all(sqlc, (error, choices) => {
      if( error ) {
        res.render('show', {mes:"エラーです"});
      }
      res.render('layout_2c', {e:1,textdata:textdata,choices:choices,col:col,bcol:bcol,gb:gb,backid:backid});
    })
  })
});


app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
