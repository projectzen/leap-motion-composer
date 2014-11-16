var previousPosition = [];
var actual_bpm = 122;

window.measure = [0,new Date().getTime()];
window.currentbeat = 0;

var metronome = setInterval(play(), 240000/actual_bpm);

function play() {
	var sound = document.getElementById(metnoise);
	sound.Play();
};

function reset_the_metro(b) {
	clearInterval(metronome);
	metronome = setInterval(play(), 240000/b);
};

function bpm_from_measure() {
	window.measure[0] = window.measure[1];
	window.measure[1] = new Date().getTime();
	var result = 240000/(window.measure[1]-window.measure[0]);
	return result;
};

function changeTempo(bpm) {
//	$.ajax("http://localhost:8080/requests/status.xml?command=rate&val=" + (bpm / actual_bpm));
	var data = "url=http://localhost:8080/requests/status.xml&command=rate&val="+bpm/actual_bpm;
	$.ajax({
		url: "http://localhost:9000/call.php",
		data: data,
		type: "POST",
		success: function(data, textStatus, jqXHR){
			console.log('Success ' + data);
			}
		error: function (jqXHR, textStatus, errorThrown){
			console.log('Error ' + jqXHR);
			}
	});
	
}

conductController = new Leap.Controller({
  frameEventName: 'animationFrame',
  useAllPlugins: true
});

conductController.connect();

conductController.on('frame', function(frame) {
	for (var i in frame.fingers) {
		if (frame.fingers[i].type == 1) {
			var position = frame.fingers[i].tipPosition;
			if (previousPosition) {
				if (window.currentbeat % 2 == 0 && previousPosition[1] < position[1] - 10)  {
					window.currentbeat = window.currentbeat + 1;
					console.log("Beat " + window.currentbeat);
				}
				else if (window.currentbeat % 2 == 1 && previousPosition[1] > position[1] + 10)  {
					window.currentbeat = (window.currentbeat + 1) % 8;
					console.log("Beat " + window.currentbeat);
					if (window.currentbeat == 0) {
						changeTempo(bpm_from_measure());
					}
				}
			}
			previousPosition = position;
		}
	}
});
