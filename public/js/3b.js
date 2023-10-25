//グラフの共通データ
var datas = [[4.3, 3.0, 3.7, 3.1,2.3],[2.6, 4.2, 1.9, 2.3,3.3],[1.7, 2.0, 3.0, 4.2,5.0]];
var options = {
  responsive: false,
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

document.addEventListener('DOMContentLoaded', function() {

  //メインのグラフ
  var ctx = document.querySelector("#graph1").getContext("2d");
  var color = new Array(3);
  var dash = new Array(3);
  var d = new Array(3);
  for(let i=0;i<3;i++){
    color[i] = '#' + document.querySelector("input[name=a0s" + String(i) + "]").value;
    d[i] = document.querySelector("input[name=s" + String(i) + "]:checked").value;
    if(d[i] == 2){
      dash[i] = [7,3,3,3];
    }
    else if(d[i] == 1){
      dash[i] = [3,3];
    }
    else{
      dash[i] = [0,0];
    }
  }
  var data = {
    labels: labels,
    datasets: [{
      label: label[0],
      data: datas[0],
      borderColor:  color[0] ,
      backgroundColor: color[0] ,
      borderDash: dash[0],
    },{
      label: label[1],
      data: datas[1],
      borderColor: color[1] ,
      backgroundColor: color[1] ,
      borderDash: dash[1],
    },{
      label: label[2],
      data: datas[2],
      borderColor: color[2] ,
      backgroundColor: color[2] ,
      borderDash: dash[2],
    }],
  }
  var chart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options
  });  

  //ラジオボタン
  for(let i=0;i<3;i++){
    for(let element of document.querySelectorAll("input[name=s" + String(i) + "]")) {
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
  }

  //別色覚のグラフ
  var actx;
  var adata;
  var acol = new Array(3);
  var adash = new Array(3);
  var c = new Array(3);
  for(let i=0;i<2;i++){
    actx = document.querySelector("#a"+String(i)).getContext("2d");
    for(let j=0;j<3;j++){
      acol[j] = '#' + document.querySelector("input[name=a"+String(i)+"s"+String(j)+"]").value
    }
    adata = {
      labels: labels,
      datasets: [{
        label: label[0],
        data: datas[0],
        borderColor:  acol[0] ,
        backgroundColor: acol[0] ,
        borderDash: dash[0],
      },{
        label: label[1],
        data: datas[1],
        borderColor: acol[1] ,
        backgroundColor: acol[1] ,
        borderDash: dash[1],
      },{
        label: label[2],
        data: datas[2],
        borderColor: acol[2] ,
        backgroundColor: acol[2] ,
        borderDash: dash[2],
      }],
    }
    var achart = new Chart(actx, {
      type: "line",
      data: adata,
      options: options
    });
  }
});