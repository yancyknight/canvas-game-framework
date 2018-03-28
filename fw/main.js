<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function(event) {
    const graphics = require('./graphics');
    const object = require('./object');
    const collision = require('./collision');
    const LocalStorage = require('./LocalStorage');
    
    fw = {
        graphics,
        object,
        collision,
        LocalStorage
    };
    
    global.fw = fw;
    module.exports = fw;
});
=======
const graphics = require('./graphics');
const object = require('./object');
const collision = require('./collision');

fw = {
    graphics,
    object,
    collision
};

global.fw = fw;
module.exports = fw;
>>>>>>> yancy/master
