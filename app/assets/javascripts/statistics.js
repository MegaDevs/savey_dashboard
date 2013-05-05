function generateHistogram (data) {
    $('#bar_chart').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: data.title
        },
        xAxis: {
            categories: data.x
        },
        yAxis: {
            title: {
                text: 'Amount'
            }
        },
        series: [{
            data: data.y
        }]
    });
};

function generatePie (data, pieId) {

    var colors = Highcharts.getOptions().colors,
                categories = data.categories,
                name = data.key;
    var distData = [];
    // add browser data
    for (var i = categories.length - 1; i >= 0; i--) {
      distData.push({
        name: data.categories[i],
        y : data.values[i],
        color : Highcharts.getOptions().colors[i]
      });
    };

    $(pieId).highcharts({
        chart: {
            type: 'pie'
        },
        title: {
            text: name
        },
        yAxis: {
            title: {
                text: name
            }
        },
        plotOptions: {
                pie: {
                    shadow: false,
                    center: ['50%', '50%']
                }
            },
        series: [{
            data: distData
        }]
    });
};

function loadStatistics(taskId){
  $.getJSON('http://ec2-54-244-109-143.us-west-2.compute.amazonaws.com:8080/SaveyAPIs/get_charts?value={%22task_id%22:'+taskId+'}&callback=?', function(json) { 
      histogram = json[0];
      pie1 = json[1];
      pie2 = json[2];

      generateHistogram(histogram);
      generatePie(pie1, '#pie_chart_1');
      generatePie(pie2, '#pie_chart_2');
  });
};

function loadTasks(){
  $.getJSON('http://ec2-54-244-109-143.us-west-2.compute.amazonaws.com:8080/SaveyAPIs/get_tasks_list?callback=?', function(json) { 
      for (var i = json.length - 1; i >= 0; i--) {
        $('#tasks').append('<li><a href=# onclick="loadStatistics(' + json[i].id + ')">Survey '+ json[i].id +'</a></li>'); 
      };

      loadStatistics(json[0].id);
  });
};

$(document).ready(function(){
  loadTasks();
});

