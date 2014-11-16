var previousPosition = [];
var actual_bpm=122;

window.measure = [0,new Date().getTime()];
window.currentbeat = 0;

/*var metronome = setInterval(play(), 240000/actual_bpm);

function play() {
	var sound = document.getElementById(metnoise);
	sound.Play();
};

function reset_the_metro(b) {
	clearInterval(metronome);
	metronome = setInterval(play(), 240000/b);
};*/
//$( document ).ready(function() {
//	actual_bpm = get_tempo(file);
//});


function bpm_from_measure() {
	window.measure[0] = window.measure[1];
	window.measure[1] = new Date().getTime();
	var result = 240000/(window.measure[1]-window.measure[0]);
	return result;
};

function changeTempo(bpm) {
//	$.ajax("http://localhost:8080/requests/status.xml?command=rate&val=" + (bpm / actual_bpm));
	//var data = "url=http://localhost:8080/requests/status.xml?command=rate&val=2"//+bpm/actual_bpm;
	var data = "val=" + bpm/actual_bpm;
	console.log(data);
	//var url = "http://localhost:8080/requests/status.xml&command=rate&val="+bpm/actual_bpm;
	/*$.ajax({
		url: url,
		beforeSend : function(xhr) {
			if(data.authorization !== undefined){
				xhr.setRequestHeader("Authorization", "Basic " + ":12345");
				//you can leave the username out, so that it looks like that:    ":password" 
				//you need the : though and the combination needs to be Base64 encoded
			//}
		},
		success: function (data, status, jqXHR) {

		},
		error: function(data){

		}
	});*/
	$.ajax({
		url: "call.php",
		data: data,
		type: "POST",
		success: function(data, textStatus, jqXHR){
			console.log('Success ' + data);
			},
		error: function (jqXHR, textStatus, errorThrown){
			console.log('Error ' + JSON.stringify(jqXHR));
			}
	});
	
}

function get_tempo(file) {
	if(substr((file),-3)!="wav") { 
		var y = window.prompt("BPM can't be detected. Please input BPM");
		return y;
	}
	var;
$.ajax({
	url: "bmp_from_wav.php",
	data: "file="+file;
	success: function(data, textStatus, jqXHR){console.log('Success ' + data); y=data;}, error: function (jqXHR, textStatus, errorThrown){console.log('error');}}
	return y;
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
