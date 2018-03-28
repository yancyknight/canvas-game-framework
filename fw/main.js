document.addEventListener("DOMContentLoaded", function(event) {
    const graphics = require('./graphics');
    const object = require('./object');
    const collision = require('./collision');
    const highScores = require('./HighScores');
//    const LocalStorage = require('./LocalStorage');
    
    fw = {
        graphics,
        object,
        collision,
        highScores
//        LocalStorage
    };
    
    global.fw = fw;
    module.exports = fw;
});