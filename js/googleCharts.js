google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(init);

function init(){ 
	var options = {
	  title: 'Data Graph',
	  chartArea: {
		  width: '70%',
		  height: '70%'
	  },
	  height: 383,
	  width: 600,
	  animation: {
	   startup:true,
	   duration: 1000,
	   easing: 'out'
	  }
	};

	var jsonData = $.ajax({
          url: "../getData.php",
          dataType: "json",
          async: false
          }).responseText;

	var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
	var next = document.getElementById('nextBtn');
	var back = document.getElementById('backBtn');
	
  var data = new google.visualization.DataTable(jsonData);

	function drawChart() {
	  // Disabling the button while the chart is drawing.
	  next.disabled = true;
	  back.disabled = true;
	  google.visualization.events.addListener(chart, 'ready',
		  function() {
			next.disabled = false;
			back.disabled = false;
		  });
	  chart.draw(data, options);
	}

	next.onclick = function() {
	  if (data.getNumberOfRows() > 5) {
		data.removeRow(Math.floor(Math.random() * data.getNumberOfRows()));
	  }
	  // Generating a random x, y pair and inserting it so rows are sorted.
	  var x = Math.floor(Math.random() * 1000);
	  var y = Math.floor(Math.random() * 100);
	  var where = 0;
	  while (where < data.getNumberOfRows() && parseInt(data.getValue(where, 0)) < x) {
		where++;
	  }
	  data.insertRows(where, [[x.toString(), y]]);
	  drawChart();
	  
	  //Change Slide
	  plusDivs(1);
	}
	
	back.onclick = function() {
	  //Change Slide
	  plusDivs(-1);
	}
	drawChart();
}