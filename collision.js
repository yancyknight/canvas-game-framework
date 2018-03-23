// Needs to be ported to current system

function collision() {
    let collision = {};
    let registeredHandlers = [];

    function checkValidSpec(spec) {
        if (typeof spec.object1 === 'undefined' || typeof spec.object2 === 'undefined') {
            throw 'collision.registerCollisionDetection: Must provide both collision objects'
        }
        if (typeof spec.object1.getSpec !== 'function' || typeof spec.object2.getSpec !== 'function') {
            throw 'objects must have a getSpec function'
        }
        let obj1 = spec.object1.getSpec();
        let obj2 = spec.object2.getSpec();
        if (typeof obj1.x === 'undefined' || typeof obj1.y === 'undefined') {
            throw 'collision.registerCollisionDetection: object1 must have x and y'
        }
        if (typeof obj2.x === 'undefined' || typeof obj2.y === 'undefined') {
            throw 'collision.registerCollisionDetection: object2 must have x and y'
        }
        if (typeof obj1.width === 'undefined' && obj1.radius === 'undefined') {
            throw 'collision.registerCollisionDetection: object1 must provide width or radius'
        }
        if (typeof obj2.width === 'undefined' && obj2.radius === 'undefined') {
            throw 'collision.registerCollisionDetection: object2 must provide width or radius'
        }
        if (typeof obj1.height === 'undefined' && obj1.radius === 'undefined') {
            throw 'collision.registerCollisionDetection: object1 must provide height or radius'
        }
        if (typeof obj2.height === 'undefined' && obj2.radius === 'undefined') {
            throw 'collision.registerCollisionDetection: object2 must provide height or radius'
        }
        if (typeof spec.handler !== 'function') {
            throw 'collision.registerCollisionDetection: Must provide a handler function'
        }
    }

    collision.unregisterAllHandlers = function () {
        registeredHandlers.length = 0;
    }

    function getBoundingBox(object) {
        if (typeof object.radius === 'number') {
            // assume we have a circle
            return {
                height: object.radius * 2,
                width: object.radius * 2,
                x: object.x - object.radius,
                y: object.y - object.radius

            }
        } else {
            return {
                height: object.height,
                width: object.width,
                x: object.x,
                y: object.y
            }
        }
    }

    collision.registerCollisionDetection = function (spec) {
        checkValidSpec(spec);
        spec.colliding = false;
        registeredHandlers.push(spec);
    }

    collision.drawBoundingBox = function () {
        for (let i = 0; i < registeredHandlers.length; i++) {
            let handler = registeredHandlers[i];
            let obj1 = getBoundingBox(handler.object1.getSpec());
            let obj2 = getBoundingBox(handler.object2.getSpec());
            graphics.drawRectangle(obj1);
            graphics.drawRectangle(obj2);
        }
    }

    collision.update = function () {
        for (let i = 0; i < registeredHandlers.length; i++) {
            let handler = registeredHandlers[i];
            let obj1 = getBoundingBox(handler.object1.getSpec());
            let obj2 = getBoundingBox(handler.object2.getSpec());

            let xHit = (obj1.x >= obj2.x && obj1.x <= obj2.x + obj2.width) || (obj2.x >= obj1.x && obj2.x <= obj1.x + obj1.width);
            let yHit = (obj1.y >= obj2.y && obj1.y <= obj2.y + obj2.height) || (obj2.y >= obj1.y && obj2.y <= obj1.y + obj1.height);

            if (xHit && yHit && !handler.colliding) {
                handler.colliding = true;
                handler.handler(handler.object1, handler.object2);
                if (handler.once) {
                    registeredHandlers.splice(i, 1);
                }
            }
            else {
                handler.colliding = false;
            }
        }
    }
}