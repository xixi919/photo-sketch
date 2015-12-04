var Canvas = function(canvasId) {
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");
    var flag = false,
     	prevX = 0,
     	currX = 0,
    	prevY = 0,
	    currY = 0,
	    dot_flag = false;

    var colour = "black",
    thickness = 2;

    var draw = function () {
	    ctx.beginPath();
	    ctx.moveTo(prevX, prevY);
	    ctx.lineTo(currX, currY);
	    ctx.strokeStyle = colour;
	    ctx.lineWidth = thickness;
	    ctx.lineCap = 'round';
	    ctx.stroke();
	    ctx.closePath();
	}

    var moveEvent = function(res, e) {
	    if (res == 'down' || res == 'touchdown') {
	        prevX = currX;
	        prevY = currY;
	        if (res == 'touchdown') {
	        	currX = e.touches[0].pageX - canvas.offsetLeft;
		        currY = e.touches[0].pageY - canvas.offsetTop;
		        e.preventDefault();
	        }
	        else {
		        currX = e.clientX - canvas.offsetLeft;
		        currY = e.clientY - canvas.offsetTop;
		    }

	        flag = true;
	        dot_flag = true;
	        if (dot_flag) {
	            ctx.beginPath();
	            ctx.fillStyle = colour;
	            ctx.fillRect(currX, currY, 2, 2);
	            ctx.closePath();
	            dot_flag = false;
	        }
	    }
	    if (res == 'up' || res == "out") {
	        flag = false;
	    }
	    if (res == 'move' || res == 'touchmove') {
	        if (flag) {
	            prevX = currX;
	            prevY = currY;
		        if (res == 'touchmove') {
		        	currX = e.touches[0].pageX - canvas.offsetLeft;
			        currY = e.touches[0].pageY - canvas.offsetTop;
			        e.preventDefault();
		        }
		        else {
		            currX = e.clientX - canvas.offsetLeft;
		            currY = e.clientY - canvas.offsetTop;
		        }
	            draw();
	        }
	    }
	}

    canvas.addEventListener("mousemove", function (e) {
        moveEvent('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        moveEvent('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        moveEvent('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        moveEvent('out', e)
    }, false);
    
    canvas.addEventListener("touchmove", function (e) {
        moveEvent('touchmove', e)
    }, false);
    canvas.addEventListener("touchstart", function (e) {
        moveEvent('touchdown', e)
    }, false);
    canvas.addEventListener("touchend", function (e) {
        moveEvent('up', e)
    }, false); 
    canvas.addEventListener("touchcancel", function (e) {
        moveEvent('out', e)
    }, false);
    

    this.changeColour = function(newColour) {
		colour = newColour;
	}

	this.changeSize = function(newSize) {
		thickness = newSize;
	}

	this.discard = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	this.setImgInput = function(inputId) {
		var input = document.getElementById(inputId);
        	input.addEventListener('change', this.drawImage, false);
	}

	this.drawImage = function(e) {
	    var url = URL.createObjectURL(e.target.files[0]);
	    var img = new Image();
	    img.onload = function() { 
	        ctx.drawImage(img,0,0, canvas.width,canvas.height);
	    }
	    img.src = url;
	}

	this.getDataURL = function() {
		return canvas.toDataURL();
	}

	this.rotateClockwise = function(canvasId) {
	    // Create a temp canvas to store our data (because we need to clear the other box after rotation.
	    var tempCanvas = document.createElement("canvas"),
	        tempCtx = tempCanvas.getContext("2d");
	    tempCanvas.width = canvas.width;
	    tempCanvas.height = canvas.height;
	    // put our data onto the temp canvas
	    tempCtx.drawImage(canvas,0,0,canvas.width,canvas.height);
	    ctx.clearRect(0,0,canvas.width,canvas.height);
	    ctx.save();
	    
	    ctx.translate(canvas.width/2,canvas.height/2);
	    // Rotate it
	    ctx.rotate(90*Math.PI/180);

	    ctx.drawImage(tempCanvas,-canvas.height/2,-canvas.width/2, canvas.height, canvas.width);
	    ctx.restore();
	}
};
