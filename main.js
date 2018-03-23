document.addEventListener("DOMContentLoaded", function(event) {
    const graphics = require('./graphics');
    const object = require('./object');
    
    fw = {
        graphics,
        object
    };
    
    global.fw = fw;
});