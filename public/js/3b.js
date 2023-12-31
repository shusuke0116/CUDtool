//グラフの共通データ
var datas = [[4.3, 3.0, 3.7, 3.1,2.0],[2.6, 4.2, 1.9, 2.3,2.8],[1.7, 2.0, 3.0, 4.2,3.7]];
var options = {
  responsive: false,
  animation: false,
  scales: { 
    y: {
      ticks: {
        min:0,
        stepSize: 1.0,
      }
    }
  }
};
var labels = ['0', '1', '2', '3','4'];
var label = ["線１","線２","線３"];
var psize = 5;

document.addEventListener('DOMContentLoaded', function() {

  //文字サイズ
  Chart.defaults.font.size = 20;
  //メインのグラフ
  var ctx = document.querySelector("#graph1").getContext("2d");
  var col = new Array(3);
  var dash = new Array(3);
  var point = new Array(3);
  var d = new Array(3);
  for(let i=0;i<3;i++){
    col[i] = '#' + document.querySelector("input[name=a0s" + String(i) + "]").value;
    d[i] = document.querySelector("input[name=s" + String(i) + "c0]:checked").value;
    if(d[i] == 2){
      dash[i] = [7,3,3,3];
    }
    else if(d[i] == 1){
      dash[i] = [3,3];
    }
    else{
      dash[i] = [0,0];
    }
    point[i] = document.querySelector("input[name=s" + String(i) + "c1]:checked").id;
  }
  var data = {
    labels: labels,
    datasets: [{
      label: label[0],
      data: datas[0],
      borderColor:  col[0] ,
      backgroundColor: col[0] ,
      borderDash: dash[0],
      pointStyle: point[0],
      pointRadius: psize,
    },{
      label: label[1],
      data: datas[1],
      borderColor: col[1] ,
      backgroundColor: col[1] ,
      borderDash: dash[1],
      pointStyle: point[1],
      pointRadius: psize,
    },{
      label: label[2],
      data: datas[2],
      borderColor: col[2] ,
      backgroundColor: col[2] ,
      borderDash: dash[2],
      pointStyle: point[2],
      pointRadius: psize,
    }],
  }
  var chart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options
  });  

  //ラジオボタン
  for(let i=0;i<3;i++){
    //線の種類
    for(let element of document.querySelectorAll("input[name=s" + String(i) + "c0]")) {
      element.addEventListener('change',function(){
        if(this.value == 2){
          dash[i] = [7,3,3,3];
          chart.data.datasets[i].borderDash = dash[i];
        }
        else if(this.value == 1){
          dash[i] = [3,3];
          chart.data.datasets[i].borderDash = dash[i];
        }
        else{
          dash[i] = [0,0];
          chart.data.datasets[i].borderDash = dash[i];
        }
        chart.update();
      });
    }
    
    //点の種類
    for(let element of document.querySelectorAll("input[name=s" + String(i) + "c1]")) {
      element.addEventListener('change',function(){
        point[i] = this.id;
        chart.data.datasets[i].pointStyle = point[i];
        chart.update();
      });
    }
  }

  //別色覚のグラフ
  var actx;
  var acol = new Array(3);
  var adata;
  actx = document.querySelector("#a1").getContext("2d");   
  for(let j=0;j<3;j++){
    acol[j] = '#' + document.querySelector("input[name=a1s"+String(j)+"]").value;
  }
  adata = {
    labels: labels,
    datasets: [{
      label: label[0],
      data: datas[0],
      borderColor:  acol[0] ,
      backgroundColor: acol[0] ,
      borderDash: dash[0],
      pointStyle: point[0],
      pointRadius: psize,
    },{
      label: label[1],
      data: datas[1],
      borderColor: acol[1] ,
      backgroundColor: acol[1] ,
      borderDash: dash[1],
      pointStyle: point[1],
      pointRadius: psize,
    },{
      label: label[2],
      data: datas[2],
      borderColor: acol[2] ,
      backgroundColor: acol[2] ,
      borderDash: dash[2],
      pointStyle: point[2],
      pointRadius: psize,
    }],
  }
  var achart = new Chart(actx, {
    type: "line",
    data: adata,
    options: options
  });
});