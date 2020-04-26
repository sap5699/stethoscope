var img = document.getElementById("human");
var imgContainer = document.getElementById("visual");
var center = document.getElementById("center");
var windowWidth = window.innerWidth;
var menu = document.getElementById("menu");
var beginButton = document.getElementById("begin");
var mainCanvas = document.getElementById("walkthrough");
var continueButton = document.getElementById("continue");
var mainContext = mainCanvas.getContext("2d");

var interval;
var posInterval;

var htmlthis;

var circleColor = 'lightblue';

var loaded=0;

var which = 0;
var pos=0;

var radius = 100;
var counting=0;
var count = 0;
var MAXCOUNT = 3;

mainCanvas.width=1000;
mainCanvas.height=500;


img.onload = function(){
	
	if(loaded==0){
		imageWidth = img.offsetWidth;
		menuWidth = menu.offsetWidth;
		imgContainer.style.width = imageWidth + "px";
		center.style.width = (windowWidth - imageWidth  - menuWidth-1) + "px";
		setupCanvas();
	}
	loaded=1;

}

function setupCanvas(){
	mainContext.font = "30px Arial";
	mainContext.fillText("Click 'Begin Auscultation' to start!", 10, 50);
}

beginButton.onclick = function(){
	
	//var mainCanvas = document.getElementById("walkthrough");

	mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

	mainContext.font = "30px"
	mainContext.fillText("First, let's get you setup.", 10,50);
	mainContext.fillText("Plug the stethoscope into your computer's headset jack as shown", 10,80);

	mainContext.fillText("Now we will take our auscultation, which is just a fancy way of", 10, mainCanvas.height-50);
	mainContext.fillText("saying 'lung recording'. Hit 'Continue' when you're ready.",10, mainCanvas.height-20);
	continueButton.style.visibility = "visible";
	continueButton.style.opacity = 1;

	var unplugged = document.getElementById("unplugged");
	var plugged = document.getElementById("plugged");


	mainContext.drawImage(unplugged, 250, 120, 500,300);
	which = 0;

	interval = setInterval(changePlugImage, 1000);
};


function changePlugImage(){
	var unplugged = document.getElementById("unplugged");
	var plugged = document.getElementById("plugged");

	if(which==0){
		mainContext.drawImage(plugged, 250,120,500,300);
		which=1;
	} else{
		mainContext.drawImage(unplugged, 250, 120, 500, 300);
		which=0;
	}
}

function continue_first(e){
	clearInterval(interval);
	htmlthis = e;
	mainContext.clearRect(0,0,mainCanvas.width, mainCanvas.height);

	//context.fillText("Now we will take our auscultation, which is just a fancy way of", 10, 50);
	//context.fillText("saying 'lung recording'", 10, 80);
	mainContext.fillText("Try to match your breathing with the circle.", 10,50);
	mainContext.fillText("Breathe in when it expands, and exhale when it contracts", 10, 80);


	mainContext.fillText("Practice as long as you need, then hit 'Continue'", 10, mainCanvas.height - 30);
	continueButton.onclick = continue_second;
	interval = setInterval(updateCircle, 10);
};

function updateCircle(){
	var MIN = 100;
	var MAX = 150;

	// 0 is growing, 1 is contracting
	if(radius==MIN){
		which=0;
		count = count - 1;
		if(count == 0){
			count = MAXCOUNT;
			flashPos();
			positionsHit = positionsHit + 1; 
			console.log(positionsHit);
			if(positionsHit==5)
			{
				cleanup();
				console.log("hi steven");
				return;
			}
		}
	}else if(radius==MAX){
		which=1;
	}
	if(which==0){
		radius = radius+1;
	} else{
		radius = radius - 1;
	}
	mainContext.strokeStyle = '#FFFFFF';
	mainContext.beginPath();
    mainContext.arc(500, 250, MAX, 0, 2 * Math.PI, false);
    mainContext.fillStyle = 'white';
    mainContext.fill();
    mainContext.lineWidth = 5;
    mainContext.stroke();


	mainContext.strokeStyle = '#FFFFFF';
	mainContext.beginPath();
    mainContext.arc(500, 250, radius, 0, 2 * Math.PI, false);
    mainContext.fillStyle = circleColor;
    mainContext.fill();
    mainContext.lineWidth = 5;
    mainContext.stroke();

    if(counting){
    	mainContext.font = "50px Arial";
    	mainContext.fillStyle = 'white';
    	mainContext.fillText(count, 500-12,250+25);
    }
}

function continue_second(){
	mainContext.fillStyle = 'black';
	mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
	mainContext.fillText("When you start, place and hold the stethoscope bell", 10, 50);
	mainContext.fillText("on your body corresponding to the location marked on the diagram",10,80);
	posInterval = setInterval(flashPos, 1000);
	mainContext.fillText("When you're ready, hit 'Continue' to start recording.", 10, mainCanvas.height-50);
	continueButton.onclick = continue_third;
}

function flashPos(){
	if(pos==0){
		img.src = "/static/images/pos0.jpg";
	} else if(pos==1){
		img.src = "/static/images/pos1.jpg";
	} else if(pos==2){
		img.src = "/static/images/pos2.jpg";
	} else if(pos==3){
		img.src = "/static/images/pos3.jpg";
	}
	pos = pos + 1;
	if(pos==4){
		pos = 0;
	}
}

function continue_third(){
	continueButton.onclick = donothing;
	mainContext.clearRect(0,0,mainCanvas.width, mainCanvas.height);
	circleColor = 'red';
	clearInterval(posInterval);
	pos = 0;
	flashPos();
	toggleRecording(htmlthis);
	counting = 1;
	radius = 101;
	count = MAXCOUNT;
	positionsHit = 1;

}

function cleanup(){
	clearInterval(interval);
	clearInterval(posInterval);

	var stevenCanvas = document.getElementById("walkthrough");
	var stevenContext = stevenCanvas.getContext("2d");
	stevenContext.font = "30px Arial";
	stevenContext.fillStyle = "black";
	stevenContext.clearRect(0,0,stevenCanvas.width, stevenCanvas.height);
	stevenContext.fillText("Thank you for helping to flatten the curve.", 10, 50);
	stevenContext.fillText("Please practice all social distancing guidelines listed in 'COVID-19 Resources'", 10, 80);
	stevenContext.fillText("Download your ascultation by pressing 'Continue'", 10, stevenCanvas.height-50);

	toggleRecording(htmlthis);
	console.log('here');
}
function donothing(){

}
