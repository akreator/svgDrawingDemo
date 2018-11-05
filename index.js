var allPaths = [];
var svgWidth;
var svgHeight;

$( document ).ready(function() {
	var draw = SVG('svg').size('100%', '100%');
	var svgDiv = $('#svg');
	var svgWidth = svgDiv.width();
	var svgHeight = svgDiv.height();

	var drawing = false;

	var currentPathObj; //the current path/stroke object
	var currentPathArr = []; //the current path/stroke array of points	

	svgDiv.on('mousedown', function(e) {
		drawing = true;
		currentPathArr.length = 0; //clear current path array
		currentPathArr.push(e.clientX); //add current point
		currentPathArr.push(e.clientY);
		currentPath = draw.polyline(currentPathArr)
			.fill('none')
			.stroke({ width : 3});
	});

	svgDiv.on('mousemove', function(e) {
		if (drawing) {
			currentPathArr.push(e.clientX);
			currentPathArr.push(e.clientY);
			currentPath.plot(currentPathArr);
		}
	});

	svgDiv.on('mouseup', function(e) {
		console.log('up');
		drawing = false;
		allPaths.push(currentPath);
	}); 


	$(window).resize(function () {	
		window.resizedFinished = setTimeout(function () {
			let xScaleFactor = (svgDiv.width() / svgWidth); //new / orig
			let yScaleFactor = (svgDiv.height() / svgHeight);
			
			allPaths.forEach(function(path) {
				w = path.width();
				h = path.height();
				path.size(w*xScaleFactor, h*yScaleFactor);
				x = path.x();
				y = path.y();
				path.x(x*xScaleFactor);
				path.y(y*yScaleFactor);
			});

			svgWidth = svgDiv.width();
			svgHeight = svgDiv.height();
		}, 250);
	});

});
