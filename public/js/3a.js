document.addEventListener('DOMContentLoaded', function() {
  var ctx = document.querySelector("#graph1").getContext("2d");
  var chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ['1', '2', '3', '4', '5'],
      datasets: [{
        label: "線１",
        data: [8.0, 9.4, 11.9, 15.4, 21.1],
        borderColor: '#FF0000' ,
        backgroundColor: '#FF0000',
      },{
        label: "線２",
        data: [7.0, 10.2, 13.5, 16.7, 20.4],
        borderColor: '#008000',
        backgroundColor: '#008000',
      },{
        label: "線３",
        data: [9.5, 9.7, 12.4, 14.1, 20.4],
        borderColor: '#0000FF',
        backgroundColor: '#0000FF',
      },{
        label: "線４",
        data: [6.5, 6.7, 8.4, 16.1, 22.4],
        borderColor: '#FF0000',
        backgroundColor: '#FF0000',
      }],
    },
    options: {
      responsive: false,
    }
  });  


  document.querySelector('#sen0').addEventListener('change',() => {
    chart.data.datasets[0].borderColor = '#' + document.querySelector("[name=sen0]:checked").value;
    chart.data.datasets[0].backgroundColor = '#' + document.querySelector("[name=sen0]:checked").value;
    chart.update();
  });
  document.querySelector('#sen1').addEventListener('change',() => {
    chart.data.datasets[1].borderColor = '#' + document.querySelector("[name=sen1]:checked").value;
    chart.data.datasets[1].backgroundColor = '#' + document.querySelector("[name=sen1]:checked").value;
    chart.update();
  });
  document.querySelector('#sen2').addEventListener('change',() => {
    chart.data.datasets[2].borderColor = '#' + document.querySelector("[name=sen2]:checked").value;
    chart.data.datasets[2].backgroundColor = '#' + document.querySelector("[name=sen2]:checked").value;
    chart.update();
  });
  document.querySelector('#sen3').addEventListener('change',() => {
    chart.data.datasets[3].borderColor = '#' + document.querySelector("[name=sen3]:checked").value;
    chart.data.datasets[3].backgroundColor = '#' + document.querySelector("[name=sen3]:checked").value;
    chart.update();
  });
  
});