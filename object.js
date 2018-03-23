const graphics = require('./graphics');

function GameObject({
    position: {
        x = 0,
        y = 0
    } = {},
    size: {
        w = 0,
        h = 0
    } = {},
} = {}) {
    let that = {
        position: { x, y },
        size: { w, h }
    };
    let updateList = [];
    let renderList = [];

    that.addBehavior = function(data) {
        if(typeof data !== 'object') throw 'GameObject.addBehavior: data is required and must be an object'
        if(typeof data.name !== 'string') throw 'GameObject.addBehavior: data.name is required and must be a string'

        var name = data.name;
        delete data.name;

        if(typeof data.update === 'function') {
            updateList.push({name, update: data.update});
            delete data.update;
        }
        if(typeof data.render === 'function') {
            renderList.push({name, render: data.render});
            delete data.render;
        }

        that[name] = data;
    }

    that.update = function(elapsedTime) {
        if(typeof elapsedTime === 'undefined') throw 'GameObject.update: elapsedTime is required'
        for(let i = 0; i < updateList.length; i++) {
            updateList[i].update(elapsedTime, that);
        }
    }

    that.render = function() {
        for(let i = 0; i < renderList.length; i++) {
            renderList[i].render(that);
        }
    }

	return that;
}

let behaviors = {
    // NEEDS WORK
    Collidable() {
        return {
            name: 'collidable',
            getBoundingBoxgetBoundingBox() {
                return {
                    x: px,
                    y: py,
                    w,
                    h
                }
            },
        
            drawBoundingBox() {
                let bb = that.getBoundingBox();
                graphics.drawRectangle({x: bb.x, y: bb.y, width: bb.w, height: bb.h, stroke: '#ff0000', fill: 'rgba(0,0,0,0)'});
            }
        }
    },
    Speed({
        /*
            angle is only used if a velocity is passed as well
            if x and y are passed alone, they will be used as a velocity vector
            if x and y and a velocity is passed, x and y will be transformed into a unit vector
        */
        x = 0,
        y = 0,
        angle,
        velocity
    } = {}) {
        if(typeof x !== 'number') throw 'Speed: x must be a number';
        if(typeof y !== 'number') throw 'Speed: y must be a number';
        return {
            name: 'speed',
            x,
            y,
            angle,
            velocity,
            update(elapsedTime, obj) {
                if(typeof elapsedTime === 'undefined') throw 'Speed.update needs an elapsed time';
        
                if(typeof obj.speed.angle === 'number' && typeof obj.speed.velocity === 'number') {
                    obj.position.x += Math.cos(obj.speed.angle) * obj.speed.velocity * elapsedTime;
                    obj.position.y += Math.sin(obj.speed.angle) * obj.speed.velocity * elapsedTime;
                } else if (typeof obj.speed.velocity === 'number') {;
                    let mag = Math.sqrt(obj.speed.x * obj.speed.x + obj.speed.y * obj.speed.y);
                    let ux = obj.speed.x / mag;
                    let uy = obj.speed.y / mag;
                    obj.position.x += ux * obj.speed.velocity * elapsedTime;
                    obj.position.y += uy * obj.speed.velocity * elapsedTime;
                } else {
                    obj.position.x += obj.speed.x * elapsedTime;
                    obj.position.y += obj.speed.y * elapsedTime;
                }
            }
        };
    }
}

/*
var position = {x: 100, y: 100};
var size = {w: 100, h: 100};
var obj = fw.object.GameObject({position, size});
var s = {x: .1, y: 0};
obj.addBehavior(fw.object.behaviors.Speed(s));
*/


// let Rectangle = function({
//     position: {
//         x: px,
//         y: py
//     } = {},
//     size: {
//         w,
//         h
//     } = {},
//     speed: {
//         x: sx = 0,
//         y: sy = 0,
//         angle,
//         velocity
//     } = {},
//     color: {
//         fill = '#000000',
//         stroke = '#000000'
//     } = {},
// } = {}) {
//     let that = GameObject({
//         position: {
//             x: px,
//             y: py
//         },
//         size: {
//             w,
//             h
//         },
//         speed: {
//             x: sx,
//             y: sy,
//             angle,
//             velocity
//         },
//         color: {
//             fill,
//             stroke
//         },
//     });

//     that.render = function() {
//         let { x, y } = that.getPosition();
//         let { w, h } = that.getSize();
//         graphics.drawRectangle({x, y, w, h, stroke, fill});
//     };

//     that.getColor = function() {
//         return {
//             fill,
//             stroke
//         }
//     }

//     return that;
// }

module.exports = {
    GameObject,
    behaviors
}
