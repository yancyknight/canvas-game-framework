'use strict';
var canvas = document.getElementById('fw-canvas');
var context = canvas.getContext('2d');

// Place a 'clear' function on the Canvas prototype, this makes it a part
// of the canvas, rather than making a function that calls and does it.
CanvasRenderingContext2D.prototype.clear = function () {
	this.save();
	this.setTransform(1, 0, 0, 1, 0, 0);
	this.clearRect(0, 0, canvas.width, canvas.height);
	this.restore();
};

function clear() {
	context.clear();
}


function drawCircle({
	x,
	y,
	radius,
	fill = '#000000',
	stroke = '#000000',
} = {}) {
    context.save();

	context.fillStyle = fill;
	context.strokeStyle = stroke;
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();

    context.restore();
};

function drawRectangle({
	x = 0,
	y = 0,
	w = 100,
	h = 100,
	fill = '#000000',
	stroke = '#000000',
} = {}) {
	context.save();
	context.beginPath();

	context.strokeStyle = stroke;
	context.fillStyle = fill;
	context.strokeRect(x, y, w, h);
	context.fillRect(x, y, w, h);

	context.closePath();
	context.restore();
}

function drawText({
	text,
	x = 0,
	y = 0,
	fill = '#000000',
	font = '48px serif',
} = {}) {
	context.save();

	context.fillStyle = fill;
	context.font = font;
	context.fillText(text, x, y);

	context.restore();
}

// rotation broken
function drawImage({
	center: {
		x,
		y,
	},
	w,
	h,
	src,
	rotation = 0,
} = {}) {
	var image = new Image();
	image.onload = draw;

	image.src = src;

	function draw() {
		context.save();
		context.translate(x, y);
		context.rotate(rotation);
		context.translate(-x, -y);

		if(w && h) {
			context.drawImage(image, x - w / 2, y - h / 2, w, h);
		} else {
			context.drawImage(image, x - this.naturalWidth / 2, y - this.naturalHeight / 2);
		}

		context.restore();
	}
}

module.exports = {
	clear,
	drawRectangle,
	drawImage,
	drawText,
};

