function start(){
	console.log("Starting..");
	window.delay = 1;
	window.frameRequest = requestAnimationFrame(printToCanvas);
	window.streamInterval = setInterval(function(){
		var video = document.getElementById('video');
		var currentSecond = Math.floor(new Date().getTime() / 1000 - 0.75) - delay - 1;
	    video.src = 'files/' + currentSecond + ".m4v";
	}, delay*1000);
	document.getElementById("play").innerHTML = "&#9632;";
}

function stop(){
	console.log("Stopping..");
	clearInterval(window.streamInterval);
	delete window.streamInterval;
	cancelAnimationFrame(window.frameRequest);
	document.getElementById("play").innerHTML = "&#8227;";
	document.getElementById("screen").width = document.getElementById("screen").width;
}

function toggle(){
	if (window.streamInterval)
		stop();
	else
		start();
}


function printToCanvas(){
	var video = document.getElementById('video');
	var canvas = document.getElementById('screen');
	var ctx = canvas.getContext('2d');
	var videoLength = Math.max(video.videoWidth, video.videoHeight);
	var length = Math.min(window.innerWidth, window.innerHeight);
	var ratio = length/videoLength;
	if (ratio != NaN && ratio != 0 && ratio != Infinity && video.currentTime != 0){
		ctx.canvas.width  = window.innerWidth/ratio;
  		ctx.canvas.height = window.innerHeight/ratio;
		ctx.drawImage(video, (window.innerWidth - video.videoWidth*ratio)/2/ratio, 
							(window.innerHeight - video.videoHeight*ratio)/2/ratio, 
							video.videoWidth, 
							video.videoHeight);
	}
	
	window.frameRequest = requestAnimationFrame(printToCanvas);
}