'use strict';
//const graphics = require('./graphics');

function nextCircleVector(angleOffset, angleTotal) {
    //TODO: Some reason it is getting a bad angle every once and a while
    var angle = (Math.random() * 2 * Math.PI) % angleTotal + angleOffset;
    return {
        x: Math.cos(angle),
        y: Math.sin(angle)
    };
}

var usePrevious = false,
    y2;

function nextGaussian(mean, stdDev) {
    if (usePrevious) {
        usePrevious = false;
        return mean + y2 * stdDev;
    }

    usePrevious = true;

    var x1 = 0,
        x2 = 0,
        y1 = 0,
        z = 0;

    do {
        x1 = 2 * Math.random() - 1;
        x2 = 2 * Math.random() - 1;
        z = (x1 * x1) + (x2 * x2);
    } while (z >= 1);

    z = Math.sqrt((-2 * Math.log(z)) / z);
    y1 = x1 * z;
    y2 = x2 * z;

    return mean + y1 * stdDev;
}

function ParticleSystem({
    centerx,
    centery,
    speedmean,
    speedstdev,
    lifetimemean,
    lifetimestdev,
    sizemean,
    sizestdev,
    fill = 'rgba(0, 0, 255, 0.5)',
    radius,
    style,
    stroke,
    image,
    imagedWidth,
    imagedHeight,
    rate = 5,
    angleOffset = 0,
    angleTotal = 2 * Math.PI
} = {}) {
    let that = {};
    let particles = [];
    if (style === 'image') {
        var iImage = Img(image);
    }
    that.render = function () {
        for (let particle = 0; particle < particles.length; particle++) {
            if (particles[particle].alive >= 100) {
                if (particles[particle].style === 'circle') {
                    drawCircle({
                        x: particles[particle].center.x,
                        y: particles[particle].center.y,
                        radius: particles[particle].size,
                        fill: particles[particle].fill,
                        stroke: particles[particle].stroke
                    });
                } else if (style == 'image') {
                    drawImage({
                        image: iImage,
                        dx: particles[particle].center.x,
                        dy: particles[particle].center.y,
                        dWidth: imagedWidth,
                        dHeight: imagedHeight
                    })
                }
            }
        }
    };

    that.update = function (elapsedTime) {
        let keepMe = [];

        for (let particle = 0; particle < particles.length; particle++) {
            particles[particle].alive += (elapsedTime / 2);
            particles[particle].center.x += (elapsedTime * particles[particle].speed * particles[particle].direction.x);
            particles[particle].center.y += (elapsedTime * particles[particle].speed * particles[particle].direction.y);
            particles[particle].rotation += particles[particle].speed / .5;

            if (particles[particle].alive <= particles[particle].lifetime) {
                keepMe.push(particles[particle]);
            }
        }

        for (let particle = 0; particle < rate; particle++) {
            let p = {
                center: {
                    x: centerx,
                    y: centery
                },
                direction: nextCircleVector(angleOffset, angleTotal),
                speed: nextGaussian(speedmean, speedstdev), // pixels per millisecond
                rotation: 0,
                lifetime: nextGaussian(lifetimemean, lifetimestdev), // milliseconds
                alive: 0,
                size: nextGaussian(sizemean, sizestdev),
                fill: fill,
                stroke: stroke,
                style: style
            };
            keepMe.push(p);
        }
        particles = keepMe;
    };

    return that;
}

//module.exports = {
//    ParticleSystem,
//};
