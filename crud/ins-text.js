const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

let sql =
  'insert into text (item,que,good,bad,adv) values' 
  //1a
  +'("1.配色","CUDに配慮し、文字の強調に使用する色を選択してください。"'
  +',"選択した色は黒との明度差があり、黒との区別がつきやすいため、文字の強調に適しています。"'
  +',"選択した色は一部の色覚では黒との区別がつきづらい色に見えるため、文字の強調には適しません。"'
  +',"黒に比べてより明るい色を選択しましょう。")'
  //1b
  +',("2.文字フォント","文全体の文字フォントを選択してください。"'
  +',"線の幅が一定なフォントは色面積も一定であるため、細い線を持つフォントに比べて色による判別がつきやすい特徴があります。"'
  +',"一部の線が細くなっているフォントは、色面積が小さくなり色による判別がつきづらくなるため、文字の強調には適しません。"'
  +',"文字の強調を目的とする場合は、線の一部が細く色面積が小さくるフォントは避けましょう。" )'
  //1c
  +',("3.装飾","強調を色以外で伝える方法を試してみましょう。"'
  +',"装飾をつけることで、色以外の情報で文字の強調をしていることが認識できるため、色覚によらず伝わりやすくなります。"'
  +',"色以外での強調をすべて行いましょう。"'
  +',"")'
  //2a
  +',("1.色相","CUDに配慮し、背景色に対する中の文字の色を選択してください。"'
  +',"選択した色は別色覚であっても区別がつきやすい組み合わせになっています。"'
  +',"①で紫〜青の区間の見分けが難しくなるように、色相で隣り合っている色は区別がつきづらい場合があります。また、緑〜赤は色の差が小さくなり②の線を中心に左右の色が同様な色に見える特徴があります。"'
  +',"図を参考に、どの色覚であっても区別がつきやすい色を選択しましょう。色相で隣り合っておらず、③の線の左右から一つづつ選択することで区別しやすい組み合わせになりやすいです。")'
  //2b
  +',("2.明度","CUDに配慮し、背景色に対する中の文字の色を選択してください。"'
  +',"明度の差があることで、区別しやすくなっています。"'
  +',"明度の差が小さいと、色による区別がつきづらくなります。"'
  +',"背景色が暗めの色の場合、背景色よりも明るい色を利用することで、明度差が生まれ、区別がつきやすくなります。")'
  //2c
  +',("3.彩度","CUDに配慮し、背景色に対する中の文字の色を選択してください。"'
  +',"彩度の高い色と低い色で対比するか、彩度の高い色同士で対比することで区別がつきやすくなる。"'
  +',"彩度が低い色同士で対比すると、色による区別がつきづらい場合があります。また、青と水色のように、色によっては彩度に差をつけても区別しづらい場合があります。"'
  +',"少なくともどちらか一方は彩度が高い色を選択しましょう。")'
  //3a
  +',("1.線の色","CUDに配慮し、グラフの線に使用する色を選択してください。"'
  +',"色相の観点から区別しやすい配色となっています。２部で学習したように、明度に差をつける等の方法でも区別しやすくなります。"'
  +',"色相の観点から区別がしづらい配色があります。別色覚視点を確認し、修正しましょう。色の選び方は２部で学習できます。"'
  +',"別色覚視点を確認し、修正しましょう。")'
  //3b
  +',("2.色以外での区別","CUDに配慮し、線の種類とポイントの図形を選択しましょう。"'
  +',"これらのような色以外で区別できるようにすることで、色覚によらず区別しやすいグラフとなります。"'
  +',"同じ線の種類または図形を選択しています。できるだけ別々の組み合わせになるよう選択しましょう。"'
  +',"複数の選択肢がある場合は、それぞれ違う線の形と図形を組み合わせて色以外で判別できるようにしましょう。")'
  //3c
  +',("3.項目名の書き方","CUDに配慮し、項目名の表示方法を選択しましょう。"'
  +',"線の近くに表示することで、色による区別がしづらい色覚でもどの線に対応しているかわかりやすくなります。"'
  +',"項目名をまとめてグラフの外に表示すると、どの線に対応しているかを主に色で判別する必要があります。色覚によらず判別しやすくするためには、それぞれの線の近くに項目名を書きましょう。"'
  +',"それぞれの線の近くに項目名を表示し、対応関係を伝わりやすくしましょう。")'
  //
  +';';


db.serialize( () => {
	db.run( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
	  	return;
	  }
	  console.log( "データを追加しました" );
	});
});  