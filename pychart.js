window.onload = function () {
    pieChartDraw();
    document.getElementById('legend-div').innerHTML = window.pieChart.generateLegend();
    setLegendOnClick();
}


var f_line = function(cb) {
    const fs = require('fs');
    fs.readFile('C:/Users/sgjaelee/Desktop/python/Test_log/vuln.log', 'utf8', function(err, data) {
        if (err) {
          return window.log(err);
        }
        lines = data.split("\n").length;
        cb(lines)
      });
}

let pieChartData = {
    labels: ['Safe', 'Vulnerable'],
    datasets: [{
        data: [50, 10],
        backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)']
    }] 
};

let pieChartDraw = function () {
    let ctx = document.getElementById('pieChartCanvas').getContext('2d');
    
    window.pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: pieChartData,
        options: {
            responsive: true,
            plugins : {
                legend : {
                    position : 'top',
                },
            } ,
            title : {
                displat : true,
                text : 'Result Chart'
            }
        },
            legendCallback: customLegend
        
    });
};

let customLegend = function (chart) {
    let ul = document.createElement('ul');
    let color = chart.data.datasets[0].backgroundColor;

    // chart.data.labels.forEach(function (label, index) {
    //     ul.innerHTML += `<li data-index="${index}"><span style="background-color: ${color[index]}"></span>${label}</li>`;
    // });

    ul.innerHTML += "<li data-target='Vulnerable'><span style='background-color: rgb(54, 162, 235)';></span>Vulnerable</ul>";
    ul.innerHTML += "<li data-target='Safe'><span style='background-color: rgb(255, 99, 132)';></span>Safe</ul>";

    return ul.outerHTML;
};

let setLegendOnClick = function () {
    let liList = document.querySelectorAll('#legend-div ul li');

    for (let element of liList) {
        element.onclick = function () {
            updateChart(event, this.dataset.target, "pieChart");
            
            if (this.style.textDecoration.indexOf("line-through") < 0) {
                this.style.textDecoration = "line-through";
            } else {
                this.style.textDecoration = "";
            }
        }
    }
};

let updateChart = function (e, target, chartId) {
  let chart = e.view[chartId];
  let i, ilen, meta;
  
  for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
      meta = chart.getDatasetMeta(i);

    //   if (meta.data[index]) {
    //       meta.data[index].hidden = !meta.data[index].hidden;
    //   }

      for (var j = 0; j < meta.data.length; j++) {
          if (meta.data[j]._view.label.includes(target)) {
              meta.data[j].hidden = !meta.data[j].hidden;
          }
      }
  }

  chart.update();
};