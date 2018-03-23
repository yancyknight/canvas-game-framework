const graphics = require('./graphics');

function GameObject({
    position: {
        x: px,
        y: py
    } = {},
    size: {
        w,
        h
    } = {},
    /*
        speed:
        angle is only used if a velocity is passed as well
        if x and y are passed alone, they will be used as a velocity vector
        if x and y and a velocity is passed, x and y will be transformed into a unit vector
    */
    speed: {
        x: sx = 0,
        y: sy = 0,
        angle,
        velocity
    } = {}
} = {}) {
	let that = {};

    that.getPosition = function getPosition() {
		return {
            x: px,
            y: py
        };
    }
    
    that.getSize = function getSize() {
		return {
            w,
            h
        };
    }
    
    that.getSpeed = function getSpeed() {
		return {
            x: sx,
            y: sy,
            angle,
            velocity
        };
	}

	that.update = function update(elapsedTime) {
        if(elapsedTime == undefined) throw 'GameObject.update needs an elapsed time';
        // console.log(`angle`, angle);
        // console.log(`velocity`, velocity);
        // console.log(`px`, px);
        // console.log(`py`, py);
        // console.log(`sx`, sx);
        // console.log(`sy`, sy);

        if(angle && velocity) {
            px += Math.cos(angle) * elapsedTime * velocity;
            py += Math.sin(angle) * elapsedTime * velocity;
        } else if (velocity) {;
            let mag = Math.sqrt(sx * sx + sy * sy);
            let ux = sx / mag;
            let uy = sy / mag;
            px += ux * velocity * elapsedTime;
            py += uy * velocity * elapsedTime;
        } else {
            px += sx * elapsedTime;
            py += sy * elapsedTime;
        }
	}

	that.setAngle = function setAngle(a) {
		angle = a;
    }

    that.getBoundingBox = function getBoundingBox() {
        return {
            x: px,
            y: py,
            w,
            h
        }
    }

	that.drawBoundingBox = function () {
        let bb = that.getBoundingBox();
		graphics.drawRectangle({x: bb.x, y: bb.y, width: bb.w, height: bb.h, stroke: '#ff0000', fill: 'rgba(0,0,0,0)'});
	};

	return that;
}

Rectangle = function({
    position: {
        x: px,
        y: py
    } = {},
    size: {
        w,
        h
    } = {},
    speed: {
        x: sx = 0,
        y: sy = 0,
        angle,
        velocity
    } = {},
    color: {
        fill = '#000000',
        stroke = '#000000'
    } = {},
} = {}) {
    let that = GameObject({
        position: {
            x: px,
            y: py
        },
        size: {
            w,
            h
        },
        speed: {
            x: sx,
            y: sy,
            angle,
            velocity
        },
        color: {
            fill,
            stroke
        },
    });

    that.render = function() {
        let { x, y } = that.getPosition();
        let { w, h } = that.getSize();
        graphics.drawRectangle({x, y, w, h, stroke, fill});
    };

    that.getColor = function() {
        return {
            fill,
            stroke
        }
    }

    return that;
}

module.exports = {
    GameObject,
    Rectangle
}

