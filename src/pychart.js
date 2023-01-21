window.onload = function () {
    pieChartDraw();
    document.getElementById('legend-div').innerHTML = window.pieChart.generateLegend();
    setLegendOnClick();
}

let pieChartData = {
    labels: ['개발 성공', '개발 실패', '테스트 성공', '테스트 실패', '배포 성공', '배포 실패'],
    datasets: [{
        data: [95, 12, 13, 7, 13, 10],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)']
    }] 
};

let pieChartDraw = function () {
    let ctx = document.getElementById('pieChartCanvas').getContext('2d');
    
    window.pieChart = new Chart(ctx, {
        type: 'pie',
        data: pieChartData,
        options: {
            responsive: false,
            legend: {
                display: false
            },
            legendCallback: customLegend
        }
    });
};

let customLegend = function (chart) {
    let ul = document.createElement('ul');
    let color = chart.data.datasets[0].backgroundColor;

    // chart.data.labels.forEach(function (label, index) {
    //     ul.innerHTML += `<li data-index="${index}"><span style="background-color: ${color[index]}"></span>${label}</li>`;
    // });

    ul.innerHTML += "<li data-target='성공'><span style='background-color: rgb(54, 162, 235)';></span>성공</ul>";
    ul.innerHTML += "<li data-target='실패'><span style='background-color: rgb(255, 99, 132)';></span>실패</ul>";


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