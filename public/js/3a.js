//グラフの共通データ
var datas = [[8.0, 9.4, 11.9, 15.4, 21.1],[7.0, 10.2, 13.5, 16.7, 20.4],[9.5, 9.7, 12.4, 14.1, 20.4],[6.5, 6.7, 8.4, 16.1, 22.4]];
var options = {
  responsive: false,
}
var labels = ['1', '2', '3', '4', '5'];
var label = ["線１","線２","線３","線４"]

document.addEventListener('DOMContentLoaded', function() {

  //メインのグラフ
  var ctx = document.querySelector("#graph1").getContext("2d");
  var color = new Array(4);
  for(let i=0;i<=3;i++){
    color[i] = '#' + document.querySelector("input[name=a0s" + String(i) + "]").value;
  }
  var data = {
    labels: labels,
    datasets: [{
      label: label[0],
      data: datas[0],
      borderColor:  color[0] ,
      backgroundColor: color[0] ,
    },{
      label: label[1],
      data: datas[1],
      borderColor: color[1] ,
      backgroundColor: color[1] ,
    },{
      label: label[2],
      data: datas[2],
      borderColor: color[2] ,
      backgroundColor: color[2] ,
    },{
      label: label[3],
      data: datas[3],
      borderColor: color[3] ,
      backgroundColor: color[3] ,
    }],
  }
  var chart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options
  });  

  //ラジオボタン
  for(let i=0;i<=3;i++){
    for(let element of document.querySelectorAll("input[name=s" + String(i) + "]")) {
      element.addEventListener('change',function(){
        chart.data.datasets[i].borderColor = '#' + this.value;
        chart.data.datasets[i].backgroundColor = '#' + this.value;
        chart.update();
      });
    }
  }

  //別色覚のグラフ
  var actx;
  var acol = new Array(4);
  var adata;
  for(let i=0;i<=3;i++){
    actx = document.querySelector("#a"+String(i)).getContext("2d");
    for(let j=0;j<=3;j++){
      acol[j] = '#' + document.querySelector("input[name=a"+String(i)+"s"+String(j)+"]").value
    }
    adata = {
      labels: labels,
      datasets: [{
        label: label[0],
        data: datas[0],
        borderColor:  acol[0] ,
        backgroundColor: acol[0] ,
      },{
        label: label[1],
        data: datas[1],
        borderColor: acol[1] ,
        backgroundColor: acol[1] ,
      },{
        label: label[2],
        data: datas[2],
        borderColor: acol[2] ,
        backgroundColor: acol[2] ,
      },{
        label: label[3],
        data: datas[3],
        borderColor: acol[3] ,
        backgroundColor: acol[3] ,
      }],
    }
    var achart = new Chart(actx, {
      type: "line",
      data: adata,
      options: options
    });
  }
});